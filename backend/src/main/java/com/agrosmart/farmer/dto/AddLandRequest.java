package com.agrosmart.farmer.dto;

import com.agrosmart.farmer.entity.FarmerProfile;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class AddLandRequest {

    @NotBlank(message = "Land name is required")
    private String landName;

    @NotNull(message = "Area is required")
    private BigDecimal area;

    private FarmerProfile.LandUnit unit = FarmerProfile.LandUnit.ACRE;

    private FarmerProfile.SoilType soilType;

    private FarmerProfile.IrrigationType irrigationType;

    private BigDecimal latitude;
    private BigDecimal longitude;

    private Long stateId;
    private Long districtId;
    private Long talukId;
}
