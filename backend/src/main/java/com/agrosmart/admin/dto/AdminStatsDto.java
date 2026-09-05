package com.agrosmart.admin.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminStatsDto {
    private long totalUsers;
    private long activeUsers;
    private long inactiveUsers;
    private long totalFarmers;
    private long totalDealers;
    private long totalConsumers;
    private long totalGovtOfficers;
    private long totalLands;
    private long totalCropsSown;
}
