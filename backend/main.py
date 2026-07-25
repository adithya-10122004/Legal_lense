from fastapi import FastAPI

app = FastAPI(title="LegalLens API")

@app.get("/")
def home():
    return {
        "message":"LegalLens Backend Running 🚀"
    }