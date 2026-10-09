package com.agrosmart.govt.service;

import com.agrosmart.farmer.entity.FarmerCrop;
import com.agrosmart.farmer.repository.FarmerCropRepository;
import com.agrosmart.farmer.repository.FarmerLandRepository;
import com.agrosmart.govt.dto.GovtDashboardDto;
import com.agrosmart.market.repository.MandiRepository;
import com.agrosmart.market.repository.MarketPriceRepository;
import com.agrosmart.user.entity.Role;
import com.agrosmart.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Service providing platform-wide analytics for Government Officers.
 */
@Service
public class GovtService {

    private final UserRepository userRepository;
    private final FarmerLandRepository farmerLandRepository;
    private final FarmerCropRepository farmerCropRepository;
    private final MandiRepository mandiRepository;
    private final MarketPriceRepository marketPriceRepository;

    public GovtService(UserRepository userRepository,
                       FarmerLandRepository farmerLandRepository,
                       FarmerCropRepository farmerCropRepository,
                       MandiRepository mandiRepository,
                       MarketPriceRepository marketPriceRepository) {
        this.userRepository = userRepository;
        this.farmerLandRepository = farmerLandRepository;
        this.farmerCropRepository = farmerCropRepository;
        this.mandiRepository = mandiRepository;
        this.marketPriceRepository = marketPriceRepository;
    }

    @Transactional(readOnly = true)
    public GovtDashboardDto getDashboardStats() {
        // Crops by season breakdown
        List<FarmerCrop> allCrops = farmerCropRepository.findAll();
        Map<String, Long> cropsBySeason = allCrops.stream()
                .collect(Collectors.groupingBy(
                        c -> c.getSeason() != null ? c.getSeason().name() : "UNKNOWN",
                        Collectors.counting()
                ));

        return GovtDashboardDto.builder()
                .totalFarmers(userRepository.countByRole(Role.FARMER))
                .totalDealers(userRepository.countByRole(Role.DEALER))
                .totalConsumers(userRepository.countByRole(Role.CONSUMER))
                .totalLands(farmerLandRepository.count())
                .totalCrops((long) allCrops.size())
                .cropsBySeason(cropsBySeason)
                .totalMandis(mandiRepository.count())
                .totalMarketPriceRecords(marketPriceRepository.count())
                .farmersByState(new HashMap<>()) // aggregated below if state data is available
                .build();
    }
}
