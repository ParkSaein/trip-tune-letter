from fastapi import FastAPI
from crawler import generate_newsletters

app = FastAPI()

@app.get("/generate-newsletters")
def create_newsletters():
    data = generate_newsletters()
    return {
        "status": "success",
        "count": len(data),
        "data": data
    }