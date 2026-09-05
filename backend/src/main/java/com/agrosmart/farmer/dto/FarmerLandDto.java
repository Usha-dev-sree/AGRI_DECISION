package com.agrosmart.farmer.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Builder
public class FarmerLandDto {
    private Long id;
    private Long farmerId;
    private String landName;
    private BigDecimal area;
    private String unit;
    private String soilType;
    private String irrigationType;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private Long stateId;
    private String stateName;
    private Long districtId;
    private String districtName;
    private Long talukId;
    private String talukName;
}
