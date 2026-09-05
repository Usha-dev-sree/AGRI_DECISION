package com.agrosmart.ai.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class YieldPredictionRequest {
    private String state;
    private String district;
    private String crop;
    private String season;
    private Double area;
    private Double annual_rainfall;
    private Double fertilizer_used;
    private Double pesticide_used;
}
