package com.agrosmart.ai.dto;

import lombok.Data;

@Data
public class FertilizerRecommendationResponse {
    private String recommended_fertilizer;
    private Double dosage_kg_per_hectare;
    private String application_instructions;
}
