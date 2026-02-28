from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os
from dotenv import load_dotenv
from database import chat_history_collection

load_dotenv()

app = FastAPI()

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    print(f"HTTP Error: {exc.status_code} - {exc.detail}")
    with open("debug_log.txt", "a") as f:
        f.write(f"HTTP Error: {exc.status_code} - {exc.detail}\n")
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    body = await request.body()
    error_msg = f"Validation error: {exc.errors()}\nBody: {body.decode()}\n"
    print(error_msg)
    with open("debug_log.txt", "a") as f:
        f.write(error_msg)
    return JSONResponse(
        status_code=400,
        content={"detail": exc.errors(), "body": body.decode()},
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

Vivek's Resume Details:
{RESUME_TEXT}
"""

class ChatRequest(BaseModel):
    message: str
    history: list = []

@app.post("/chat")
async def chat(request: ChatRequest):
    print(f"Received request: {request}")
    if not OPENROUTER_API_KEY:
        raise HTTPException(status_code=500, detail="OpenRouter API key not configured")

    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for msg in request.history:
        messages.append(msg)
    messages.append({"role": "user", "content": request.message})

    print(f"Sending to OpenRouter: {messages}")
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
            },
            timeout=30.0
        )
        
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        
        data = response.json()
        ai_message = data["choices"][0]["message"]["content"]
        
        # Save to DB asynchronously (optional, but requested)
        await chat_history_collection.insert_one({
            "user_message": request.message,
            "ai_response": ai_message,
        })
        
        return {"response": ai_message}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

