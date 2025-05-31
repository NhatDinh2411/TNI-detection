import os
import base64

def read_image_base64(path: str):
    _, file_extension = os.path.splitext(path)
    if os.path.exists(path):
        with open(path, "rb") as image_file:
            image_bytes = image_file.read()
            base64_encoded_image = base64.b64encode(image_bytes).decode("utf-8")
            return f"data:image/{file_extension[1:]};base64,{base64_encoded_image}"
    else:
        print(f"Warning: Visualized image not found at {path} for embedding.")