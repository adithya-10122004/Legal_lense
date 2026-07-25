from pathlib import Path
from pypdf import PdfReader

DATASET_DIR = Path("../datasets")

OUTPUT_DIR = Path("../datasets")

pdf_files = list(DATASET_DIR.rglob("*.pdf"))

for pdf in pdf_files:

    print(f"Reading {pdf.name}")

    reader = PdfReader(pdf)

    text = ""

    for page in reader.pages:
        extracted = page.extract_text()
        if extracted:
            text += extracted + "\n"

    txt_file = pdf.with_suffix(".txt")

    txt_file.write_text(text, encoding="utf-8")

    print(f"Saved {txt_file.name}")