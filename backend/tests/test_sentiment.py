from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_sentiment_success():
    response = client.post("/api/sentiment", json={"text": "I love this product, it is amazing!"})
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["label"] in ["POSITIVE", "NEGATIVE"]
    assert 0 <= data["data"]["score"] <= 1

def test_sentiment_empty_text():
    response = client.post("/api/sentiment", json={"text": ""})
    assert response.status_code == 422
