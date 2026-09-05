package com.agrosmart.market.repository;

import com.agrosmart.market.entity.Mandi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MandiRepository extends JpaRepository<Mandi, Long> {
    List<Mandi> findByStateIdAndIsActiveTrueOrderByNameAsc(Long stateId);
    List<Mandi> findByDistrictIdAndIsActiveTrueOrderByNameAsc(Long districtId);
    List<Mandi> findByIsActiveTrueOrderByNameAsc();
}
