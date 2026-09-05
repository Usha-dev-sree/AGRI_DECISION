-- ============================================================
-- AgroSmart India — Core Database Schema
-- MySQL 8.0+
-- ============================================================

CREATE DATABASE IF NOT EXISTS agrosmart
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE agrosmart;

-- ============================================================
-- 1. INDIAN GEOGRAPHY TABLES
-- ============================================================

CREATE TABLE states (
    id          BIGINT       AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    name_local  VARCHAR(200),
    code        VARCHAR(10)  NOT NULL UNIQUE,
    is_active   BOOLEAN      DEFAULT TRUE,
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_states_code (code),
    INDEX idx_states_active (is_active)
) ENGINE=InnoDB;

CREATE TABLE districts (
    id          BIGINT       AUTO_INCREMENT PRIMARY KEY,
    state_id    BIGINT       NOT NULL,
    name        VARCHAR(100) NOT NULL,
    name_local  VARCHAR(200),
    is_active   BOOLEAN      DEFAULT TRUE,
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE CASCADE,
    INDEX idx_districts_state (state_id),
    INDEX idx_districts_active (is_active)
) ENGINE=InnoDB;

CREATE TABLE taluks (
    id          BIGINT       AUTO_INCREMENT PRIMARY KEY,
    district_id BIGINT       NOT NULL,
    name        VARCHAR(100) NOT NULL,
    name_local  VARCHAR(200),
    is_active   BOOLEAN      DEFAULT TRUE,
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (district_id) REFERENCES districts(id) ON DELETE CASCADE,
    INDEX idx_taluks_district (district_id)
) ENGINE=InnoDB;

-- ============================================================
-- 2. USER & AUTHENTICATION TABLES
-- ============================================================

CREATE TABLE users (
    id                  BIGINT        AUTO_INCREMENT PRIMARY KEY,
    email               VARCHAR(255)  UNIQUE,
    phone               VARCHAR(15)   UNIQUE,
    password_hash       VARCHAR(255)  NOT NULL,
    full_name           VARCHAR(200)  NOT NULL,
    role                ENUM('FARMER', 'DEALER', 'CONSUMER', 'ADMIN', 'GOVT_OFFICER') NOT NULL DEFAULT 'FARMER',
    preferred_language  VARCHAR(10)   DEFAULT 'en',
    is_active           BOOLEAN       DEFAULT TRUE,
    is_email_verified   BOOLEAN       DEFAULT FALSE,
    is_phone_verified   BOOLEAN       DEFAULT FALSE,
    last_login_at       TIMESTAMP     NULL,
    created_at          TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_users_email (email),
    INDEX idx_users_phone (phone),
    INDEX idx_users_role (role),
    INDEX idx_users_active (is_active)
) ENGINE=InnoDB;

CREATE TABLE user_profiles (
    id              BIGINT        AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT        NOT NULL UNIQUE,
    address         TEXT,
    pincode         VARCHAR(10),
    state_id        BIGINT,
    district_id     BIGINT,
    taluk_id        BIGINT,
    village         VARCHAR(200),
    profile_photo_url VARCHAR(500),
    date_of_birth   DATE,
    gender          ENUM('MALE', 'FEMALE', 'OTHER'),
    created_at      TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE SET NULL,
    FOREIGN KEY (district_id) REFERENCES districts(id) ON DELETE SET NULL,
    FOREIGN KEY (taluk_id) REFERENCES taluks(id) ON DELETE SET NULL,
    INDEX idx_user_profiles_user (user_id)
) ENGINE=InnoDB;

CREATE TABLE refresh_tokens (
    id          BIGINT        AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT        NOT NULL,
    token       VARCHAR(500)  NOT NULL UNIQUE,
    expires_at  TIMESTAMP     NOT NULL,
    created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_refresh_tokens_token (token),
    INDEX idx_refresh_tokens_user (user_id)
) ENGINE=InnoDB;

-- ============================================================
-- 3. CROP MASTER TABLES
-- ============================================================

CREATE TABLE crop_categories (
    id          BIGINT       AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL UNIQUE,
    name_local  VARCHAR(200),
    description TEXT,
    icon_url    VARCHAR(500),
    is_active   BOOLEAN      DEFAULT TRUE,
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE crops (
    id              BIGINT        AUTO_INCREMENT PRIMARY KEY,
    category_id     BIGINT        NOT NULL,
    name            VARCHAR(100)  NOT NULL,
    name_local      VARCHAR(200),
    scientific_name VARCHAR(200),
    description     TEXT,
    image_url       VARCHAR(500),
    growing_season  ENUM('KHARIF', 'RABI', 'ZAID', 'ALL_SEASON') NOT NULL DEFAULT 'ALL_SEASON',
    min_temperature DECIMAL(5,2),
    max_temperature DECIMAL(5,2),
    min_rainfall    DECIMAL(8,2),
    max_rainfall    DECIMAL(8,2),
    min_ph          DECIMAL(4,2),
    max_ph          DECIMAL(4,2),
    min_humidity    DECIMAL(5,2),
    max_humidity    DECIMAL(5,2),
    water_requirement ENUM('LOW', 'MEDIUM', 'HIGH') DEFAULT 'MEDIUM',
    soil_types_suitable VARCHAR(500),
    growth_duration_days INT,
    is_active       BOOLEAN       DEFAULT TRUE,
    created_at      TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES crop_categories(id) ON DELETE RESTRICT,
    INDEX idx_crops_category (category_id),
    INDEX idx_crops_season (growing_season),
    INDEX idx_crops_name (name),
    INDEX idx_crops_active (is_active)
) ENGINE=InnoDB;

CREATE TABLE crop_varieties (
    id                  BIGINT        AUTO_INCREMENT PRIMARY KEY,
    crop_id             BIGINT        NOT NULL,
    name                VARCHAR(100)  NOT NULL,
    name_local          VARCHAR(200),
    maturity_days       INT,
    yield_per_hectare   DECIMAL(10,2),
    description         TEXT,
    developed_by        VARCHAR(200),
    year_of_release     INT,
    is_active           BOOLEAN       DEFAULT TRUE,
    created_at          TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (crop_id) REFERENCES crops(id) ON DELETE CASCADE,
    INDEX idx_varieties_crop (crop_id)
) ENGINE=InnoDB;

-- ============================================================
-- 4. MARKET & MANDI TABLES
-- ============================================================

CREATE TABLE mandis (
    id          BIGINT        AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(200)  NOT NULL,
    state_id    BIGINT        NOT NULL,
    district_id BIGINT        NOT NULL,
    address     TEXT,
    latitude    DECIMAL(10,7),
    longitude   DECIMAL(10,7),
    is_active   BOOLEAN       DEFAULT TRUE,
    created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE RESTRICT,
    FOREIGN KEY (district_id) REFERENCES districts(id) ON DELETE RESTRICT,
    INDEX idx_mandis_state (state_id),
    INDEX idx_mandis_district (district_id)
) ENGINE=InnoDB;

CREATE TABLE market_prices (
    id                      BIGINT        AUTO_INCREMENT PRIMARY KEY,
    mandi_id                BIGINT        NOT NULL,
    crop_id                 BIGINT        NOT NULL,
    variety_id              BIGINT,
    min_price_per_quintal   DECIMAL(12,2),
    max_price_per_quintal   DECIMAL(12,2),
    modal_price_per_quintal DECIMAL(12,2) NOT NULL,
    arrival_quantity        DECIMAL(12,2),
    price_date              DATE          NOT NULL,
    unit                    VARCHAR(20)   DEFAULT '₹/quintal',
    source                  VARCHAR(100)  DEFAULT 'AGMARKNET',
    created_at              TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (mandi_id) REFERENCES mandis(id) ON DELETE CASCADE,
    FOREIGN KEY (crop_id) REFERENCES crops(id) ON DELETE CASCADE,
    FOREIGN KEY (variety_id) REFERENCES crop_varieties(id) ON DELETE SET NULL,
    INDEX idx_market_prices_date (price_date),
    INDEX idx_market_prices_crop (crop_id),
    INDEX idx_market_prices_mandi (mandi_id),
    INDEX idx_market_prices_composite (crop_id, mandi_id, price_date)
) ENGINE=InnoDB;

-- ============================================================
-- 5. FARMER-SPECIFIC TABLES
-- ============================================================

CREATE TABLE farmer_profiles (
    id                      BIGINT     AUTO_INCREMENT PRIMARY KEY,
    user_id                 BIGINT     NOT NULL UNIQUE,
    total_land_area         DECIMAL(10,2),
    land_unit               ENUM('HECTARE', 'ACRE', 'BIGHA', 'GUNTA') DEFAULT 'ACRE',
    soil_type               ENUM('ALLUVIAL', 'BLACK', 'RED', 'LATERITE', 'DESERT', 'MOUNTAIN', 'CLAY', 'SANDY', 'LOAMY', 'OTHER') DEFAULT 'OTHER',
    irrigation_type         ENUM('RAINFED', 'CANAL', 'BOREWELL', 'DRIP', 'SPRINKLER', 'TANK', 'RIVER', 'OTHER') DEFAULT 'RAINFED',
    farming_experience_years INT DEFAULT 0,
    annual_income_range     VARCHAR(50),
    is_organic_farmer       BOOLEAN    DEFAULT FALSE,
    created_at              TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    updated_at              TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_farmer_profiles_user (user_id)
) ENGINE=InnoDB;

CREATE TABLE farmer_lands (
    id          BIGINT        AUTO_INCREMENT PRIMARY KEY,
    farmer_id   BIGINT        NOT NULL,
    land_name   VARCHAR(200),
    area        DECIMAL(10,2) NOT NULL,
    unit        ENUM('HECTARE', 'ACRE', 'BIGHA', 'GUNTA') DEFAULT 'ACRE',
    soil_type   ENUM('ALLUVIAL', 'BLACK', 'RED', 'LATERITE', 'DESERT', 'MOUNTAIN', 'CLAY', 'SANDY', 'LOAMY', 'OTHER') DEFAULT 'OTHER',
    irrigation_type ENUM('RAINFED', 'CANAL', 'BOREWELL', 'DRIP', 'SPRINKLER', 'TANK', 'RIVER', 'OTHER'),
    latitude    DECIMAL(10,7),
    longitude   DECIMAL(10,7),
    state_id    BIGINT,
    district_id BIGINT,
    taluk_id    BIGINT,
    is_active   BOOLEAN       DEFAULT TRUE,
    created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (farmer_id) REFERENCES farmer_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE SET NULL,
    FOREIGN KEY (district_id) REFERENCES districts(id) ON DELETE SET NULL,
    FOREIGN KEY (taluk_id) REFERENCES taluks(id) ON DELETE SET NULL,
    INDEX idx_farmer_lands_farmer (farmer_id)
) ENGINE=InnoDB;

CREATE TABLE farmer_crops (
    id                    BIGINT     AUTO_INCREMENT PRIMARY KEY,
    farmer_id             BIGINT     NOT NULL,
    land_id               BIGINT,
    crop_id               BIGINT     NOT NULL,
    variety_id            BIGINT,
    season                ENUM('KHARIF', 'RABI', 'ZAID') NOT NULL,
    season_year           INT        NOT NULL,
    sowing_date           DATE,
    expected_harvest_date DATE,
    actual_harvest_date   DATE,
    area_sown             DECIMAL(10,2),
    area_unit             ENUM('HECTARE', 'ACRE', 'BIGHA', 'GUNTA') DEFAULT 'ACRE',
    expected_yield        DECIMAL(10,2),
    actual_yield          DECIMAL(10,2),
    yield_unit            VARCHAR(20) DEFAULT 'quintal',
    total_input_cost      DECIMAL(14,2),
    total_revenue         DECIMAL(14,2),
    status                ENUM('PLANNED', 'SOWN', 'GROWING', 'HARVESTED', 'FAILED') DEFAULT 'PLANNED',
    notes                 TEXT,
    created_at            TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    updated_at            TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (farmer_id) REFERENCES farmer_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY (land_id) REFERENCES farmer_lands(id) ON DELETE SET NULL,
    FOREIGN KEY (crop_id) REFERENCES crops(id) ON DELETE RESTRICT,
    FOREIGN KEY (variety_id) REFERENCES crop_varieties(id) ON DELETE SET NULL,
    INDEX idx_farmer_crops_farmer (farmer_id),
    INDEX idx_farmer_crops_season (season, season_year),
    INDEX idx_farmer_crops_status (status)
) ENGINE=InnoDB;

-- ============================================================
-- 6. GOVERNMENT SCHEMES TABLE
-- ============================================================

CREATE TABLE government_schemes (
    id                  BIGINT        AUTO_INCREMENT PRIMARY KEY,
    name                VARCHAR(300)  NOT NULL,
    name_local          VARCHAR(500),
    description         TEXT,
    eligibility_criteria TEXT,
    benefits            TEXT,
    application_url     VARCHAR(500),
    start_date          DATE,
    end_date            DATE,
    is_active           BOOLEAN       DEFAULT TRUE,
    ministry            VARCHAR(200),
    scheme_type         ENUM('CENTRAL', 'STATE', 'DISTRICT') DEFAULT 'CENTRAL',
    applicable_states   JSON,
    target_farmers      JSON,
    created_at          TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_schemes_active (is_active),
    INDEX idx_schemes_type (scheme_type)
) ENGINE=InnoDB;

-- ============================================================
-- 7. FERTILIZER TABLES
-- ============================================================

CREATE TABLE fertilizers (
    id                  BIGINT        AUTO_INCREMENT PRIMARY KEY,
    name                VARCHAR(200)  NOT NULL,
    name_local          VARCHAR(300),
    type                ENUM('ORGANIC', 'CHEMICAL', 'BIO', 'MICRONUTRIENT') NOT NULL,
    composition         VARCHAR(500),
    usage_instructions  TEXT,
    precautions         TEXT,
    is_active           BOOLEAN       DEFAULT TRUE,
    created_at          TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_fertilizers_type (type)
) ENGINE=InnoDB;

CREATE TABLE crop_fertilizer_recommendations (
    id                  BIGINT        AUTO_INCREMENT PRIMARY KEY,
    crop_id             BIGINT        NOT NULL,
    fertilizer_id       BIGINT        NOT NULL,
    growth_stage        ENUM('BASAL', 'SEEDLING', 'VEGETATIVE', 'FLOWERING', 'FRUITING', 'MATURITY') NOT NULL,
    quantity_per_hectare DECIMAL(10,2),
    quantity_unit       VARCHAR(20)   DEFAULT 'kg',
    application_method  VARCHAR(200),
    notes               TEXT,
    created_at          TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (crop_id) REFERENCES crops(id) ON DELETE CASCADE,
    FOREIGN KEY (fertilizer_id) REFERENCES fertilizers(id) ON DELETE CASCADE,
    INDEX idx_crop_fert_crop (crop_id),
    INDEX idx_crop_fert_fertilizer (fertilizer_id)
) ENGINE=InnoDB;

-- ============================================================
-- 8. WEATHER CACHE TABLE
-- ============================================================

CREATE TABLE weather_cache (
    id              BIGINT        AUTO_INCREMENT PRIMARY KEY,
    district_id     BIGINT        NOT NULL,
    temperature     DECIMAL(5,2),
    humidity        DECIMAL(5,2),
    rainfall        DECIMAL(8,2),
    wind_speed      DECIMAL(5,2),
    weather_desc    VARCHAR(200),
    forecast_date   DATE          NOT NULL,
    fetched_at      TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (district_id) REFERENCES districts(id) ON DELETE CASCADE,
    INDEX idx_weather_district_date (district_id, forecast_date)
) ENGINE=InnoDB;

-- ============================================================
-- 9. AI PREDICTION LOG TABLE
-- ============================================================

CREATE TABLE ai_prediction_logs (
    id              BIGINT        AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT        NOT NULL,
    prediction_type ENUM('CROP_RECOMMENDATION', 'YIELD_PREDICTION', 'PROFIT_ESTIMATION', 'FERTILIZER_RECOMMENDATION', 'MARKET_FORECAST') NOT NULL,
    input_data      JSON          NOT NULL,
    output_data     JSON          NOT NULL,
    confidence      DECIMAL(5,4),
    llm_explanation TEXT,
    created_at      TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_predictions_user (user_id),
    INDEX idx_predictions_type (prediction_type),
    INDEX idx_predictions_date (created_at)
) ENGINE=InnoDB;

-- ============================================================
-- 10. DEALER TABLES
-- ============================================================

CREATE TABLE dealer_profiles (
    id                  BIGINT        AUTO_INCREMENT PRIMARY KEY,
    user_id             BIGINT        NOT NULL UNIQUE,
    shop_name           VARCHAR(300)  NOT NULL,
    license_number      VARCHAR(100),
    gst_number          VARCHAR(20),
    business_type       ENUM('SEED_DEALER', 'FERTILIZER_DEALER', 'PESTICIDE_DEALER', 'EQUIPMENT_DEALER', 'MULTI') DEFAULT 'MULTI',
    state_id            BIGINT,
    district_id         BIGINT,
    is_verified         BOOLEAN       DEFAULT FALSE,
    created_at          TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE SET NULL,
    FOREIGN KEY (district_id) REFERENCES districts(id) ON DELETE SET NULL,
    INDEX idx_dealer_profiles_user (user_id)
) ENGINE=InnoDB;

CREATE TABLE dealer_products (
    id              BIGINT          AUTO_INCREMENT PRIMARY KEY,
    dealer_id       BIGINT          NOT NULL,
    product_name    VARCHAR(300)    NOT NULL,
    product_type    ENUM('SEED', 'FERTILIZER', 'PESTICIDE', 'EQUIPMENT', 'OTHER') NOT NULL,
    crop_id         BIGINT,
    brand           VARCHAR(200),
    price           DECIMAL(12,2),
    unit            VARCHAR(50),
    stock_quantity  INT             DEFAULT 0,
    description     TEXT,
    image_url       VARCHAR(500),
    is_available    BOOLEAN         DEFAULT TRUE,
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (dealer_id) REFERENCES dealer_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY (crop_id) REFERENCES crops(id) ON DELETE SET NULL,
    INDEX idx_dealer_products_dealer (dealer_id),
    INDEX idx_dealer_products_type (product_type)
) ENGINE=InnoDB;

-- ============================================================
-- 11. NOTIFICATION TABLE
-- ============================================================

CREATE TABLE notifications (
    id          BIGINT        AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT        NOT NULL,
    title       VARCHAR(300)  NOT NULL,
    message     TEXT          NOT NULL,
    type        ENUM('INFO', 'WARNING', 'ALERT', 'PRICE_UPDATE', 'WEATHER', 'SCHEME', 'SYSTEM') DEFAULT 'INFO',
    is_read     BOOLEAN       DEFAULT FALSE,
    link_url    VARCHAR(500),
    created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_notifications_user (user_id),
    INDEX idx_notifications_read (user_id, is_read),
    INDEX idx_notifications_date (created_at)
) ENGINE=InnoDB;
