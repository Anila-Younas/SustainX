
SET FOREIGN_KEY_CHECKS = 0;

INSERT INTO SDG_INFO (SDG_ID, SDG_NAME, DESCRIPTION)
VALUES
(1, 'No Poverty', 'End poverty in all its forms everywhere.'),
(2, 'Zero Hunger', 'End hunger, achieve food security and improved nutrition, and promote sustainable agriculture.'),
(3, 'Good Health and Well-being', 'Ensure healthy lives and promote well-being for all at all ages.'),
(4, 'Quality Education', 'Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.'),
(6, 'Clean Water and Sanitation', 'Ensure availability and sustainable management of water and sanitation for all.'),
(7, 'Affordable and Clean Energy', 'Ensure access to affordable, reliable, sustainable and modern energy for all.'),
(11, 'Sustainable Cities and Communities', 'Make cities and human settlements inclusive, safe, resilient and sustainable.');

-- 1. CITY Table
INSERT INTO CITY (City_ID, City_Name, Province, Urbanization_Level) VALUES
(1, 'Karachi', 'Sindh', 'Urban'),
(2, 'Lahore', 'Punjab', 'Urban'),
(3, 'Faisalabad', 'Punjab', 'Urban'),
(4, 'Rawalpindi', 'Punjab', 'Urban'),
(5, 'Multan', 'Punjab', 'Urban'),
(6, 'Hyderabad', 'Sindh', 'Urban'),
(7, 'Peshawar', 'KPK', 'Urban'),
(8, 'Islamabad', 'ICT', 'Urban'),
(9, 'Quetta', 'Balochistan', 'Urban'),
(10, 'Gujranwala', 'Punjab', 'Urban'),
(11, 'Sialkot', 'Punjab', 'Semi-Urban'),
(12, 'Bahawalpur', 'Punjab', 'Semi-Urban'),
(13, 'Sukkur', 'Sindh', 'Semi-Urban'),
(14, 'Larkana', 'Sindh', 'Semi-Urban'),
(15, 'Muzaffarabad', 'AJK', 'Rural'),
(16, 'Gilgit', 'Gilgit-Baltistan', 'Rural'),
(17, 'Chitral', 'KPK', 'Rural'),
(18, 'Thatta', 'Sindh', 'Rural');


-- 2. SDG_3 
INSERT INTO SDG_3 (Health_ID, City_ID, Access_to_Healthcare, Maternal_Mortality, Vaccination_Coverage, Year) VALUES
(1, 1, 68.3, 186, 78.2, 2020),
(2, 2, 72.5, 172, 82.5, 2021),
(3, 3, 65.8, 181, 75.3, 2022), 
(4, 4, 70.2, 165, 85.1, 2023),
(5, 5, 63.7, 205, 73.8, 2024),
(6, 6, 60.2, 215, 70.5, 2020),
(7, 7, 62.5, 210, 72.3, 2021),
(8, 8, 85.3, 120, 92.7, 2022),
(9, 9, 55.8, 275, 65.2, 2023),
(10, 10, 64.8, 195, 74.2, 2024),
(11, 11, 61.2, 208, 71.8, 2020),
(12, 12, 58.3, 225, 68.7, 2021),
(13, 13, 56.7, 235, 67.3, 2022),
(14, 14, 53.2, 245, 64.5, 2023),
(15, 15, 44.56, 265, 60.8, 2024), 
(16, 16, 47.2, 280, 58.3, 2020),
(17, 17, 44.8, 295, 55.7, 2021),
(18, 18, 42.3, 310, 53.2, 2022);

-- 3. SDG_2
INSERT INTO SDG_2 (Hunger_ID, Health_ID, City_ID, Malnutrition_Rate, Food_Insecurity, Year) VALUES
(1, 1, 1, 18.5, 22.3, 2020),
(2, 2, 2, 15.2, 18.7, 2021),
(3, 3, 3, 22.7, 27.5, 2022),
(4, 4, 4, 14.8, 17.8, 2023),
(5, 5, 5, 21.3, 25.2, 2024),
(6, 6, 6, 25.8, 30.1, 2020),
(7, 7, 7, 23.5, 28.3, 2021),
(8, 8, 8, 10.5, 27.99, 2022), 
(9, 9, 9, 28.7, 33.5, 2023),
(10, 10, 10, 20.5, 24.7, 2024),
(11, 11, 11, 18.7, 22.8, 2020),
(12, 12, 12, 20.2, 24.1, 2021),
(13, 13, 13, 26.3, 31.2, 2022),
(14, 14, 14, 27.8, 32.5, 2023),
(15, 15, 15, 32.1, 36.8, 2024),
(16, 16, 16, 29.5, 34.2, 2020),
(17, 17, 17, 31.8, 37.5, 2021),
(18, 18, 18, 34.2, 39.8, 2022);

-- 4. SDG_6 
INSERT INTO SDG_6 (Water_ID, City_ID, Health_ID, Access_to_Clean_Water, Sanitation_Coverage, Year) VALUES
(1, 1, 1, 78.5, 65.2, 2020),
(2, 2, 2, 82.3, 72.5, 2021),
(3, 3, 3, 75.8, 68.3, 2022),
(4, 4, 4, 80.2, 70.8, 2023),
(5, 5, 5, 73.7, 67.5, 2024),
(6, 6, 6, 70.2, 65.8, 2020),
(7, 7, 7, 72.5, 66.3, 2021),
(8, 8, 8, 92.3, 85.7, 2022),
(9, 9, 9, 65.8, 58.2, 2023),
(10, 10, 10, 74.8, 68.2, 2024),
(11, 11, 11, 71.2, 65.8, 2020),
(12, 12, 12, 68.3, 62.5, 2021), 
(13, 13, 13, 66.7, 60.3, 2022),
(14, 14, 14, 63.2, 57.5, 2023),
(15, 15, 15, 58.7, 52.3, 2024),
(16, 16, 16, 56.3, 50.2, 2020),
(17, 17, 17, 53.8, 48.1, 2021),
(18, 18, 18, 51.2, 45.7, 2022);

-- 5. SDG_1 
INSERT INTO SDG_1 (Poverty_ID, City_ID, Income_Level, Access_to_Education, Social_Protection, Year) VALUES
(1, 1, 35000, 65.2, 28.5, 2020),
(2, 2, 42000, 72.8, 35.1, 2021),
(3, 3, 28000, 58.3, 22.7, 2022),
(4, 4, 38000, 68.5, 30.2, 2023),
(5, 5, 25000, 55.1, 31.12, 2024), 
(6, 6, 22000, 52.7, 18.3, 2020),
(7, 7, 23000, 53.8, 19.5, 2021),
(8, 8, 50000, 85.2, 45.3, 2022),
(9, 9, 18000, 45.6, 15.2, 2023),
(10, 10, 27000, 57.8, 22.5, 2024),
(11, 11, 24000, 56.7, 21.3, 2020),
(12, 12, 20000, 50.3, 17.8, 2021),
(13, 13, 19000, 48.2, 16.7, 2022),
(14, 14, 17000, 43.5, 14.8, 2023),
(15, 15, 15000, 40.2, 12.5, 2024),
(16, 16, 16000, 41.8, 13.2, 2020),
(17, 17, 15500, 39.7, 12.8, 2021),
(18, 18, 14500, 37.2, 11.5, 2022);

-- 6. SDG_4 
INSERT INTO SDG_4 (Education_ID, City_ID, Literacy_Rate, School_Enrollment, ICT_Access, Year) VALUES
(1, 1, 72.5, 68.3, 55.2, 2020),
(2, 2, 75.8, 72.1, 62.7, 2021),
(3, 3, 68.2, 65.7, 48.3, 2022),
(4, 4, 74.3, 70.5, 60.1, 2023),
(5, 5, 67.8, 64.2, 47.5, 2024),
(6, 6, 65.3, 62.8, 45.2, 2020),
(7, 7, 63.7, 60.5, 43.8, 2021),
(8, 8, 82.5, 78.3, 75.2, 2022),
(9, 9, 58.2, 55.7, 38.5, 2023),
(10, 10, 69.5, 66.2, 50.8, 2024),
(11, 11, 66.8, 63.5, 46.3, 2020),
(12, 12, 62.7, 59.3, 42.1, 2021),
(13, 13, 60.3, 57.8, 40.2, 2022),
(14, 14, 57.8, 54.3, 37.5, 2023),
(15, 15, 52.3, 49.7, 32.8, 2024),
(16, 16, 50.8, 48.2, 31.2, 2020),
(17, 17, 49.2, 46.7, 29.8, 2021),
(18, 18, 47.5, 45.1, 28.3, 2022);

-- 7. SDG_7 
INSERT INTO SDG_7 (Energy_ID, City_ID, Electricity_Access, Clean_Fuel_Use, Renewable_Energy_Share, Year) VALUES
(1, 1, 85.2, 65.3, 12.5, 2020),
(2, 2, 88.7, 68.7, 15.2, 2021),
(3, 3, 82.5, 62.8, 10.8, 2022),
(4, 4, 87.3, 67.5, 14.3, 2023),
(5, 5, 83.8, 63.2, 11.7, 2024),
(6, 6, 80.2, 60.7, 9.8, 2020),
(7, 7, 81.5, 61.3, 10.2, 2021),
(8, 8, 95.7, 78.5, 20.3, 2022),
(9, 9, 75.8, 55.2, 8.5, 2023),
(10, 10, 84.8, 64.2, 12.8, 2024),
(11, 11, 81.2, 60.8, 10.5, 2020),
(12, 12, 78.3, 58.7, 9.3, 2021),
(13, 13, 76.7, 56.3, 8.8, 2022),
(14, 14, 73.2, 53.5, 7.5, 2023),
(15, 15, 68.5, 50.2, 7.2, 2024),
(16, 16, 66.8, 49.1, 6.8, 2020),
(17, 17, 65.2, 47.8, 6.5, 2021),
(18, 18, 63.7, 46.3, 6.2, 2022);

-- 8. SDG_11 
INSERT INTO SDG_11 (Postal_Code, City_ID, Air_Quality_Index, Transport_Access, Infrastructure_Score, Year) VALUES
(75500, 1, 152, 68.5, 72.3, 2020),
(54000, 2, 142, 72.8, 78.5, 2021),
(38000, 3, 158, 65.7, 70.2, 2022),
(46000, 4, 145, 70.5, 75.8, 2023),
(60000, 5, 162, 64.2, 68.7, 2024),
(71000, 6, 168, 62.8, 65.3, 2020),
(25000, 7, 165, 60.5, 67.2, 2021),
(44000, 8, 120, 78.3, 85.7, 2022),
(87300, 9, 175, 55.7, 62.5, 2023),
(52250, 10, 145, 66.2, 72.8, 2024),
(51310, 11, 148, 63.5, 70.5, 2020),
(63100, 12, 158, 59.3, 65.8, 2021),
(65200, 13, 162, 57.8, 63.7, 2022),
(77150, 14, 168, 54.3, 60.2, 2023),
(13100, 15, 112, 48.2, 58.3, 2024),
(15100, 16, 98, 46.7, 55.7, 2020),
(17200, 17, 105, 45.2, 53.8, 2021),
(66020, 18, 118, 43.7, 52.3, 2022);
