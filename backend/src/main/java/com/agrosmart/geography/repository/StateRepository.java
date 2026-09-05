package com.agrosmart.geography.repository;

import com.agrosmart.geography.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StateRepository extends JpaRepository<State, Long> {
    List<State> findByIsActiveTrueOrderByNameAsc();
    Optional<State> findByCode(String code);
}
