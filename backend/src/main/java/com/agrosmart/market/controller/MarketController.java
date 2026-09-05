package com.agrosmart.market.controller;

import com.agrosmart.common.dto.ApiResponse;
import com.agrosmart.common.dto.PagedResponse;
import com.agrosmart.market.dto.MandiDto;
import com.agrosmart.market.dto.MarketPriceDto;
import com.agrosmart.market.service.MarketService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/market")
public class MarketController {

    private final MarketService marketService;

    public MarketController(MarketService marketService) {
        this.marketService = marketService;
    }

    @GetMapping("/mandis")
    public ResponseEntity<ApiResponse<List<MandiDto>>> getMandis(
            @RequestParam(required = false) Long stateId,
            @RequestParam(required = false) Long districtId) {
        return ResponseEntity.ok(ApiResponse.success(marketService.getMandis(stateId, districtId)));
    }

    @GetMapping("/prices")
    public ResponseEntity<ApiResponse<PagedResponse<MarketPriceDto>>> getMarketPrices(
            @RequestParam(required = false) Long cropId,
            @RequestParam(required = false) Long mandiId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(
                ApiResponse.success(marketService.getMarketPrices(cropId, mandiId, page, size)));
    }

    @GetMapping("/prices/latest/{cropId}")
    public ResponseEntity<ApiResponse<List<MarketPriceDto>>> getLatestPrices(@PathVariable Long cropId) {
        return ResponseEntity.ok(ApiResponse.success(marketService.getLatestPricesForCrop(cropId)));
    }

    @GetMapping("/prices/chart")
    public ResponseEntity<ApiResponse<List<MarketPriceDto>>> getChartData(
            @RequestParam Long cropId,
            @RequestParam Long stateId,
            @RequestParam(defaultValue = "15") int days) {
        return ResponseEntity.ok(ApiResponse.success(marketService.getChartData(cropId, stateId, days)));
    }
}
