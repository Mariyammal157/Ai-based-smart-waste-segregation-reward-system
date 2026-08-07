from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from PIL import Image
import io

app = FastAPI()

class PredictionResponse(BaseModel):
    category: str
    confidence: float
    recommended_bin: str
    points: int
    disposal_instruction: str
    environmental_message: str

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/predict", response_model=PredictionResponse)
async def predict(file: UploadFile = File(...)):
    content = await file.read()
    try:
        image = Image.open(io.BytesIO(content))
        image.verify()
    except Exception:
        return JSONResponse(status_code=400, content={"detail": "Invalid image file."})

    filename = file.filename.lower()
    category = "Organic"
    recommended_bin = "Compost"
    points = 10
    environmental_message = "Great job! This item can be composted to reduce landfill waste."
    disposal_instruction = "Place in the organic waste bin."

    if "plastic" in filename:
        category = "Plastic"
        recommended_bin = "Recycle"
        points = 15
        environmental_message = "Plastic can be recycled into new products, saving resources."
        disposal_instruction = "Rinse and place in the plastic recycling bin."
    elif "glass" in filename:
        category = "Glass"
        recommended_bin = "Recycle"
        points = 15
        environmental_message = "Glass is infinitely recyclable when disposed of correctly."
        disposal_instruction = "Place in the glass recycling bin after rinsing."
    elif "metal" in filename or "can" in filename:
        category = "Metal"
        recommended_bin = "Recycle"
        points = 15
        environmental_message = "Metal items can be recovered and reused when recycled."
        disposal_instruction = "Drop into the metal recycling bin."
    elif "paper" in filename:
        category = "Paper"
        recommended_bin = "Recycle"
        points = 12
        environmental_message = "Paper recycling saves trees and energy."
        disposal_instruction = "Flatten and place in the paper recycling bin."
    elif "ewaste" in filename or "e-waste" in filename:
        category = "E-Waste"
        recommended_bin = "Hazardous Waste"
        points = 20
        environmental_message = "E-waste must be handled separately to recover valuable electronics."
        disposal_instruction = "Deliver to an authorized e-waste collection point."

    return PredictionResponse(
        category=category,
        confidence=0.82,
        recommended_bin=recommended_bin,
        points=points,
        disposal_instruction=disposal_instruction,
        environmental_message=environmental_message,
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
