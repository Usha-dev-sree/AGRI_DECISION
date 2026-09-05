package com.agrosmart.crop.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "crop_varieties")
@Data
@NoArgsConstructor
public class CropVariety {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id", nullable = false)
    private Crop crop;

    @Column(nullable = false)
    private String name;

    @Column(name = "name_local")
    private String nameLocal;

    @Column(name = "maturity_days")
    private Integer maturityDays;

    @Column(name = "yield_per_hectare")
    private BigDecimal yieldPerHectare;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "developed_by")
    private String developedBy;

    @Column(name = "year_of_release")
    private Integer yearOfRelease;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
