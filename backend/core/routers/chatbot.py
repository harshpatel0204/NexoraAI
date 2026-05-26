import logging
from fastapi import APIRouter, Request
from core.schemas.chatbot import ChatbotRequest
from core.services.llm_service import llm_service
from core.middleware.rate_limit import limiter
from core.utils.helpers import create_response

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/api/chatbot")
@limiter.limit("20/minute")
async def chat(request: Request, body: ChatbotRequest):
    """Chat with NeuralNexus AI assistant with conversation history."""
    logger.info(f"Chatbot request: message='{body.message[:50]}...'")
    try:
        history_dicts = [{"role": m.role, "content": m.content} for m in body.history]
        result = await llm_service.chat_completion(body.message, history_dicts)
        return create_response(True, result)
    except Exception as e:
        logger.error(f"Chatbot failed: {e}")
        return create_response(False, error=str(e))
