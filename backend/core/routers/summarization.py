import logging
from fastapi import APIRouter, Request
from core.schemas.summarization import SummarizationRequest
from core.services.nlp_service import nlp_service
from core.middleware.rate_limit import limiter
from core.utils.helpers import create_response

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/api/summarize")
@limiter.limit("20/minute")
async def summarize_text(request: Request, body: SummarizationRequest):
    """Summarize a long text document into a concise version."""
    logger.info(f"Summarization request: text length={len(body.text)}")
    try:
        result = nlp_service.summarize_text(body.text, body.max_length, body.min_length)
        return create_response(True, result)
    except Exception as e:
        logger.error(f"Summarization failed: {e}")
        return create_response(False, error=str(e))
