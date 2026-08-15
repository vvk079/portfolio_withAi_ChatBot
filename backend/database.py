import logging
import os

from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

logger = logging.getLogger(__name__)

MONGODB_URI = os.getenv("MONGODB_URI")

# Chat history is a nice-to-have, so a missing or bad URI must not take the API
# down at import time — the app boots without persistence instead.
client = None
db = None
chat_history_collection = None

if MONGODB_URI:
    try:
        client = AsyncIOMotorClient(MONGODB_URI)
        db = client.get_default_database()
        chat_history_collection = db.get_collection("chat_history")
    except Exception as exc:
        logger.warning("MongoDB unavailable, running without chat history: %s", exc)
        client = db = chat_history_collection = None
else:
    logger.warning("MONGODB_URI not set — running without chat history.")
