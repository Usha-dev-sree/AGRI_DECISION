from pydantic import BaseModel, Field
from typing import Optional, List

class CropRecommendationRequest(BaseModel):
    nitrogen: float = Field(..., description="Ratio of Nitrogen content in soil")
    phosphorus: float = Field(..., description="Ratio of Phosphorous content in soil")
    potassium: float = Field(..., description="Ratio of Potassium content in soil")
    temperature: float = Field(..., description="Temperature in degree Celsius")
    humidity: float = Field(..., description="Relative humidity in %")
    ph: float = Field(..., description="PH value of the soil")
    rainfall: float = Field(..., description="Rainfall in mm")

class CropRecommendationResponse(BaseModel):
    recommended_crops: List[str]
    confidence_scores: List[float]

class YieldPredictionRequest(BaseModel):
    state: str = Field(..., description="State name")
    district: str = Field(..., description="District name")
    crop: str = Field(..., description="Crop name")
    season: str = Field(..., description="Growing season")
    area: float = Field(..., description="Area under cultivation (in Hectares)")
    annual_rainfall: float = Field(..., description="Annual Rainfall (in mm)")
    fertilizer_used: Optional[float] = Field(None, description="Fertilizer amount in kg/hectare")
    pesticide_used: Optional[float] = Field(None, description="Pesticide amount in kg/hectare")

class YieldPredictionResponse(BaseModel):
    predicted_yield: float = Field(..., description="Total predicted yield (in Tonnes/Quintals)")
    yield_per_hectare: float = Field(..., description="Predicted yield per Hectare")
    confidence: float = Field(..., description="Model confidence score")

class ProfitEstimationRequest(BaseModel):
    crop: str
    expected_yield_quintals: float
    market_price_per_quintal: float
    input_cost_per_hectare: float
    area_hectares: float

class ProfitEstimationResponse(BaseModel):
    total_revenue: float
    total_cost: float
    net_profit: float
    roi_percentage: float

class FertilizerRecommendationRequest(BaseModel):
    crop: str = Field(..., description="Crop name")
    nitrogen: float = Field(..., description="Soil Nitrogen")
    phosphorus: float = Field(..., description="Soil Phosphorus")
    potassium: float = Field(..., description="Soil Potassium")
    ph: float = Field(..., description="Soil pH")

class FertilizerRecommendationResponse(BaseModel):
    recommended_fertilizer: str
    dosage_kg_per_hectare: float
    application_instructions: str
