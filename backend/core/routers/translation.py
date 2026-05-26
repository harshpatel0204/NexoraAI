import logging
from fastapi import APIRouter, Request
from core.schemas.translation import TranslationRequest
from core.services.translation_service import translation_service
from core.middleware.rate_limit import limiter
from core.utils.helpers import create_response

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/api/translate")
@limiter.limit("20/minute")
async def translate_text(request: Request, body: TranslationRequest):
    """Translate text between languages using Helsinki-NLP models."""
    logger.info(f"Translation request: {body.source_lang} -> {body.target_lang}")
    try:
        result = translation_service.translate(body.text, body.source_lang, body.target_lang)
        return create_response(True, result)
    except Exception as e:
        logger.error(f"Translation failed: {e}")
        return create_response(False, error=str(e))
