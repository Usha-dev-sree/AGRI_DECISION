-- ============================================================
-- AgroSmart India — Seed Data: Crops & Varieties
-- 50+ Major Indian Crops with varieties
-- ============================================================

USE agrosmart;

-- -----------------------------------------------------------
-- CROP CATEGORIES
-- -----------------------------------------------------------
INSERT INTO crop_categories (name, name_local, description) VALUES
('Cereals', 'अनाज', 'Grain crops including rice, wheat, maize, and millets'),
('Pulses', 'दालें', 'Leguminous crops like lentils, chickpeas, and beans'),
('Oilseeds', 'तिलहन', 'Oil-bearing crops including soybean, groundnut, and mustard'),
('Cash Crops', 'नकदी फसलें', 'Commercial crops like sugarcane, cotton, jute, and tobacco'),
('Spices', 'मसाले', 'Spice crops including turmeric, chilli, ginger, and cardamom'),
('Vegetables', 'सब्जियां', 'Common vegetable crops'),
('Fruits', 'फल', 'Fruit crops including mango, banana, and citrus'),
('Plantation Crops', 'बागान फसलें', 'Tea, coffee, rubber, and coconut'),
('Fibre Crops', 'रेशा फसलें', 'Cotton, jute, and hemp'),
('Fodder Crops', 'चारा फसलें', 'Crops grown for animal feed');

-- -----------------------------------------------------------
-- CROPS — Cereals
-- -----------------------------------------------------------
INSERT INTO crops (category_id, name, name_local, scientific_name, growing_season, min_temperature, max_temperature, min_rainfall, max_rainfall, min_ph, max_ph, min_humidity, max_humidity, water_requirement, growth_duration_days, soil_types_suitable) VALUES
((SELECT id FROM crop_categories WHERE name='Cereals'), 'Rice', 'चावल / धान', 'Oryza sativa', 'KHARIF', 20.0, 37.0, 100.0, 200.0, 5.5, 7.5, 60.0, 90.0, 'HIGH', 120, 'ALLUVIAL,CLAY,LOAMY'),
((SELECT id FROM crop_categories WHERE name='Cereals'), 'Wheat', 'गेहूं', 'Triticum aestivum', 'RABI', 10.0, 25.0, 25.0, 75.0, 6.0, 8.0, 40.0, 70.0, 'MEDIUM', 135, 'ALLUVIAL,LOAMY,CLAY'),
((SELECT id FROM crop_categories WHERE name='Cereals'), 'Maize', 'मक्का', 'Zea mays', 'KHARIF', 18.0, 35.0, 60.0, 110.0, 5.5, 7.5, 50.0, 80.0, 'MEDIUM', 100, 'ALLUVIAL,LOAMY,SANDY'),
((SELECT id FROM crop_categories WHERE name='Cereals'), 'Bajra (Pearl Millet)', 'बाजरा', 'Pennisetum glaucum', 'KHARIF', 25.0, 40.0, 25.0, 60.0, 6.5, 8.0, 30.0, 60.0, 'LOW', 85, 'SANDY,LOAMY,DESERT'),
((SELECT id FROM crop_categories WHERE name='Cereals'), 'Jowar (Sorghum)', 'ज्वार', 'Sorghum bicolor', 'KHARIF', 25.0, 38.0, 40.0, 100.0, 6.0, 8.0, 40.0, 70.0, 'LOW', 110, 'BLACK,LOAMY,RED'),
((SELECT id FROM crop_categories WHERE name='Cereals'), 'Ragi (Finger Millet)', 'रागी / नाचनी', 'Eleusine coracana', 'KHARIF', 20.0, 35.0, 50.0, 100.0, 5.0, 7.5, 50.0, 80.0, 'LOW', 115, 'RED,LOAMY,LATERITE'),
((SELECT id FROM crop_categories WHERE name='Cereals'), 'Barley', 'जौ', 'Hordeum vulgare', 'RABI', 5.0, 25.0, 25.0, 50.0, 6.0, 8.5, 30.0, 60.0, 'LOW', 130, 'LOAMY,SANDY,ALLUVIAL');

-- -----------------------------------------------------------
-- CROPS — Pulses
-- -----------------------------------------------------------
INSERT INTO crops (category_id, name, name_local, scientific_name, growing_season, min_temperature, max_temperature, min_rainfall, max_rainfall, min_ph, max_ph, min_humidity, max_humidity, water_requirement, growth_duration_days, soil_types_suitable) VALUES
((SELECT id FROM crop_categories WHERE name='Pulses'), 'Chickpea (Chana)', 'चना', 'Cicer arietinum', 'RABI', 15.0, 30.0, 20.0, 50.0, 6.0, 8.0, 30.0, 60.0, 'LOW', 100, 'LOAMY,BLACK,ALLUVIAL'),
((SELECT id FROM crop_categories WHERE name='Pulses'), 'Pigeon Pea (Tur/Arhar)', 'तूर / अरहर', 'Cajanus cajan', 'KHARIF', 20.0, 35.0, 60.0, 100.0, 5.5, 7.5, 50.0, 80.0, 'MEDIUM', 180, 'RED,LOAMY,BLACK'),
((SELECT id FROM crop_categories WHERE name='Pulses'), 'Green Gram (Moong)', 'मूंग', 'Vigna radiata', 'KHARIF', 25.0, 35.0, 60.0, 100.0, 6.0, 7.5, 50.0, 80.0, 'MEDIUM', 65, 'LOAMY,SANDY,ALLUVIAL'),
((SELECT id FROM crop_categories WHERE name='Pulses'), 'Black Gram (Urad)', 'उड़द', 'Vigna mungo', 'KHARIF', 25.0, 35.0, 60.0, 100.0, 6.0, 7.5, 50.0, 80.0, 'MEDIUM', 75, 'LOAMY,BLACK,ALLUVIAL'),
((SELECT id FROM crop_categories WHERE name='Pulses'), 'Lentil (Masoor)', 'मसूर', 'Lens culinaris', 'RABI', 15.0, 25.0, 25.0, 50.0, 6.0, 8.0, 30.0, 60.0, 'LOW', 110, 'LOAMY,CLAY,ALLUVIAL'),
((SELECT id FROM crop_categories WHERE name='Pulses'), 'Kidney Bean (Rajma)', 'राजमा', 'Phaseolus vulgaris', 'RABI', 10.0, 27.0, 50.0, 100.0, 5.5, 6.5, 50.0, 70.0, 'MEDIUM', 100, 'LOAMY,MOUNTAIN');

-- -----------------------------------------------------------
-- CROPS — Oilseeds
-- -----------------------------------------------------------
INSERT INTO crops (category_id, name, name_local, scientific_name, growing_season, min_temperature, max_temperature, min_rainfall, max_rainfall, min_ph, max_ph, min_humidity, max_humidity, water_requirement, growth_duration_days, soil_types_suitable) VALUES
((SELECT id FROM crop_categories WHERE name='Oilseeds'), 'Soybean', 'सोयाबीन', 'Glycine max', 'KHARIF', 20.0, 35.0, 60.0, 100.0, 6.0, 7.5, 50.0, 80.0, 'MEDIUM', 95, 'BLACK,LOAMY,ALLUVIAL'),
((SELECT id FROM crop_categories WHERE name='Oilseeds'), 'Groundnut', 'मूंगफली', 'Arachis hypogaea', 'KHARIF', 22.0, 35.0, 50.0, 100.0, 5.5, 7.0, 50.0, 80.0, 'MEDIUM', 110, 'SANDY,LOAMY,RED'),
((SELECT id FROM crop_categories WHERE name='Oilseeds'), 'Mustard', 'सरसों', 'Brassica juncea', 'RABI', 10.0, 25.0, 25.0, 50.0, 6.0, 8.0, 30.0, 60.0, 'LOW', 120, 'LOAMY,ALLUVIAL,SANDY'),
((SELECT id FROM crop_categories WHERE name='Oilseeds'), 'Sunflower', 'सूरजमुखी', 'Helianthus annuus', 'RABI', 15.0, 30.0, 30.0, 70.0, 6.0, 7.5, 40.0, 70.0, 'MEDIUM', 90, 'LOAMY,BLACK,ALLUVIAL'),
((SELECT id FROM crop_categories WHERE name='Oilseeds'), 'Sesame (Til)', 'तिल', 'Sesamum indicum', 'KHARIF', 25.0, 40.0, 30.0, 65.0, 5.5, 8.0, 40.0, 70.0, 'LOW', 85, 'LOAMY,SANDY,BLACK'),
((SELECT id FROM crop_categories WHERE name='Oilseeds'), 'Coconut', 'नारियल', 'Cocos nucifera', 'ALL_SEASON', 20.0, 35.0, 100.0, 250.0, 5.5, 8.0, 60.0, 90.0, 'HIGH', 365, 'LOAMY,LATERITE,SANDY');

-- -----------------------------------------------------------
-- CROPS — Cash Crops
-- -----------------------------------------------------------
INSERT INTO crops (category_id, name, name_local, scientific_name, growing_season, min_temperature, max_temperature, min_rainfall, max_rainfall, min_ph, max_ph, min_humidity, max_humidity, water_requirement, growth_duration_days, soil_types_suitable) VALUES
((SELECT id FROM crop_categories WHERE name='Cash Crops'), 'Sugarcane', 'गन्ना', 'Saccharum officinarum', 'ALL_SEASON', 20.0, 40.0, 75.0, 150.0, 6.0, 8.0, 50.0, 85.0, 'HIGH', 365, 'ALLUVIAL,LOAMY,BLACK'),
((SELECT id FROM crop_categories WHERE name='Cash Crops'), 'Cotton', 'कपास', 'Gossypium', 'KHARIF', 21.0, 35.0, 50.0, 100.0, 6.0, 8.0, 50.0, 75.0, 'MEDIUM', 180, 'BLACK,ALLUVIAL,LOAMY'),
((SELECT id FROM crop_categories WHERE name='Cash Crops'), 'Jute', 'जूट / पटसन', 'Corchorus', 'KHARIF', 24.0, 37.0, 100.0, 200.0, 5.5, 7.5, 70.0, 90.0, 'HIGH', 120, 'ALLUVIAL,LOAMY,CLAY'),
((SELECT id FROM crop_categories WHERE name='Cash Crops'), 'Tobacco', 'तम्बाकू', 'Nicotiana tabacum', 'RABI', 15.0, 30.0, 50.0, 100.0, 5.5, 7.5, 40.0, 70.0, 'MEDIUM', 120, 'SANDY,LOAMY,ALLUVIAL'),
((SELECT id FROM crop_categories WHERE name='Cash Crops'), 'Rubber', 'रबड़', 'Hevea brasiliensis', 'ALL_SEASON', 25.0, 35.0, 200.0, 400.0, 4.5, 6.5, 70.0, 90.0, 'HIGH', 2190, 'LATERITE,RED,LOAMY');

-- -----------------------------------------------------------
-- CROPS — Spices
-- -----------------------------------------------------------
INSERT INTO crops (category_id, name, name_local, scientific_name, growing_season, min_temperature, max_temperature, min_rainfall, max_rainfall, min_ph, max_ph, min_humidity, max_humidity, water_requirement, growth_duration_days, soil_types_suitable) VALUES
((SELECT id FROM crop_categories WHERE name='Spices'), 'Turmeric', 'हल्दी', 'Curcuma longa', 'KHARIF', 20.0, 35.0, 100.0, 200.0, 5.5, 7.5, 60.0, 85.0, 'MEDIUM', 270, 'LOAMY,CLAY,ALLUVIAL'),
((SELECT id FROM crop_categories WHERE name='Spices'), 'Chilli', 'मिर्च', 'Capsicum annuum', 'KHARIF', 20.0, 35.0, 50.0, 100.0, 6.0, 7.5, 50.0, 80.0, 'MEDIUM', 150, 'LOAMY,BLACK,SANDY'),
((SELECT id FROM crop_categories WHERE name='Spices'), 'Ginger', 'अदरक', 'Zingiber officinale', 'KHARIF', 20.0, 32.0, 150.0, 300.0, 5.5, 7.0, 60.0, 90.0, 'MEDIUM', 240, 'LOAMY,SANDY,LATERITE'),
((SELECT id FROM crop_categories WHERE name='Spices'), 'Black Pepper', 'काली मिर्च', 'Piper nigrum', 'ALL_SEASON', 20.0, 35.0, 200.0, 300.0, 5.5, 7.0, 60.0, 95.0, 'HIGH', 365, 'LATERITE,RED,LOAMY'),
((SELECT id FROM crop_categories WHERE name='Spices'), 'Cardamom', 'इलायची', 'Elettaria cardamomum', 'ALL_SEASON', 10.0, 35.0, 150.0, 400.0, 5.0, 6.5, 70.0, 95.0, 'HIGH', 365, 'LATERITE,LOAMY,MOUNTAIN'),
((SELECT id FROM crop_categories WHERE name='Spices'), 'Coriander', 'धनिया', 'Coriandrum sativum', 'RABI', 15.0, 28.0, 30.0, 60.0, 6.0, 8.0, 40.0, 60.0, 'LOW', 90, 'LOAMY,SANDY,BLACK');

-- -----------------------------------------------------------
-- CROPS — Vegetables
-- -----------------------------------------------------------
INSERT INTO crops (category_id, name, name_local, scientific_name, growing_season, min_temperature, max_temperature, min_rainfall, max_rainfall, min_ph, max_ph, min_humidity, max_humidity, water_requirement, growth_duration_days, soil_types_suitable) VALUES
((SELECT id FROM crop_categories WHERE name='Vegetables'), 'Tomato', 'टमाटर', 'Solanum lycopersicum', 'ALL_SEASON', 15.0, 35.0, 40.0, 80.0, 6.0, 7.5, 50.0, 80.0, 'MEDIUM', 90, 'LOAMY,SANDY,ALLUVIAL'),
((SELECT id FROM crop_categories WHERE name='Vegetables'), 'Onion', 'प्याज', 'Allium cepa', 'RABI', 15.0, 30.0, 35.0, 75.0, 6.0, 7.5, 40.0, 70.0, 'MEDIUM', 120, 'LOAMY,SANDY,ALLUVIAL'),
((SELECT id FROM crop_categories WHERE name='Vegetables'), 'Potato', 'आलू', 'Solanum tuberosum', 'RABI', 10.0, 25.0, 50.0, 100.0, 5.0, 6.5, 60.0, 80.0, 'MEDIUM', 100, 'LOAMY,SANDY,ALLUVIAL'),
((SELECT id FROM crop_categories WHERE name='Vegetables'), 'Brinjal (Eggplant)', 'बैंगन', 'Solanum melongena', 'ALL_SEASON', 18.0, 35.0, 50.0, 100.0, 5.5, 7.0, 50.0, 80.0, 'MEDIUM', 90, 'LOAMY,BLACK,ALLUVIAL'),
((SELECT id FROM crop_categories WHERE name='Vegetables'), 'Okra (Bhindi)', 'भिंडी', 'Abelmoschus esculentus', 'KHARIF', 22.0, 38.0, 50.0, 100.0, 6.0, 7.5, 50.0, 80.0, 'MEDIUM', 55, 'LOAMY,SANDY,BLACK'),
((SELECT id FROM crop_categories WHERE name='Vegetables'), 'Cabbage', 'पत्ता गोभी', 'Brassica oleracea var. capitata', 'RABI', 10.0, 25.0, 50.0, 100.0, 6.0, 7.5, 50.0, 80.0, 'MEDIUM', 90, 'LOAMY,CLAY,ALLUVIAL'),
((SELECT id FROM crop_categories WHERE name='Vegetables'), 'Cauliflower', 'फूल गोभी', 'Brassica oleracea var. botrytis', 'RABI', 10.0, 25.0, 50.0, 100.0, 6.0, 7.5, 50.0, 80.0, 'MEDIUM', 90, 'LOAMY,CLAY,ALLUVIAL');

-- -----------------------------------------------------------
-- CROPS — Fruits
-- -----------------------------------------------------------
INSERT INTO crops (category_id, name, name_local, scientific_name, growing_season, min_temperature, max_temperature, min_rainfall, max_rainfall, min_ph, max_ph, min_humidity, max_humidity, water_requirement, growth_duration_days, soil_types_suitable) VALUES
((SELECT id FROM crop_categories WHERE name='Fruits'), 'Mango', 'आम', 'Mangifera indica', 'ALL_SEASON', 20.0, 40.0, 75.0, 250.0, 5.5, 7.5, 50.0, 80.0, 'MEDIUM', 365, 'ALLUVIAL,LOAMY,LATERITE'),
((SELECT id FROM crop_categories WHERE name='Fruits'), 'Banana', 'केला', 'Musa', 'ALL_SEASON', 20.0, 35.0, 100.0, 200.0, 6.0, 7.5, 60.0, 90.0, 'HIGH', 300, 'LOAMY,ALLUVIAL,CLAY'),
((SELECT id FROM crop_categories WHERE name='Fruits'), 'Papaya', 'पपीता', 'Carica papaya', 'ALL_SEASON', 20.0, 35.0, 100.0, 200.0, 6.0, 7.0, 60.0, 85.0, 'MEDIUM', 270, 'LOAMY,SANDY,ALLUVIAL'),
((SELECT id FROM crop_categories WHERE name='Fruits'), 'Grape', 'अंगूर', 'Vitis vinifera', 'ALL_SEASON', 15.0, 35.0, 50.0, 100.0, 6.5, 7.5, 40.0, 70.0, 'MEDIUM', 365, 'LOAMY,SANDY,BLACK'),
((SELECT id FROM crop_categories WHERE name='Fruits'), 'Pomegranate', 'अनार', 'Punica granatum', 'ALL_SEASON', 20.0, 38.0, 30.0, 80.0, 6.5, 7.5, 30.0, 60.0, 'LOW', 365, 'LOAMY,SANDY,BLACK'),
((SELECT id FROM crop_categories WHERE name='Fruits'), 'Guava', 'अमरूद', 'Psidium guajava', 'ALL_SEASON', 15.0, 35.0, 75.0, 200.0, 5.0, 7.5, 50.0, 80.0, 'MEDIUM', 365, 'LOAMY,ALLUVIAL,LATERITE');

-- -----------------------------------------------------------
-- CROP VARIETIES (selected important varieties)
-- -----------------------------------------------------------

-- Rice Varieties
INSERT INTO crop_varieties (crop_id, name, name_local, maturity_days, yield_per_hectare, developed_by, year_of_release) VALUES
((SELECT id FROM crops WHERE name='Rice'), 'Basmati 1121', 'बासमती 1121', 140, 45.0, 'IARI', 2003),
((SELECT id FROM crops WHERE name='Rice'), 'Pusa Basmati 1', 'पूसा बासमती 1', 135, 50.0, 'IARI', 1989),
((SELECT id FROM crops WHERE name='Rice'), 'IR 64', 'आईआर 64', 115, 55.0, 'IRRI', 1985),
((SELECT id FROM crops WHERE name='Rice'), 'Sona Masuri', 'సోనా మసూరి', 120, 50.0, 'ANGRAU', 1980),
((SELECT id FROM crops WHERE name='Rice'), 'Swarna (MTU 7029)', 'स्वर्ण', 130, 60.0, 'ANGRAU', 1982),
((SELECT id FROM crops WHERE name='Rice'), 'Pusa 44', 'पूसा 44', 155, 80.0, 'IARI', 1994);

-- Wheat Varieties
INSERT INTO crop_varieties (crop_id, name, name_local, maturity_days, yield_per_hectare, developed_by, year_of_release) VALUES
((SELECT id FROM crops WHERE name='Wheat'), 'HD 2967', 'एचडी 2967', 145, 55.0, 'IARI', 2011),
((SELECT id FROM crops WHERE name='Wheat'), 'HD 3086', 'एचडी 3086', 140, 58.0, 'IARI', 2014),
((SELECT id FROM crops WHERE name='Wheat'), 'PBW 343', 'पीबीडब्ल्यू 343', 137, 50.0, 'PAU', 1995),
((SELECT id FROM crops WHERE name='Wheat'), 'WH 1105', 'डब्ल्यूएच 1105', 142, 52.0, 'HAU', 2013),
((SELECT id FROM crops WHERE name='Wheat'), 'Lok 1', 'लोक 1', 115, 45.0, 'MPKV', 1982);

-- Maize Varieties
INSERT INTO crop_varieties (crop_id, name, name_local, maturity_days, yield_per_hectare, developed_by, year_of_release) VALUES
((SELECT id FROM crops WHERE name='Maize'), 'DHM 117', 'डीएचएम 117', 95, 70.0, 'DMR', 2010),
((SELECT id FROM crops WHERE name='Maize'), 'HQPM 1', 'एचक्यूपीएम 1', 90, 65.0, 'IARI', 2005),
((SELECT id FROM crops WHERE name='Maize'), 'Vivek QPM 9', 'विवेक क्यूपीएम 9', 85, 60.0, 'VPKAS', 2008);

-- Cotton Varieties
INSERT INTO crop_varieties (crop_id, name, name_local, maturity_days, yield_per_hectare, developed_by, year_of_release) VALUES
((SELECT id FROM crops WHERE name='Cotton'), 'Suraj', 'सूरज', 170, 18.0, 'CICR', 1998),
((SELECT id FROM crops WHERE name='Cotton'), 'NH 615', 'एनएच 615', 180, 20.0, 'MPKV', 2005),
((SELECT id FROM crops WHERE name='Cotton'), 'Jayadhar', 'ജയധർ', 160, 15.0, 'UAS', 1990);

-- Sugarcane Varieties
INSERT INTO crop_varieties (crop_id, name, name_local, maturity_days, yield_per_hectare, developed_by, year_of_release) VALUES
((SELECT id FROM crops WHERE name='Sugarcane'), 'Co 0238', 'को 0238', 340, 800.0, 'SBI', 2009),
((SELECT id FROM crops WHERE name='Sugarcane'), 'CoJ 64', 'कोजे 64', 330, 750.0, 'PAU', 1965),
((SELECT id FROM crops WHERE name='Sugarcane'), 'Co 86032', 'को 86032', 360, 850.0, 'SBI', 1995);

-- Chickpea Varieties
INSERT INTO crop_varieties (crop_id, name, name_local, maturity_days, yield_per_hectare, developed_by, year_of_release) VALUES
((SELECT id FROM crops WHERE name='Chickpea (Chana)'), 'Pusa 256', 'पूसा 256', 100, 20.0, 'IARI', 1986),
((SELECT id FROM crops WHERE name='Chickpea (Chana)'), 'JG 11', 'जेजी 11', 105, 22.0, 'JNKVV', 2002),
((SELECT id FROM crops WHERE name='Chickpea (Chana)'), 'JAKI 9218', 'जाकी 9218', 95, 18.0, 'MPKV', 2005);

-- -----------------------------------------------------------
-- SAMPLE MANDIS (for major agricultural states)
-- -----------------------------------------------------------
INSERT INTO mandis (name, state_id, district_id) VALUES
('Mysore APMC', (SELECT id FROM states WHERE code='KA'), (SELECT id FROM districts WHERE name='Mysuru' AND state_id=(SELECT id FROM states WHERE code='KA'))),
('Mandya APMC', (SELECT id FROM states WHERE code='KA'), (SELECT id FROM districts WHERE name='Mandya' AND state_id=(SELECT id FROM states WHERE code='KA'))),
('Hubli APMC', (SELECT id FROM states WHERE code='KA'), (SELECT id FROM districts WHERE name='Dharwad' AND state_id=(SELECT id FROM states WHERE code='KA'))),
('Pune APMC (Market Yard)', (SELECT id FROM states WHERE code='MH'), (SELECT id FROM districts WHERE name='Pune' AND state_id=(SELECT id FROM states WHERE code='MH'))),
('Nashik APMC', (SELECT id FROM states WHERE code='MH'), (SELECT id FROM districts WHERE name='Nashik' AND state_id=(SELECT id FROM states WHERE code='MH'))),
('Lucknow Mandi', (SELECT id FROM states WHERE code='UP'), (SELECT id FROM districts WHERE name='Lucknow' AND state_id=(SELECT id FROM states WHERE code='UP'))),
('Agra Mandi', (SELECT id FROM states WHERE code='UP'), (SELECT id FROM districts WHERE name='Agra' AND state_id=(SELECT id FROM states WHERE code='UP'))),
('Ludhiana Grain Market', (SELECT id FROM states WHERE code='PB'), (SELECT id FROM districts WHERE name='Ludhiana' AND state_id=(SELECT id FROM states WHERE code='PB'))),
('Amritsar Grain Market', (SELECT id FROM states WHERE code='PB'), (SELECT id FROM districts WHERE name='Amritsar' AND state_id=(SELECT id FROM states WHERE code='PB'))),
('Jaipur Mandi', (SELECT id FROM states WHERE code='RJ'), (SELECT id FROM districts WHERE name='Jaipur' AND state_id=(SELECT id FROM states WHERE code='RJ'))),
('Ahmedabad APMC', (SELECT id FROM states WHERE code='GJ'), (SELECT id FROM districts WHERE name='Ahmedabad' AND state_id=(SELECT id FROM states WHERE code='GJ'))),
('Indore Mandi', (SELECT id FROM states WHERE code='MP'), (SELECT id FROM districts WHERE name='Indore' AND state_id=(SELECT id FROM states WHERE code='MP'))),
('Coimbatore Market', (SELECT id FROM states WHERE code='TN'), (SELECT id FROM districts WHERE name='Coimbatore' AND state_id=(SELECT id FROM states WHERE code='TN'))),
('Guntur Mandi', (SELECT id FROM states WHERE code='AP'), (SELECT id FROM districts WHERE name='Guntur' AND state_id=(SELECT id FROM states WHERE code='AP'))),
('Patna Mandi', (SELECT id FROM states WHERE code='BR'), (SELECT id FROM districts WHERE name='Patna' AND state_id=(SELECT id FROM states WHERE code='BR')));

-- -----------------------------------------------------------
-- SAMPLE FERTILIZERS
-- -----------------------------------------------------------
INSERT INTO fertilizers (name, name_local, type, composition) VALUES
('Urea', 'यूरिया', 'CHEMICAL', '46% Nitrogen'),
('DAP (Diammonium Phosphate)', 'डीएपी', 'CHEMICAL', '18% N, 46% P2O5'),
('MOP (Muriate of Potash)', 'एमओपी', 'CHEMICAL', '60% K2O'),
('NPK 10-26-26', 'एनपीके 10-26-26', 'CHEMICAL', '10% N, 26% P2O5, 26% K2O'),
('SSP (Single Super Phosphate)', 'एसएसपी', 'CHEMICAL', '16% P2O5'),
('Vermicompost', 'वर्मीकम्पोस्ट', 'ORGANIC', 'Rich in humus, nitrogen, phosphorus, potassium'),
('Neem Cake', 'नीम खली', 'ORGANIC', 'N 5%, P 1%, K 1.5%'),
('Farm Yard Manure (FYM)', 'गोबर की खाद', 'ORGANIC', 'N 0.5%, P 0.2%, K 0.5%'),
('Zinc Sulphate', 'ज़िंक सल्फेट', 'MICRONUTRIENT', '21% Zn, 10% S'),
('Borax', 'बोरेक्स', 'MICRONUTRIENT', '11.3% Boron'),
('Rhizobium', 'राइजोबियम', 'BIO', 'Nitrogen-fixing bacteria for legumes'),
('Azotobacter', 'एज़ोटोबैक्टर', 'BIO', 'Free-living nitrogen-fixing bacteria');

-- -----------------------------------------------------------
-- SAMPLE GOVERNMENT SCHEMES
-- -----------------------------------------------------------
INSERT INTO government_schemes (name, name_local, description, eligibility_criteria, benefits, scheme_type, ministry, is_active) VALUES
('PM-KISAN', 'पीएम-किसान', 'Pradhan Mantri Kisan Samman Nidhi provides income support to farmer families. ₹6,000 per year in three instalments.', 'All land-holding farmer families with cultivable land. Excludes institutional landholders, income tax payers.', '₹6,000 per year transferred directly to bank account in 3 equal instalments of ₹2,000.', 'CENTRAL', 'Ministry of Agriculture & Farmers Welfare', TRUE),
('PM Fasal Bima Yojana', 'पीएम फसल बीमा योजना', 'Crop insurance scheme to protect farmers against crop loss/damage due to natural calamities, pests, and diseases.', 'All farmers including sharecroppers and tenant farmers growing notified crops. Voluntary for non-loanee farmers.', 'Insurance coverage for Kharif (2% premium), Rabi (1.5% premium), and horticulture (5% premium). Remaining premium paid by government.', 'CENTRAL', 'Ministry of Agriculture & Farmers Welfare', TRUE),
('Soil Health Card Scheme', 'मृदा स्वास्थ्य कार्ड', 'Provides soil health cards to farmers with crop-wise recommendations for nutrients and fertilizers.', 'All farmers with agricultural land.', 'Free soil testing, nutrient status report, and fertilizer recommendations every 2 years.', 'CENTRAL', 'Ministry of Agriculture & Farmers Welfare', TRUE),
('PM Krishi Sinchai Yojana', 'पीएम कृषि सिंचाई योजना', 'Har Khet Ko Paani - ensures access to irrigation for every farm and efficient use of water.', 'All farmers, priority to small and marginal farmers.', 'Subsidies for micro-irrigation (drip, sprinkler), water harvesting structures, and canal lining.', 'CENTRAL', 'Ministry of Agriculture & Farmers Welfare', TRUE),
('Kisan Credit Card', 'किसान क्रेडिट कार्ड', 'Provides affordable credit to farmers for agricultural and allied activities.', 'All farmers including individual/joint borrowers who are owner cultivators, tenant farmers, oral lessees, and sharecroppers.', 'Credit up to ₹3 lakh at subsidized interest rate of 4% per annum (with prompt repayment).', 'CENTRAL', 'Ministry of Finance', TRUE),
('eNAM (Electronic National Agriculture Market)', 'ई-नाम', 'Online trading platform for agricultural commodities in India.', 'All farmers, traders, and FPOs.', 'Online transparent bidding, better price discovery, direct payment to farmer bank account, reduced intermediaries.', 'CENTRAL', 'Ministry of Agriculture & Farmers Welfare', TRUE);
