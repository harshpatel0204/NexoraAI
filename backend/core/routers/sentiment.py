import logging
from fastapi import APIRouter, Request
from core.schemas.sentiment import SentimentRequest
from core.services.nlp_service import nlp_service
from core.middleware.rate_limit import limiter
from core.utils.helpers import create_response

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/api/sentiment")
@limiter.limit("20/minute")
async def analyze_sentiment(request: Request, body: SentimentRequest):
    """Analyze the sentiment of the provided text (positive/negative/neutral)."""
    logger.info(f"Sentiment analysis request: text='{body.text[:50]}...'")
    try:
        result = nlp_service.analyze_sentiment(body.text)
        return create_response(True, result)
    except Exception as e:
        logger.error(f"Sentiment analysis failed: {e}")
        return create_response(False, error=str(e))
