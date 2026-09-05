from fastapi import APIRouter
from app.models.schemas import CropRecommendationRequest, CropRecommendationResponse
from app.ml.inference import predict_crop

router = APIRouter(
    prefix="/api/v1/ml/crop-recommendation",
    tags=["Crop Recommendation"]
)

@router.post("/", response_model=CropRecommendationResponse)
def recommend_crop(request: CropRecommendationRequest):
    crops, confidences = predict_crop(request)
    
    return CropRecommendationResponse(
        recommended_crops=crops,
        confidence_scores=confidences
    )
