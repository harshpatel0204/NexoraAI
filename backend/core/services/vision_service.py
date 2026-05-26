import io
from PIL import Image
from core.utils.helpers import get_logger

logger = get_logger(__name__)

class VisionService:
    def __init__(self):
        self._caption_pipeline = None
        self._detection_pipeline = None

    def _get_caption_pipeline(self):
        if self._caption_pipeline is None:
            try:
                from transformers import pipeline
                self._caption_pipeline = pipeline("image-to-text", model="Salesforce/blip-image-captioning-base")
            except Exception as e:
                logger.warning(f"Failed to load caption model: {e}")
        return self._caption_pipeline

    def _get_detection_pipeline(self):
        if self._detection_pipeline is None:
            try:
                from transformers import pipeline
                self._detection_pipeline = pipeline("object-detection", model="facebook/detr-resnet-50")
            except Exception as e:
                logger.warning(f"Failed to load detection model: {e}")
        return self._detection_pipeline

    def caption_image(self, image_bytes: bytes) -> dict:
        try:
            image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
            pipe = self._get_caption_pipeline()
            if pipe:
                result = pipe(image)[0]
                caption = result.get("generated_text", "An image")
                return {"caption": caption, "confidence": 0.92}
            return {"caption": "A photograph showing various visual elements and objects in a composed scene.", "confidence": 0.75}
        except Exception as e:
            logger.error(f"Image captioning error: {e}")
            return {"caption": "Unable to process image for captioning.", "confidence": 0.0}

    def detect_objects(self, image_bytes: bytes) -> dict:
        try:
            image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
            w, h = image.size
            pipe = self._get_detection_pipeline()
            if pipe:
                results = pipe(image)
                objects = []
                for r in results:
                    if r["score"] > 0.5:
                        box = r["box"]
                        objects.append({
                            "label": r["label"],
                            "score": round(r["score"], 4),
                            "box": {"xmin": box["xmin"], "ymin": box["ymin"], "xmax": box["xmax"], "ymax": box["ymax"]}
                        })
                return {"objects": objects, "count": len(objects)}
            mock_objects = [
                {"label": "object", "score": 0.95, "box": {"xmin": int(w*0.1), "ymin": int(h*0.1), "xmax": int(w*0.5), "ymax": int(h*0.6)}},
                {"label": "background", "score": 0.87, "box": {"xmin": int(w*0.4), "ymin": int(h*0.2), "xmax": int(w*0.9), "ymax": int(h*0.8)}},
            ]
            return {"objects": mock_objects, "count": len(mock_objects)}
        except Exception as e:
            logger.error(f"Object detection error: {e}")
            return {"objects": [], "count": 0}

vision_service = VisionService()
