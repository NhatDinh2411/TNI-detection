from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.endpoints.detection import router as upload_router 
from .api.endpoints.history import router as history_router 

origins = [
    "http://localhost",
    "http://localhost:3000"
]

app = FastAPI(title="Person Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(history_router)
