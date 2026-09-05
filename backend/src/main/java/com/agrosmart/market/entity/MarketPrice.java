package com.agrosmart.market.entity;

import com.agrosmart.crop.entity.Crop;
import com.agrosmart.crop.entity.CropVariety;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "market_prices")
@Data
@NoArgsConstructor
public class MarketPrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mandi_id", nullable = false)
    private Mandi mandi;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id", nullable = false)
    private Crop crop;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "variety_id")
    private CropVariety variety;

    @Column(name = "min_price_per_quintal")
    private BigDecimal minPricePerQuintal;

    @Column(name = "max_price_per_quintal")
    private BigDecimal maxPricePerQuintal;

    @Column(name = "modal_price_per_quintal", nullable = false)
    private BigDecimal modalPricePerQuintal;

    @Column(name = "arrival_quantity")
    private BigDecimal arrivalQuantity;

    @Column(name = "price_date", nullable = false)
    private LocalDate priceDate;

    @Column(name = "unit")
    private String unit = "₹/quintal";

    private String source;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
