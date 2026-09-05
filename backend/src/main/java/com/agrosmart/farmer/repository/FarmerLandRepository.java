package com.agrosmart.farmer.repository;

import com.agrosmart.farmer.entity.FarmerLand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FarmerLandRepository extends JpaRepository<FarmerLand, Long> {
    List<FarmerLand> findByFarmerIdAndIsActiveTrue(Long farmerId);
}
