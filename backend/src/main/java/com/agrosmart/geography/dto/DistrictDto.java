package com.agrosmart.geography.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DistrictDto {
    private Long id;
    private String name;
    private String nameLocal;
    private Long stateId;
}
