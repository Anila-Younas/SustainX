from rest_framework import serializers
from .models import City, SDG1

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