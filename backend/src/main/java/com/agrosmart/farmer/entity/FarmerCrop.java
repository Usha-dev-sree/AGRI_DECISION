package com.agrosmart.farmer.entity;

import com.agrosmart.crop.entity.Crop;
import com.agrosmart.crop.entity.CropVariety;
import com.agrosmart.crop.entity.GrowingSeason;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "farmer_crops")
@Data
@NoArgsConstructor
public class FarmerCrop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = false)
    private FarmerProfile farmer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "land_id")
    private FarmerLand land;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id", nullable = false)
    private Crop crop;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "variety_id")
    private CropVariety variety;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GrowingSeason season;

    @Column(name = "season_year", nullable = false)
    private Integer seasonYear;

    @Column(name = "sowing_date")
    private LocalDate sowingDate;

    @Column(name = "expected_harvest_date")
    private LocalDate expectedHarvestDate;

    @Column(name = "actual_harvest_date")
    private LocalDate actualHarvestDate;

    @Column(name = "area_sown")
    private BigDecimal areaSown;

    @Enumerated(EnumType.STRING)
    @Column(name = "area_unit")
    private FarmerProfile.LandUnit areaUnit = FarmerProfile.LandUnit.ACRE;

    @Column(name = "expected_yield")
    private BigDecimal expectedYield;

    @Column(name = "actual_yield")
    private BigDecimal actualYield;

    @Column(name = "yield_unit")
    private String yieldUnit = "quintal";

    @Column(name = "total_input_cost")
    private BigDecimal totalInputCost;

    @Column(name = "total_revenue")
    private BigDecimal totalRevenue;

    @Enumerated(EnumType.STRING)
    private CropStatus status = CropStatus.PLANNED;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum CropStatus { PLANNED, SOWN, GROWING, HARVESTED, FAILED }
}
