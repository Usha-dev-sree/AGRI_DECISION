package com.agrosmart.market.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MandiDto {
    private Long id;
    private String name;
    private String stateName;
    private String districtName;
    private String address;
}
