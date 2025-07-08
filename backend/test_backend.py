#!/usr/bin/env python
"""
Test script for SustainX Backend API
Run this to test all endpoints after setup
"""

import requests
import json
import sys

BASE_URL = "http://localhost:8000/api"

def test_endpoint(method, endpoint, data=None, headers=None):
    """Test a single endpoint"""
    url = f"{BASE_URL}{endpoint}"
    try:
        if method == 'GET':
            response = requests.get(url, headers=headers)
        elif method == 'POST':
            response = requests.post(url, json=data, headers=headers)
        
        print(f"\n{method} {endpoint}")
        print(f"Status: {response.status_code}")
        
        if response.status_code < 400:
            result = response.json()
            if 'success' in result:
                print(f"Success: {result['success']}")
            if 'sdgs' in result:
                print(f"SDGs found: {len(result['sdgs'])}")
            if 'data' in result:
                print(f"Data points: {len(result['data'])}")
            return True, response
        else:
            print(f"Error: {response.text}")
            return False, response
            
    except requests.exceptions.ConnectionError:
        print(f"ERROR: Cannot connect to {url}")
        print("Make sure the Django server is running: python manage.py runserver")
        return False, None
    except Exception as e:
        print(f"ERROR: {e}")
        return False, None

def main():
    print("🧪 Testing SustainX Backend API")
    print("=" * 50)
    
    # Test basic endpoints
    tests = [
        ("GET", "/test/"),
        ("GET", "/health/"),
        ("GET", "/sdgs/"),
        ("GET", "/sdgs/1/"),
        ("GET", "/sdgs/1/stats/"),
        ("GET", "/data/sdg/1/"),
        ("GET", "/data/sdg/1/?country=Pakistan&year=2022"),
        ("GET", "/data/countries/"),
    ]
    
    passed = 0
    total = len(tests)
    
    for method, endpoint in tests:
        success, response = test_endpoint(method, endpoint)
        if success:
            passed += 1
    
    print(f"\n" + "=" * 50)
    print(f"✅ Tests passed: {passed}/{total}")
    
    if passed == total:
        print("🎉 All tests passed! Backend is working correctly.")
        print("\nYou can now:")
        print("1. Access admin panel: http://localhost:8000/admin/")
        print("2. Use API endpoints for frontend integration")
        print("3. Test admin queries after logging in")
    else:
        print("❌ Some tests failed. Check the error messages above.")
        
    # Test admin authentication (optional)
    print(f"\n" + "=" * 30)
    print("🔐 Admin Authentication Test")
    print("To test admin features, create a superuser first:")
    print("python manage.py createsuperuser")
    
    # Sample admin login test
    admin_data = {
        "username": "admin",  # Change this
        "password": "admin123"  # Change this
    }
    
    print(f"\nTesting admin login with sample credentials...")
    success, response = test_endpoint("POST", "/auth/login/", admin_data)
    
    if success and response:
        result = response.json()
        if result.get('success'):
            print("✅ Admin login successful")
            
            # Test admin endpoints
            session_cookies = response.cookies
            headers = {'Cookie': f"sessionid={session_cookies.get('sessionid')}"}
            
            print("\nTesting admin endpoints...")
            admin_tests = [
                ("GET", "/auth/check/"),
                ("GET", "/admin/tables/"),
                ("GET", "/admin/query-history/"),
            ]
            
            for method, endpoint in admin_tests:
                test_endpoint(method, endpoint, headers=headers)
        else:
            print("❌ Admin login failed - create superuser first")

if __name__ == "__main__":
    main()