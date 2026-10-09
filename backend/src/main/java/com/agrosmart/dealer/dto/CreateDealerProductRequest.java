package com.agrosmart.dealer.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateDealerProductRequest {

    @NotBlank(message = "Product name is required")
    private String name;

    @NotNull(message = "Category is required")
    private String category;

    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01", message = "Price must be positive")
    private BigDecimal pricePerUnit;

    @NotNull(message = "Stock quantity is required")
    @DecimalMin(value = "0", message = "Stock cannot be negative")
    private BigDecimal stockQuantity;

    @NotBlank(message = "Unit is required")
    private String unit;

    private String brandName;
}
