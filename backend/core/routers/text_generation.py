import logging
from fastapi import APIRouter, Request
from core.schemas.text import TextGenerationRequest
from core.services.llm_service import llm_service
from core.middleware.rate_limit import limiter
from core.utils.helpers import create_response

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/api/text-generation")
@limiter.limit("20/minute")
async def generate_text(request: Request, body: TextGenerationRequest):
    """Generate creative or factual text from a prompt using GPT-4o-mini or fallback."""
    logger.info(f"Text generation request: prompt='{body.prompt[:50]}...'")
    try:
        result = await llm_service.generate_text(body.prompt, body.max_tokens)
        return create_response(True, result)
    except Exception as e:
        logger.error(f"Text generation failed: {e}")
        return create_response(False, error=str(e))
