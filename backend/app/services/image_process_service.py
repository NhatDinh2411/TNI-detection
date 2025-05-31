import os 
from ..core.config import Config
from fastapi import UploadFile
import cv2 
class ImageProcessingService:

    def __init__(self) -> None:
        self.UPLOAD_FOLDER = Config.UPLOAD_FOLDER
        self.VISUALIZED_FOLDER  = Config.VISUALIZED_FOLDER

    async def save_uploaded_file(self, image: UploadFile) -> [str, str]:
        file_path = os.path.join(self.UPLOAD_FOLDER, image.filename)
        with open(file_path, "wb") as f:
            content = await image.read()
            f.write(content)
        return file_path, image.filename
    
    async def create_visualization(self, image_path:str,image_filename:str, detected_result)->str:
        path = os.path.join(Config.VISUALIZED_FOLDER, image_filename)
        cv2.imwrite(path, detected_result.plot())

        return path
