package com.agrosmart.govt.controller;

import com.agrosmart.common.dto.ApiResponse;
import com.agrosmart.govt.dto.GovtDashboardDto;
import com.agrosmart.govt.service.GovtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for Government Officer dashboard analytics.
 * Secured to GOVT_OFFICER and ADMIN roles.
 */
@RestController
@RequestMapping("/api/v1/govt")
@PreAuthorize("hasAnyRole('GOVT_OFFICER', 'ADMIN')")
public class GovtController {

    private final GovtService govtService;

    public GovtController(GovtService govtService) {
        this.govtService = govtService;
    }

    /**
     * Returns platform-wide agricultural statistics for govt oversight.
     */
    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<GovtDashboardDto>> getDashboard() {
        return ResponseEntity.ok(ApiResponse.success(govtService.getDashboardStats()));
    }
}
