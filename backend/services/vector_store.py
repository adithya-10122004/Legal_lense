from pathlib import Path
import re
import chromadb
from sentence_transformers import SentenceTransformer

print("Loading embedding model...")
model = SentenceTransformer("all-MiniLM-L6-v2")

DB_PATH = Path(__file__).parent.parent / "chromadb"

print("Vector Store DB:", DB_PATH.resolve())

client = chromadb.PersistentClient(path=str(DB_PATH))

# Delete old collection if it exists
try:
    client.delete_collection("legal_documents")
    print("Old collection deleted.")
except:
    print("No previous collection found.")

collection = client.create_collection("legal_documents")

DATASET_DIR = Path(__file__).parent.parent.parent / "datasets"

print("Dataset Folder:", DATASET_DIR.resolve())

count = 0

for chunk_file in DATASET_DIR.rglob("*.chunks.txt"):

    print(f"Reading {chunk_file.name}")

    text = chunk_file.read_text(encoding="utf-8")

    chunks = re.split(r"===== CHUNK \d+ =====", text)

    for i, chunk in enumerate(chunks):

        chunk = chunk.strip()

        if not chunk:
            continue

        embedding = model.encode(chunk).tolist()

        collection.add(
            ids=[f"{chunk_file.stem}_{i}_{hash(chunk)}"],
            documents=[chunk],
            embeddings=[embedding],
            metadatas=[
                {
                    "source": chunk_file.name,
                    "chunk": i
                }
            ]
        )

        count += 1

print("\nCollection Count:", collection.count())
print(f"\nStored {count} chunks successfully.")