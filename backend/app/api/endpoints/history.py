import math
from app.utils.readImage import read_image_base64
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional, List
from datetime import datetime
from app.db.session import get_db
from app.crud.crud_detection import detection_crud
from app.schemas.detection import DetectionResponse, DetectionListResponse 

router = APIRouter(tags=["Detection History & Images"])

@router.get("/api/detections/history", response_model=DetectionListResponse) 
async def get_detection_history(
        db: Session = Depends(get_db), 
        page: int = Query(1, ge=1),
        size: int = Query(10, ge=1, le=100),
        search_image_path: Optional[str] = Query(None, alias="search"),
        min_people: Optional[int] = Query(None, ge=0),
        max_people: Optional[int] = Query(None, ge=0),
        start_date: Optional[datetime] = Query(None),
        end_date: Optional[datetime] = Query(None),
):
    skip = (page - 1) * size

    items, total = detection_crud.get_multi_with_pagination(
        db, 
        skip=skip, 
        limit=size, 
        search_image_path=search_image_path,
        min_people=min_people, 
        max_people=max_people,
        start_date=start_date, 
        end_date=end_date    
    )

    response_items: List[DetectionResponse] = []
    for item in items:
        orm_item = DetectionResponse.from_orm(item)
        orm_item.visualized_image_base64 = read_image_base64(item.visualized_image_path)
        response_items.append(orm_item)

    return DetectionListResponse(
        items=response_items,
        total=total,
        page=page,
        size=len(response_items), 
        pages=math.ceil(total / size) if size > 0 else 0
    )

