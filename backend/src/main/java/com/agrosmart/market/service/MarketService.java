package com.agrosmart.market.service;

import com.agrosmart.common.dto.PagedResponse;
import com.agrosmart.market.dto.MandiDto;
import com.agrosmart.market.dto.MarketPriceDto;
import com.agrosmart.market.entity.MarketPrice;
import com.agrosmart.market.repository.MandiRepository;
import com.agrosmart.market.repository.MarketPriceRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MarketService {

    private final MandiRepository mandiRepository;
    private final MarketPriceRepository marketPriceRepository;

    public MarketService(MandiRepository mandiRepository, MarketPriceRepository marketPriceRepository) {
        this.mandiRepository = mandiRepository;
        this.marketPriceRepository = marketPriceRepository;
    }

    @Transactional(readOnly = true)
    public List<MandiDto> getMandis(Long stateId, Long districtId) {
        if (districtId != null) {
            return mandiRepository.findByDistrictIdAndIsActiveTrueOrderByNameAsc(districtId)
                    .stream().map(this::toMandiDto).collect(Collectors.toList());
        } else if (stateId != null) {
            return mandiRepository.findByStateIdAndIsActiveTrueOrderByNameAsc(stateId)
                    .stream().map(this::toMandiDto).collect(Collectors.toList());
        } else {
            return mandiRepository.findByIsActiveTrueOrderByNameAsc()
                    .stream().map(this::toMandiDto).collect(Collectors.toList());
        }
    }

    @Transactional(readOnly = true)
    public PagedResponse<MarketPriceDto> getMarketPrices(Long cropId, Long mandiId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<MarketPrice> pricePage;

        if (cropId != null) {
            pricePage = marketPriceRepository.findByCropIdOrderByPriceDateDesc(cropId, pageable);
        } else if (mandiId != null) {
            pricePage = marketPriceRepository.findByMandiIdOrderByPriceDateDesc(mandiId, pageable);
        } else {
            pricePage = marketPriceRepository.findAll(pageable);
        }

        List<MarketPriceDto> content = pricePage.getContent()
                .stream().map(this::toPriceDto).collect(Collectors.toList());

        return PagedResponse.<MarketPriceDto>builder()
                .content(content)
                .page(pricePage.getNumber())
                .size(pricePage.getSize())
                .totalElements(pricePage.getTotalElements())
                .totalPages(pricePage.getTotalPages())
                .last(pricePage.isLast())
                .first(pricePage.isFirst())
                .build();
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "marketPrices", key = "#cropId != null ? #cropId : 'all'")
    public List<MarketPriceDto> getLatestPricesForCrop(Long cropId) {
        return marketPriceRepository.findLatestPricesByCrop(cropId)
                .stream().map(this::toPriceDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<MarketPriceDto> getChartData(Long cropId, Long stateId, int days) {
        java.time.LocalDate startDate = java.time.LocalDate.now().minusDays(days);
        List<MarketPrice> list = marketPriceRepository.findChartData(cropId, stateId, startDate);
        if (list.isEmpty() && stateId != null) {
            list = marketPriceRepository.findChartData(cropId, null, startDate);
        }
        return list.stream().map(this::toPriceDto).collect(Collectors.toList());
    }

    private MandiDto toMandiDto(com.agrosmart.market.entity.Mandi mandi) {
        return MandiDto.builder()
                .id(mandi.getId())
                .name(mandi.getName())
                .stateName(mandi.getState().getName())
                .districtName(mandi.getDistrict().getName())
                .address(mandi.getAddress())
                .build();
    }

    private MarketPriceDto toPriceDto(MarketPrice mp) {
        return MarketPriceDto.builder()
                .id(mp.getId())
                .cropName(mp.getCrop().getName())
                .cropId(mp.getCrop().getId())
                .mandiName(mp.getMandi().getName())
                .mandiId(mp.getMandi().getId())
                .districtName(mp.getMandi().getDistrict().getName())
                .varietyName(mp.getVariety() != null ? mp.getVariety().getName() : null)
                .minPrice(mp.getMinPricePerQuintal())
                .maxPrice(mp.getMaxPricePerQuintal())
                .modalPrice(mp.getModalPricePerQuintal())
                .arrivalQuantity(mp.getArrivalQuantity())
                .priceDate(mp.getPriceDate())
                .unit(mp.getUnit())
                .source(mp.getSource())
                .build();
    }
}
