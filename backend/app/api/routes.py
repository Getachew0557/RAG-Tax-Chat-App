from fastapi import APIRouter, HTTPException
from .models import ChatRequest, ChatResponse
from ..rag.pipeline import RAGPipeline
from ..utils.language import detect_language
import uuid

router = APIRouter()
rag_pipeline = RAGPipeline()

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        # Detect language if not provided
        detected_language = request.language or detect_language(request.message)
        if detected_language not in ['am', 'en']:
            detected_language = 'en'  # Fallback to English

        # Generate or use session ID
        session_id = request.session_id or str(uuid.uuid4())

        # Get response from RAG pipeline
        response = rag_pipeline.process_query(request.message, detected_language)

        return ChatResponse(
            response=response,
            session_id=session_id,
            language=detected_language
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")
