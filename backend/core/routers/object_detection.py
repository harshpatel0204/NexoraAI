"""Router for object detection endpoint."""

import logging
from fastapi import APIRouter, Request, UploadFile, File, HTTPException
from core.services.vision_service import vision_service
from core.middleware.rate_limit import limiter
from core.utils.helpers import create_response, validate_image

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/api/object-detection")
@limiter.limit("20/minute")
async def detect_objects(request: Request, file: UploadFile = File(...)):
    """Detect and label objects in an uploaded image."""
    logger.info(f"Object detection request: filename={file.filename}")
    if not validate_image(file.content_type or ""):
        raise HTTPException(status_code=400, detail="Invalid image format. Use JPEG, PNG, GIF, or WebP.")
    try:
        image_bytes = await file.read()
        if not image_bytes:
            raise HTTPException(status_code=400, detail="Uploaded file is empty.")
        result = vision_service.detect_objects(image_bytes)
        return create_response(True, result)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Object detection failed: {e}")
        return create_response(False, error=str(e))
