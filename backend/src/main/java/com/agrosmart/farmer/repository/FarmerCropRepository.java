package com.agrosmart.farmer.repository;

import com.agrosmart.farmer.entity.FarmerCrop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FarmerCropRepository extends JpaRepository<FarmerCrop, Long> {
    List<FarmerCrop> findByFarmerIdOrderBySeasonYearDesc(Long farmerId);
    Page<FarmerCrop> findByFarmerIdOrderBySeasonYearDesc(Long farmerId, Pageable pageable);
}
