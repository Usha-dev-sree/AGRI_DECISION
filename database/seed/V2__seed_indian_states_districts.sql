-- ============================================================
-- AgroSmart India — Seed Data: Indian States & Districts
-- All 28 States + 8 Union Territories with major districts
-- ============================================================

USE agrosmart;

-- -----------------------------------------------------------
-- STATES (28 States + 8 Union Territories)
-- -----------------------------------------------------------
INSERT INTO states (name, name_local, code) VALUES
('Andhra Pradesh', 'ఆంధ్ర ప్రదేశ్', 'AP'),
('Arunachal Pradesh', 'अरुणाचल प्रदेश', 'AR'),
('Assam', 'অসম', 'AS'),
('Bihar', 'बिहार', 'BR'),
('Chhattisgarh', 'छत्तीसगढ़', 'CG'),
('Goa', 'गोवा', 'GA'),
('Gujarat', 'ગુજરાત', 'GJ'),
('Haryana', 'हरियाणा', 'HR'),
('Himachal Pradesh', 'हिमाचल प्रदेश', 'HP'),
('Jharkhand', 'झारखंड', 'JH'),
('Karnataka', 'ಕರ್ನಾಟಕ', 'KA'),
('Kerala', 'കേരളം', 'KL'),
('Madhya Pradesh', 'मध्य प्रदेश', 'MP'),
('Maharashtra', 'महाराष्ट्र', 'MH'),
('Manipur', 'মণিপুর', 'MN'),
('Meghalaya', 'मेघालय', 'ML'),
('Mizoram', 'मिज़ोरम', 'MZ'),
('Nagaland', 'नागालैंड', 'NL'),
('Odisha', 'ଓଡ଼ିଶା', 'OD'),
('Punjab', 'ਪੰਜਾਬ', 'PB'),
('Rajasthan', 'राजस्थान', 'RJ'),
('Sikkim', 'सिक्किम', 'SK'),
('Tamil Nadu', 'தமிழ்நாடு', 'TN'),
('Telangana', 'తెలంగాణ', 'TS'),
('Tripura', 'ত্রিপুরা', 'TR'),
('Uttar Pradesh', 'उत्तर प्रदेश', 'UP'),
('Uttarakhand', 'उत्तराखंड', 'UK'),
('West Bengal', 'পশ্চিমবঙ্গ', 'WB');

-- Union Territories
INSERT INTO states (name, name_local, code) VALUES
('Andaman and Nicobar Islands', 'अंडमान और निकोबार द्वीपसमूह', 'AN'),
('Chandigarh', 'चंडीगढ़', 'CH'),
('Dadra and Nagar Haveli and Daman and Diu', 'दादरा और नगर हवेली और दमन और दीव', 'DD'),
('Delhi', 'दिल्ली', 'DL'),
('Jammu and Kashmir', 'जम्मू और कश्मीर', 'JK'),
('Ladakh', 'لداخ', 'LA'),
('Lakshadweep', 'ലക്ഷദ്വീപ്', 'LD'),
('Puducherry', 'புதுச்சேரி', 'PY');

-- -----------------------------------------------------------
-- DISTRICTS — Major districts for key agricultural states
-- (Using state names to look up IDs via subqueries)
-- -----------------------------------------------------------

-- Karnataka Districts
INSERT INTO districts (state_id, name, name_local) VALUES
((SELECT id FROM states WHERE code='KA'), 'Bangalore Urban', 'ಬೆಂಗಳೂರು ನಗರ'),
((SELECT id FROM states WHERE code='KA'), 'Bangalore Rural', 'ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ'),
((SELECT id FROM states WHERE code='KA'), 'Mysuru', 'ಮೈಸೂರು'),
((SELECT id FROM states WHERE code='KA'), 'Mandya', 'ಮಂಡ್ಯ'),
((SELECT id FROM states WHERE code='KA'), 'Hassan', 'ಹಾಸನ'),
((SELECT id FROM states WHERE code='KA'), 'Tumkur', 'ತುಮಕೂರು'),
((SELECT id FROM states WHERE code='KA'), 'Belgaum', 'ಬೆಳಗಾವಿ'),
((SELECT id FROM states WHERE code='KA'), 'Dharwad', 'ಧಾರವಾಡ'),
((SELECT id FROM states WHERE code='KA'), 'Hubli-Dharwad', 'ಹುಬ್ಬಳ್ಳಿ-ಧಾರವಾಡ'),
((SELECT id FROM states WHERE code='KA'), 'Bellary', 'ಬಳ್ಳಾರಿ'),
((SELECT id FROM states WHERE code='KA'), 'Raichur', 'ರಾಯಚೂರು'),
((SELECT id FROM states WHERE code='KA'), 'Gulbarga', 'ಕಲಬುರಗಿ'),
((SELECT id FROM states WHERE code='KA'), 'Bidar', 'ಬೀದರ'),
((SELECT id FROM states WHERE code='KA'), 'Shimoga', 'ಶಿವಮೊಗ್ಗ'),
((SELECT id FROM states WHERE code='KA'), 'Davangere', 'ದಾವಣಗೆರೆ'),
((SELECT id FROM states WHERE code='KA'), 'Chitradurga', 'ಚಿತ್ರದುರ್ಗ'),
((SELECT id FROM states WHERE code='KA'), 'Udupi', 'ಉಡುಪಿ'),
((SELECT id FROM states WHERE code='KA'), 'Dakshina Kannada', 'ದಕ್ಷಿಣ ಕನ್ನಡ'),
((SELECT id FROM states WHERE code='KA'), 'Uttara Kannada', 'ಉತ್ತರ ಕನ್ನಡ'),
((SELECT id FROM states WHERE code='KA'), 'Kodagu', 'ಕೊಡಗು'),
((SELECT id FROM states WHERE code='KA'), 'Chikmagalur', 'ಚಿಕ್ಕಮಗಳೂರು'),
((SELECT id FROM states WHERE code='KA'), 'Kolar', 'ಕೋಲಾರ'),
((SELECT id FROM states WHERE code='KA'), 'Chamarajanagar', 'ಚಾಮರಾಜನಗರ');

-- Maharashtra Districts
INSERT INTO districts (state_id, name, name_local) VALUES
((SELECT id FROM states WHERE code='MH'), 'Mumbai', 'मुंबई'),
((SELECT id FROM states WHERE code='MH'), 'Pune', 'पुणे'),
((SELECT id FROM states WHERE code='MH'), 'Nagpur', 'नागपूर'),
((SELECT id FROM states WHERE code='MH'), 'Nashik', 'नाशिक'),
((SELECT id FROM states WHERE code='MH'), 'Aurangabad', 'औरंगाबाद'),
((SELECT id FROM states WHERE code='MH'), 'Solapur', 'सोलापूर'),
((SELECT id FROM states WHERE code='MH'), 'Kolhapur', 'कोल्हापूर'),
((SELECT id FROM states WHERE code='MH'), 'Satara', 'सातारा'),
((SELECT id FROM states WHERE code='MH'), 'Sangli', 'सांगली'),
((SELECT id FROM states WHERE code='MH'), 'Ahmednagar', 'अहमदनगर'),
((SELECT id FROM states WHERE code='MH'), 'Amravati', 'अमरावती'),
((SELECT id FROM states WHERE code='MH'), 'Jalgaon', 'जळगाव'),
((SELECT id FROM states WHERE code='MH'), 'Wardha', 'वर्धा'),
((SELECT id FROM states WHERE code='MH'), 'Yavatmal', 'यवतमाळ'),
((SELECT id FROM states WHERE code='MH'), 'Beed', 'बीड');

-- Uttar Pradesh Districts
INSERT INTO districts (state_id, name, name_local) VALUES
((SELECT id FROM states WHERE code='UP'), 'Lucknow', 'लखनऊ'),
((SELECT id FROM states WHERE code='UP'), 'Agra', 'आगरा'),
((SELECT id FROM states WHERE code='UP'), 'Varanasi', 'वाराणसी'),
((SELECT id FROM states WHERE code='UP'), 'Kanpur', 'कानपुर'),
((SELECT id FROM states WHERE code='UP'), 'Allahabad', 'इलाहाबाद'),
((SELECT id FROM states WHERE code='UP'), 'Meerut', 'मेरठ'),
((SELECT id FROM states WHERE code='UP'), 'Bareilly', 'बरेली'),
((SELECT id FROM states WHERE code='UP'), 'Gorakhpur', 'गोरखपुर'),
((SELECT id FROM states WHERE code='UP'), 'Mathura', 'मथुरा'),
((SELECT id FROM states WHERE code='UP'), 'Aligarh', 'अलीगढ़'),
((SELECT id FROM states WHERE code='UP'), 'Jhansi', 'झांसी'),
((SELECT id FROM states WHERE code='UP'), 'Sultanpur', 'सुल्तानपुर'),
((SELECT id FROM states WHERE code='UP'), 'Faizabad', 'फैजाबाद');

-- Punjab Districts
INSERT INTO districts (state_id, name, name_local) VALUES
((SELECT id FROM states WHERE code='PB'), 'Amritsar', 'ਅੰਮ੍ਰਿਤਸਰ'),
((SELECT id FROM states WHERE code='PB'), 'Ludhiana', 'ਲੁਧਿਆਣਾ'),
((SELECT id FROM states WHERE code='PB'), 'Jalandhar', 'ਜਲੰਧਰ'),
((SELECT id FROM states WHERE code='PB'), 'Patiala', 'ਪਟਿਆਲਾ'),
((SELECT id FROM states WHERE code='PB'), 'Bathinda', 'ਬਠਿੰਡਾ'),
((SELECT id FROM states WHERE code='PB'), 'Sangrur', 'ਸੰਗਰੂਰ'),
((SELECT id FROM states WHERE code='PB'), 'Moga', 'ਮੋਗਾ'),
((SELECT id FROM states WHERE code='PB'), 'Ferozepur', 'ਫ਼ਿਰੋਜ਼ਪੁਰ'),
((SELECT id FROM states WHERE code='PB'), 'Gurdaspur', 'ਗੁਰਦਾਸਪੁਰ');

-- Tamil Nadu Districts
INSERT INTO districts (state_id, name, name_local) VALUES
((SELECT id FROM states WHERE code='TN'), 'Chennai', 'சென்னை'),
((SELECT id FROM states WHERE code='TN'), 'Coimbatore', 'கோயம்புத்தூர்'),
((SELECT id FROM states WHERE code='TN'), 'Madurai', 'மதுரை'),
((SELECT id FROM states WHERE code='TN'), 'Thanjavur', 'தஞ்சாவூர்'),
((SELECT id FROM states WHERE code='TN'), 'Salem', 'சேலம்'),
((SELECT id FROM states WHERE code='TN'), 'Tiruchirappalli', 'திருச்சிராப்பள்ளி'),
((SELECT id FROM states WHERE code='TN'), 'Tirunelveli', 'திருநெல்வேலி'),
((SELECT id FROM states WHERE code='TN'), 'Erode', 'ஈரோடு'),
((SELECT id FROM states WHERE code='TN'), 'Dindigul', 'திண்டுக்கல்'),
((SELECT id FROM states WHERE code='TN'), 'Kanchipuram', 'காஞ்சிபுரம்');

-- Madhya Pradesh Districts
INSERT INTO districts (state_id, name, name_local) VALUES
((SELECT id FROM states WHERE code='MP'), 'Bhopal', 'भोपाल'),
((SELECT id FROM states WHERE code='MP'), 'Indore', 'इंदौर'),
((SELECT id FROM states WHERE code='MP'), 'Jabalpur', 'जबलपुर'),
((SELECT id FROM states WHERE code='MP'), 'Gwalior', 'ग्वालियर'),
((SELECT id FROM states WHERE code='MP'), 'Ujjain', 'उज्जैन'),
((SELECT id FROM states WHERE code='MP'), 'Sagar', 'सागर'),
((SELECT id FROM states WHERE code='MP'), 'Rewa', 'रीवा'),
((SELECT id FROM states WHERE code='MP'), 'Hoshangabad', 'होशंगाबाद');

-- Rajasthan Districts
INSERT INTO districts (state_id, name, name_local) VALUES
((SELECT id FROM states WHERE code='RJ'), 'Jaipur', 'जयपुर'),
((SELECT id FROM states WHERE code='RJ'), 'Jodhpur', 'जोधपुर'),
((SELECT id FROM states WHERE code='RJ'), 'Udaipur', 'उदयपुर'),
((SELECT id FROM states WHERE code='RJ'), 'Kota', 'कोटा'),
((SELECT id FROM states WHERE code='RJ'), 'Ajmer', 'अजमेर'),
((SELECT id FROM states WHERE code='RJ'), 'Bikaner', 'बीकानेर'),
((SELECT id FROM states WHERE code='RJ'), 'Alwar', 'अलवर'),
((SELECT id FROM states WHERE code='RJ'), 'Sikar', 'सीकर');

-- Gujarat Districts
INSERT INTO districts (state_id, name, name_local) VALUES
((SELECT id FROM states WHERE code='GJ'), 'Ahmedabad', 'અમદાવાદ'),
((SELECT id FROM states WHERE code='GJ'), 'Surat', 'સુરત'),
((SELECT id FROM states WHERE code='GJ'), 'Vadodara', 'વડોદરા'),
((SELECT id FROM states WHERE code='GJ'), 'Rajkot', 'રાજકોટ'),
((SELECT id FROM states WHERE code='GJ'), 'Junagadh', 'જૂનાગઢ'),
((SELECT id FROM states WHERE code='GJ'), 'Bhavnagar', 'ભાવનગર'),
((SELECT id FROM states WHERE code='GJ'), 'Kutch', 'કચ્છ'),
((SELECT id FROM states WHERE code='GJ'), 'Mehsana', 'મહેસાણા');

-- Andhra Pradesh Districts
INSERT INTO districts (state_id, name, name_local) VALUES
((SELECT id FROM states WHERE code='AP'), 'Visakhapatnam', 'విశాఖపట్నం'),
((SELECT id FROM states WHERE code='AP'), 'Guntur', 'గుంటూరు'),
((SELECT id FROM states WHERE code='AP'), 'Krishna', 'కృష్ణా'),
((SELECT id FROM states WHERE code='AP'), 'East Godavari', 'తూర్పు గోదావరి'),
((SELECT id FROM states WHERE code='AP'), 'West Godavari', 'పశ్చిమ గోదావరి'),
((SELECT id FROM states WHERE code='AP'), 'Kurnool', 'కర్నూలు'),
((SELECT id FROM states WHERE code='AP'), 'Anantapur', 'అనంతపురము'),
((SELECT id FROM states WHERE code='AP'), 'Chittoor', 'చిత్తూరు');

-- Telangana Districts
INSERT INTO districts (state_id, name, name_local) VALUES
((SELECT id FROM states WHERE code='TS'), 'Hyderabad', 'హైదరాబాద్'),
((SELECT id FROM states WHERE code='TS'), 'Rangareddy', 'రంగారెడ్డి'),
((SELECT id FROM states WHERE code='TS'), 'Warangal', 'వరంగల్'),
((SELECT id FROM states WHERE code='TS'), 'Karimnagar', 'కరీంనగర్'),
((SELECT id FROM states WHERE code='TS'), 'Nizamabad', 'నిజామాబాద్'),
((SELECT id FROM states WHERE code='TS'), 'Khammam', 'ఖమ్మం'),
((SELECT id FROM states WHERE code='TS'), 'Nalgonda', 'నల్గొండ'),
((SELECT id FROM states WHERE code='TS'), 'Medak', 'మెదక్');

-- Bihar Districts
INSERT INTO districts (state_id, name, name_local) VALUES
((SELECT id FROM states WHERE code='BR'), 'Patna', 'पटना'),
((SELECT id FROM states WHERE code='BR'), 'Gaya', 'गया'),
((SELECT id FROM states WHERE code='BR'), 'Muzaffarpur', 'मुजफ्फरपुर'),
((SELECT id FROM states WHERE code='BR'), 'Bhagalpur', 'भागलपुर'),
((SELECT id FROM states WHERE code='BR'), 'Darbhanga', 'दरभंगा'),
((SELECT id FROM states WHERE code='BR'), 'Purnia', 'पूर्णिया');

-- West Bengal Districts
INSERT INTO districts (state_id, name, name_local) VALUES
((SELECT id FROM states WHERE code='WB'), 'Kolkata', 'কলকাতা'),
((SELECT id FROM states WHERE code='WB'), 'North 24 Parganas', 'উত্তর ২৪ পরগনা'),
((SELECT id FROM states WHERE code='WB'), 'South 24 Parganas', 'দক্ষিণ ২৪ পরগনা'),
((SELECT id FROM states WHERE code='WB'), 'Bardhaman', 'বর্ধমান'),
((SELECT id FROM states WHERE code='WB'), 'Murshidabad', 'মুর্শিদাবাদ'),
((SELECT id FROM states WHERE code='WB'), 'Hooghly', 'হুগলি'),
((SELECT id FROM states WHERE code='WB'), 'Nadia', 'নদিয়া');

-- Haryana Districts
INSERT INTO districts (state_id, name, name_local) VALUES
((SELECT id FROM states WHERE code='HR'), 'Ambala', 'अंबाला'),
((SELECT id FROM states WHERE code='HR'), 'Hisar', 'हिसार'),
((SELECT id FROM states WHERE code='HR'), 'Karnal', 'करनाल'),
((SELECT id FROM states WHERE code='HR'), 'Panipat', 'पानीपत'),
((SELECT id FROM states WHERE code='HR'), 'Rohtak', 'रोहतक'),
((SELECT id FROM states WHERE code='HR'), 'Sirsa', 'सिरसा'),
((SELECT id FROM states WHERE code='HR'), 'Gurugram', 'गुरुग्राम');

-- Kerala Districts
INSERT INTO districts (state_id, name, name_local) VALUES
((SELECT id FROM states WHERE code='KL'), 'Thiruvananthapuram', 'തിരുവനന്തപുരം'),
((SELECT id FROM states WHERE code='KL'), 'Ernakulam', 'എറണാകുളം'),
((SELECT id FROM states WHERE code='KL'), 'Thrissur', 'തൃശ്ശൂർ'),
((SELECT id FROM states WHERE code='KL'), 'Kozhikode', 'കോഴിക്കോട്'),
((SELECT id FROM states WHERE code='KL'), 'Palakkad', 'പാലക്കാട്'),
((SELECT id FROM states WHERE code='KL'), 'Wayanad', 'വയനാട്'),
((SELECT id FROM states WHERE code='KL'), 'Idukki', 'ഇടുക്കി');

-- Odisha Districts
INSERT INTO districts (state_id, name, name_local) VALUES
((SELECT id FROM states WHERE code='OD'), 'Bhubaneswar', 'ଭୁବନେଶ୍ୱର'),
((SELECT id FROM states WHERE code='OD'), 'Cuttack', 'କଟକ'),
((SELECT id FROM states WHERE code='OD'), 'Puri', 'ପୁରୀ'),
((SELECT id FROM states WHERE code='OD'), 'Sambalpur', 'ସମ୍ବଲପୁର'),
((SELECT id FROM states WHERE code='OD'), 'Ganjam', 'ଗଞ୍ଜାମ'),
((SELECT id FROM states WHERE code='OD'), 'Balasore', 'ବାଲେଶ୍ୱର');

-- -----------------------------------------------------------
-- SAMPLE TALUKS (for Karnataka — Mysuru district)
-- -----------------------------------------------------------
INSERT INTO taluks (district_id, name, name_local) VALUES
((SELECT id FROM districts WHERE name='Mysuru' AND state_id=(SELECT id FROM states WHERE code='KA')), 'Mysuru', 'ಮೈಸೂರು'),
((SELECT id FROM districts WHERE name='Mysuru' AND state_id=(SELECT id FROM states WHERE code='KA')), 'Nanjangud', 'ನಂಜನಗೂಡು'),
((SELECT id FROM districts WHERE name='Mysuru' AND state_id=(SELECT id FROM states WHERE code='KA')), 'T. Narasipura', 'ಟಿ. ನರಸೀಪುರ'),
((SELECT id FROM districts WHERE name='Mysuru' AND state_id=(SELECT id FROM states WHERE code='KA')), 'Hunsur', 'ಹುಣಸೂರು'),
((SELECT id FROM districts WHERE name='Mysuru' AND state_id=(SELECT id FROM states WHERE code='KA')), 'Heggadadevankote', 'ಹೆಗ್ಗಡದೇವನಕೋಟೆ'),
((SELECT id FROM districts WHERE name='Mysuru' AND state_id=(SELECT id FROM states WHERE code='KA')), 'Periyapatna', 'ಪಿರಿಯಾಪಟ್ಟಣ'),
((SELECT id FROM districts WHERE name='Mysuru' AND state_id=(SELECT id FROM states WHERE code='KA')), 'Krishnarajanagara', 'ಕೃಷ್ಣರಾಜನಗರ');

-- Taluks for Mandya
INSERT INTO taluks (district_id, name, name_local) VALUES
((SELECT id FROM districts WHERE name='Mandya' AND state_id=(SELECT id FROM states WHERE code='KA')), 'Mandya', 'ಮಂಡ್ಯ'),
((SELECT id FROM districts WHERE name='Mandya' AND state_id=(SELECT id FROM states WHERE code='KA')), 'Maddur', 'ಮದ್ದೂರು'),
((SELECT id FROM districts WHERE name='Mandya' AND state_id=(SELECT id FROM states WHERE code='KA')), 'Srirangapatna', 'ಶ್ರೀರಂಗಪಟ್ಟಣ'),
((SELECT id FROM districts WHERE name='Mandya' AND state_id=(SELECT id FROM states WHERE code='KA')), 'Nagamangala', 'ನಾಗಮಂಗಲ'),
((SELECT id FROM districts WHERE name='Mandya' AND state_id=(SELECT id FROM states WHERE code='KA')), 'Malavalli', 'ಮಳವಳ್ಳಿ'),
((SELECT id FROM districts WHERE name='Mandya' AND state_id=(SELECT id FROM states WHERE code='KA')), 'Pandavapura', 'ಪಾಂಡವಪುರ'),
((SELECT id FROM districts WHERE name='Mandya' AND state_id=(SELECT id FROM states WHERE code='KA')), 'K.R. Pet', 'ಕೆ.ಆರ್. ಪೇಟೆ');

-- Default Admin User (password: Admin@123 - BCrypt hashed)
INSERT INTO users (email, phone, password_hash, full_name, role, is_active, is_email_verified)
VALUES ('admin@agrosmart.in', '9999999999', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'System Administrator', 'ADMIN', TRUE, TRUE);
