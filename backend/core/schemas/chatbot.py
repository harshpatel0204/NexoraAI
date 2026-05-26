from pydantic import BaseModel, Field

class ChatMessage(BaseModel):
    role: str = Field(..., pattern="^(user|assistant|system)$")
    content: str

class ChatbotRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000)
    history: list[ChatMessage] = Field(default_factory=list)

class ChatbotData(BaseModel):
    reply: str
    history: list[ChatMessage]

class ChatbotResponse(BaseModel):
    success: bool = True
    data: ChatbotData | None = None
    error: str | None = None
