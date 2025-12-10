from fastapi import FastAPI, HTTPException, File, UploadFile
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
from ml_models import predict_completion_date, predict_cost_overrun

app = FastAPI(title="PipeLine One ML Service", description="Predictive Analytics API")

class ProjectData(BaseModel):
    project_id: str
    current_progress: float
    historical_data: List[dict] # Date, progress, cost, weather

@app.get("/")
def read_root():
    return {"status": "online", "model_version": "1.0.0"}

@app.post("/predict/completion")
def get_completion_prediction(data: ProjectData):
    try:
        # In a real scenario, we'd load the trained Prophet model here
        prediction = predict_completion_date(data.historical_data)
        return prediction
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/cost")
def get_cost_prediction(data: ProjectData):
    try:
        # Load XGBoost model
        prediction = predict_cost_overrun(data.historical_data)
        return prediction
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/ai/analyze-weld")
def analyze_weld_image(file: bytes = File(...)):
    try:
        # Load TensorFlow model and process image
        from ml_models import analyze_weld_defects
        results = analyze_weld_defects(file)
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
