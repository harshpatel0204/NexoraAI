"""Router for image captioning endpoint."""

import logging
from fastapi import APIRouter, Request, UploadFile, File, HTTPException
from core.services.vision_service import vision_service
from core.middleware.rate_limit import limiter
from core.utils.helpers import create_response, validate_image

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/api/image-caption")
@limiter.limit("20/minute")
async def caption_image(request: Request, file: UploadFile = File(...)):
    """Generate a caption for an uploaded image."""
    logger.info(f"Image caption request: filename={file.filename}")
    if not validate_image(file.content_type or ""):
        raise HTTPException(status_code=400, detail="Invalid image format. Use JPEG, PNG, GIF, or WebP.")
    try:
        image_bytes = await file.read()
        if not image_bytes:
            raise HTTPException(status_code=400, detail="Uploaded file is empty.")
        result = vision_service.caption_image(image_bytes)
        return create_response(True, result)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Image captioning failed: {e}")
        return create_response(False, error=str(e))
