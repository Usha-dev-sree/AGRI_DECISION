package com.agrosmart.market.repository;

import com.agrosmart.market.entity.MarketPrice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MarketPriceRepository extends JpaRepository<MarketPrice, Long> {

    Page<MarketPrice> findByCropIdOrderByPriceDateDesc(Long cropId, Pageable pageable);

    Page<MarketPrice> findByMandiIdOrderByPriceDateDesc(Long mandiId, Pageable pageable);

    long countByPriceDateGreaterThanEqual(LocalDate startDate);

    @Query("SELECT mp FROM MarketPrice mp WHERE mp.crop.id = :cropId AND (:stateId IS NULL OR mp.mandi.state.id = :stateId) AND mp.priceDate >= :startDate ORDER BY mp.priceDate ASC")
    List<MarketPrice> findChartData(@Param("cropId") Long cropId, @Param("stateId") Long stateId, @Param("startDate") LocalDate startDate);

    @Query("SELECT mp FROM MarketPrice mp WHERE mp.crop.id = :cropId AND mp.mandi.id = :mandiId " +
           "AND mp.priceDate BETWEEN :startDate AND :endDate ORDER BY mp.priceDate DESC")
    List<MarketPrice> findByCropAndMandiAndDateRange(
            @Param("cropId") Long cropId,
            @Param("mandiId") Long mandiId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    @Query("SELECT mp FROM MarketPrice mp WHERE mp.crop.id = :cropId " +
           "AND mp.priceDate = (SELECT MAX(mp2.priceDate) FROM MarketPrice mp2 WHERE mp2.crop.id = :cropId AND mp2.mandi.id = mp.mandi.id)")
    List<MarketPrice> findLatestPricesByCrop(@Param("cropId") Long cropId);
}
