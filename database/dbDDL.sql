-- Create SDG information table (standalone)
CREATE TABLE SDG_INFO (
    SDG_ID INT PRIMARY KEY,
    SDG_NAME VARCHAR(100) NOT NULL,
    DESCRIPTION TEXT
);

-- Create CITY table
CREATE TABLE CITY (
    City_ID INT PRIMARY KEY AUTO_INCREMENT,
    City_Name VARCHAR(100) NOT NULL,
    Province VARCHAR(100) NOT NULL,
    Urbanization_Level VARCHAR(50) CHECK (Urbanization_Level IN ('Urban', 'Rural', 'Semi-Urban'))
);

-- Create SDG_1 table (No Poverty)
CREATE TABLE SDG_1 (
    Poverty_ID INT PRIMARY KEY AUTO_INCREMENT,
    City_ID INT NOT NULL,
    Income_Level DECIMAL(10,2) NOT NULL,
    Access_to_Education DECIMAL(5,2) NOT NULL,
    Social_Protection DECIMAL(5,2) NOT NULL,
    Year INT NOT NULL,
    FOREIGN KEY (City_ID) REFERENCES CITY(City_ID)
);

-- Create SDG_2 table (Zero Hunger) with one-to-one to SDG_3
CREATE TABLE SDG_2 (
    Hunger_ID INT PRIMARY KEY AUTO_INCREMENT,
    Health_ID INT NOT NULL UNIQUE,  
    City_ID INT NOT NULL,
    Malnutrition_Rate DECIMAL(5,2) NOT NULL,
    Food_Insecurity DECIMAL(5,2) NOT NULL,
    Year INT NOT NULL,
    FOREIGN KEY (Health_ID) REFERENCES SDG_3(Health_ID),
    FOREIGN KEY (City_ID) REFERENCES CITY(City_ID)
);

-- Create SDG_3 table (Good Health)
CREATE TABLE SDG_3 (
    Health_ID INT PRIMARY KEY AUTO_INCREMENT,
    City_ID INT NOT NULL,
    Access_to_Healthcare DECIMAL(5,2) NOT NULL,
    Maternal_Mortality DECIMAL(5,2) NOT NULL,
    Vaccination_Coverage DECIMAL(5,2) NOT NULL,
    Year INT NOT NULL,
    FOREIGN KEY (City_ID) REFERENCES CITY(City_ID)
);

-- Create SDG_4 table (Quality Education)
CREATE TABLE SDG_4 (
    Education_ID INT PRIMARY KEY AUTO_INCREMENT,
    City_ID INT NOT NULL,
    Literacy_Rate DECIMAL(5,2) NOT NULL,
    School_Enrollment DECIMAL(5,2) NOT NULL,
    ICT_Access DECIMAL(5,2) NOT NULL,
    Year INT NOT NULL,
    FOREIGN KEY (City_ID) REFERENCES CITY(City_ID)
);

-- Create SDG_6 table (Clean Water) with one-to-one to SDG_3
CREATE TABLE SDG_6 (
    Water_ID INT PRIMARY KEY AUTO_INCREMENT,
    City_ID INT NOT NULL,
    Health_ID INT NOT NULL UNIQUE,  
    Access_to_Clean_Water DECIMAL(5,2) NOT NULL,
    Sanitation_Coverage DECIMAL(5,2) NOT NULL,
    Year INT NOT NULL,
    FOREIGN KEY (City_ID) REFERENCES CITY(City_ID),
    FOREIGN KEY (Health_ID) REFERENCES SDG_3(Health_ID)
);

-- Create SDG_7 table (Affordable & Clean Energy)
CREATE TABLE SDG_7 (
    Energy_ID INT PRIMARY KEY AUTO_INCREMENT,
    City_ID INT NOT NULL,
    Electricity_Access DECIMAL(5,2) NOT NULL,
    Clean_Fuel_Use DECIMAL(5,2) NOT NULL,
    Renewable_Energy_Share DECIMAL(5,2) NOT NULL,
    Year INT NOT NULL,
    FOREIGN KEY (City_ID) REFERENCES CITY(City_ID)
);

-- Create SDG_11 table (Sustainable Cities)
CREATE TABLE SDG_11 (
    Postal_Code INT PRIMARY KEY,
    City_ID INT NOT NULL,
    Air_Quality_Index DECIMAL(5,2) NOT NULL,
    Transport_Access DECIMAL(5,2) NOT NULL,
    Infrastructure_Score DECIMAL(5,2) NOT NULL,
    Year INT NOT NULL,
    FOREIGN KEY (City_ID) REFERENCES CITY(City_ID)
);

-- Create indexes for performance optimization
CREATE INDEX idx_city_name ON CITY(City_Name);
CREATE INDEX idx_city_province ON CITY(Province);
CREATE INDEX idx_poverty_city ON SDG_1(City_ID);
CREATE INDEX idx_hunger_health ON SDG_2(Health_ID);
CREATE INDEX idx_health_city ON SDG_3(City_ID);
CREATE INDEX idx_education_city ON SDG_4(City_ID);
CREATE INDEX idx_water_health ON SDG_6(Health_ID);
CREATE INDEX idx_energy_city ON SDG_7(City_ID);
CREATE INDEX idx_cities_city ON SDG_11(City_ID);