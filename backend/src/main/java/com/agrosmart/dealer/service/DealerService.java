package com.agrosmart.dealer.service;

import com.agrosmart.common.exception.ResourceNotFoundException;
import com.agrosmart.dealer.dto.CreateDealerProductRequest;
import com.agrosmart.dealer.dto.DealerProductDto;
import com.agrosmart.dealer.dto.UpdateDealerProductRequest;
import com.agrosmart.dealer.entity.DealerProduct;
import com.agrosmart.dealer.repository.DealerProductRepository;
import com.agrosmart.user.entity.User;
import com.agrosmart.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DealerService {

    private final DealerProductRepository dealerProductRepository;
    private final UserRepository userRepository;

    public DealerService(DealerProductRepository dealerProductRepository, UserRepository userRepository) {
        this.dealerProductRepository = dealerProductRepository;
        this.userRepository = userRepository;
    }

    /**
     * Get all active products listed by a specific dealer.
     */
    @Transactional(readOnly = true)
    public List<DealerProductDto> getMyProducts(Long dealerUserId) {
        return dealerProductRepository.findByDealerIdAndIsActiveTrueOrderByCreatedAtDesc(dealerUserId)
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    /**
     * Get all active product listings on the marketplace (for consumers/public).
     */
    @Transactional(readOnly = true)
    public List<DealerProductDto> getAllActiveListings(String keyword) {
        if (keyword != null && !keyword.isBlank()) {
            return dealerProductRepository.searchByKeyword(keyword)
                    .stream().map(this::toDto).collect(Collectors.toList());
        }
        return dealerProductRepository.findByIsActiveTrueOrderByCreatedAtDesc()
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    /**
     * Create a new product listing for a dealer.
     */
    @Transactional
    public DealerProductDto createProduct(Long dealerUserId, CreateDealerProductRequest request) {
        User dealer = userRepository.findById(dealerUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", dealerUserId));

        DealerProduct product = DealerProduct.builder()
                .dealer(dealer)
                .name(request.getName())
                .category(parseCategory(request.getCategory()))
                .description(request.getDescription())
                .pricePerUnit(request.getPricePerUnit())
                .stockQuantity(request.getStockQuantity())
                .unit(request.getUnit())
                .brandName(request.getBrandName())
                .build();

        return toDto(dealerProductRepository.save(product));
    }

    /**
     * Update a product listing (only by the owning dealer).
     */
    @Transactional
    public DealerProductDto updateProduct(Long dealerUserId, Long productId, UpdateDealerProductRequest request) {
        DealerProduct product = dealerProductRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("DealerProduct", "id", productId));

        if (!product.getDealer().getId().equals(dealerUserId)) {
            throw new com.agrosmart.common.exception.BadRequestException("You can only update your own products");
        }

        if (request.getName() != null) product.setName(request.getName());
        if (request.getDescription() != null) product.setDescription(request.getDescription());
        if (request.getPricePerUnit() != null) product.setPricePerUnit(request.getPricePerUnit());
        if (request.getStockQuantity() != null) product.setStockQuantity(request.getStockQuantity());
        if (request.getUnit() != null) product.setUnit(request.getUnit());
        if (request.getBrandName() != null) product.setBrandName(request.getBrandName());
        if (request.getIsActive() != null) product.setIsActive(request.getIsActive());

        return toDto(dealerProductRepository.save(product));
    }

    /**
     * Soft-delete a product (set isActive = false).
     */
    @Transactional
    public void deleteProduct(Long dealerUserId, Long productId) {
        DealerProduct product = dealerProductRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("DealerProduct", "id", productId));

        if (!product.getDealer().getId().equals(dealerUserId)) {
            throw new com.agrosmart.common.exception.BadRequestException("You can only delete your own products");
        }

        product.setIsActive(false);
        dealerProductRepository.save(product);
    }

    private DealerProduct.ProductCategory parseCategory(String category) {
        try {
            return DealerProduct.ProductCategory.valueOf(category.toUpperCase());
        } catch (Exception e) {
            return DealerProduct.ProductCategory.OTHER;
        }
    }

    private DealerProductDto toDto(DealerProduct p) {
        return DealerProductDto.builder()
                .id(p.getId())
                .dealerId(p.getDealer().getId())
                .dealerName(p.getDealer().getFullName())
                .name(p.getName())
                .category(p.getCategory().name())
                .description(p.getDescription())
                .pricePerUnit(p.getPricePerUnit())
                .stockQuantity(p.getStockQuantity())
                .unit(p.getUnit())
                .brandName(p.getBrandName())
                .isActive(p.getIsActive())
                .createdAt(p.getCreatedAt())
                .build();
    }
}
