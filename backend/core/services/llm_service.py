import os
from core.config import settings
from core.utils.helpers import get_logger

logger = get_logger(__name__)

class LLMService:
    def __init__(self):
        self._client = None

    def _get_client(self):
        if self._client is None and settings.openai_api_key:
            try:
                from openai import OpenAI
                self._client = OpenAI(api_key=settings.openai_api_key)
            except Exception as e:
                logger.warning(f"Failed to init OpenAI client: {e}")
        return self._client

    async def generate_text(self, prompt: str, max_tokens: int = 200) -> dict:
        try:
            client = self._get_client()
            if client:
                response = client.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=[{"role": "user", "content": prompt}],
                    max_tokens=max_tokens,
                )
                text = response.choices[0].message.content
                return {
                    "generated_text": text,
                    "model_used": "gpt-4o-mini",
                    "tokens": response.usage.total_tokens,
                }
            return self._mock_generate(prompt, max_tokens)
        except Exception as e:
            logger.error(f"Text generation error: {e}")
            return self._mock_generate(prompt, max_tokens)

    def _mock_generate(self, prompt: str, max_tokens: int) -> dict:
        mock_responses = {
            "poem": "In circuits deep where data flows,\nA mind of silicon softly grows,\nIt learns the patterns, finds the way,\nTo turn the night to brighter day.",
            "story": "Once upon a time in a digital realm, an AI named Nexus discovered the beauty of human creativity. It learned to paint with pixels and write with algorithms, bridging the gap between artificial intelligence and human imagination.",
            "default": f"Based on your prompt about '{prompt[:50]}...', here is a thoughtful response: The intersection of technology and human ingenuity continues to reshape our world. As we advance in artificial intelligence and machine learning, we discover new possibilities that were once confined to science fiction. The key lies in responsible development that prioritizes human welfare while pushing the boundaries of what's possible."
        }
        key = "poem" if "poem" in prompt.lower() else "story" if "story" in prompt.lower() else "default"
        text = mock_responses[key]
        return {"generated_text": text, "model_used": "mock-gpt", "tokens": len(text.split())}

    async def chat_completion(self, message: str, history: list[dict]) -> dict:
        try:
            client = self._get_client()
            system_msg = {"role": "system", "content": "You are NexoraAI, a helpful and knowledgeable assistant specializing in AI and machine learning. Be concise and informative."}
            messages = [system_msg] + history + [{"role": "user", "content": message}]
            if client:
                response = client.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=messages,
                    max_tokens=500,
                )
                reply = response.choices[0].message.content
            else:
                reply = self._mock_chat(message)
            updated = history + [
                {"role": "user", "content": message},
                {"role": "assistant", "content": reply},
            ]
            return {"reply": reply, "history": updated}
        except Exception as e:
            logger.error(f"Chat error: {e}")
            reply = self._mock_chat(message)
            updated = history + [
                {"role": "user", "content": message},
                {"role": "assistant", "content": reply},
            ]
            return {"reply": reply, "history": updated}

    def _mock_chat(self, message: str) -> str:
        msg = message.lower()
        if "hello" in msg or "hi" in msg:
            return "Hello! I'm NexoraAI. I can help you with questions about AI, machine learning, deep learning, and more. What would you like to know?"
        elif "machine learning" in msg:
            return "Machine learning is a subset of AI that enables systems to learn from data without being explicitly programmed. It includes supervised learning, unsupervised learning, and reinforcement learning. Would you like to dive deeper into any of these?"
        elif "deep learning" in msg:
            return "Deep learning uses neural networks with many layers to learn complex patterns in data. Key architectures include CNNs for images, RNNs/LSTMs for sequences, and Transformers for language tasks. What aspect interests you most?"
        else:
            return f"That's a great question about '{message[:80]}'. In the field of AI, this topic involves several key concepts. I'd recommend exploring recent research papers and practical implementations. Would you like me to elaborate on any specific aspect?"

llm_service = LLMService()
