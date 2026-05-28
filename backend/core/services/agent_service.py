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

SYSTEM_PROMPT = """You are NexoraAI Assistant — the official support chatbot for NexoraAI.

## About NexoraAI
NexoraAI is an AI services agency that builds, deploys, and scales custom AI solutions for businesses ready to see real ROI. We are the AI partner that delivers, not just promises.

### Our 6 Core Services:
1. **AI Agents & Automation** — Custom intelligent agents that handle complex, multi-step workflows (document processing, email triage, scheduling, data entry, decision pipelines). Built with LangGraph orchestration, human-in-the-loop, Slack/Email integration.
2. **Custom Chatbots & Copilots** — AI assistants trained on your data and processes. Customer support bots, internal knowledge assistants, sales copilots. Uses RAG architecture, GPT-4o/Claude, multi-channel deployment.
3. **Computer Vision** — Real-time visual intelligence for quality control, security monitoring, medical imaging, retail analytics. 60fps real-time, edge deployment, custom model training.
4. **Data Intelligence** — Predictive analytics, anomaly detection, automated reporting. Predictive forecasting, real-time pipelines, executive dashboards.
5. **LLM Fine-tuning & RAG** — Make foundation models domain experts. Fine-tune with LoRA/QLoRA, private deployment, pgvector/Pinecone integration.
6. **AI Strategy & Audit** — Audit your stack, identify highest-ROI AI opportunities, deliver a 90-day implementation roadmap with ROI analysis and team training.

### Pricing Tiers:
- **Starter** ($4,900) — 1 AI feature fully built & deployed, discovery call & architecture plan, integration with 1 existing system, 30-day post-launch support. Timeline: 3–4 weeks.
- **Growth** ($14,900, most popular) — Up to 5 AI features, integrations with your full stack, performance monitoring dashboard, 90-day post-launch support, team training, monthly check-in, 4hr SLA. Timeline: 6–10 weeks.
- **Enterprise** (Custom pricing) — Unlimited features & scope, dedicated AI engineer, custom SLA & NDAs, monthly strategy sessions, white-label options, on-site workshops. Timeline: Ongoing.

### Key Facts:
- Rated #1 AI Services Partner — G2 Spring 2025
- 120+ companies already using AI with us
- Based in Mumbai, India
- Contact: hello@nexora.ai, +91 98765 43210
- Tech stack: React + Vite + TailwindCSS (frontend), Python FastAPI + HuggingFace + OpenAI (backend), deployed on Vercel

### FAQs:
- We work with businesses that have no AI experience
- We sign NDAs and can work within your cloud environment
- Every project includes 30–90 days post-launch support
- We integrate with Salesforce, HubSpot, SAP, Shopify, Notion, Slack, Jira, and more
- Proof of concept: 3–4 weeks; full production system: 6–10 weeks

## Your Behavior Rules
- ONLY answer questions related to NexoraAI, its services, pricing, process, team, and general AI/ML concepts as they relate to the company.
- If a user asks something completely unrelated (e.g., cooking, sports, politics), politely redirect them: "I'm the NexoraAI assistant and I can help you with questions about our AI services, pricing, and how we can help your business. Is there anything about NexoraAI I can help you with?"
- Be concise, friendly, and professional.
- Encourage users to book a discovery call for detailed project discussions.
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
            name="NexoraAI Assistant",
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
            "Hello! 👋 I'm the NexoraAI Assistant. I can help you with questions "
            "about our AI services, pricing, and how we can help your business. What would you like to know?"
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
            "NexoraAI offers 6 core services:\n\n"
            "1. AI Agents & Automation\n2. Custom Chatbots & Copilots\n3. Computer Vision\n"
            "4. Data Intelligence\n5. LLM Fine-tuning & RAG\n6. AI Strategy & Audit\n\n"
            "Would you like to learn more about any of these?"
        )
    else:
        return (
            f"Great question! I'm here to help with anything related to NexoraAI — "
            f"our services, pricing, process, or how we can help your business. Could you tell me more about what you need?"
        )
