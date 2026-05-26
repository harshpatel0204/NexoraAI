from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_text_generation_success():
    response = client.post("/api/text-generation", json={"prompt": "Write a poem about AI", "max_tokens": 100})
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "generated_text" in data["data"]
    assert "model_used" in data["data"]

def test_text_generation_empty_prompt():
    response = client.post("/api/text-generation", json={"prompt": "", "max_tokens": 100})
    assert response.status_code == 422

def test_text_generation_max_tokens_validation():
    response = client.post("/api/text-generation", json={"prompt": "Hello", "max_tokens": 5})
    assert response.status_code == 422
