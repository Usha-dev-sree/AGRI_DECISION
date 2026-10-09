package com.agrosmart.dealer.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class UpdateDealerProductRequest {
    private String name;
    private String description;
    private BigDecimal pricePerUnit;
    private BigDecimal stockQuantity;
    private String unit;
    private String brandName;
    private Boolean isActive;
}
