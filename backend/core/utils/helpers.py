import logging
from typing import Any

def create_response(success: bool, data: Any = None, error: str | None = None) -> dict:
    return {"success": success, "data": data, "error": error}

def truncate_text(text: str, max_len: int = 500) -> str:
    if len(text) <= max_len:
        return text
    return text[:max_len] + "..."

def validate_image(content_type: str) -> bool:
    valid = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    return content_type in valid

def get_logger(name: str) -> logging.Logger:
    logger = logging.getLogger(name)
    if not logger.handlers:
        handler = logging.StreamHandler()
        handler.setFormatter(logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        ))
        logger.addHandler(handler)
        logger.setLevel(logging.INFO)
    return logger
