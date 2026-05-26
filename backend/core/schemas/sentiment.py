from pydantic import BaseModel, Field

class SentimentRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=5000)

class SentimentData(BaseModel):
    label: str
    score: float
    explanation: str

class SentimentResponse(BaseModel):
    success: bool = True
    data: SentimentData | None = None
    error: str | None = None
