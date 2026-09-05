package com.agrosmart.crop.repository;

import com.agrosmart.crop.entity.CropVariety;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropVarietyRepository extends JpaRepository<CropVariety, Long> {
    List<CropVariety> findByCropIdAndIsActiveTrueOrderByNameAsc(Long cropId);
}
