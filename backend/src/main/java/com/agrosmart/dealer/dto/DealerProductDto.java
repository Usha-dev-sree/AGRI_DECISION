package com.agrosmart.dealer.dto;

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
public class DealerProductDto {
    private Long id;
    private Long dealerId;
    private String dealerName;
    private String name;
    private String category;
    private String description;
    private BigDecimal pricePerUnit;
    private BigDecimal stockQuantity;
    private String unit;
    private String brandName;
    private Boolean isActive;
    private LocalDateTime createdAt;
}
