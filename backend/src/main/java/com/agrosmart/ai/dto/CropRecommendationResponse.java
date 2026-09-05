package com.agrosmart.ai.dto;

import lombok.Data;
import java.util.List;

@Data
public class CropRecommendationResponse {
    private List<String> recommended_crops;
    private List<Double> confidence_scores;
}
