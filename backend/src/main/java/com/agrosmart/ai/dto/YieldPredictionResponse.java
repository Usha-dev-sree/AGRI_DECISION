package com.agrosmart.ai.dto;

import lombok.Data;

@Data
public class YieldPredictionResponse {
    private Double predicted_yield;
    private Double yield_per_hectare;
    private Double confidence;
}
