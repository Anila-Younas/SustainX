from django.contrib import admin
from django.db import models
from django.forms import TextInput, Textarea
from .models import (
    SDGInfo, City, SDG1, SDG2, SDG3, SDG4, SDG6, SDG7, SDG11, AdminQuery
)

# Full access admin for SDG Info
@admin.register(SDGInfo)
class SDGInfoAdmin(admin.ModelAdmin):
    list_display = ('sdg_id', 'sdg_name', 'description')
    search_fields = ('sdg_name', 'description')
    ordering = ('sdg_id',)
    
    # Allow full CRUD operations

    list_editable = ('sdg_name',)  # Quick edit from list view
    
    formfield_overrides = {
        models.CharField: {'widget': TextInput(attrs={'size': '60'})},
        models.TextField: {'widget': Textarea(attrs={'rows': 4, 'cols': 60})},
    }

# Full access admin for City
@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ('city_id', 'city_name', 'province', 'urbanization_level')
    list_filter = ('province', 'urbanization_level')
    search_fields = ('city_name', 'province')
    ordering = ('province', 'city_name')
    
    # Allow full CRUD operations

    list_editable = ('city_name', 'province', 'urbanization_level')
    
    # Custom form widgets
    formfield_overrides = {
        models.CharField: {'widget': TextInput(attrs={'size': '40'})},
    }

# Full access admin for SDG1 (No Poverty)
@admin.register(SDG1)
class SDG1Admin(admin.ModelAdmin):
    list_display = ('poverty_id', 'city_id', 'income_level', 'access_to_education', 'social_protection', 'year')
    list_filter = ('year', 'access_to_education', 'social_protection', 'city_id__province')
    search_fields = ('city_id__city_name', 'city_id__province')
    ordering = ('-year', 'city_id__city_name')
    
    # Allow full CRUD operations
   
    list_editable = ('income_level', 'access_to_education', 'social_protection')
    
    # Group fields logically
    fieldsets = (
        ('Location & Time', {
            'fields': ('city_id', 'year')
        }),
        ('Poverty Data', {
            'fields': ('income_level', 'access_to_education', 'social_protection')
        }),
    )

# Full access admin for SDG2 (Zero Hunger)
@admin.register(SDG2)
class SDG2Admin(admin.ModelAdmin):
    list_display = ('hunger_id', 'city_id', 'malnutrition_rate', 'food_insecurity', 'year')
    list_filter = ('year', 'city_id__province')
    search_fields = ('city_id__city_name', 'city_id__province')
    ordering = ('-year', 'city_id__city_name')
    
    # Allow full CRUD operations

    list_editable = ('malnutrition_rate', 'food_insecurity')
    
    fieldsets = (
        ('Location & Time', {
            'fields': ('city_id', 'year')
        }),
        ('Health Reference', {
            'fields': ('health_id',)
        }),
        ('Hunger Data', {
            'fields': ('malnutrition_rate', 'food_insecurity')
        }),
    )

# Full access admin for SDG3 (Good Health)
@admin.register(SDG3)
class SDG3Admin(admin.ModelAdmin):
    list_display = ('health_id', 'city_id', 'access_to_healthcare', 'maternal_mortality', 'vaccination_coverage', 'year')
    list_filter = ('year', 'vaccination_coverage', 'city_id__province')
    search_fields = ('city_id__city_name', 'city_id__province')
    ordering = ('-year', 'city_id__city_name')
    
    # Allow full CRUD operations
    list_editable = ('access_to_healthcare', 'maternal_mortality', 'vaccination_coverage')
    
    fieldsets = (
        ('Location & Time', {
            'fields': ('city_id', 'year')
        }),
        ('Health Data', {
            'fields': ('access_to_healthcare', 'maternal_mortality', 'vaccination_coverage')
        }),
    )

# Full access admin for SDG4 (Quality Education)
@admin.register(SDG4)
class SDG4Admin(admin.ModelAdmin):
    list_display = ('education_id', 'city_id', 'literacy_rate', 'school_enrollment', 'ict_access', 'year')
    list_filter = ('year', 'ict_access', 'city_id__province')
    search_fields = ('city_id__city_name', 'city_id__province')
    ordering = ('-year', 'city_id__city_name')
    
    # Allow full CRUD operations
    list_editable = ('literacy_rate', 'school_enrollment', 'ict_access')
    
    fieldsets = (
        ('Location & Time', {
            'fields': ('city_id', 'year')
        }),
        ('Education Data', {
            'fields': ('literacy_rate', 'school_enrollment', 'ict_access')
        }),
    )

# Full access admin for SDG6 (Clean Water)
@admin.register(SDG6)
class SDG6Admin(admin.ModelAdmin):
    list_display = ('water_id', 'city_id', 'access_to_clean_water', 'sanitation_coverage', 'year')
    list_filter = ('year', 'city_id__province')
    search_fields = ('city_id__city_name', 'city_id__province')
    ordering = ('-year', 'city_id__city_name')
    
    # Allow full CRUD operations
    list_editable = ('access_to_clean_water', 'sanitation_coverage')
    
    fieldsets = (
        ('Location & Time', {
            'fields': ('city_id', 'year')
        }),
        ('Health Reference', {
            'fields': ('health_id',)
        }),
        ('Water & Sanitation Data', {
            'fields': ('access_to_clean_water', 'sanitation_coverage')
        }),
    )

# Full access admin for SDG7 (Clean Energy)
@admin.register(SDG7)
class SDG7Admin(admin.ModelAdmin):
    list_display = ('energy_id', 'city_id', 'electricity_access', 'clean_fuel_use', 'renewable_energy_share', 'year')
    list_filter = ('year', 'city_id__province')
    search_fields = ('city_id__city_name', 'city_id__province')
    ordering = ('-year', 'city_id__city_name')
    
    # Allow full CRUD operations
    list_editable = ('electricity_access', 'clean_fuel_use', 'renewable_energy_share')
    
    fieldsets = (
        ('Location & Time', {
            'fields': ('city_id', 'year')
        }),
        ('Energy Data', {
            'fields': ('electricity_access', 'clean_fuel_use', 'renewable_energy_share')
        }),
    )

# Full access admin for SDG11 (Sustainable Cities)
@admin.register(SDG11)
class SDG11Admin(admin.ModelAdmin):
    list_display = ('postal_code', 'city_id', 'air_quality_index', 'transport_access', 'infrastructure_score', 'year')
    list_filter = ('year', 'city_id__province')
    search_fields = ('city_id__city_name', 'city_id__province', 'postal_code')
    ordering = ('-year', 'city_id__city_name')
    
    # Allow full CRUD operations
    list_editable = ('air_quality_index', 'transport_access')
    
    fieldsets = (
        ('Location & Time', {
            'fields': ('city_id', 'postal_code', 'year')
        }),
        ('City Sustainability Data', {
            'fields': ('air_quality_index', 'transport_access', 'infrastructure_score')
        }),
    )

# Admin Query log (keep as read-only for security)
@admin.register(AdminQuery)
class AdminQueryAdmin(admin.ModelAdmin):
    list_display = ('user', 'query_type', 'table_name', 'affected_rows', 'execution_time', 'success', 'timestamp')
    list_filter = ('query_type', 'table_name', 'success', 'timestamp')
    search_fields = ('user__username', 'sql_query', 'table_name')
    ordering = ('-timestamp',)
    readonly_fields = ('user', 'query_type', 'table_name', 'sql_query', 'affected_rows', 'execution_time', 'success', 'error_message', 'timestamp')
    
    def has_add_permission(self, request):
        return False  # Prevent manual addition
    
    def has_change_permission(self, request, obj=None):
        return False  # Read-only for security

# Customize admin site header
admin.site.site_header = "SustainX Admin Panel"
admin.site.site_title = "SustainX Admin"
admin.site.index_title = "Welcome to SustainX Administration"

# Additional admin site customizations
admin.site.empty_value_display = '(None)'