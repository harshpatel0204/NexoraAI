from pydantic import BaseModel, Field

class TranslationRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=5000)
    source_lang: str = Field(..., min_length=2, max_length=5)
    target_lang: str = Field(..., min_length=2, max_length=5)

class TranslationData(BaseModel):
    translated_text: str
    source_lang: str
    target_lang: str

class TranslationResponse(BaseModel):
    success: bool = True
    data: TranslationData | None = None
    error: str | None = None
