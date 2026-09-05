import random
import os
from app.models.schemas import CropRecommendationRequest, YieldPredictionRequest

# In a real scenario, we would load .pkl files here using joblib:
# import joblib
# model_path = os.path.join(os.path.dirname(__file__), '../../trained_models/crop_rf.pkl')
# crop_model = joblib.load(model_path)

def predict_crop(data: CropRecommendationRequest) -> list:
    """
    Mock recommendation logic based on environmental ranges.
    In reality, this would use a Random Forest or XGBoost model.
    """
    candidates = []
    
    # Simple rule-based logic to simulate ML model reasoning
    if data.rainfall > 200 and data.humidity > 80:
        candidates.extend(['Rice', 'Jute', 'Sugarcane'])
    elif data.rainfall < 50 and data.temperature > 30:
        candidates.extend(['Pearl Millet (Bajra)', 'Sorghum (Jowar)'])
    elif 15 <= data.temperature <= 25 and 50 <= data.rainfall <= 100:
        candidates.extend(['Wheat', 'Mustard', 'Gram'])
        
    if data.ph < 5.5:
        candidates.extend(['Tea', 'Coffee'])
    elif 6.0 <= data.ph <= 7.5:
        candidates.extend(['Maize', 'Cotton', 'Soybean'])
        
    # If no strict rule matches, provide generic fallback
    if not candidates:
        candidates = ['Maize', 'Wheat', 'Pulses']
        
    # Get unique items, limit to top 3
    unique_candidates = list(dict.fromkeys(candidates))[:3]
    
    # Generate mock confidences
    confidences = [round(random.uniform(0.7, 0.95), 2) for _ in unique_candidates]
    confidences.sort(reverse=True)
    
    return unique_candidates, confidences

def predict_yield(data: YieldPredictionRequest) -> tuple:
    """
    Mock yield prediction logic. 
    In reality, this would use regression models trained on historical agricultural data.
    """
    # Base yield logic (mock data in tonnes per hectare)
    base_yields = {
        'Rice': 3.5,
        'Wheat': 3.0,
        'Cotton': 0.5,
        'Sugarcane': 70.0,
        'Maize': 2.5
    }
    
    base = base_yields.get(data.crop, 2.0)
    
    # Apply variance based on inputs (simulating model weights)
    weather_multiplier = 1.0 + ((data.annual_rainfall - 800) / 4000) # Simple linear scaling
    
    fertilizer_boost = 0.0
    if data.fertilizer_used and data.fertilizer_used > 0:
        fertilizer_boost = min((data.fertilizer_used / 150) * 0.2, 0.25) # Max 25% boost
        
    predicted_yield_per_ha = base * weather_multiplier * (1 + fertilizer_boost)
    predicted_yield_per_ha = max(predicted_yield_per_ha, base * 0.4) # Floor at 40%
    
    total_yield = predicted_yield_per_ha * data.area
    confidence = random.uniform(0.75, 0.92)
    
    return round(total_yield, 2), round(predicted_yield_per_ha, 2), round(confidence, 2)

def predict_fertilizer(data: dict) -> dict:
    """
    Mock fertilizer recommendation based on NPK values.
    """
    n, p, k = data['nitrogen'], data['phosphorus'], data['potassium']
    
    if n < 20:
        fert = "Urea (High Nitrogen)"
        dosage = 120.0
        instructions = "Apply in 3 splits: at sowing, tillering, and panicle initiation."
    elif p < 20:
        fert = "DAP (Diammonium Phosphate)"
        dosage = 80.0
        instructions = "Apply as basal dose during land preparation."
    elif k < 20:
        fert = "MOP (Muriate of Potash)"
        dosage = 60.0
        instructions = "Apply at the time of sowing."
    else:
        fert = "NPK 19:19:19 Complex"
        dosage = 100.0
        instructions = "Apply uniformly to maintain soil health."
        
    return {
        "recommended_fertilizer": fert,
        "dosage_kg_per_hectare": dosage,
        "application_instructions": instructions
    }
