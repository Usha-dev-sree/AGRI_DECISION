package com.agrosmart.geography.repository;

import com.agrosmart.geography.entity.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DistrictRepository extends JpaRepository<District, Long> {
    List<District> findByStateIdAndIsActiveTrueOrderByNameAsc(Long stateId);
}
