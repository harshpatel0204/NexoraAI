from pydantic import BaseModel, Field
from typing import Any

class TextGenerationRequest(BaseModel):
    prompt: str = Field(..., min_length=1, max_length=2000, description="The prompt to generate text from")
    max_tokens: int = Field(default=200, ge=10, le=2000, description="Maximum tokens to generate")

class TextGenerationData(BaseModel):
    generated_text: str
    model_used: str
    tokens: int

class TextGenerationResponse(BaseModel):
    success: bool = True
    data: TextGenerationData | None = None
    error: str | None = None
