package com.agrosmart.crop.controller;

import com.agrosmart.common.dto.ApiResponse;
import com.agrosmart.common.dto.PagedResponse;
import com.agrosmart.crop.dto.*;
import com.agrosmart.crop.service.CropService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/crops")
public class CropController {

    private final CropService cropService;

    public CropController(CropService cropService) {
        this.cropService = cropService;
    }

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<CropCategoryDto>>> getCategories() {
        return ResponseEntity.ok(ApiResponse.success(cropService.getAllCategories()));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<CropSummaryDto>>> getCrops(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String season,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        return ResponseEntity.ok(
                ApiResponse.success(cropService.getCrops(categoryId, season, keyword, page, size)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CropDto>> getCropById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(cropService.getCropById(id)));
    }

    @GetMapping("/{id}/varieties")
    public ResponseEntity<ApiResponse<List<CropVarietyDto>>> getVarieties(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(cropService.getVarietiesByCrop(id)));
    }
}
