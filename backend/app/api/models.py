from pydantic import BaseModel
from typing import Optional

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None
    language: Optional[str] = None  # 'am' for Amharic, 'en' for English

class ChatResponse(BaseModel):
    response: str
    session_id: str
    language: str