CREATE TABLE admin_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'admin') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Audit log table
CREATE TABLE audit_log (
    id INT PRIMARY KEY AUTO_INCREMENT,
    admin_id INT,
    action ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    table_name VARCHAR(50) NOT NULL,
    record_id INT,
    old_values JSON,
    new_values JSON,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    FOREIGN KEY (admin_id) REFERENCES admin_users(id)
);

-- Procedure to insert SDG_1 data (Admin only)
DELIMITER //
CREATE PROCEDURE InsertSDG1Data(
    IN p_admin_id INT,
    IN p_city_id INT,
    IN p_income_level DECIMAL(10,2),
    IN p_access_to_education DECIMAL(5,2),
    IN p_social_protection DECIMAL(5,2),
    IN p_year INT
)
BEGIN
    DECLARE admin_exists INT DEFAULT 0;
    DECLARE new_record_id INT;
    
    -- Check if admin exists and is active
    SELECT COUNT(*) INTO admin_exists 
    FROM admin_users 
    WHERE id = p_admin_id AND is_active = TRUE;
    
    IF admin_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unauthorized: Invalid admin credentials';
    ELSE
        -- Insert the data
        INSERT INTO SDG_1 (City_ID, Income_Level, Access_to_Education, Social_Protection, Year)
        VALUES (p_city_id, p_income_level, p_access_to_education, p_social_protection, p_year);
        
        SET new_record_id = LAST_INSERT_ID();
        
        -- Log the action
        INSERT INTO audit_log (admin_id, action, table_name, record_id, new_values)
        VALUES (p_admin_id, 'INSERT', 'SDG_1', new_record_id, 
                JSON_OBJECT(
                    'city_id', p_city_id,
                    'income_level', p_income_level,
                    'access_to_education', p_access_to_education,
                    'social_protection', p_social_protection,
                    'year', p_year
                ));
        
        SELECT 'SDG 1 data inserted successfully' as message, new_record_id as id;
    END IF;
END //

-- Procedure to insert SDG_3 data (Health data - referenced by SDG_2 and SDG_6)
CREATE PROCEDURE InsertSDG3Data(
    IN p_admin_id INT,
    IN p_city_id INT,
    IN p_access_to_healthcare DECIMAL(5,2),
    IN p_maternal_mortality DECIMAL(8,2),
    IN p_vaccination_coverage DECIMAL(5,2),
    IN p_year INT
)
BEGIN
    DECLARE admin_exists INT DEFAULT 0;
    DECLARE new_record_id INT;
    
    SELECT COUNT(*) INTO admin_exists 
    FROM admin_users 
    WHERE id = p_admin_id AND is_active = TRUE;
    
    IF admin_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unauthorized: Invalid admin credentials';
    ELSE
        INSERT INTO SDG_3 (City_ID, Access_to_Healthcare, Maternal_Mortality, Vaccination_Coverage, Year)
        VALUES (p_city_id, p_access_to_healthcare, p_maternal_mortality, p_vaccination_coverage, p_year);
        
        SET new_record_id = LAST_INSERT_ID();
        
        INSERT INTO audit_log (admin_id, action, table_name, record_id, new_values)
        VALUES (p_admin_id, 'INSERT', 'SDG_3', new_record_id, 
                JSON_OBJECT(
                    'city_id', p_city_id,
                    'access_to_healthcare', p_access_to_healthcare,
                    'maternal_mortality', p_maternal_mortality,
                    'vaccination_coverage', p_vaccination_coverage,
                    'year', p_year
                ));
        
        SELECT 'SDG 3 data inserted successfully' as message, new_record_id as id;
    END IF;
END //

-- Procedure to insert SDG_2 data (requires Health_ID from SDG_3)
CREATE PROCEDURE InsertSDG2Data(
    IN p_admin_id INT,
    IN p_health_id INT,
    IN p_city_id INT,
    IN p_malnutrition_rate DECIMAL(5,2),
    IN p_food_insecurity DECIMAL(5,2),
    IN p_year INT
)
BEGIN
    DECLARE admin_exists INT DEFAULT 0;
    DECLARE health_exists INT DEFAULT 0;
    DECLARE new_record_id INT;
    
    SELECT COUNT(*) INTO admin_exists 
    FROM admin_users 
    WHERE id = p_admin_id AND is_active = TRUE;
    
    SELECT COUNT(*) INTO health_exists 
    FROM SDG_3 
    WHERE Health_ID = p_health_id;
    
    IF admin_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unauthorized: Invalid admin credentials';
    ELSEIF health_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid Health_ID: Must reference existing SDG_3 record';
    ELSE
        INSERT INTO SDG_2 (Health_ID, City_ID, Malnutrition_Rate, Food_Insecurity, Year)
        VALUES (p_health_id, p_city_id, p_malnutrition_rate, p_food_insecurity, p_year);
        
        SET new_record_id = LAST_INSERT_ID();
        
        INSERT INTO audit_log (admin_id, action, table_name, record_id, new_values)
        VALUES (p_admin_id, 'INSERT', 'SDG_2', new_record_id, 
                JSON_OBJECT(
                    'health_id', p_health_id,
                    'city_id', p_city_id,
                    'malnutrition_rate', p_malnutrition_rate,
                    'food_insecurity', p_food_insecurity,
                    'year', p_year
                ));
        
        SELECT 'SDG 2 data inserted successfully' as message, new_record_id as id;
    END IF;
END //

-- Update procedures for each SDG
CREATE PROCEDURE UpdateSDG1Data(
    IN p_admin_id INT,
    IN p_poverty_id INT,
    IN p_income_level DECIMAL(10,2),
    IN p_access_to_education DECIMAL(5,2),
    IN p_social_protection DECIMAL(5,2)
)
BEGIN
    DECLARE admin_exists INT DEFAULT 0;
    DECLARE old_data JSON;
    
    SELECT COUNT(*) INTO admin_exists 
    FROM admin_users 
    WHERE id = p_admin_id AND is_active = TRUE;
    
    IF admin_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unauthorized: Invalid admin credentials';
    ELSE
        -- Get old data for audit
        SELECT JSON_OBJECT(
            'income_level', Income_Level,
            'access_to_education', Access_to_Education,
            'social_protection', Social_Protection
        ) INTO old_data
        FROM SDG_1 WHERE Poverty_ID = p_poverty_id;
        
        -- Update the record
        UPDATE SDG_1 
        SET Income_Level = p_income_level,
            Access_to_Education = p_access_to_education,
            Social_Protection = p_social_protection
        WHERE Poverty_ID = p_poverty_id;
        
        -- Log the action
        INSERT INTO audit_log (admin_id, action, table_name, record_id, old_values, new_values)
        VALUES (p_admin_id, 'UPDATE', 'SDG_1', p_poverty_id, old_data,
                JSON_OBJECT(
                    'income_level', p_income_level,
                    'access_to_education', p_access_to_education,
                    'social_protection', p_social_protection
                ));
        
        SELECT 'SDG 1 data updated successfully' as message;
    END IF;
END //

DELIMITER ;

-- Create views for public access (read-only)
CREATE VIEW public_sdg_overview AS
SELECT 
    c.City_Name,
    c.Province,
    c.Urbanization_Level,
    -- SDG 1 data
    s1.Income_Level,
    s1.Access_to_Education,
    s1.Social_Protection,
    s1.Year as SDG1_Year,
    -- SDG 3 data
    s3.Access_to_Healthcare,
    s3.Maternal_Mortality,
    s3.Vaccination_Coverage,
    s3.Year as SDG3_Year
FROM CITY c
LEFT JOIN SDG_1 s1 ON c.City_ID = s1.City_ID
LEFT JOIN SDG_3 s3 ON c.City_ID = s3.City_ID;

-- Dashboard summary view
CREATE VIEW dashboard_summary AS
SELECT 
    c.Province,
    COUNT(DISTINCT c.City_ID) as total_cities,
    AVG(s1.Income_Level) as avg_income,
    AVG(s3.Access_to_Healthcare) as avg_healthcare_access,
    AVG(s4.Literacy_Rate) as avg_literacy,
    MAX(s1.Year) as latest_data_year
FROM CITY c
LEFT JOIN SDG_1 s1 ON c.City_ID = s1.City_ID
LEFT JOIN SDG_3 s3 ON c.City_ID = s3.City_ID
LEFT JOIN SDG_4 s4 ON c.City_ID = s4.City_ID
GROUP BY c.Province;