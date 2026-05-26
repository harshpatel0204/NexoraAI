"""
Chat widget agent service using OpenAI Agents SDK with OpenRouter.

Uses OpenAIChatCompletionsModel pointed at OpenRouter's API to run
a scoped NeuralNexus AI assistant agent via the Agents SDK Runner.
"""

from openai import AsyncOpenAI
from agents import Agent, Runner, OpenAIChatCompletionsModel, set_tracing_disabled
from core.config import settings
from core.utils.helpers import get_logger

logger = get_logger(__name__)

# Disable tracing — we're not sending traces to OpenAI servers
set_tracing_disabled(True)

SYSTEM_PROMPT = """You are NeuralNexus AI Assistant — the official support chatbot for the NeuralNexus AI platform.

## About NeuralNexus AI
NeuralNexus AI is a production-grade AI/ML services platform that offers 7 core services through a unified API:

1. **Text Generation** (POST /api/text-generation) — Generate creative, factual, or technical text from any prompt using GPT-4o-mini.
2. **Sentiment Analysis** (POST /api/sentiment) — Classify the emotional tone of text as positive, negative, or neutral with confidence scores.
3. **Text Summarization** (POST /api/summarize) — Condense long documents into concise summaries.
4. **Language Translation** (POST /api/translate) — Translate text between 50+ languages with neural machine translation.
5. **AI Chatbot** (POST /api/chatbot) — Conversational AI assistant powered by GPT for real-time interactions.
6. **Image Captioning** (POST /api/image-caption) — Automatically generate captions for uploaded images using vision AI.
7. **Object Detection** (POST /api/object-detection) — Detect, classify, and locate objects within images with bounding boxes.

## Pricing Tiers
- **Starter** (Free): 1,000 API calls/month, 3 services, community support
- **Professional** ($49/month): 50,000 API calls/month, all 7 services, priority support, custom models
- **Enterprise** (Custom): Unlimited calls, dedicated infrastructure, SLA, 24/7 support

## Tech Stack
- Frontend: React 18 + Vite + TailwindCSS v3
- Backend: Python FastAPI + HuggingFace Transformers + OpenAI
- Deployment: Vercel (serverless Python + static React)

## Your Behavior Rules
- ONLY answer questions related to NeuralNexus AI platform, its services, pricing, API usage, setup, and general AI/ML concepts as they relate to the platform.
- If a user asks something completely unrelated (e.g., cooking, sports, politics), politely redirect them: "I'm the NeuralNexus AI assistant and I can help you with questions about our AI services, pricing, and API usage. Is there anything about our platform I can help you with?"
- Be concise, friendly, and professional.
- When explaining API usage, provide example JSON payloads.
- If unsure about something, say so honestly rather than making things up.
"""


def _build_agent() -> Agent | None:
    """Build the agent with OpenRouter-backed model, or return None if key is missing."""
    if not settings.openrouter_api_key:
        logger.warning("OPENROUTER_API_KEY is not set — agent service will use mock responses")
        return None

    try:
        client = AsyncOpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=settings.openrouter_api_key,
        )

        model = OpenAIChatCompletionsModel(
            model="openai/gpt-4o-mini",
            openai_client=client,
        )

        agent = Agent(
            name="NeuralNexus Assistant",
            instructions=SYSTEM_PROMPT,
            model=model,
        )

        logger.info("Agent service initialized with OpenRouter (openai/gpt-4o-mini)")
        return agent

    except Exception as e:
        logger.error(f"Failed to build agent: {e}")
        return None


# Module-level singleton
_agent = _build_agent()


async def chat(message: str, history: list[dict]) -> dict:
    """
    Run the agent with the user's message and conversation history.
    Returns {"reply": str, "history": list[dict]}.
    """
    if _agent is None:
        reply = _mock_reply(message)
    else:
        try:
            # Build input by combining history + current message into a single prompt
            # The Agents SDK expects a simple input string, but we can pass structured
            # messages using the RunConfig or by formatting ourselves.
            # For multi-turn, we pass the full conversation as input messages.
            input_messages = []
            for msg in history:
                input_messages.append({
                    "role": msg["role"],
                    "content": msg["content"],
                })
            input_messages.append({"role": "user", "content": message})

            result = await Runner.run(_agent, input=input_messages)
            reply = result.final_output

        except Exception as e:
            logger.error(f"Agent run failed: {e}")
            reply = _mock_reply(message)

    updated_history = history + [
        {"role": "user", "content": message},
        {"role": "assistant", "content": reply},
    ]

    return {"reply": reply, "history": updated_history}


def _mock_reply(message: str) -> str:
    """Fallback mock responses when the agent is unavailable."""
    msg = message.lower()
    if any(w in msg for w in ["hello", "hi", "hey"]):
        return (
            "Hello! 👋 I'm the NeuralNexus AI Assistant. I can help you with questions "
            "about our AI services, pricing, API usage, and more. What would you like to know?"
        )
    elif "pric" in msg:
        return (
            "We offer three tiers:\n\n"
            "• **Starter** (Free) — 1,000 API calls/month, 3 services\n"
            "• **Professional** ($49/mo) — 50,000 calls/month, all 7 services, priority support\n"
            "• **Enterprise** (Custom) — Unlimited calls, dedicated infrastructure, SLA\n\n"
            "Would you like more details on any tier?"
        )
    elif "service" in msg:
        return (
            "NeuralNexus AI offers 7 core services:\n\n"
            "1. Text Generation\n2. Sentiment Analysis\n3. Text Summarization\n"
            "4. Language Translation\n5. AI Chatbot\n6. Image Captioning\n7. Object Detection\n\n"
            "Each is accessible via a simple REST API. Want to try one in our interactive demo?"
        )
    else:
        return (
            f"Great question! I'm here to help with anything related to the NeuralNexus AI platform — "
            f"our services, API endpoints, pricing, or setup. Could you tell me more about what you need?"
        )
