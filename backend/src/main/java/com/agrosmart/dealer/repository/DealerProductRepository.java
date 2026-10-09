package com.agrosmart.dealer.repository;

import com.agrosmart.dealer.entity.DealerProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DealerProductRepository extends JpaRepository<DealerProduct, Long> {

    List<DealerProduct> findByDealerIdAndIsActiveTrueOrderByCreatedAtDesc(Long dealerId);

    List<DealerProduct> findByIsActiveTrueOrderByCreatedAtDesc();

    @Query("SELECT dp FROM DealerProduct dp WHERE dp.isActive = true AND (:category IS NULL OR dp.category = :category) ORDER BY dp.createdAt DESC")
    List<DealerProduct> findByOptionalCategory(@Param("category") DealerProduct.ProductCategory category);

    @Query("SELECT dp FROM DealerProduct dp WHERE dp.isActive = true AND (LOWER(dp.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(dp.brandName) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<DealerProduct> searchByKeyword(@Param("keyword") String keyword);

    long countByDealerIdAndIsActiveTrue(Long dealerId);
}
