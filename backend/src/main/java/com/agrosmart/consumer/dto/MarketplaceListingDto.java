package com.agrosmart.consumer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MarketplaceListingDto {
    private Long id;
    private String listingType;   // "DEALER_PRODUCT" | "FARMER_CROP"
    private String name;
    private String sellerName;
    private Long sellerId;
    private String category;
    private BigDecimal price;
    private String unit;
    private String location;      // state/district info when available
    private String description;
    private Boolean isOrganic;
    private LocalDateTime listedAt;
}
