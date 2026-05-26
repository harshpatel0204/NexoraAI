from pydantic import BaseModel, Field

class SummarizationRequest(BaseModel):
    text: str = Field(..., min_length=50, max_length=50000)
    max_length: int = Field(default=130, ge=20, le=1000)
    min_length: int = Field(default=30, ge=10, le=500)

class SummarizationData(BaseModel):
    summary: str
    original_length: int
    summary_length: int

class SummarizationResponse(BaseModel):
    success: bool = True
    data: SummarizationData | None = None
    error: str | None = None
