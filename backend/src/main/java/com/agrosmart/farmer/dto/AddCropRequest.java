package com.agrosmart.farmer.dto;

import com.agrosmart.crop.entity.GrowingSeason;
import com.agrosmart.farmer.entity.FarmerCrop;
import com.agrosmart.farmer.entity.FarmerProfile;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class AddCropRequest {

    private Long landId;

    @NotNull(message = "Crop ID is required")
    private Long cropId;

    private Long varietyId;

    @NotNull(message = "Season is required")
    private GrowingSeason season;

    @NotNull(message = "Season year is required")
    private Integer seasonYear;

    private LocalDate sowingDate;
    private LocalDate expectedHarvestDate;
    private LocalDate actualHarvestDate;

    private BigDecimal areaSown;
    private FarmerProfile.LandUnit areaUnit = FarmerProfile.LandUnit.ACRE;

    private BigDecimal expectedYield;
    private BigDecimal actualYield;
    private String yieldUnit = "quintal";

    private BigDecimal totalInputCost;
    private BigDecimal totalRevenue;

    private FarmerCrop.CropStatus status = FarmerCrop.CropStatus.PLANNED;

    private String notes;
}
