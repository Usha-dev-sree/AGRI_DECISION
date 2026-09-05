package com.agrosmart.geography.controller;

import com.agrosmart.common.dto.ApiResponse;
import com.agrosmart.geography.dto.DistrictDto;
import com.agrosmart.geography.dto.StateDto;
import com.agrosmart.geography.dto.TalukDto;
import com.agrosmart.geography.service.GeographyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/geography")
public class GeographyController {

    private final GeographyService geographyService;

    public GeographyController(GeographyService geographyService) {
        this.geographyService = geographyService;
    }

    @GetMapping("/states")
    public ResponseEntity<ApiResponse<List<StateDto>>> getAllStates() {
        return ResponseEntity.ok(ApiResponse.success(geographyService.getAllStates()));
    }

    @GetMapping("/states/{stateId}/districts")
    public ResponseEntity<ApiResponse<List<DistrictDto>>> getDistrictsByState(@PathVariable Long stateId) {
        return ResponseEntity.ok(ApiResponse.success(geographyService.getDistrictsByState(stateId)));
    }

    @GetMapping("/districts/{districtId}/taluks")
    public ResponseEntity<ApiResponse<List<TalukDto>>> getTaluksByDistrict(@PathVariable Long districtId) {
        return ResponseEntity.ok(ApiResponse.success(geographyService.getTaluksByDistrict(districtId)));
    }
}
