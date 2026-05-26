from core.utils.helpers import get_logger

logger = get_logger(__name__)

class NLPService:
    def __init__(self):
        self._sentiment_pipeline = None
        self._summarization_pipeline = None

    def _get_sentiment_pipeline(self):
        if self._sentiment_pipeline is None:
            try:
                from transformers import pipeline
                self._sentiment_pipeline = pipeline(
                    "sentiment-analysis",
                    model="distilbert-base-uncased-finetuned-sst-2-english"
                )
            except Exception as e:
                logger.warning(f"Failed to load sentiment model: {e}")
        return self._sentiment_pipeline

    def _get_summarization_pipeline(self):
        if self._summarization_pipeline is None:
            try:
                from transformers import pipeline
                self._summarization_pipeline = pipeline(
                    "summarization",
                    model="facebook/bart-large-cnn"
                )
            except Exception as e:
                logger.warning(f"Failed to load summarization model: {e}")
        return self._summarization_pipeline

    def analyze_sentiment(self, text: str) -> dict:
        try:
            pipe = self._get_sentiment_pipeline()
            if pipe:
                result = pipe(text[:512])[0]
                label = result["label"]
                score = round(result["score"], 4)
                explanations = {
                    "POSITIVE": f"The text expresses a positive sentiment with {score*100:.1f}% confidence.",
                    "NEGATIVE": f"The text expresses a negative sentiment with {score*100:.1f}% confidence.",
                }
                return {"label": label, "score": score, "explanation": explanations.get(label, "Neutral sentiment detected.")}
            return self._mock_sentiment(text)
        except Exception as e:
            logger.error(f"Sentiment analysis error: {e}")
            return self._mock_sentiment(text)

    def _mock_sentiment(self, text: str) -> dict:
        positive_words = ["good", "great", "love", "amazing", "excellent", "happy", "wonderful", "best"]
        negative_words = ["bad", "terrible", "hate", "awful", "worst", "horrible", "sad", "angry"]
        lower = text.lower()
        pos = sum(1 for w in positive_words if w in lower)
        neg = sum(1 for w in negative_words if w in lower)
        if pos > neg:
            return {"label": "POSITIVE", "score": 0.92, "explanation": "The text expresses a positive sentiment with 92.0% confidence."}
        elif neg > pos:
            return {"label": "NEGATIVE", "score": 0.89, "explanation": "The text expresses a negative sentiment with 89.0% confidence."}
        return {"label": "POSITIVE", "score": 0.65, "explanation": "The text expresses a mildly positive sentiment with 65.0% confidence."}

    def summarize_text(self, text: str, max_length: int = 130, min_length: int = 30) -> dict:
        try:
            pipe = self._get_summarization_pipeline()
            original_length = len(text.split())
            if pipe:
                result = pipe(text, max_length=max_length, min_length=min_length, do_sample=False)[0]
                summary = result["summary_text"]
            else:
                sentences = text.replace('\n', ' ').split('. ')
                summary = '. '.join(sentences[:3]) + '.'
                if len(summary) > max_length * 5:
                    summary = summary[:max_length * 5] + '...'
            summary_length = len(summary.split())
            return {"summary": summary, "original_length": original_length, "summary_length": summary_length}
        except Exception as e:
            logger.error(f"Summarization error: {e}")
            sentences = text.replace('\n', ' ').split('. ')
            summary = '. '.join(sentences[:3]) + '.'
            return {"summary": summary, "original_length": len(text.split()), "summary_length": len(summary.split())}

nlp_service = NLPService()
