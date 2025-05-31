from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.crud.crud_detection import detection_crud
from app.schemas.detection import DetectionResponse, DetectionCreate
from app.services.detection_service import DetectionService
from app.services.image_process_service import ImageProcessingService
import logging
from app.utils.readImage import read_image_base64

router = APIRouter(tags=["Upload & Detection"]) 

@router.post("/api/detections/upload", response_model=DetectionResponse)
async def upload_and_detect(
        image: UploadFile = File(...),
        db: Session = Depends(get_db)
):
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    detection_service = DetectionService()
    image_service = ImageProcessingService()

    try:
        original_path, image_filename = await image_service.save_uploaded_file(image)
        detection_result = await detection_service.detect_people(original_path)

        number_people = await detection_service.count_people(detection_result)
        visualized_path = await image_service.create_visualization(
            original_path,
            image_filename,
            detection_result
        )

        detection_create = DetectionCreate(
            people_count=number_people,
            visualized_image_path=visualized_path, 
        )

        db_detection = detection_crud.create(db, detection_create)
        response = DetectionResponse.from_orm(db_detection)
        response.visualized_image_base64 = read_image_base64(visualized_path)

        return response

    except Exception as e:
        logging.error(f"Detection failed: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Detection process failed: {str(e)}")