import logging
from fastapi import APIRouter, Request
from core.schemas.chat_widget import ChatWidgetRequest
from core.services.agent_service import chat as agent_chat
from core.middleware.rate_limit import limiter
from core.utils.helpers import create_response

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/api/chat-widget")
@limiter.limit("15/minute")
async def chat_widget(request: Request, body: ChatWidgetRequest):
    """Global chat widget endpoint powered by OpenAI Agents SDK + OpenRouter."""
    logger.info(f"Chat widget request: message='{body.message[:50]}...'")
    try:
        history_dicts = [{"role": m.role, "content": m.content} for m in body.history]
        result = await agent_chat(body.message, history_dicts)
        return create_response(True, result)
    except Exception as e:
        logger.error(f"Chat widget failed: {e}")
        return create_response(False, error=str(e))
