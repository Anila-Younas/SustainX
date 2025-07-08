from django.urls import path
from django.contrib import admin
from django.urls import path, include
from . import views

app_name = 'sdg_app'

urlpatterns = [
    # Test endpoints
    path('test/', views.api_test_view, name='api_test'),
    path('health/', views.health_check, name='health_check'),
    
    # Authentication endpoints
    path('auth/login/', views.admin_login, name='admin_login'),
    path('auth/logout/', views.admin_logout, name='admin_logout'),
    path('auth/check/', views.check_auth_status, name='check_auth'),
    
    #path('admin/', admin.site.urls),
    #path('api/', include(('sdg_app.urls', 'sdg_app'), namespace='sdg_app')),
    
    # SDG Goals endpoints
    path('sdgs/', views.get_all_sdgs, name='get_all_sdgs'),
    path('sdgs/<int:goal_number>/', views.get_sdg_detail, name='get_sdg_detail'),
    
    # Data endpoints
    path('data/sdg/<int:goal_number>/', views.get_sdg_data, name='get_sdg_data'),
    
    # Admin query endpoints (requires authentication)
    path('admin/query/', views.execute_admin_query, name='execute_admin_query'),
    path('admin/query-history/', views.get_query_history, name='get_query_history'),

    
    path('api/cities/', views.cities_api, name='cities_api'),
    path('api/cities/<int:city_id>/', views.delete_city_api, name='delete_city_api'),
    
    path('data/sdg<int:sdg_number>/', views.sdg_data_api, name='sdg_data_api'),
]


