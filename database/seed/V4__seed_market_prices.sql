-- ============================================================
-- Seed Market Prices — Realistic APMC Mandi data
-- Uses existing mandis (IDs 1-15) and crops (IDs 1-43)
-- ============================================================

USE agrosmart;

-- Today's date and a few recent dates for realistic data
SET @today = CURDATE();
SET @yesterday = DATE_SUB(CURDATE(), INTERVAL 1 DAY);
SET @two_days_ago = DATE_SUB(CURDATE(), INTERVAL 2 DAY);

-- ============================================================
-- Rice (crop_id = 1) prices across mandis
-- ============================================================
INSERT INTO market_prices (mandi_id, crop_id, min_price_per_quintal, max_price_per_quintal, modal_price_per_quintal, arrival_quantity, price_date, source) VALUES
(1, 1, 2100, 2450, 2280, 150.00, @today, 'AGMARKNET'),
(2, 1, 2050, 2400, 2220, 200.00, @today, 'AGMARKNET'),
(3, 1, 2150, 2500, 2350, 100.00, @today, 'AGMARKNET'),
(4, 1, 2200, 2600, 2400, 300.00, @today, 'AGMARKNET'),
(5, 1, 2000, 2350, 2180, 180.00, @today, 'AGMARKNET'),
(6, 1, 2100, 2480, 2290, 250.00, @today, 'AGMARKNET'),
(8, 1, 2250, 2650, 2450, 400.00, @today, 'AGMARKNET'),
(10, 1, 2080, 2420, 2250, 120.00, @today, 'AGMARKNET'),
-- Yesterday
(1, 1, 2080, 2420, 2260, 145.00, @yesterday, 'AGMARKNET'),
(4, 1, 2180, 2580, 2380, 310.00, @yesterday, 'AGMARKNET'),
(8, 1, 2230, 2630, 2430, 380.00, @yesterday, 'AGMARKNET');

-- ============================================================
-- Wheat (crop_id = 2) prices
-- ============================================================
INSERT INTO market_prices (mandi_id, crop_id, min_price_per_quintal, max_price_per_quintal, modal_price_per_quintal, arrival_quantity, price_date, source) VALUES
(6, 2, 2200, 2600, 2400, 500.00, @today, 'AGMARKNET'),
(7, 2, 2150, 2550, 2350, 350.00, @today, 'AGMARKNET'),
(8, 2, 2300, 2700, 2500, 600.00, @today, 'AGMARKNET'),
(9, 2, 2280, 2680, 2480, 550.00, @today, 'AGMARKNET'),
(10, 2, 2100, 2500, 2300, 280.00, @today, 'AGMARKNET'),
(11, 2, 2180, 2580, 2380, 320.00, @today, 'AGMARKNET'),
(4, 2, 2250, 2650, 2450, 200.00, @today, 'AGMARKNET'),
-- Yesterday
(6, 2, 2180, 2580, 2380, 480.00, @yesterday, 'AGMARKNET'),
(8, 2, 2280, 2680, 2480, 590.00, @yesterday, 'AGMARKNET');

-- ============================================================
-- Maize (crop_id = 3) prices
-- ============================================================
INSERT INTO market_prices (mandi_id, crop_id, min_price_per_quintal, max_price_per_quintal, modal_price_per_quintal, arrival_quantity, price_date, source) VALUES
(1, 3, 1800, 2100, 1950, 100.00, @today, 'AGMARKNET'),
(3, 3, 1750, 2050, 1900, 80.00, @today, 'AGMARKNET'),
(6, 3, 1850, 2150, 2000, 150.00, @today, 'AGMARKNET'),
(10, 3, 1780, 2080, 1930, 90.00, @today, 'AGMARKNET'),
(12, 3, 1820, 2120, 1970, 110.00, @today, 'AGMARKNET');

-- ============================================================
-- Cotton (crop_id = 21) prices
-- ============================================================
INSERT INTO market_prices (mandi_id, crop_id, min_price_per_quintal, max_price_per_quintal, modal_price_per_quintal, arrival_quantity, price_date, source) VALUES
(3, 21, 6200, 6800, 6500, 50.00, @today, 'AGMARKNET'),
(4, 21, 6100, 6700, 6400, 80.00, @today, 'AGMARKNET'),
(5, 21, 6300, 6900, 6600, 60.00, @today, 'AGMARKNET'),
(10, 21, 6000, 6600, 6300, 45.00, @today, 'AGMARKNET');

-- ============================================================
-- Sugarcane (crop_id = 20) prices
-- ============================================================
INSERT INTO market_prices (mandi_id, crop_id, min_price_per_quintal, max_price_per_quintal, modal_price_per_quintal, arrival_quantity, price_date, source) VALUES
(4, 20, 350, 400, 375, 2000.00, @today, 'AGMARKNET'),
(5, 20, 340, 390, 365, 1800.00, @today, 'AGMARKNET'),
(6, 20, 355, 405, 380, 2200.00, @today, 'AGMARKNET'),
(7, 20, 345, 395, 370, 1500.00, @today, 'AGMARKNET');

-- ============================================================
-- Soybean (crop_id = 14) prices
-- ============================================================
INSERT INTO market_prices (mandi_id, crop_id, min_price_per_quintal, max_price_per_quintal, modal_price_per_quintal, arrival_quantity, price_date, source) VALUES
(4, 14, 4200, 4800, 4500, 120.00, @today, 'AGMARKNET'),
(5, 14, 4100, 4700, 4400, 100.00, @today, 'AGMARKNET'),
(3, 14, 4250, 4850, 4550, 90.00, @today, 'AGMARKNET'),
(10, 14, 4150, 4750, 4450, 80.00, @today, 'AGMARKNET');

-- ============================================================
-- Chickpea / Chana (crop_id = 8) prices
-- ============================================================
INSERT INTO market_prices (mandi_id, crop_id, min_price_per_quintal, max_price_per_quintal, modal_price_per_quintal, arrival_quantity, price_date, source) VALUES
(6, 8, 4800, 5400, 5100, 200.00, @today, 'AGMARKNET'),
(7, 8, 4750, 5350, 5050, 180.00, @today, 'AGMARKNET'),
(10, 8, 4700, 5300, 5000, 150.00, @today, 'AGMARKNET'),
(11, 8, 4850, 5450, 5150, 170.00, @today, 'AGMARKNET');

-- ============================================================
-- Groundnut (crop_id = 15) prices
-- ============================================================
INSERT INTO market_prices (mandi_id, crop_id, min_price_per_quintal, max_price_per_quintal, modal_price_per_quintal, arrival_quantity, price_date, source) VALUES
(1, 15, 5200, 5800, 5500, 60.00, @today, 'AGMARKNET'),
(4, 15, 5100, 5700, 5400, 80.00, @today, 'AGMARKNET'),
(10, 15, 5050, 5650, 5350, 50.00, @today, 'AGMARKNET');

-- ============================================================
-- Tomato (crop_id = 33) prices
-- ============================================================
INSERT INTO market_prices (mandi_id, crop_id, min_price_per_quintal, max_price_per_quintal, modal_price_per_quintal, arrival_quantity, price_date, source) VALUES
(1, 33, 1200, 1800, 1500, 300.00, @today, 'AGMARKNET'),
(2, 33, 1100, 1700, 1400, 250.00, @today, 'AGMARKNET'),
(4, 33, 1300, 1900, 1600, 400.00, @today, 'AGMARKNET'),
(5, 33, 1150, 1750, 1450, 280.00, @today, 'AGMARKNET'),
(6, 33, 1250, 1850, 1550, 200.00, @today, 'AGMARKNET');

-- ============================================================
-- Onion (crop_id = 32) prices
-- ============================================================
INSERT INTO market_prices (mandi_id, crop_id, min_price_per_quintal, max_price_per_quintal, modal_price_per_quintal, arrival_quantity, price_date, source) VALUES
(4, 32, 1500, 2200, 1850, 500.00, @today, 'AGMARKNET'),
(5, 32, 1400, 2100, 1750, 450.00, @today, 'AGMARKNET'),
(6, 32, 1550, 2250, 1900, 350.00, @today, 'AGMARKNET'),
(10, 32, 1450, 2150, 1800, 300.00, @today, 'AGMARKNET');

-- ============================================================
-- Potato (crop_id = 31) prices
-- ============================================================
INSERT INTO market_prices (mandi_id, crop_id, min_price_per_quintal, max_price_per_quintal, modal_price_per_quintal, arrival_quantity, price_date, source) VALUES
(6, 31, 800, 1200, 1000, 600.00, @today, 'AGMARKNET'),
(7, 31, 750, 1150, 950, 550.00, @today, 'AGMARKNET'),
(8, 31, 850, 1250, 1050, 500.00, @today, 'AGMARKNET'),
(10, 31, 780, 1180, 980, 400.00, @today, 'AGMARKNET');

-- ============================================================
-- Turmeric (crop_id = 25) prices
-- ============================================================
INSERT INTO market_prices (mandi_id, crop_id, min_price_per_quintal, max_price_per_quintal, modal_price_per_quintal, arrival_quantity, price_date, source) VALUES
(1, 25, 12000, 14000, 13000, 30.00, @today, 'AGMARKNET'),
(3, 25, 11500, 13500, 12500, 25.00, @today, 'AGMARKNET'),
(4, 25, 12200, 14200, 13200, 40.00, @today, 'AGMARKNET');

-- ============================================================
-- Mustard (crop_id = 16) prices
-- ============================================================
INSERT INTO market_prices (mandi_id, crop_id, min_price_per_quintal, max_price_per_quintal, modal_price_per_quintal, arrival_quantity, price_date, source) VALUES
(10, 16, 5000, 5600, 5300, 100.00, @today, 'AGMARKNET'),
(11, 16, 4900, 5500, 5200, 90.00, @today, 'AGMARKNET'),
(6, 16, 5050, 5650, 5350, 120.00, @today, 'AGMARKNET');

-- ============================================================
-- Grape (crop_id = 40 if exists, or close match)
-- Let's check and add for Banana (crop_id = 39)
-- ============================================================
INSERT INTO market_prices (mandi_id, crop_id, min_price_per_quintal, max_price_per_quintal, modal_price_per_quintal, arrival_quantity, price_date, source) VALUES
(1, 39, 1500, 2000, 1750, 200.00, @today, 'AGMARKNET'),
(4, 39, 1600, 2100, 1850, 300.00, @today, 'AGMARKNET'),
(5, 39, 1450, 1950, 1700, 180.00, @today, 'AGMARKNET');

-- Two-day-old data for trend visibility
INSERT INTO market_prices (mandi_id, crop_id, min_price_per_quintal, max_price_per_quintal, modal_price_per_quintal, arrival_quantity, price_date, source) VALUES
(1, 1, 2050, 2400, 2230, 140.00, @two_days_ago, 'AGMARKNET'),
(6, 2, 2160, 2560, 2360, 470.00, @two_days_ago, 'AGMARKNET'),
(4, 33, 1280, 1880, 1580, 390.00, @two_days_ago, 'AGMARKNET'),
(4, 32, 1480, 2180, 1830, 490.00, @two_days_ago, 'AGMARKNET');
