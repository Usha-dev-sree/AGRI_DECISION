package com.agrosmart.dealer.controller;

import com.agrosmart.common.dto.ApiResponse;
import com.agrosmart.common.security.UserPrincipal;
import com.agrosmart.dealer.dto.CreateDealerProductRequest;
import com.agrosmart.dealer.dto.DealerProductDto;
import com.agrosmart.dealer.dto.UpdateDealerProductRequest;
import com.agrosmart.dealer.service.DealerService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for dealer product catalog management.
 * Secured to DEALER (and ADMIN) role via SecurityConfig.
 */
@RestController
@RequestMapping("/api/v1/dealer")
public class DealerController {

    private final DealerService dealerService;

    public DealerController(DealerService dealerService) {
        this.dealerService = dealerService;
    }

    /**
     * Get the authenticated dealer's own product listings.
     */
    @GetMapping("/products")
    public ResponseEntity<ApiResponse<List<DealerProductDto>>> getMyProducts(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(ApiResponse.success(dealerService.getMyProducts(userPrincipal.getId())));
    }

    /**
     * Create a new product listing.
     */
    @PostMapping("/products")
    public ResponseEntity<ApiResponse<DealerProductDto>> createProduct(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody CreateDealerProductRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Product listed successfully",
                dealerService.createProduct(userPrincipal.getId(), request)));
    }

    /**
     * Update an existing product listing.
     */
    @PutMapping("/products/{id}")
    public ResponseEntity<ApiResponse<DealerProductDto>> updateProduct(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long id,
            @RequestBody UpdateDealerProductRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Product updated successfully",
                dealerService.updateProduct(userPrincipal.getId(), id, request)));
    }

    /**
     * Delete (soft-deactivate) a product listing.
     */
    @DeleteMapping("/products/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long id) {
        dealerService.deleteProduct(userPrincipal.getId(), id);
        return ResponseEntity.ok(ApiResponse.success("Product removed from listing"));
    }
}
