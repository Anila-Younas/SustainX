from django.db import models
from authentication.models import AdminUser

class SDGInfo(models.Model):
    sdg_id = models.AutoField(primary_key=True, db_column='SDG_ID')
    sdg_name = models.CharField(max_length=255, db_column='SDG_Name')
    description = models.TextField(blank=True, db_column='Description')
    
    class Meta:
        db_table = 'SDG_INFO'
        managed = False
        
    def __str__(self):
        return f"SDG {self.sdg_id}: {self.sdg_name}"

class City(models.Model):
    URBANIZATION_CHOICES = [
        ('Urban', 'Urban'),
        ('Rural', 'Rural'),
        ('Semi-Urban', 'Semi-Urban'),
    ]
    
    city_id = models.AutoField(primary_key=True, db_column='City_ID')
    city_name = models.CharField(max_length=100, db_column='City_Name')
    province = models.CharField(max_length=100, db_column='Province')
    urbanization_level = models.CharField(
        max_length=20, 
        choices=URBANIZATION_CHOICES, 
        default='Urban',
        db_column='Urbanization_Level'
    )
    
    class Meta:
        db_table = 'CITY'
        managed = False
        
    def __str__(self):
        return f"{self.city_name}, {self.province}"

class SDG1(models.Model):
    poverty_id = models.AutoField(primary_key=True, db_column='Poverty_ID')
    city = models.ForeignKey(City, on_delete=models.CASCADE, db_column='City_ID')
    income_level = models.DecimalField(max_digits=10, decimal_places=2, db_column='Income_Level')
    access_to_education = models.DecimalField(max_digits=5, decimal_places=2, db_column='Access_to_Education')
    social_protection = models.DecimalField(max_digits=5, decimal_places=2, db_column='Social_Protection')
    year = models.IntegerField(db_column='Year')
    
    class Meta:
        db_table = 'SDG_1'
        managed = False
        ordering = ['-year']
        
    def __str__(self):
        return f"SDG 1 - {self.city.city_name} ({self.year})"

class SDG3(models.Model):
    health_id = models.AutoField(primary_key=True, db_column='Health_ID')
    city = models.ForeignKey(City, on_delete=models.CASCADE, db_column='City_ID')
    access_to_healthcare = models.DecimalField(max_digits=5, decimal_places=2, db_column='Access_to_Healthcare')
    maternal_mortality = models.DecimalField(max_digits=8, decimal_places=2, db_column='Maternal_Mortality')
    vaccination_coverage = models.DecimalField(max_digits=5, decimal_places=2, db_column='Vaccination_Coverage')
    year = models.IntegerField(db_column='Year')
    
    class Meta:
        db_table = 'SDG_3'
        managed = False
        ordering = ['-year']
        
    def __str__(self):
        return f"SDG 3 - {self.city.city_name} ({self.year})"

class SDG2(models.Model):
    hunger_id = models.AutoField(primary_key=True, db_column='Hunger_ID')
    health = models.ForeignKey(SDG3, on_delete=models.CASCADE, db_column='Health_ID')
    city = models.ForeignKey(City, on_delete=models.CASCADE, db_column='City_ID')
    malnutrition_rate = models.DecimalField(max_digits=5, decimal_places=2, db_column='Malnutrition_Rate')
    food_insecurity = models.DecimalField(max_digits=5, decimal_places=2, db_column='Food_Insecurity')
    year = models.IntegerField(db_column='Year')
    
    class Meta:
        db_table = 'SDG_2'
        managed = False
        ordering = ['-year']
        
    def __str__(self):
        return f"SDG 2 - {self.city.city_name} ({self.year})"

class SDG4(models.Model):
    education_id = models.AutoField(primary_key=True, db_column='Education_ID')
    city = models.ForeignKey(City, on_delete=models.CASCADE, db_column='City_ID')
    literacy_rate = models.DecimalField(max_digits=5, decimal_places=2, db_column='Literacy_Rate')
    school_enrollment = models.DecimalField(max_digits=5, decimal_places=2, db_column='School_Enrollment')
    ict_access = models.DecimalField(max_digits=5, decimal_places=2, db_column='ICT_Access')
    year = models.IntegerField(db_column='Year')
    
    class Meta:
        db_table = 'SDG_4'
        managed = False
        ordering = ['-year']
        
    def __str__(self):
        return f"SDG 4 - {self.city.city_name} ({self.year})"

class SDG6(models.Model):
    water_id = models.AutoField(primary_key=True, db_column='Water_ID')
    city = models.ForeignKey(City, on_delete=models.CASCADE, db_column='City_ID')
    health = models.ForeignKey(SDG3, on_delete=models.CASCADE, db_column='Health_ID')
    access_to_clean_water = models.DecimalField(max_digits=5, decimal_places=2, db_column='Access_to_Clean_Water')
    sanitation_coverage = models.DecimalField(max_digits=5, decimal_places=2, db_column='Sanitation_Coverage')
    year = models.IntegerField(db_column='Year')
    
    class Meta:
        db_table = 'SDG_6'
        managed = False
        ordering = ['-year']
        
    def __str__(self):
        return f"SDG 6 - {self.city.city_name} ({self.year})"

class SDG7(models.Model):
    energy_id = models.AutoField(primary_key=True, db_column='Energy_ID')
    city = models.ForeignKey(City, on_delete=models.CASCADE, db_column='City_ID')
    electricity_access = models.DecimalField(max_digits=5, decimal_places=2, db_column='Electricity_Access')
    clean_fuel_use = models.DecimalField(max_digits=5, decimal_places=2, db_column='Clean_Fuel_Use')
    renewable_energy_share = models.DecimalField(max_digits=5, decimal_places=2, db_column='Renewable_Energy_Share')
    year = models.IntegerField(db_column='Year')
    
    class Meta:
        db_table = 'SDG_7'
        managed = False
        ordering = ['-year']
        
    def __str__(self):
        return f"SDG 7 - {self.city.city_name} ({self.year})"

class SDG11(models.Model):
    postal_code = models.IntegerField(primary_key=True, db_column='Postal_Code')
    city = models.ForeignKey(City, on_delete=models.CASCADE, db_column='City_ID')
    air_quality_index = models.DecimalField(max_digits=8, decimal_places=2, db_column='Air_Quality_Index')
    transport_access = models.DecimalField(max_digits=5, decimal_places=2, db_column='Transport_Access')
    infrastructure_score = models.TextField(db_column='Infrastructure_Score')
    year = models.IntegerField(db_column='Year')
    
    class Meta:
        db_table = 'SDG_11'
        managed = False
        ordering = ['-year']
        
    def __str__(self):
        return f"SDG 11 - {self.city.city_name} ({self.year})"

class AuditLog(models.Model):
    ACTION_CHOICES = [
        ('INSERT', 'Insert'),
        ('UPDATE', 'Update'),
        ('DELETE', 'Delete'),
    ]
    
    admin = models.ForeignKey(AdminUser, on_delete=models.CASCADE)
    action = models.CharField(max_length=10, choices=ACTION_CHOICES)
    table_name = models.CharField(max_length=50)
    record_id = models.IntegerField(null=True)
    old_values = models.JSONField(null=True, blank=True)
    new_values = models.JSONField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    
    class Meta:
        db_table = 'audit_log'
        managed = False
        ordering = ['-timestamp']