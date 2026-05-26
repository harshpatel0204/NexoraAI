from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    openai_api_key: str = ""
    openrouter_api_key: str = ""
    environment: str = "development"
    allowed_origins: str = "http://localhost:5173"
    
    model_config = {"env_file": ".env", "extra": "ignore"}

@lru_cache()
def get_settings() -> Settings:
    return Settings()

settings = get_settings()
