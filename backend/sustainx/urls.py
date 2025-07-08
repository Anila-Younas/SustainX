from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('sdg_app.urls')),
    path('', include('sdg_app.urls')),     # Add this if missing
]
