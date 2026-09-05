package com.agrosmart.geography.service;

import com.agrosmart.geography.dto.DistrictDto;
import com.agrosmart.geography.dto.StateDto;
import com.agrosmart.geography.dto.TalukDto;
import com.agrosmart.geography.repository.DistrictRepository;
import com.agrosmart.geography.repository.StateRepository;
import com.agrosmart.geography.repository.TalukRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GeographyService {

    private final StateRepository stateRepository;
    private final DistrictRepository districtRepository;
    private final TalukRepository talukRepository;

    public GeographyService(StateRepository stateRepository,
                            DistrictRepository districtRepository,
                            TalukRepository talukRepository) {
        this.stateRepository = stateRepository;
        this.districtRepository = districtRepository;
        this.talukRepository = talukRepository;
    }

    @Transactional(readOnly = true)
    public List<StateDto> getAllStates() {
        return stateRepository.findByIsActiveTrueOrderByNameAsc()
                .stream()
                .map(state -> StateDto.builder()
                        .id(state.getId())
                        .name(state.getName())
                        .nameLocal(state.getNameLocal())
                        .code(state.getCode())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<DistrictDto> getDistrictsByState(Long stateId) {
        return districtRepository.findByStateIdAndIsActiveTrueOrderByNameAsc(stateId)
                .stream()
                .map(d -> DistrictDto.builder()
                        .id(d.getId())
                        .name(d.getName())
                        .nameLocal(d.getNameLocal())
                        .stateId(stateId)
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TalukDto> getTaluksByDistrict(Long districtId) {
        return talukRepository.findByDistrictIdAndIsActiveTrueOrderByNameAsc(districtId)
                .stream()
                .map(t -> TalukDto.builder()
                        .id(t.getId())
                        .name(t.getName())
                        .nameLocal(t.getNameLocal())
                        .districtId(districtId)
                        .build())
                .collect(Collectors.toList());
    }
}
