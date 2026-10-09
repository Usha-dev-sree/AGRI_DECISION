-- ===================================================================
-- V6: Dealer Products Table
-- Stores product catalog listings by registered dealers
-- ===================================================================

CREATE TABLE IF NOT EXISTS dealer_products (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dealer_id BIGINT NOT NULL COMMENT 'FK to users.id (must have DEALER role)',
    name VARCHAR(200) NOT NULL COMMENT 'Product name',
    category ENUM('SEED', 'FERTILIZER', 'PESTICIDE', 'EQUIPMENT', 'IRRIGATION', 'ORGANIC', 'OTHER') NOT NULL DEFAULT 'OTHER',
    description TEXT COMMENT 'Detailed product description',
    price_per_unit DECIMAL(10, 2) NOT NULL COMMENT 'Price per unit in INR',
    stock_quantity DECIMAL(10, 2) NOT NULL DEFAULT 0 COMMENT 'Available stock quantity',
    unit VARCHAR(30) NOT NULL DEFAULT 'piece' COMMENT 'e.g. bag, kg, bottle, piece, litre',
    brand_name VARCHAR(100) COMMENT 'Brand or manufacturer name',
    is_active BOOLEAN NOT NULL DEFAULT TRUE COMMENT 'Soft-delete flag',
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    CONSTRAINT fk_dealer_products_user FOREIGN KEY (dealer_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_dealer_products_dealer_id (dealer_id),
    INDEX idx_dealer_products_category (category),
    INDEX idx_dealer_products_is_active (is_active)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci
  COMMENT = 'Product catalog listings by dealers';

-- ===================================================================
-- Seed data: Sample dealer products
-- Note: These will only be inserted if a DEALER user with id=1 exists.
-- In production, dealers add products via the API.
-- ===================================================================

-- (No seed data inserted here to avoid FK violations; products are created via API)
