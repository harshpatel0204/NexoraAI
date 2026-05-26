from pydantic import BaseModel

class BoundingBox(BaseModel):
    xmin: float
    ymin: float
    xmax: float
    ymax: float

class DetectedObject(BaseModel):
    label: str
    score: float
    box: BoundingBox

class ImageCaptionData(BaseModel):
    caption: str
    confidence: float

class ImageCaptionResponse(BaseModel):
    success: bool = True
    data: ImageCaptionData | None = None
    error: str | None = None

class ObjectDetectionData(BaseModel):
    objects: list[DetectedObject]
    count: int

class ObjectDetectionResponse(BaseModel):
    success: bool = True
    data: ObjectDetectionData | None = None
    error: str | None = None
