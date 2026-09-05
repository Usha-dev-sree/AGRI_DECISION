package com.agrosmart.ai.controller;

import com.agrosmart.ai.dto.CropRecommendationRequest;
import com.agrosmart.ai.dto.CropRecommendationResponse;
import com.agrosmart.ai.dto.YieldPredictionRequest;
import com.agrosmart.ai.dto.YieldPredictionResponse;
import com.agrosmart.ai.dto.FertilizerRecommendationRequest;
import com.agrosmart.ai.dto.FertilizerRecommendationResponse;
import com.agrosmart.ai.service.MlServiceClient;
import com.agrosmart.common.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ml")
public class MlController {

    private final MlServiceClient mlServiceClient;

    public MlController(MlServiceClient mlServiceClient) {
        this.mlServiceClient = mlServiceClient;
    }

    @PostMapping("/crop-recommendation")
    public ResponseEntity<ApiResponse<CropRecommendationResponse>> recommendCrop(@RequestBody CropRecommendationRequest request) {
        try {
            CropRecommendationResponse response = mlServiceClient.getCropRecommendation(request);
            return ResponseEntity.ok(ApiResponse.success(response));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ApiResponse.error("Failed to communicate with ML service: " + e.getMessage()));
        }
    }

    @PostMapping("/yield-prediction")
    public ResponseEntity<ApiResponse<YieldPredictionResponse>> predictYield(@RequestBody YieldPredictionRequest request) {
        try {
            YieldPredictionResponse response = mlServiceClient.getYieldPrediction(request);
            return ResponseEntity.ok(ApiResponse.success(response));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ApiResponse.error("Failed to communicate with ML service: " + e.getMessage()));
        }
    }

    @PostMapping("/fertilizer-recommendation")
    public ResponseEntity<ApiResponse<FertilizerRecommendationResponse>> recommendFertilizer(@RequestBody FertilizerRecommendationRequest request) {
        try {
            FertilizerRecommendationResponse response = mlServiceClient.getFertilizerRecommendation(request);
            return ResponseEntity.ok(ApiResponse.success(response));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ApiResponse.error("Failed to communicate with ML service: " + e.getMessage()));
        }
    }
}
