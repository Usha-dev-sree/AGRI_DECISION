package com.agrosmart.farmer.controller;

import com.agrosmart.common.dto.ApiResponse;
import com.agrosmart.common.security.UserPrincipal;
import com.agrosmart.farmer.dto.AddCropRequest;
import com.agrosmart.farmer.dto.AddLandRequest;
import com.agrosmart.farmer.dto.FarmerCropDto;
import com.agrosmart.farmer.dto.FarmerLandDto;
import com.agrosmart.farmer.dto.FarmerProfileDto;
import com.agrosmart.farmer.service.FarmerService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/farmer")
public class FarmerController {

    private final FarmerService farmerService;

    public FarmerController(FarmerService farmerService) {
        this.farmerService = farmerService;
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<FarmerProfileDto>> getProfile(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(ApiResponse.success(farmerService.getOrCreateProfile(userPrincipal.getId())));
    }

    @GetMapping("/lands")
    public ResponseEntity<ApiResponse<List<FarmerLandDto>>> getLands(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(ApiResponse.success(farmerService.getLandsByFarmerUserId(userPrincipal.getId())));
    }

    @GetMapping("/crops")
    public ResponseEntity<ApiResponse<List<FarmerCropDto>>> getCrops(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(ApiResponse.success(farmerService.getCropsByFarmerUserId(userPrincipal.getId())));
    }

    @PostMapping("/lands")
    public ResponseEntity<ApiResponse<FarmerLandDto>> addLand(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody AddLandRequest request) {
        return ResponseEntity.ok(ApiResponse.success(farmerService.addLand(userPrincipal.getId(), request)));
    }

    @PostMapping("/crops")
    public ResponseEntity<ApiResponse<FarmerCropDto>> addCrop(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody AddCropRequest request) {
        return ResponseEntity.ok(ApiResponse.success(farmerService.addCrop(userPrincipal.getId(), request)));
    }
}
