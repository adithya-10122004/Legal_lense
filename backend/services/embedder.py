from sentence_transformers import SentenceTransformer

print("Loading embedding model...")

model = SentenceTransformer("all-MiniLM-L6-v2")

sentence = "I accidentally hit a dog with my bike."

embedding = model.encode(sentence)

print("Embedding Length:", len(embedding))

print("First 10 values:")

print(embedding[:10])