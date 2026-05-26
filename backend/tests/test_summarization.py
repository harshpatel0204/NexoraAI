from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_summarization_success():
    long_text = "Artificial intelligence is transforming the way we live and work. " * 20
    response = client.post("/api/summarize", json={"text": long_text})
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "summary" in data["data"]
    assert data["data"]["summary_length"] < data["data"]["original_length"]

def test_summarization_too_short():
    response = client.post("/api/summarize", json={"text": "Too short."})
    assert response.status_code == 422
