package com.agrosmart.farmer.service;

import com.agrosmart.common.exception.ResourceNotFoundException;
import com.agrosmart.farmer.dto.*;
import com.agrosmart.farmer.entity.*;
import com.agrosmart.farmer.repository.*;
import com.agrosmart.user.entity.User;
import com.agrosmart.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import com.agrosmart.crop.repository.CropRepository;
import com.agrosmart.crop.repository.CropVarietyRepository;
import com.agrosmart.geography.repository.StateRepository;
import com.agrosmart.geography.repository.DistrictRepository;
import com.agrosmart.geography.repository.TalukRepository;

@Service
public class FarmerService {

    private final FarmerProfileRepository farmerProfileRepository;
    private final FarmerLandRepository farmerLandRepository;
    private final FarmerCropRepository farmerCropRepository;
    private final UserRepository userRepository;
    
    private final StateRepository stateRepository;
    private final DistrictRepository districtRepository;
    private final TalukRepository talukRepository;
    private final CropRepository cropRepository;
    private final CropVarietyRepository cropVarietyRepository;

    public FarmerService(FarmerProfileRepository farmerProfileRepository,
                         FarmerLandRepository farmerLandRepository,
                         FarmerCropRepository farmerCropRepository,
                         UserRepository userRepository,
                         StateRepository stateRepository,
                         DistrictRepository districtRepository,
                         TalukRepository talukRepository,
                         CropRepository cropRepository,
                         CropVarietyRepository cropVarietyRepository) {
        this.farmerProfileRepository = farmerProfileRepository;
        this.farmerLandRepository = farmerLandRepository;
        this.farmerCropRepository = farmerCropRepository;
        this.userRepository = userRepository;
        this.stateRepository = stateRepository;
        this.districtRepository = districtRepository;
        this.talukRepository = talukRepository;
        this.cropRepository = cropRepository;
        this.cropVarietyRepository = cropVarietyRepository;
    }

    @Transactional
    public FarmerProfileDto getOrCreateProfile(Long userId) {
        FarmerProfile profile = farmerProfileRepository.findByUserId(userId)
                .orElseGet(() -> {
                    User user = userRepository.findById(userId)
                            .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
                    FarmerProfile newProfile = new FarmerProfile();
                    newProfile.setUser(user);
                    return farmerProfileRepository.save(newProfile);
                });
        return toProfileDto(profile);
    }

    @Transactional(readOnly = true)
    public List<FarmerLandDto> getLandsByFarmerUserId(Long userId) {
        FarmerProfile profile = getProfileEntityByUserId(userId);
        return farmerLandRepository.findByFarmerIdAndIsActiveTrue(profile.getId())
                .stream().map(this::toLandDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<FarmerCropDto> getCropsByFarmerUserId(Long userId) {
        FarmerProfile profile = getProfileEntityByUserId(userId);
        return farmerCropRepository.findByFarmerIdOrderBySeasonYearDesc(profile.getId())
                .stream().map(this::toCropDto).collect(Collectors.toList());
    }

    @Transactional
    public FarmerLandDto addLand(Long userId, AddLandRequest request) {
        FarmerProfile profile = getProfileEntityByUserId(userId);
        
        FarmerLand land = new FarmerLand();
        land.setFarmer(profile);
        land.setLandName(request.getLandName());
        land.setArea(request.getArea());
        land.setUnit(request.getUnit() != null ? request.getUnit() : FarmerProfile.LandUnit.ACRE);
        land.setSoilType(request.getSoilType());
        land.setIrrigationType(request.getIrrigationType());
        land.setLatitude(request.getLatitude());
        land.setLongitude(request.getLongitude());
        
        if (request.getStateId() != null) {
            land.setState(stateRepository.findById(request.getStateId()).orElse(null));
        }
        if (request.getDistrictId() != null) {
            land.setDistrict(districtRepository.findById(request.getDistrictId()).orElse(null));
        }
        if (request.getTalukId() != null) {
            land.setTaluk(talukRepository.findById(request.getTalukId()).orElse(null));
        }
        
        return toLandDto(farmerLandRepository.save(land));
    }

    @Transactional
    public FarmerCropDto addCrop(Long userId, AddCropRequest request) {
        FarmerProfile profile = getProfileEntityByUserId(userId);
        
        FarmerCrop crop = new FarmerCrop();
        crop.setFarmer(profile);
        
        if (request.getLandId() != null) {
            crop.setLand(farmerLandRepository.findById(request.getLandId()).orElse(null));
        }
        
        crop.setCrop(cropRepository.findById(request.getCropId())
                .orElseThrow(() -> new ResourceNotFoundException("Crop", "id", request.getCropId())));
                
        if (request.getVarietyId() != null) {
            crop.setVariety(cropVarietyRepository.findById(request.getVarietyId()).orElse(null));
        }
        
        crop.setSeason(request.getSeason());
        crop.setSeasonYear(request.getSeasonYear());
        crop.setSowingDate(request.getSowingDate());
        crop.setExpectedHarvestDate(request.getExpectedHarvestDate());
        crop.setActualHarvestDate(request.getActualHarvestDate());
        crop.setAreaSown(request.getAreaSown());
        crop.setAreaUnit(request.getAreaUnit());
        crop.setExpectedYield(request.getExpectedYield());
        crop.setActualYield(request.getActualYield());
        crop.setYieldUnit(request.getYieldUnit());
        crop.setTotalInputCost(request.getTotalInputCost());
        crop.setTotalRevenue(request.getTotalRevenue());
        crop.setStatus(request.getStatus());
        crop.setNotes(request.getNotes());
        
        return toCropDto(farmerCropRepository.save(crop));
    }

    private FarmerProfile getProfileEntityByUserId(Long userId) {
        return farmerProfileRepository.findByUserId(userId)
                .orElseGet(() -> {
                    User user = userRepository.findById(userId)
                            .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
                    FarmerProfile newProfile = new FarmerProfile();
                    newProfile.setUser(user);
                    return farmerProfileRepository.save(newProfile);
                });
    }

    private FarmerProfileDto toProfileDto(FarmerProfile p) {
        return FarmerProfileDto.builder()
                .id(p.getId())
                .userId(p.getUser().getId())
                .fullName(p.getUser().getFullName())
                .totalLandArea(p.getTotalLandArea())
                .landUnit(p.getLandUnit().name())
                .soilType(p.getSoilType().name())
                .irrigationType(p.getIrrigationType().name())
                .farmingExperienceYears(p.getFarmingExperienceYears())
                .annualIncomeRange(p.getAnnualIncomeRange())
                .isOrganicFarmer(p.getIsOrganicFarmer())
                .build();
    }

    private FarmerLandDto toLandDto(FarmerLand l) {
        return FarmerLandDto.builder()
                .id(l.getId())
                .farmerId(l.getFarmer().getId())
                .landName(l.getLandName())
                .area(l.getArea())
                .unit(l.getUnit().name())
                .soilType(l.getSoilType() != null ? l.getSoilType().name() : null)
                .irrigationType(l.getIrrigationType() != null ? l.getIrrigationType().name() : null)
                .latitude(l.getLatitude())
                .longitude(l.getLongitude())
                .stateId(l.getState() != null ? l.getState().getId() : null)
                .stateName(l.getState() != null ? l.getState().getName() : null)
                .districtId(l.getDistrict() != null ? l.getDistrict().getId() : null)
                .districtName(l.getDistrict() != null ? l.getDistrict().getName() : null)
                .talukId(l.getTaluk() != null ? l.getTaluk().getId() : null)
                .talukName(l.getTaluk() != null ? l.getTaluk().getName() : null)
                .build();
    }

    private FarmerCropDto toCropDto(FarmerCrop c) {
        return FarmerCropDto.builder()
                .id(c.getId())
                .farmerId(c.getFarmer().getId())
                .landId(c.getLand() != null ? c.getLand().getId() : null)
                .landName(c.getLand() != null ? c.getLand().getLandName() : null)
                .cropId(c.getCrop().getId())
                .cropName(c.getCrop().getName())
                .categoryName(c.getCrop().getCategory().getName())
                .varietyId(c.getVariety() != null ? c.getVariety().getId() : null)
                .varietyName(c.getVariety() != null ? c.getVariety().getName() : null)
                .season(c.getSeason().name())
                .seasonYear(c.getSeasonYear())
                .sowingDate(c.getSowingDate())
                .expectedHarvestDate(c.getExpectedHarvestDate())
                .actualHarvestDate(c.getActualHarvestDate())
                .areaSown(c.getAreaSown())
                .areaUnit(c.getAreaUnit() != null ? c.getAreaUnit().name() : null)
                .expectedYield(c.getExpectedYield())
                .actualYield(c.getActualYield())
                .yieldUnit(c.getYieldUnit())
                .totalInputCost(c.getTotalInputCost())
                .totalRevenue(c.getTotalRevenue())
                .status(c.getStatus().name())
                .notes(c.getNotes())
                .build();
    }
}
