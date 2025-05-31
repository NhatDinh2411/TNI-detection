from pydantic import BaseModel, Field, validator
from datetime import datetime
from typing import Optional


class DetectionBase(BaseModel):
    people_count: int = Field(..., ge=0, description="Number of people detected")

class DetectionCreate(DetectionBase):
    visualized_image_path: str = Field(..., min_length=1)

    @validator('visualized_image_path')
    def validate_image_path(cls, v):
        if not v.endswith(('.jpg', '.jpeg', '.png', '.webp','.svg','.avif')):
            raise ValueError('Invalid image format')
        return v


class DetectionResponse(DetectionBase):
    id: int
    timestamp: datetime
    visualized_image_base64: Optional[str] = None
    visualized_image_path: str

    class Config:
        from_attributes = True


class DetectionListResponse(BaseModel):
    items: list[DetectionResponse]
    total: int
    page: int
    size: int
    pages: int