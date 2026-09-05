from fastapi import APIRouter
from app.models.schemas import FertilizerRecommendationRequest, FertilizerRecommendationResponse
from app.ml.inference import predict_fertilizer

router = APIRouter(
    prefix="/api/v1/ml/fertilizer-recommendation",
    tags=["Fertilizer Recommendation"]
)

@router.post("/", response_model=FertilizerRecommendationResponse)
def recommend_fertilizer(request: FertilizerRecommendationRequest):
    result = predict_fertilizer(request.dict())
    
    return FertilizerRecommendationResponse(**result)
