from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.db import connection, transaction
from django.db.models import Count, Avg, Max, Min
from django.core.paginator import Paginator
from .models import City
import json
import time
from .models import SDG1, SDG2, SDG3, SDG4, SDG6, SDG7, SDG11
from .models import (
    SDGInfo, City, SDG1, SDG2, SDG3, SDG4, SDG6, SDG7, SDG11, AdminQuery
)


# ============================================================================
# UTILITY FUNCTIONS
# ============================================================================

def log_admin_query(user, query_type, table_name, sql_query, affected_rows=0, execution_time=0, success=True, error_message=""):
    """Log admin queries for audit purposes"""
    try:
        AdminQuery.objects.create(
            user=user,
            query_type=query_type,
            table_name=table_name,
            sql_query=sql_query,
            affected_rows=affected_rows,
            execution_time=execution_time,
            success=success,
            error_message=error_message
        )
    except Exception as e:
        print(f"Error logging query: {e}")

def execute_raw_query(sql_query, user=None):
    """Execute raw SQL query with logging"""
    start_time = time.time()
    success = True
    error_message = ""
    affected_rows = 0
    results = []
    
    try:
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            
            # Determine query type
            query_type = sql_query.strip().upper().split()[0]
            
            if query_type == 'SELECT':
                results = cursor.fetchall()
                columns = [desc[0] for desc in cursor.description]
                results = [dict(zip(columns, row)) for row in results]
                affected_rows = len(results)
            else:
                affected_rows = cursor.rowcount
                
    except Exception as e:
        success = False
        error_message = str(e)
        results = []
        
    execution_time = time.time() - start_time
    
    # Log the query if user is provided
    if user:
        table_name = "multiple" if "JOIN" in sql_query.upper() else "unknown"
        try:
            # Extract table name from query
            if "FROM" in sql_query.upper():
                parts = sql_query.upper().split("FROM")[1].strip().split()
                table_name = parts[0] if parts else "unknown"
        except:
            pass
            
        log_admin_query(
            user=user,
            query_type=query_type,
            table_name=table_name,
            sql_query=sql_query,
            affected_rows=affected_rows,
            execution_time=execution_time,
            success=success,
            error_message=error_message
        )
    
    return {
        'success': success,
        'results': results,
        'affected_rows': affected_rows,
        'execution_time': execution_time,
        'error_message': error_message
    }

# ============================================================================
# TEST & HEALTH ENDPOINTS
# ============================================================================

def api_test_view(request):
    """Test endpoint to verify API is working"""
    return JsonResponse({
        'status': 'success',
        'message': 'SustainX Backend API is working!',
        'timestamp': time.time(),
        'stats': {
            'total_sdgs': SDGInfo.objects.count(),
            'total_cities': City.objects.count(),
            'sdg1_records': SDG1.objects.count(),
            'sdg3_records': SDG3.objects.count(),
            'sdg4_records': SDG4.objects.count()
        }
    })

def health_check(request):
    """Health check endpoint for monitoring"""
    try:
        # Test database connection
        db_status = 'healthy'
        try:
            SDGInfo.objects.count()
        except Exception as e:
            db_status = f'error: {str(e)}'
        
        return JsonResponse({
            'status': 'healthy',
            'database': db_status,
            'timestamp': time.time()
        })
    except Exception as e:
        return JsonResponse({
            'status': 'error',
            'error': str(e),
            'timestamp': time.time()
        }, status=500)

# ============================================================================
# AUTHENTICATION ENDPOINTS
# ============================================================================

@csrf_exempt
@require_http_methods(["POST"])
def admin_login(request):
    """Admin login endpoint"""
    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return JsonResponse({
                'success': False,
                'error': 'Username and password are required'
            }, status=400)
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None and user.is_staff:
            login(request, user)
            return JsonResponse({
                'success': True,
                'message': 'Login successful',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'is_superuser': user.is_superuser
                }
            })
        else:
            return JsonResponse({
                'success': False,
                'error': 'Invalid credentials or insufficient permissions'
            }, status=401)
            
    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'error': 'Invalid JSON data'
        }, status=400)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)

@require_http_methods(["POST"])
def admin_logout(request):
    """Admin logout endpoint"""
    logout(request)
    return JsonResponse({
        'success': True,
        'message': 'Logout successful'
    })

def check_auth_status(request):
    """Check if user is authenticated"""
    return JsonResponse({
        'authenticated': request.user.is_authenticated,
        'is_staff': request.user.is_staff if request.user.is_authenticated else False,
        'user': {
            'id': request.user.id,
            'username': request.user.username,
            'email': request.user.email,
            'is_superuser': request.user.is_superuser
        } if request.user.is_authenticated else None
    })
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import City
import json

@csrf_exempt
@require_http_methods(["GET", "POST"])
def cities_api(request):
    if request.method == "GET":
        try:
            cities = list(City.objects.values(
                'city_id', 
                'city_name', 
                'province', 
                'urbanization_level'
            ))
            return JsonResponse({
                'success': True,
                'cities': cities
            })
        except Exception as e:
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=500)
    
    elif request.method == "POST":
        try:
            data = json.loads(request.body)
            city = City.objects.create(
                city_name=data.get('name'),
                province=data.get('province', ''),
                urbanization_level=data.get('urbanization_level', '')
            )
            return JsonResponse({
                'success': True,
                'city_id': city.city_id
            })
        except Exception as e:
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=400)

@csrf_exempt
@require_http_methods(["DELETE"])
def delete_city_api(request, city_id):
    try:
        city = City.objects.get(city_id=city_id)
        city.delete()
        return JsonResponse({'success': True})
    except City.DoesNotExist:
        return JsonResponse({
            'success': False,
            'error': 'City not found'
        }, status=404)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)
# ============================================================================
# SDG ENDPOINTS
# ============================================================================

def get_all_sdgs(request):
    """Get all SDG goals with basic statistics"""
    try:
        sdgs = SDGInfo.objects.all()
        
        sdg_list = []
        for sdg in sdgs:
            # Get data count for each SDG
            data_count = 0
            if sdg.sdg_id == 1:
                data_count = SDG1.objects.count()
            elif sdg.sdg_id == 2:
                data_count = SDG2.objects.count()
            elif sdg.sdg_id == 3:
                data_count = SDG3.objects.count()
            elif sdg.sdg_id == 4:
                data_count = SDG4.objects.count()
            elif sdg.sdg_id == 6:
                data_count = SDG6.objects.count()
            elif sdg.sdg_id == 7:
                data_count = SDG7.objects.count()
            elif sdg.sdg_id == 11:
                data_count = SDG11.objects.count()
            
            sdg_list.append({
                'id': sdg.sdg_id,
                'goal_number': sdg.sdg_id,
                'title': sdg.sdg_name,
                'description': sdg.description,
                'data_points': data_count
            })
        
        return JsonResponse({
            'success': True,
            'sdgs': sdg_list,
            'total': len(sdg_list)
        })
        
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)

def get_sdg_detail(request, goal_number):
    """Get detailed information about a specific SDG"""
    try:
        sdg = SDGInfo.objects.get(sdg_id=goal_number)
        
        # Get available filters based on SDG
        cities = City.objects.all().values('city_id', 'city_name', 'province')
        provinces = City.objects.values_list('province', flat=True).distinct()
        
        # Get years based on SDG data
        years = []
        if goal_number == 1:
            years = list(SDG1.objects.values_list('year', flat=True).distinct())
        elif goal_number == 2:
            years = list(SDG2.objects.values_list('year', flat=True).distinct())
        elif goal_number == 3:
            years = list(SDG3.objects.values_list('year', flat=True).distinct())
        elif goal_number == 4:
            years = list(SDG4.objects.values_list('year', flat=True).distinct())
        elif goal_number == 6:
            years = list(SDG6.objects.values_list('year', flat=True).distinct())
        elif goal_number == 7:
            years = list(SDG7.objects.values_list('year', flat=True).distinct())
        elif goal_number == 11:
            years = list(SDG11.objects.values_list('year', flat=True).distinct())
        
        return JsonResponse({
            'success': True,
            'sdg': {
                'id': sdg.sdg_id,
                'goal_number': sdg.sdg_id,
                'title': sdg.sdg_name,
                'description': sdg.description
            },
            'available_filters': {
                'cities': list(cities),
                'provinces': list(provinces),
                'years': sorted(years)
            }
        })
        
    except SDGInfo.DoesNotExist:
        return JsonResponse({
            'success': False,
            'error': f'SDG {goal_number} not found'
        }, status=404)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)

def get_sdg_data(request, goal_number):
    """Get filtered data for a specific SDG"""
    try:
        sdg = SDGInfo.objects.get(sdg_id=goal_number)
        
        # Get filter parameters
        city_name = request.GET.get('city')
        province = request.GET.get('province')
        year = request.GET.get('year')
        page = int(request.GET.get('page', 1))
        page_size = int(request.GET.get('page_size', 50))
        
        # Get data based on SDG number
        queryset = None
        if goal_number == 1:
            queryset = SDG1.objects.select_related('city_id')
        elif goal_number == 2:
            queryset = SDG2.objects.select_related('city_id')
        elif goal_number == 3:
            queryset = SDG3.objects.select_related('city_id')
        elif goal_number == 4:
            queryset = SDG4.objects.select_related('city_id')
        elif goal_number == 6:
            queryset = SDG6.objects.select_related('city_id')
        elif goal_number == 7:
            queryset = SDG7.objects.select_related('city_id')
        elif goal_number == 11:
            queryset = SDG11.objects.select_related('city_id')
        else:
            return JsonResponse({
                'success': False,
                'error': f'SDG {goal_number} data not available'
            }, status=404)
        
        # Apply filters
        if city_name:
            queryset = queryset.filter(city_id__city_name__icontains=city_name)
        if province:
            queryset = queryset.filter(city_id__province__icontains=province)
        if year:
            queryset = queryset.filter(year=year)
        
        # Pagination
        paginator = Paginator(queryset.order_by('-year'), page_size)
        page_obj = paginator.get_page(page)
        
        # Format data based on SDG type
        data = []
        for item in page_obj:
            base_data = {
                'city': item.city_id.city_name,
                'province': item.city_id.province,
                'year': item.year
            }
            
            if goal_number == 1:
                base_data.update({
                    'id': item.poverty_id,
                    'income_level': item.income_level,
                    'access_to_education': item.access_to_education,
                    'social_protection': item.social_protection
                })
            elif goal_number == 3:
                base_data.update({
                    'id': item.health_id,
                    'access_to_healthcare': item.access_to_healthcare,  # ✅ Correct field name
                    'maternal_mortality': item.maternal_mortality,
                    'vaccination_coverage': item.vaccination_coverage
                })
            elif goal_number == 4:
                base_data.update({
                    'id': item.education_id,
                    'literacy_rate': item.literacy_rate,
                    'school_enrollment': item.school_enrollment,
                    'ict_access': item.ict_access
                })

            elif goal_number == 6:
                base_data.update({
                    'id': item.water_id,
                    'health_id': item.health_id,
                    'acess_to_clean_water': item.access_to_clean_water,
                    'sanitation_coverage': item.sanitation_coverage
                })
            elif goal_number == 7:
                base_data.update({
                    'id': item.energy_id,
                    'electricity_access': item.electricity_access,
                    'clean_fuel_use': item.clean_fuel_use,
                    'renewable_energy_share': item.renewable_energy_share
                })
            elif goal_number == 11:
                base_data.update({
                    'id': item.postal_code,
                    'air_quality_index': item.air_quality_index,
                    'transport_access': item.transport_access,
                    'infrastructure_score': item.infrastructure_score
                })
            
            data.append(base_data)
        
        return JsonResponse({
            'success': True,
            'data': data,
            'pagination': {
                'current_page': page,
                'total_pages': paginator.num_pages,
                'total_records': paginator.count,
                'page_size': page_size,
                'has_next': page_obj.has_next(),
                'has_previous': page_obj.has_previous()
            },
            'filters_applied': {
                'city': city_name,
                'province': province,
                'year': year
            }
        })
        
    except SDGInfo.DoesNotExist:
        return JsonResponse({
            'success': False,
            'error': f'SDG {goal_number} not found'
        }, status=404)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)
    
@csrf_exempt
def sdg_data_api(request, sdg_number):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            city_id = data.get('city_id')
            year = data.get('year')
            
            # Map SDG numbers to models and their fields
            sdg_models = {
                1: {'model': SDG1, 'fields': ['income_level', 'access_to_education', 'social_protection']},
                2: {'model': SDG2, 'fields': ['malnutrition_rate', 'food_insecurity']},
                3: {'model': SDG3, 'fields': ['access_to_healthcare', 'maternal_mortality', 'vaccination_coverage']},
                4: {'model': SDG4, 'fields': ['literacy_rate', 'school_enrollment', 'ict_access']},
                6: {'model': SDG6, 'fields': ['access_to_clean_water', 'sanitation_coverage']},
                7: {'model': SDG7, 'fields': ['electricity_access', 'clean_fuel_use', 'renewable_energy_share']},
                11: {'model': SDG11, 'fields': ['air_quality_index', 'transport_access', 'infrastructure_score']},
            }
            
            if sdg_number not in sdg_models:
                return JsonResponse({'success': False, 'error': 'Invalid SDG number'}, status=400)
            
            model_info = sdg_models[sdg_number]
            Model = model_info['model']
            
            # Prepare the data for creation
            create_data = {
                'city_id_id': city_id,
                'year': year
            }
            
            # Add the indicator data
            for key, value in data.items():
                if key in model_info['fields']:
                    create_data[key] = value
            
            # Create the record
            if sdg_number == 11:
                # SDG11 needs postal_code, let's use a default or derive it
                create_data['postal_code'] = f"{city_id}{year}"
            elif sdg_number in [2, 6]:
                # SDG2 and SDG6 need health_id, let's create a simple reference
                create_data['health_id_id'] = 1  # You might need to adjust this
            
            record = Model.objects.create(**create_data)
            
            return JsonResponse({
                'success': True,
                'message': f'SDG {sdg_number} data added successfully'
            })
            
        except Exception as e:
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=500)
    
    return JsonResponse({'success': False, 'error': 'Method not allowed'}, status=405)

# ============================================================================
# ADMIN QUERY ENDPOINTS (Requires Authentication)
# ============================================================================

@login_required
@csrf_exempt
@require_http_methods(["POST"])
def execute_admin_query(request):
    """Execute custom SQL queries (admin only)"""
    if not request.user.is_staff:
        return JsonResponse({
            'success': False,
            'error': 'Admin privileges required'
        }, status=403)
    
    try:
        data = json.loads(request.body)
        sql_query = data.get('query', '').strip()
        
        if not sql_query:
            return JsonResponse({
                'success': False,
                'error': 'SQL query is required'
            }, status=400)
        
        # Security check - only allow certain query types
        allowed_prefixes = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'SHOW', 'DESCRIBE', 'EXPLAIN']
        query_type = sql_query.upper().split()[0]
        
        if query_type not in allowed_prefixes:
            return JsonResponse({
                'success': False,
                'error': f'Query type {query_type} is not allowed'
            }, status=400)
        
        # Execute query
        result = execute_raw_query(sql_query, request.user)
        
        return JsonResponse({
            'success': result['success'],
            'results': result['results'],
            'affected_rows': result['affected_rows'],
            'execution_time': round(result['execution_time'], 4),
            'error_message': result['error_message'],
            'query': sql_query
        })
        
    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'error': 'Invalid JSON data'
        }, status=400)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)

@login_required
def get_query_history(request):
    """Get query execution history"""
    if not request.user.is_staff:
        return JsonResponse({
            'success': False,
            'error': 'Admin privileges required'
        }, status=403)
    
    try:
        page = int(request.GET.get('page', 1))
        page_size = int(request.GET.get('page_size', 20))
        
        queries = AdminQuery.objects.all().order_by('-timestamp')
        paginator = Paginator(queries, page_size)
        page_obj = paginator.get_page(page)
        
        history = []
        for query in page_obj:
            history.append({
                'id': query.id,
                'user': query.user.username,
                'query_type': query.query_type,
                'table_name': query.table_name,
                'sql_query': query.sql_query,
                'affected_rows': query.affected_rows,
                'execution_time': query.execution_time,
                'success': query.success,
                'error_message': query.error_message,
                'timestamp': query.timestamp.isoformat()
            })
        
        return JsonResponse({
            'success': True,
            'history': history,
            'pagination': {
                'current_page': page,
                'total_pages': paginator.num_pages,
                'total_records': paginator.count,
                'page_size': page_size
            }
        })
        
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)