package com.agrosmart.farmer.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class FarmerCropDto {
    private Long id;
    private Long farmerId;
    private Long landId;
    private String landName;
    private Long cropId;
    private String cropName;
    private String categoryName;
    private Long varietyId;
    private String varietyName;
    private String season;
    private Integer seasonYear;
    private LocalDate sowingDate;
    private LocalDate expectedHarvestDate;
    private LocalDate actualHarvestDate;
    private BigDecimal areaSown;
    private String areaUnit;
    private BigDecimal expectedYield;
    private BigDecimal actualYield;
    private String yieldUnit;
    private BigDecimal totalInputCost;
    private BigDecimal totalRevenue;
    private String status;
    private String notes;
}
