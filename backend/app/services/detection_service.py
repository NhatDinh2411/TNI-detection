from ultralytics import YOLO
import os

class DetectionService():

    def __init__(self) -> None:
        self.model = YOLO("yolo11n.pt")

    async def detect_people(self, image_path:str):
        result = self.model(image_path, classes=0)

        return result[0]
    
    async def count_people(self,detected_result) -> int:

        return len(detected_result)