from pathlib import Path
from langchain_text_splitters import RecursiveCharacterTextSplitter

DATASET_DIR = Path("../datasets")

splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)

for txt in DATASET_DIR.rglob("*.txt"):

    print(f"Chunking {txt.name}")

    text = txt.read_text(encoding="utf-8")

    chunks = splitter.split_text(text)

    output = txt.with_suffix(".chunks.txt")

    with open(output, "w", encoding="utf-8") as f:

        for i, chunk in enumerate(chunks):

            f.write(f"\n===== CHUNK {i+1} =====\n")

            f.write(chunk)

    print(f"Created {len(chunks)} chunks")