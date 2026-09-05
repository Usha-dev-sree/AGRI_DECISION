package com.agrosmart.ai.service;

import com.agrosmart.ai.dto.CropRecommendationRequest;
import com.agrosmart.ai.dto.CropRecommendationResponse;
import com.agrosmart.ai.dto.YieldPredictionRequest;
import com.agrosmart.ai.dto.YieldPredictionResponse;
import com.agrosmart.ai.dto.FertilizerRecommendationRequest;
import com.agrosmart.ai.dto.FertilizerRecommendationResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class MlServiceClient {

    private final RestClient restClient;

    public MlServiceClient(@Value("${app.ml-service.url}") String mlServiceUrl) {
        this.restClient = RestClient.builder()
                .baseUrl(mlServiceUrl)
                .build();
    }

    public CropRecommendationResponse getCropRecommendation(CropRecommendationRequest request) {
        return restClient.post()
                .uri("/api/v1/ml/crop-recommendation/")
                .body(request)
                .retrieve()
                .body(CropRecommendationResponse.class);
    }

    public YieldPredictionResponse getYieldPrediction(YieldPredictionRequest request) {
        return restClient.post()
                .uri("/api/v1/ml/yield-prediction/")
                .body(request)
                .retrieve()
                .body(YieldPredictionResponse.class);
    }

    public FertilizerRecommendationResponse getFertilizerRecommendation(FertilizerRecommendationRequest request) {
        return restClient.post()
                .uri("/api/v1/ml/fertilizer-recommendation/")
                .body(request)
                .retrieve()
                .body(FertilizerRecommendationResponse.class);
    }
}
