package com.agrosmart.crop.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "crops")
@Data
@NoArgsConstructor
public class Crop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private CropCategory category;

    @Column(nullable = false)
    private String name;

    @Column(name = "name_local")
    private String nameLocal;

    @Column(name = "scientific_name")
    private String scientificName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "growing_season", nullable = false)
    private GrowingSeason growingSeason;

    @Column(name = "min_temperature")
    private BigDecimal minTemperature;

    @Column(name = "max_temperature")
    private BigDecimal maxTemperature;

    @Column(name = "min_rainfall")
    private BigDecimal minRainfall;

    @Column(name = "max_rainfall")
    private BigDecimal maxRainfall;

    @Column(name = "min_ph")
    private BigDecimal minPh;

    @Column(name = "max_ph")
    private BigDecimal maxPh;

    @Column(name = "min_humidity")
    private BigDecimal minHumidity;

    @Column(name = "max_humidity")
    private BigDecimal maxHumidity;

    @Column(name = "water_requirement")
    private String waterRequirement;

    @Column(name = "soil_types_suitable")
    private String soilTypesSuitable;

    @Column(name = "growth_duration_days")
    private Integer growthDurationDays;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @OneToMany(mappedBy = "crop", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CropVariety> varieties = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
