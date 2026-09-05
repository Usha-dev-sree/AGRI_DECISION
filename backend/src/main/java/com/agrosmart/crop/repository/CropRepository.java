package com.agrosmart.crop.repository;

import com.agrosmart.crop.entity.Crop;
import com.agrosmart.crop.entity.GrowingSeason;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropRepository extends JpaRepository<Crop, Long> {

    Page<Crop> findByIsActiveTrue(Pageable pageable);

    Page<Crop> findByCategoryIdAndIsActiveTrue(Long categoryId, Pageable pageable);

    Page<Crop> findByGrowingSeasonAndIsActiveTrue(GrowingSeason season, Pageable pageable);

    Page<Crop> findByCategoryIdAndGrowingSeasonAndIsActiveTrue(Long categoryId, GrowingSeason season, Pageable pageable);

    @Query("SELECT c FROM Crop c WHERE c.isActive = true AND LOWER(c.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Crop> searchByName(@Param("keyword") String keyword, Pageable pageable);

    List<Crop> findByIsActiveTrueOrderByNameAsc();
}
