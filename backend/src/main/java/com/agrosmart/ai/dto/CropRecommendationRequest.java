package com.agrosmart.ai.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CropRecommendationRequest {
    private Double nitrogen;
    private Double phosphorus;
    private Double potassium;
    private Double temperature;
    private Double humidity;
    private Double ph;
    private Double rainfall;
}
