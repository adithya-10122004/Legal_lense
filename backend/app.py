from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from services.rag import ask_ai

# ==========================================
# FastAPI App
# ==========================================

app = FastAPI(
    title="Legal Lense API",
    version="2.0",
    description="AI-powered Indian Legal Assistant using RAG + ChromaDB + Groq"
)

# ==========================================
# Enable CORS
# ==========================================

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://localhost:4173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# Request Model
# ==========================================

class Question(BaseModel):
    question: str

# ==========================================
# Routes
# ==========================================

@app.get("/")
def home():
    return {
        "message": "⚖️ Legal Lense API Running",
        "status": "success",
        "version": "2.0"
    }


@app.post("/ask")
def ask(question: Question):

    answer = ask_ai(question.question)

    return {
        "success": True,
        "question": question.question,
        "answer": answer
    }