package com.agrosmart.farmer.entity;

import com.agrosmart.geography.entity.District;
import com.agrosmart.geography.entity.State;
import com.agrosmart.geography.entity.Taluk;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "farmer_lands")
@Data
@NoArgsConstructor
public class FarmerLand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = false)
    private FarmerProfile farmer;

    @Column(name = "land_name")
    private String landName;

    @Column(nullable = false)
    private BigDecimal area;

    @Enumerated(EnumType.STRING)
    private FarmerProfile.LandUnit unit = FarmerProfile.LandUnit.ACRE;

    @Enumerated(EnumType.STRING)
    @Column(name = "soil_type")
    private FarmerProfile.SoilType soilType;

    @Enumerated(EnumType.STRING)
    @Column(name = "irrigation_type")
    private FarmerProfile.IrrigationType irrigationType;

    private BigDecimal latitude;
    private BigDecimal longitude;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "state_id")
    private State state;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "district_id")
    private District district;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "taluk_id")
    private Taluk taluk;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
