import time
import logging
import uvicorn
from fastapi import FastAPI, Request
from pydantic import BaseModel, Field, EmailStr
from core.middleware.cors import setup_cors
from core.middleware.rate_limit import setup_rate_limit
from core.utils.helpers import create_response

from core.routers import (
    text_generation, sentiment, summarization,
    translation, chatbot, image_caption, object_detection
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

startup_time = time.time()

app = FastAPI(
    title="NeuralNexus AI API",
    description="Production-grade AI/ML services platform",
    version="1.0.0",
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
)

setup_cors(app)
setup_rate_limit(app)

app.include_router(text_generation.router)
app.include_router(sentiment.router)
app.include_router(summarization.router)
app.include_router(translation.router)
app.include_router(chatbot.router)
app.include_router(image_caption.router)
app.include_router(object_detection.router)

class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(..., min_length=5, max_length=200)
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=1, max_length=5000)

@app.get("/api/health")
async def health_check():
    uptime = time.time() - startup_time
    return create_response(True, {
        "status": "ok",
        "version": "1.0.0",
        "uptime": round(uptime, 2)
    })

@app.post("/api/contact")
async def contact(req: ContactRequest):
    logger.info(f"Contact form submission from {req.email}")
    return create_response(True, {"message": "Message received! We'll get back to you soon."})

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)

