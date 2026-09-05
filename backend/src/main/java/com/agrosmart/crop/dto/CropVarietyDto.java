package com.agrosmart.crop.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class CropVarietyDto {
    private Long id;
    private String name;
    private String nameLocal;
    private Integer maturityDays;
    private BigDecimal yieldPerHectare;
    private String developedBy;
    private Integer yearOfRelease;
}
