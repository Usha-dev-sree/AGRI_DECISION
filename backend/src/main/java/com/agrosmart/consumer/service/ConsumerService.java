package com.agrosmart.consumer.service;

import com.agrosmart.consumer.dto.MarketplaceListingDto;
import com.agrosmart.dealer.repository.DealerProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for consumer-facing marketplace operations.
 * Aggregates dealer product listings for the marketplace view.
 */
@Service
public class ConsumerService {

    private final DealerProductRepository dealerProductRepository;

    public ConsumerService(DealerProductRepository dealerProductRepository) {
        this.dealerProductRepository = dealerProductRepository;
    }

    /**
     * Returns all active marketplace listings (dealer products).
     * Optionally filtered by keyword search.
     */
    @Transactional(readOnly = true)
    public List<MarketplaceListingDto> getMarketplaceListings(String keyword) {
        var products = (keyword != null && !keyword.isBlank())
                ? dealerProductRepository.searchByKeyword(keyword)
                : dealerProductRepository.findByIsActiveTrueOrderByCreatedAtDesc();

        return products.stream()
                .map(p -> MarketplaceListingDto.builder()
                        .id(p.getId())
                        .listingType("DEALER_PRODUCT")
                        .name(p.getName())
                        .sellerName(p.getDealer().getFullName())
                        .sellerId(p.getDealer().getId())
                        .category(p.getCategory().name())
                        .price(p.getPricePerUnit())
                        .unit(p.getUnit())
                        .description(p.getDescription())
                        .isOrganic(p.getCategory().name().equals("ORGANIC"))
                        .listedAt(p.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }
}
