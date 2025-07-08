from django.urls import path
from .views import admin_login, admin_register, admin_profile

urlpatterns = [
    path('api/auth/login/', admin_login, name='admin-login'),
    path('api/auth/register/', admin_register, name='admin-register'),
    path('api/auth/profile/', admin_profile, name='admin-profile'),
]