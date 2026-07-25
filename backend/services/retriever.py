from pathlib import Path
import chromadb
from sentence_transformers import SentenceTransformer

print("Loading embedding model...")
model = SentenceTransformer("all-MiniLM-L6-v2")

DB_PATH = Path(__file__).parent.parent / "chromadb"

print("Using DB:", DB_PATH.resolve())

client = chromadb.PersistentClient(path=str(DB_PATH))

collection = client.get_collection("legal_documents")

print("Collection Count:", collection.count())


def search(query, n_results=5):

    print(f"\nSearching: {query}")

    query_embedding = model.encode(query).tolist()

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results,
        include=["documents", "distances", "metadatas"]
    )

    return results


if __name__ == "__main__":

    while True:

        question = input("\nAsk Legal Question: ")

        if question.lower() == "exit":
            break

        results = search(question)

        print("\n========== RESULTS ==========\n")

        if not results["documents"] or not results["documents"][0]:
            print("No matching documents found.")
            continue

        for i, doc in enumerate(results["documents"][0]):

            print(f"\nResult {i+1}\n")

            print(doc[:1000])

            print("\n---------------------------")