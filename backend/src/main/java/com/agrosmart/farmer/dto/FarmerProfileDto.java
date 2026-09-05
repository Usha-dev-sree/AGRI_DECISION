package com.agrosmart.farmer.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Builder
public class FarmerProfileDto {
    private Long id;
    private Long userId;
    private String fullName;
    private BigDecimal totalLandArea;
    private String landUnit;
    private String soilType;
    private String irrigationType;
    private Integer farmingExperienceYears;
    private String annualIncomeRange;
    private Boolean isOrganicFarmer;
}
