from sqlalchemy import Column, Integer, String, DateTime, Float
from datetime import datetime, timezone
from app.db.session import Base

class Detection(Base):
    __tablename__ = "DETECTIONS"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    people_count = Column(Integer, nullable=False)
    visualized_image_path = Column(String(500), nullable=False)

    __table_args__ = (
        {"comment": "Store person detection results"}
    )