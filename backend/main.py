import logging
import os
from datetime import datetime, timezone
from typing import Literal

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from database import chat_history_collection

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Portfolio AI Chatbot API")


def client_ip(request: Request) -> str:
    """Real client IP. Render terminates TLS at a proxy, so request.client.host
    is the proxy — without this every visitor shares one rate-limit bucket."""
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


limiter = Limiter(key_func=client_ip)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    logger.warning("HTTP %s: %s", exc.status_code, exc.detail)
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    # Log the detail, but don't echo the request body back to the caller.
    logger.warning("Validation error: %s", exc.errors())
    return JSONResponse(
        status_code=422,
        content={"detail": "Invalid request."},
    )


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://mevvk.vercel.app",
        "http://localhost:5173",
        "http://localhost:3000",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Also serves as the warm-up ping the frontend fires on page load."""
    return {"status": "online", "message": "Portfolio AI Chatbot API is running"}


OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# Load resume text
RESUME_TEXT = ""
resume_path = os.path.join(os.path.dirname(__file__), "extracted_resume.txt")
if os.path.exists(resume_path):
    with open(resume_path, "r", encoding="utf-8") as f:
        RESUME_TEXT = f.read()

SYSTEM_PROMPT = f"""
You are an AI assistant for Vivek's personal portfolio.
Your goal is to answer questions about Vivek's professional background, education, projects, and skills based on the provided resume details.
Be professional, concise, and helpful. If you don't know the answer, say you don't know but offer to let the user contact Vivek.
Only discuss Vivek's professional background. Politely decline unrelated requests.

Vivek's Resume Details:
{RESUME_TEXT}
"""

MAX_HISTORY = 10
MAX_TOKENS = 800


class Message(BaseModel):
    # Literal blocks a caller injecting a "system" turn to override SYSTEM_PROMPT.
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=4000)


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)
    history: list[Message] = Field(default_factory=list, max_length=MAX_HISTORY)


@app.post("/chat")
@limiter.limit("10/minute;100/day")
async def chat(request: Request, payload: ChatRequest):
    if not OPENROUTER_API_KEY:
        logger.error("OPENROUTER_API_KEY is not configured")
        raise HTTPException(status_code=503, detail="Chat is temporarily unavailable.")

    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    messages += [m.model_dump() for m in payload.history[-MAX_HISTORY:]]
    messages.append({"role": "user", "content": payload.message})

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": "google/gemini-2.0-flash-lite-001",
                    "messages": messages,
                    "max_tokens": MAX_TOKENS,
                },
                timeout=30.0,
            )
    except httpx.RequestError as exc:
        logger.error("OpenRouter request failed: %s", exc)
        raise HTTPException(status_code=502, detail="Upstream model is unreachable.")

    if response.status_code != 200:
        # Log upstream detail; never forward it (it can carry key/account info).
        logger.error("OpenRouter %s: %s", response.status_code, response.text[:500])
        raise HTTPException(status_code=502, detail="Upstream model error.")

    data = response.json()
    choices = data.get("choices") or []
    if not choices:
        logger.error("OpenRouter returned no choices: %s", str(data)[:500])
        raise HTTPException(status_code=502, detail="Upstream model returned no reply.")

    ai_message = choices[0]["message"]["content"]

    # Persistence is best-effort: a DB outage must not break the chat.
    if chat_history_collection is not None:
        try:
            await chat_history_collection.insert_one(
                {
                    "user_message": payload.message,
                    "ai_response": ai_message,
                    "created_at": datetime.now(timezone.utc),
                    "ip": client_ip(request),
                }
            )
        except Exception as db_exc:
            logger.warning("Database insert failed: %s", db_exc)

    return {"response": ai_message}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
