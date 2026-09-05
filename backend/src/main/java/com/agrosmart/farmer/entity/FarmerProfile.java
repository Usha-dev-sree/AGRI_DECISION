package com.agrosmart.farmer.entity;

import com.agrosmart.user.entity.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "farmer_profiles")
@Data
@NoArgsConstructor
public class FarmerProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "total_land_area")
    private BigDecimal totalLandArea;

    @Enumerated(EnumType.STRING)
    @Column(name = "land_unit")
    private LandUnit landUnit = LandUnit.ACRE;

    @Enumerated(EnumType.STRING)
    @Column(name = "soil_type")
    private SoilType soilType = SoilType.OTHER;

    @Enumerated(EnumType.STRING)
    @Column(name = "irrigation_type")
    private IrrigationType irrigationType = IrrigationType.RAINFED;

    @Column(name = "farming_experience_years")
    private Integer farmingExperienceYears = 0;

    @Column(name = "annual_income_range")
    private String annualIncomeRange;

    @Column(name = "is_organic_farmer")
    private Boolean isOrganicFarmer = false;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum LandUnit { HECTARE, ACRE, BIGHA, GUNTA }
    public enum SoilType { ALLUVIAL, BLACK, RED, LATERITE, DESERT, MOUNTAIN, CLAY, SANDY, LOAMY, OTHER }
    public enum IrrigationType { RAINFED, CANAL, BOREWELL, DRIP, SPRINKLER, TANK, RIVER, OTHER }
}
