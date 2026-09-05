package com.agrosmart.crop.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class CropDto {
    private Long id;
    private String name;
    private String nameLocal;
    private String scientificName;
    private String description;
    private String imageUrl;
    private String growingSeason;
    private String categoryName;
    private Long categoryId;
    private BigDecimal minTemperature;
    private BigDecimal maxTemperature;
    private BigDecimal minRainfall;
    private BigDecimal maxRainfall;
    private BigDecimal minPh;
    private BigDecimal maxPh;
    private String waterRequirement;
    private String soilTypesSuitable;
    private Integer growthDurationDays;
    private List<CropVarietyDto> varieties;
}
