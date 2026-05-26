from core.utils.helpers import get_logger

logger = get_logger(__name__)

class TranslationService:
    def __init__(self):
        self._models = {}

    def _get_model(self, src: str, tgt: str):
        key = f"{src}-{tgt}"
        if key not in self._models:
            try:
                from transformers import pipeline
                model_name = f"Helsinki-NLP/opus-mt-{src}-{tgt}"
                self._models[key] = pipeline("translation", model=model_name)
            except Exception as e:
                logger.warning(f"Failed to load translation model {key}: {e}")
                self._models[key] = None
        return self._models[key]

    def translate(self, text: str, source_lang: str, target_lang: str) -> dict:
        try:
            pipe = self._get_model(source_lang, target_lang)
            if pipe:
                result = pipe(text)[0]
                translated = result["translation_text"]
            else:
                translated = f"[{target_lang.upper()}] {text}"
            return {"translated_text": translated, "source_lang": source_lang, "target_lang": target_lang}
        except Exception as e:
            logger.error(f"Translation error: {e}")
            return {"translated_text": f"[{target_lang.upper()}] {text}", "source_lang": source_lang, "target_lang": target_lang}

translation_service = TranslationService()
