from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AgroSmart ML Service",
    description="Machine Learning APIs for Crop Recommendation and Yield Prediction",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "AgroSmart ML Service"}

from app.routers import crop_recommendation, yield_prediction, profit_estimation, fertilizer_recommendation

app.include_router(crop_recommendation.router)
app.include_router(yield_prediction.router)
app.include_router(profit_estimation.router)
app.include_router(fertilizer_recommendation.router)
