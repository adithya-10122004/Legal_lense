import os
from pathlib import Path

import chromadb
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
from groq import Groq

# ==========================================
# Load Environment Variables
# ==========================================

load_dotenv()

API_KEY = os.getenv("GROQ_API_KEY")

if not API_KEY:
    raise Exception("❌ GROQ_API_KEY not found in .env")

print("✅ Groq API Loaded")

client_ai = Groq(api_key=API_KEY)

# ==========================================
# Load Embedding Model
# ==========================================

print("Loading embedding model...")

model = SentenceTransformer("all-MiniLM-L6-v2")

# ==========================================
# Connect ChromaDB
# ==========================================

from pathlib import Path
import os

DB_PATH = os.getenv(
    "CHROMA_DB_PATH",
    str(Path(__file__).parent.parent / "chromadb")
)

print("Connecting to ChromaDB...")

client = chromadb.PersistentClient(path=DB_PATH)

collection = client.get_or_create_collection("legal_documents")

print("Documents in DB:", collection.count())

# ==========================================
# Retrieve Context
# ==========================================

def retrieve_context(question, n_results=5):

    embedding = model.encode(question).tolist()

    results = collection.query(
        query_embeddings=[embedding],
        n_results=n_results,
        include=["documents", "distances"]
    )

    if not results["documents"] or not results["documents"][0]:
        return ""

    print("\n================ RETRIEVED DOCUMENTS ================\n")

    for i, doc in enumerate(results["documents"][0]):
        print(f"\n----- Document {i+1} -----")
        print(doc[:500])
        print("Distance:", results["distances"][0][i])

    print("\n====================================================\n")

    return "\n\n".join(results["documents"][0])

# ==========================================
# Ask AI
# ==========================================

def ask_ai(question):

    context = retrieve_context(question)

    if context == "":
        return "I couldn't find sufficient legal information in the provided legal documents."

    prompt = f"""
You are Legal Lense AI.

You are an expert in Indian law.

Answer ONLY from the legal context below.

If the answer is not present,
reply:

I couldn't find sufficient legal information in the provided legal documents.

LEGAL CONTEXT:

{context}

QUESTION:

{question}

Return your answer in the following format:

## Summary

## Applicable Laws

## Legal Procedure

## Possible Penalties

## Rights of the Citizen

## Sources
"""

    response = client_ai.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2,
    )

    return response.choices[0].message.content