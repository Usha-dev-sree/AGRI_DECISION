package com.agrosmart.crop.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CropSummaryDto {
    private Long id;
    private String name;
    private String nameLocal;
    private String imageUrl;
    private String growingSeason;
    private String categoryName;
    private Integer growthDurationDays;
    private String waterRequirement;
}
