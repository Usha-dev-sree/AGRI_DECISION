package com.agrosmart.ai.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FertilizerRecommendationRequest {
    private String crop;
    private Double nitrogen;
    private Double phosphorus;
    private Double potassium;
    private Double ph;
}
