from django.db import models
from django.contrib.auth.models import User

class SDGInfo(models.Model):
    sdg_id = models.IntegerField(primary_key=True, db_column='SDG_ID')
    sdg_name = models.CharField(max_length=100, db_column='SDG_NAME')
    description = models.TextField(db_column='DESCRIPTION')
    
    class Meta:
        db_table = 'SDG_INFO'
        managed = False  # Django won't manage this table
    
    def __str__(self):
        return f"SDG {self.sdg_id}: {self.sdg_name}"

class City(models.Model):
    city_id = models.AutoField(primary_key=True, db_column='City_ID')
    city_name = models.CharField(max_length=100, db_column='City_Name')
    province = models.CharField(max_length=100, db_column='Province')
    urbanization_level = models.CharField(max_length=100, db_column='Urbanization_level')
    
    class Meta:
        db_table = 'CITY'
        managed = False
    
    def __str__(self):
        return f"{self.city_name}, {self.province}"

class SDG1(models.Model):
    poverty_id = models.AutoField(primary_key=True, db_column='Poverty_ID')
    city_id = models.ForeignKey(City, on_delete=models.CASCADE, db_column='City_ID')
    income_level = models.DecimalField(max_digits=10, decimal_places=2, db_column='Income_Level')
    access_to_education = models.DecimalField(max_digits=5, decimal_places=2, db_column='Access_to_Education')
    social_protection = models.DecimalField(max_digits=5, decimal_places=2, db_column='Social_Protection')
    year = models.IntegerField(db_column='Year')
    
    class Meta:
        db_table = 'SDG_1'
        managed = False
    
    def __str__(self):
        return f"SDG1 - {self.city_id.city_name} ({self.year})"

class SDG2(models.Model):
    hunger_id = models.AutoField(primary_key=True, db_column='Hunger_ID')
    health_id = models.IntegerField(null=True, blank=True, db_column='Health_ID')
    city_id = models.ForeignKey(City, on_delete=models.CASCADE, null=True, blank=True, db_column='City_ID')
    malnutrition_rate = models.FloatField(null=True, blank=True, db_column='Malnutrition_Rate')
    food_insecurity = models.FloatField(null=True, blank=True, db_column='Food_Insecurity')
    year = models.CharField(max_length=4, null=True, blank=True, db_column='Year')
    
    class Meta:
        db_table = 'SDG_2'
        managed = False
    
    def __str__(self):
        city_name = self.city_id.city_name if self.city_id else 'No City'
        return f"SDG2 - {city_name} ({self.year})"

class SDG3(models.Model):
    health_id = models.AutoField(primary_key=True, db_column='Health_ID')
    city_id = models.ForeignKey(City, on_delete=models.CASCADE, db_column='City_ID')
    access_to_healthcare = models.DecimalField(max_digits=5, decimal_places=2, db_column='Access_to_Healthcare')  # ✅ This field
    maternal_mortality = models.DecimalField(max_digits=5, decimal_places=2, db_column='Maternal_Mortality')
    vaccination_coverage = models.DecimalField(max_digits=5, decimal_places=2, db_column='Vaccination_Coverage')
    year = models.IntegerField(db_column='Year')
    
    class Meta:
        db_table = 'SDG_3'
        managed = False
    
    def __str__(self):
        return f"SDG3 - {self.city_id.city_name} ({self.year})"

class SDG4(models.Model):
    education_id = models.AutoField(primary_key=True, db_column='Education_ID')
    city_id = models.ForeignKey(City, on_delete=models.CASCADE, db_column='City_ID')
    literacy_rate = models.DecimalField(max_digits=5, decimal_places=2, db_column='Literacy_Rate')
    school_enrollment = models.DecimalField(max_digits=5, decimal_places=2, db_column='School_Enrollment')
    ict_access = models.DecimalField(max_digits=5, decimal_places=2, db_column='ICT_Access')
    year = models.IntegerField(db_column='Year')
    
    class Meta:
        db_table = 'SDG_4'
        managed = False
    
    def __str__(self):
        return f"SDG4 - {self.city_id.city_name} ({self.year})"

class SDG6(models.Model):
    water_id = models.AutoField(primary_key=True, db_column='Water_ID')
    city_id = models.ForeignKey(City, on_delete=models.CASCADE, db_column='City_ID')
    health_id = models.IntegerField(db_column='Health_ID')
    access_to_clean_water = models.DecimalField(max_digits=5, decimal_places=2, db_column='Access_to_Clean_Water')
    sanitation_coverage = models.DecimalField(max_digits=5, decimal_places=2, db_column='Sanitation_Coverage')
    year = models.IntegerField(db_column='Year')
    
    class Meta:
        db_table = 'SDG_6'
        managed = False
    
    def __str__(self):
        return f"SDG6 - {self.city_id.city_name} ({self.year})"

class SDG7(models.Model):
    energy_id = models.AutoField(primary_key=True, db_column='Energy_ID')
    city_id = models.ForeignKey(City, on_delete=models.CASCADE, db_column='City_ID')
    electricity_access = models.DecimalField(max_digits=5, decimal_places=2, db_column='Electricity_Access')
    clean_fuel_use = models.DecimalField(max_digits=5, decimal_places=2, db_column='Clean_Fuel_Use')
    renewable_energy_share = models.DecimalField(max_digits=5, decimal_places=2, db_column='Renewable_Energy_Share')
    year = models.IntegerField(db_column='Year')
    
    class Meta:
        db_table = 'SDG_7'
        managed = False
    
    def __str__(self):
        return f"SDG7 - {self.city_id.city_name} ({self.year})"

class SDG11(models.Model):
    postal_code = models.CharField(max_length=20, primary_key=True, db_column='Postal_Code')
    city_id = models.ForeignKey(City, on_delete=models.CASCADE, db_column='City_ID')
    air_quality_index = models.IntegerField(db_column='Air_Quality_Index')
    transport_access = models.FloatField(db_column='Transport_Access')
    infrastructure_score = models.TextField(db_column='Infrastructure_Score')
    year = models.CharField(max_length=4, db_column='Year')
    
    class Meta:
        db_table = 'SDG_11'
        managed = False
    
    def __str__(self):
        return f"SDG11 - {self.city_id.city_name} ({self.year})"

# Admin and audit models (these Django will manage)
class AdminQuery(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    query_type = models.CharField(max_length=20, choices=[
        ('SELECT', 'Select'),
        ('INSERT', 'Insert'),
        ('UPDATE', 'Update'),
        ('DELETE', 'Delete'),
    ])
    table_name = models.CharField(max_length=100)
    sql_query = models.TextField()
    affected_rows = models.IntegerField(default=0)
    execution_time = models.FloatField(help_text="Execution time in seconds")
    success = models.BooleanField(default=True)
    error_message = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.query_type} on {self.table_name} at {self.timestamp}"
    
    class Meta:
        ordering = ['-timestamp']