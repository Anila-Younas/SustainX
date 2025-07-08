from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CityViewSet, PublicSDG1ViewSet, AdminSDG1ViewSet

router = DefaultRouter()
router.register(r'public/cities', CityViewSet, basename='public-cities')
router.register(r'public/sdg1', PublicSDG1ViewSet, basename='public-sdg1')
router.register(r'admin/sdg1', AdminSDG1ViewSet, basename='admin-sdg1')

urlpatterns = [
    path('api/', include(router.urls)),
]