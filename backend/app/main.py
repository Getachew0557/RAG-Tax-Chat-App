from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.routes import router
import os
from dotenv import load_dotenv
from .knowledge_base.preprocess import preprocess_documents

load_dotenv()

app = FastAPI(title="RAG Tax Chat API")

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(router, prefix="/api")

# Preprocess documents on startup
@app.on_event("startup")
async def startup_event():
    preprocess_documents()

@app.get("/")
async def root():
    return {"message": "RAG Tax Chat API is running"}