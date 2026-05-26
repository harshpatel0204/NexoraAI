# NeuralNexus AI — AI/ML Services Platform

A production-grade AI/ML services website built as a monorepo with a React frontend and Python FastAPI backend, deployable to Vercel.

## 🚀 Features

| # | Service | Type | Endpoint |
|---|---------|------|----------|
| 1 | Text Generation | Generative | `POST /api/text-generation` |
| 2 | Sentiment Analysis | NLP | `POST /api/sentiment` |
| 3 | Text Summarization | NLP | `POST /api/summarize` |
| 4 | Language Translation | NLP | `POST /api/translate` |
| 5 | AI Chatbot | Generative | `POST /api/chatbot` |
| 6 | Image Captioning | Vision | `POST /api/image-caption` |
| 7 | Object Detection | Vision | `POST /api/object-detection` |
| - | Health Check | System | `GET /api/health` |
| - | Contact Form | System | `POST /api/contact` |

## 📁 Project Structure

```
ai-website/
├── frontend/          # React 18 + Vite + TailwindCSS v3
├── backend/           # Python FastAPI + HuggingFace + OpenAI
├── vercel.json        # Vercel monorepo config
└── README.md
```

## 🛠 Local Development

### Prerequisites
- Node.js 18+
- Python 3.11+
- (Optional) OpenAI API key for GPT-4o-mini

### Backend

```bash
cd backend
python -m venv venv
venv\\Scripts\\activate        # Windows
pip install -r requirements.txt
cp .env.example .env          # Add your OpenAI key
uvicorn app.main:app --reload --port 8000
```

API docs: http://localhost:8000/api/docs

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

App: http://localhost:5173 (proxies `/api` to backend)

## 🚀 Deploy to Vercel

```bash
npx vercel --prod
```

Set these environment variables in Vercel dashboard:
- `OPENAI_API_KEY` — Your OpenAI API key
- `VITE_API_URL` — Leave empty (uses relative URLs in production)

## 📖 API Reference

All responses follow the shape:
```json
{
  "success": true,
  "data": { ... },
  "error": null
}
```

### POST /api/text-generation
```json
{ "prompt": "Write a poem about AI", "max_tokens": 200 }
```

### POST /api/sentiment
```json
{ "text": "I love this product!" }
```

### POST /api/summarize
```json
{ "text": "Long article text...", "max_length": 130, "min_length": 30 }
```

### POST /api/translate
```json
{ "text": "Hello world", "source_lang": "en", "target_lang": "es" }
```

### POST /api/chatbot
```json
{ "message": "What is machine learning?", "history": [] }
```

### POST /api/image-caption
Multipart form data with `file` field (image).

### POST /api/object-detection
Multipart form data with `file` field (image).

## 🧰 Tech Stack

- **Frontend**: React 18, Vite, TailwindCSS v3, Framer Motion, React Router v6, TanStack Query v5
- **Backend**: Python 3.11+, FastAPI, Pydantic v2, HuggingFace Transformers, OpenAI
- **Deployment**: Vercel (serverless Python + static React)

## 📄 License

MIT
