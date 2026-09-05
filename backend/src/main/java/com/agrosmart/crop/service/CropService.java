package com.agrosmart.crop.service;

import com.agrosmart.common.dto.PagedResponse;
import com.agrosmart.common.exception.ResourceNotFoundException;
import com.agrosmart.crop.dto.*;
import com.agrosmart.crop.entity.Crop;
import com.agrosmart.crop.entity.CropCategory;
import com.agrosmart.crop.entity.GrowingSeason;
import com.agrosmart.crop.repository.CropCategoryRepository;
import com.agrosmart.crop.repository.CropRepository;
import com.agrosmart.crop.repository.CropVarietyRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CropService {

    private final CropRepository cropRepository;
    private final CropCategoryRepository categoryRepository;
    private final CropVarietyRepository varietyRepository;

    public CropService(CropRepository cropRepository,
                       CropCategoryRepository categoryRepository,
                       CropVarietyRepository varietyRepository) {
        this.cropRepository = cropRepository;
        this.categoryRepository = categoryRepository;
        this.varietyRepository = varietyRepository;
    }

    @Transactional(readOnly = true)
    public List<CropCategoryDto> getAllCategories() {
        return categoryRepository.findByIsActiveTrueOrderByNameAsc()
                .stream()
                .map(this::toCategoryDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PagedResponse<CropSummaryDto> getCrops(Long categoryId, String season, String keyword,
                                                   int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        Page<Crop> cropPage;

        if (keyword != null && !keyword.isBlank()) {
            cropPage = cropRepository.searchByName(keyword.trim(), pageable);
        } else if (categoryId != null && season != null) {
            GrowingSeason growingSeason = GrowingSeason.valueOf(season.toUpperCase());
            cropPage = cropRepository.findByCategoryIdAndGrowingSeasonAndIsActiveTrue(categoryId, growingSeason, pageable);
        } else if (categoryId != null) {
            cropPage = cropRepository.findByCategoryIdAndIsActiveTrue(categoryId, pageable);
        } else if (season != null) {
            GrowingSeason growingSeason = GrowingSeason.valueOf(season.toUpperCase());
            cropPage = cropRepository.findByGrowingSeasonAndIsActiveTrue(growingSeason, pageable);
        } else {
            cropPage = cropRepository.findByIsActiveTrue(pageable);
        }

        List<CropSummaryDto> content = cropPage.getContent()
                .stream()
                .map(this::toSummaryDto)
                .collect(Collectors.toList());

        return PagedResponse.<CropSummaryDto>builder()
                .content(content)
                .page(cropPage.getNumber())
                .size(cropPage.getSize())
                .totalElements(cropPage.getTotalElements())
                .totalPages(cropPage.getTotalPages())
                .last(cropPage.isLast())
                .first(cropPage.isFirst())
                .build();
    }

    @Transactional(readOnly = true)
    public CropDto getCropById(Long id) {
        Crop crop = cropRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Crop", "id", id));

        List<CropVarietyDto> varieties = varietyRepository
                .findByCropIdAndIsActiveTrueOrderByNameAsc(id)
                .stream()
                .map(v -> CropVarietyDto.builder()
                        .id(v.getId())
                        .name(v.getName())
                        .nameLocal(v.getNameLocal())
                        .maturityDays(v.getMaturityDays())
                        .yieldPerHectare(v.getYieldPerHectare())
                        .developedBy(v.getDevelopedBy())
                        .yearOfRelease(v.getYearOfRelease())
                        .build())
                .collect(Collectors.toList());

        return toCropDto(crop, varieties);
    }

    @Transactional(readOnly = true)
    public List<CropVarietyDto> getVarietiesByCrop(Long cropId) {
        return varietyRepository.findByCropIdAndIsActiveTrueOrderByNameAsc(cropId)
                .stream()
                .map(v -> CropVarietyDto.builder()
                        .id(v.getId())
                        .name(v.getName())
                        .nameLocal(v.getNameLocal())
                        .maturityDays(v.getMaturityDays())
                        .yieldPerHectare(v.getYieldPerHectare())
                        .developedBy(v.getDevelopedBy())
                        .yearOfRelease(v.getYearOfRelease())
                        .build())
                .collect(Collectors.toList());
    }

    // --- Mapping helpers ---

    private CropCategoryDto toCategoryDto(CropCategory category) {
        return CropCategoryDto.builder()
                .id(category.getId())
                .name(category.getName())
                .nameLocal(category.getNameLocal())
                .description(category.getDescription())
                .iconUrl(category.getIconUrl())
                .build();
    }

    private CropSummaryDto toSummaryDto(Crop crop) {
        return CropSummaryDto.builder()
                .id(crop.getId())
                .name(crop.getName())
                .nameLocal(crop.getNameLocal())
                .imageUrl(crop.getImageUrl())
                .growingSeason(crop.getGrowingSeason().name())
                .categoryName(crop.getCategory().getName())
                .growthDurationDays(crop.getGrowthDurationDays())
                .waterRequirement(crop.getWaterRequirement())
                .build();
    }

    private CropDto toCropDto(Crop crop, List<CropVarietyDto> varieties) {
        return CropDto.builder()
                .id(crop.getId())
                .name(crop.getName())
                .nameLocal(crop.getNameLocal())
                .scientificName(crop.getScientificName())
                .description(crop.getDescription())
                .imageUrl(crop.getImageUrl())
                .growingSeason(crop.getGrowingSeason().name())
                .categoryName(crop.getCategory().getName())
                .categoryId(crop.getCategory().getId())
                .minTemperature(crop.getMinTemperature())
                .maxTemperature(crop.getMaxTemperature())
                .minRainfall(crop.getMinRainfall())
                .maxRainfall(crop.getMaxRainfall())
                .minPh(crop.getMinPh())
                .maxPh(crop.getMaxPh())
                .waterRequirement(crop.getWaterRequirement())
                .soilTypesSuitable(crop.getSoilTypesSuitable())
                .growthDurationDays(crop.getGrowthDurationDays())
                .varieties(varieties != null ? varieties : Collections.emptyList())
                .build();
    }
}
