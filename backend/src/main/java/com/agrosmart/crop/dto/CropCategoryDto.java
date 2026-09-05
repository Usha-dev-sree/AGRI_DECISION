package com.agrosmart.crop.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CropCategoryDto {
    private Long id;
    private String name;
    private String nameLocal;
    private String description;
    private String iconUrl;
}
