from rest_framework import serializers
from .models import (
    SDGInfo, City, SDG1, SDG2, SDG3, SDG4, SDG6, SDG7, SDG11, AuditLog
)

class SDGInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SDGInfo
        fields = '__all__'

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'

class SDG1Serializer(serializers.ModelSerializer):
    city_name = serializers.CharField(source='city.city_name', read_only=True)
    province = serializers.CharField(source='city.province', read_only=True)
    
    class Meta:
        model = SDG1
        fields = '__all__'

class SDG1CreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SDG1
        fields = ['city', 'income_level', 'access_to_education', 'social_protection', 'year']

class SDG3Serializer(serializers.ModelSerializer):
    city_name = serializers.CharField(source='city.city_name', read_only=True)
    province = serializers.CharField(source='city.province', read_only=True)
    
    class Meta:
        model = SDG3
        fields = '__all__'

class SDG3CreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SDG3
        fields = ['city', 'access_to_healthcare', 'maternal_mortality', 'vaccination_coverage', 'year']

class SDG2Serializer(serializers.ModelSerializer):
    city_name = serializers.CharField(source='city.city_name', read_only=True)
    province = serializers.CharField(source='city.province', read_only=True)
    health_data = SDG3Serializer(source='health', read_only=True)
    
    class Meta:
        model = SDG2
        fields = '__all__'

class SDG2CreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SDG2
        fields = ['health', 'city', 'malnutrition_rate', 'food_insecurity', 'year']

class SDG4Serializer(serializers.ModelSerializer):
    city_name = serializers.CharField(source='city.city_name', read_only=True)
    province = serializers.CharField(source='city.province', read_only=True)
    
    class Meta:
        model = SDG4
        fields = '__all__'

class SDG6Serializer(serializers.ModelSerializer):
    city_name = serializers.CharField(source='city.city_name', read_only=True)
    province = serializers.CharField(source='city.province', read_only=True)
    health_data = SDG3Serializer(source='health', read_only=True)
    
    class Meta:
        model = SDG6
        fields = '__all__'

class SDG7Serializer(serializers.ModelSerializer):
    city_name = serializers.CharField(source='city.city_name', read_only=True)
    province = serializers.CharField(source='city.province', read_only=True)
    
    class Meta:
        model = SDG7
        fields = '__all__'

class SDG11Serializer(serializers.ModelSerializer):
    city_name = serializers.CharField(source='city.city_name', read_only=True)
    province = serializers.CharField(source='city.province', read_only=True)
    
    class Meta:
        model = SDG11
        fields = '__all__'

class AuditLogSerializer(serializers.ModelSerializer):
    admin_username = serializers.CharField(source='admin.username', read_only=True)
    
    class Meta:
        model = AuditLog
        fields = [
            'id', 'admin_username', 'action', 'table_name',
            'record_id', 'old_values', 'new_values', 'timestamp'
        ]

# Combined overview serializer for dashboard
class CityOverviewSerializer(serializers.Serializer):
    city_name = serializers.CharField()
    province = serializers.CharField()
    urbanization_level = serializers.CharField()
    
    # Latest SDG data
    latest_income_level = serializers.DecimalField(max_digits=10, decimal_places=2, allow_null=True)
    latest_healthcare_access = serializers.DecimalField(max_digits=5, decimal_places=2, allow_null=True)
    latest_literacy_rate = serializers.DecimalField(max_digits=5, decimal_places=2, allow_null=True)
    latest_clean_water_access = serializers.DecimalField(max_digits=5, decimal_places=2, allow_null=True)
    latest_electricity_access = serializers.DecimalField(max_digits=5, decimal_places=2, allow_null=True)
    latest_air_quality = serializers.DecimalField(max_digits=8, decimal_places=2, allow_null=True)
    
