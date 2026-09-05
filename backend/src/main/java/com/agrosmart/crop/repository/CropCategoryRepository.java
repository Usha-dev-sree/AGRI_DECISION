package com.agrosmart.crop.repository;

import com.agrosmart.crop.entity.CropCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropCategoryRepository extends JpaRepository<CropCategory, Long> {
    List<CropCategory> findByIsActiveTrueOrderByNameAsc();
}
