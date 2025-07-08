### backend/sdg_data/views.py
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import connection
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import (
    SDGInfo, City, SDG1, SDG2, SDG3, SDG4, SDG6, SDG7, SDG11, AuditLog
)
from .serializers import *

class SDGInfoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SDGInfo.objects.all()
    serializer_class = SDGInfoSerializer
    permission_classes = [permissions.AllowAny]

class CityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['province', 'urbanization_level']
    search_fields = ['city_name', 'province']

# Public ViewSets (Read-only for all users)
class PublicSDG1ViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SDG1.objects.all()
    serializer_class = SDG1Serializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['city', 'year']
    search_fields = ['city__city_name', 'city__province']
    ordering_fields = ['year', 'income_level']
    ordering = ['-year']

class PublicSDG2ViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SDG2.objects.all()
    serializer_class = SDG2Serializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['city', 'year']
    search_fields = ['city__city_name', 'city__province']
    ordering = ['-year']

class PublicSDG3ViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SDG3.objects.all()
    serializer_class = SDG3Serializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['city', 'year']
    search_fields = ['city__city_name', 'city__province']
    ordering = ['-year']

class PublicSDG4ViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SDG4.objects.all()
    serializer_class = SDG4Serializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['city', 'year']
    search_fields = ['city__city_name', 'city__province']
    ordering = ['-year']

class PublicSDG6ViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SDG6.objects.all()
    serializer_class = SDG6Serializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['city', 'year']
    search_fields = ['city__city_name', 'city__province']
    ordering = ['-year']

class PublicSDG7ViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SDG7.objects.all()
    serializer_class = SDG7Serializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['city', 'year']
    search_fields = ['city__city_name', 'city__province']
    ordering = ['-year']

class PublicSDG11ViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SDG11.objects.all()
    serializer_class = SDG11Serializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['city', 'year']
    search_fields = ['city__city_name', 'city__province']
    ordering = ['-year']

# Admin ViewSets (Full CRUD for authenticated admins)
class AdminSDG1ViewSet(viewsets.ModelViewSet):
    queryset = SDG1.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['city', 'year']
    search_fields = ['city__city_name']
    ordering = ['-year']
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return SDG1CreateSerializer
        return SDG1Serializer
    
    def create(self, request):
        """Create new SDG 1 data using stored procedure"""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                with connection.cursor() as cursor:
                    cursor.callproc('InsertSDG1Data', [
                        request.user.id,
                        serializer.validated_data['city'].city_id,
                        serializer.validated_data['income_level'],
                        serializer.validated_data['access_to_education'],
                        serializer.validated_data['social_protection'],
                        serializer.validated_data['year']
                    ])
                    result = cursor.fetchone()
                
                return Response({
                    'message': result[0] if result else 'Data created successfully',
                    'id': result[1] if result and len(result) > 1 else None
                }, status=status.HTTP_201_CREATED)
                
            except Exception as e:
                return Response({
                    'error': str(e)
                }, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None):
        """Update SDG 1 data using stored procedure"""
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        
        if serializer.is_valid():
            try:
                with connection.cursor() as cursor:
                    cursor.callproc('UpdateSDG1Data', [
                        request.user.id,
                        pk,
                        serializer.validated_data.get('income_level', instance.income_level),
                        serializer.validated_data.get('access_to_education', instance.access_to_education),
                        serializer.validated_data.get('social_protection', instance.social_protection)
                    ])
                    result = cursor.fetchone()
                
                return Response({
                    'message': result[0] if result else 'Data updated successfully'
                }, status=status.HTTP_200_OK)
                
            except Exception as e:
                return Response({
                    'error': str(e)
                }, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminSDG3ViewSet(viewsets.ModelViewSet):
    queryset = SDG3.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return SDG3CreateSerializer
        return SDG3Serializer
    
    def create(self, request):
        """Create new SDG 3 data using stored procedure"""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                with connection.cursor() as cursor:
                    cursor.callproc('InsertSDG3Data', [
                        request.user.id,
                        serializer.validated_data['city'].city_id,
                        serializer.validated_data['access_to_healthcare'],
                        serializer.validated_data['maternal_mortality'],
                        serializer.validated_data['vaccination_coverage'],
                        serializer.validated_data['year']
                    ])
                    result = cursor.fetchone()
                
                return Response({
                    'message': result[0] if result else 'Data created successfully',
                    'id': result[1] if result and len(result) > 1 else None
                }, status=status.HTTP_201_CREATED)
                
            except Exception as e:
                return Response({
                    'error': str(e)
                }, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Dashboard and Analytics ViewSet
class DashboardViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    
    @action(detail=False, methods=['get'])
    def overview(self, request):
        """Get comprehensive dashboard overview"""
        with connection.cursor() as cursor:
            # Get summary from dashboard view
            cursor.execute("SELECT * FROM dashboard_summary")
            columns = [col[0] for col in cursor.description]
            summary_data = [dict(zip(columns, row)) for row in cursor.fetchall()]
            
            # Get city-wise latest data
            cursor.execute("""
                SELECT 
                    c.City_Name, c.Province, c.Urbanization_Level,
                    s1.Income_Level, s1.Year as SDG1_Year,
                    s3.Access_to_Healthcare, s3.Year as SDG3_Year,
                    s4.Literacy_Rate, s4.Year as SDG4_Year
                FROM CITY c
                LEFT JOIN SDG_1 s1 ON c.City_ID = s1.City_ID 
                    AND s1.Year = (SELECT MAX(Year) FROM SDG_1 WHERE City_ID = c.City_ID)
                LEFT JOIN SDG_3 s3 ON c.City_ID = s3.City_ID 
                    AND s3.Year = (SELECT MAX(Year) FROM SDG_3 WHERE City_ID = c.City_ID)
                LEFT JOIN SDG_4 s4 ON c.City_ID = s4.City_ID 
                    AND s4.Year = (SELECT MAX(Year) FROM SDG_4 WHERE City_ID = c.City_ID)
                ORDER BY c.City_Name
            """)
            columns = [col[0] for col in cursor.description]
            city_data = [dict(zip(columns, row)) for row in cursor.fetchall()]
            
            # Get SDG trends over time
            cursor.execute("""
                SELECT 
                    year,
                    AVG(s1.Income_Level) as avg_income,
                    AVG(s3.Access_to_Healthcare) as avg_healthcare,
                    AVG(s4.Literacy_Rate) as avg_literacy
                FROM CITY c
                LEFT JOIN SDG_1 s1 ON c.City_ID = s1.City_ID
                LEFT JOIN SDG_3 s3 ON c.City_ID = s3.City_ID
                LEFT JOIN SDG_4 s4 ON c.City_ID = s4.City_ID
                WHERE s1.Year IS NOT NULL
                GROUP BY year
                ORDER BY year
            """)
            columns = [col[0] for col in cursor.description]
            trends_data = [dict(zip(columns, row)) for row in cursor.fetchall()]
        
        return Response({
            'summary': summary_data,
            'cities': city_data,
            'trends': trends_data,
            'total_cities': len(city_data)
        })
    
    @action(detail=False, methods=['get'])
    def sdg_comparison(self, request):
        """Compare SDG progress across different metrics"""
        sdg_goal = request.query_params.get('sdg', None)
        year = request.query_params.get('year', None)
        
        if not sdg_goal or not year:
            return Response({
                'error': 'Both sdg and year parameters are required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        with connection.cursor() as cursor:
            if sdg_goal == '1':
                cursor.execute("""
                    SELECT c.City_Name, c.Province, s.Income_Level, s.Social_Protection
                    FROM CITY c
                    JOIN SDG_1 s ON c.City_ID = s.City_ID
                    WHERE s.Year = %s
                    ORDER BY s.Income_Level DESC
                """, [year])
            elif sdg_goal == '3':
                cursor.execute("""
                    SELECT c.City_Name, c.Province, s.Access_to_Healthcare, s.Vaccination_Coverage
                    FROM CITY c
                    JOIN SDG_3 s ON c.City_ID = s.City_ID
                    WHERE s.Year = %s
                    ORDER BY s.Access_to_Healthcare DESC
                """, [year])
            elif sdg_goal == '4':
                cursor.execute("""
                    SELECT c.City_Name, c.Province, s.Literacy_Rate, s.School_Enrollment
                    FROM CITY c
                    JOIN SDG_4 s ON c.City_ID = s.City_ID
                    WHERE s.Year = %s
                    ORDER BY s.Literacy_Rate DESC
                """, [year])
            else:
                return Response({
                    'error': 'Invalid SDG goal. Supported: 1, 3, 4'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            columns = [col[0] for col in cursor.description]
            comparison_data = [dict(zip(columns, row)) for row in cursor.fetchall()]
        
        return Response({
            'sdg_goal': sdg_goal,
            'year': year,
            'data': comparison_data
        })

class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AuditLog.objects.all()[:100]  # Last 100 actions
    serializer_class = AuditLogSerializer
    permission_classes = [permissions.IsAuthenticated]
    ordering = ['-timestamp']