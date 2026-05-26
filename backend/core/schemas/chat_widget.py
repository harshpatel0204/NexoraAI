from pydantic import BaseModel, Field


class ChatWidgetMessage(BaseModel):
    role: str = Field(..., pattern="^(user|assistant|system)$")
    content: str


class ChatWidgetRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000)
    history: list[ChatWidgetMessage] = Field(default_factory=list)


class ChatWidgetData(BaseModel):
    reply: str
    history: list[ChatWidgetMessage]


class ChatWidgetResponse(BaseModel):
    success: bool = True
    data: ChatWidgetData | None = None
    error: str | None = None
