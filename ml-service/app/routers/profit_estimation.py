from fastapi import APIRouter
from app.models.schemas import ProfitEstimationRequest, ProfitEstimationResponse

router = APIRouter(
    prefix="/api/v1/ml/profit-estimation",
    tags=["Profit Estimation"]
)

@router.post("/", response_model=ProfitEstimationResponse)
def estimate_profit(request: ProfitEstimationRequest):
    # Total Revenue = Yield (in quintals) * Market Price per quintal
    total_revenue = request.expected_yield_quintals * request.market_price_per_quintal
    
    # Total Cost = Input Cost per Hectare * Total Area
    total_cost = request.input_cost_per_hectare * request.area_hectares
    
    # Net Profit
    net_profit = total_revenue - total_cost
    
    # ROI
    roi = 0.0
    if total_cost > 0:
        roi = (net_profit / total_cost) * 100
        
    return ProfitEstimationResponse(
        total_revenue=round(total_revenue, 2),
        total_cost=round(total_cost, 2),
        net_profit=round(net_profit, 2),
        roi_percentage=round(roi, 2)
    )
