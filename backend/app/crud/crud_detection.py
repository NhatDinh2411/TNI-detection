from sqlalchemy.orm import Session
from sqlalchemy import desc 
from typing import List, Optional
from datetime import datetime, timedelta 
from app.models.detection import Detection 
from app.schemas.detection import DetectionCreate 


class DetectionCRUD:
    def create(self, db: Session, obj_in: DetectionCreate) -> Detection:
        db_obj = Detection(
            people_count=obj_in.people_count,
            visualized_image_path=obj_in.visualized_image_path,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_by_id(self, db: Session, id: int) -> Optional[Detection]:
        return db.query(Detection).filter(Detection.id == id).first()

    def get_multi_with_pagination(
            self,
            db: Session,
            skip: int = 0,
            limit: int = 100,
            search_image_path: Optional[str] = None, 
            min_people: Optional[int] = None,        
            max_people: Optional[int] = None,
            start_date: Optional[datetime] = None,  
            end_date: Optional[datetime] = None    
    ) -> tuple[List[Detection], int]:
        query = db.query(Detection)
        filters = []

        if search_image_path:
            filters.append(Detection.visualized_image_path.contains(search_image_path))
        
        if min_people is not None:
            filters.append(Detection.people_count >= min_people)
        if max_people is not None:
            filters.append(Detection.people_count <= max_people)

        if start_date:
            filters.append(Detection.timestamp >= start_date)
        if end_date:
            filters.append(Detection.timestamp <= end_date)
        
        if filters:
            query = query.filter(*filters)

        total = query.count() 
        
        items = query.order_by(desc(Detection.timestamp)).offset(skip).limit(limit).all()

        return items, total

    def delete(self, db: Session, id: int) -> Optional[Detection]:
        obj = db.query(Detection).filter(Detection.id == id).first()
        if obj:
            db.delete(obj)
            db.commit()
        return obj

detection_crud = DetectionCRUD()