import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables from .env file (chỉ cho local development)
# Trong Docker, environment variables sẽ được truyền trực tiếp
if not os.getenv("DOCKER_ENV"):
    load_dotenv(dotenv_path="app/core/.env")

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent


class Config:
    DATABASE_URL: str = os.getenv("DATABASE_URL")

    if not DATABASE_URL and "DOCKER_ENV" in os.environ:
        raise ValueError("DATABASE_URL environment variable not set. "
                         "Ensure it is defined in docker-compose.yml for the app service.")
    elif not DATABASE_URL:
        print(
            "Warning: DATABASE_URL not found in environment. Attempting to build from components or using defaults from .env if any.")

        # Sử dụng fallback variables
        _HOST_DB: str = os.getenv("HOST_DB_FALLBACK")
        _PORT_DB: int = int(os.getenv("PORT_DB_FALLBACK", 5432))
        _USER_DB: str = os.getenv("USER_DB_FALLBACK")
        _NAME_DB: str = os.getenv("NAME_DB_FALLBACK")
        _PASSWORD_DB: str = os.getenv("PASSWORD_DB_FALLBACK")

        if all([_HOST_DB, _USER_DB, _NAME_DB, _PASSWORD_DB]):
            DATABASE_URL = f"postgresql://{_USER_DB}:{_PASSWORD_DB}@{_HOST_DB}:{_PORT_DB}/{_NAME_DB}"
        else:
            print("Error: Could not construct DATABASE_URL from fallback components.")

    UPLOAD_FOLDER = "uploads"
    VISUALIZED_FOLDER = "visualized_image"

    # Thêm các cấu hình khác nếu cần
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-here")

    @classmethod
    def get_database_url(cls) -> str:
        """Get the database URL, ensuring it's properly configured"""
        if not cls.DATABASE_URL:
            raise ValueError("DATABASE_URL is not configured properly")
        return cls.DATABASE_URL