package com.agrosmart.market.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class MarketPriceDto {
    private Long id;
    private String cropName;
    private Long cropId;
    private String mandiName;
    private Long mandiId;
    private String districtName;
    private String varietyName;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private BigDecimal modalPrice;
    private BigDecimal arrivalQuantity;
    private LocalDate priceDate;
    private String unit;
    private String source;
}
