from fastapi import APIRouter
from app.models.schemas import YieldPredictionRequest, YieldPredictionResponse
from app.ml.inference import predict_yield

router = APIRouter(
    prefix="/api/v1/ml/yield-prediction",
    tags=["Yield Prediction"]
)

@router.post("/", response_model=YieldPredictionResponse)
def predict_crop_yield(request: YieldPredictionRequest):
    total, per_ha, conf = predict_yield(request)
    
    return YieldPredictionResponse(
        predicted_yield=total,
        yield_per_hectare=per_ha,
        confidence=conf
    )
