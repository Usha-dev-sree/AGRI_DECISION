package com.agrosmart.govt.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GovtDashboardDto {
    /** Total number of registered farmers in the system */
    private Long totalFarmers;
    /** Total land parcels registered (active) */
    private Long totalLands;
    /** Total active crop entries */
    private Long totalCrops;
    /** Total registered dealers */
    private Long totalDealers;
    /** Total registered consumers */
    private Long totalConsumers;
    /** Count of farmers per state name */
    private Map<String, Long> farmersByState;
    /** Count of active crops by season */
    private Map<String, Long> cropsBySeason;
    /** Number of mandis registered */
    private Long totalMandis;
    /** Number of market price records */
    private Long totalMarketPriceRecords;
}
   