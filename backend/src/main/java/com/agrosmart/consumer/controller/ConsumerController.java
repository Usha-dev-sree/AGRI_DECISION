package com.agrosmart.consumer.controller;

import com.agrosmart.common.dto.ApiResponse;
import com.agrosmart.consumer.dto.MarketplaceListingDto;
import com.agrosmart.consumer.service.ConsumerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for consumer-facing marketplace endpoints.
 * Secured to CONSUMER (and ADMIN) role via SecurityConfig.
 */
@RestController
@RequestMapping("/api/v1/consumer")
public class ConsumerController {

    private final ConsumerService consumerService;

    public ConsumerController(ConsumerService consumerService) {
        this.consumerService = consumerService;
    }

    /**
     * Browse all active marketplace listings.
     * Optionally filter by keyword.
     */
    @GetMapping("/marketplace")
    public ResponseEntity<ApiResponse<List<MarketplaceListingDto>>> getMarketplace(
            @RequestParam(required = false) String keyword) {
        return ResponseEntity.ok(ApiResponse.success(consumerService.getMarketplaceListings(keyword)));
    }
}
