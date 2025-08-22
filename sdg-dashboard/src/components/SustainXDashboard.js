import React, { useState, useEffect } from 'react';
import { Search, BarChart3, Users, Building, Droplets, Zap, Info, Database, Loader2, AlertCircle, RotateCcw, Heart, GraduationCap, Utensils, LogIn, LogOut, User, Filter, ChevronDown, Eye, Download, Plus, Edit, Trash2, Save, X, Settings, Menu } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
const SustainXDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sdgData, setSdgData] = useState({});
  const [sdgList, setSdgList] = useState([]);
  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [showLogin, setShowLogin] = useState(false);
  const [cities, setCities] = useState([]);
  const [sdgIndicators, setSdgIndicators] = useState([]);
  const [filters, setFilters] = useState({
    city: '',
    year: '',
    page: 1,
    page_size: 20
  });
  
  // Navigation state
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Admin state
  const [showCityForm, setShowCityForm] = useState(false);
  const [showDataForm, setShowDataForm] = useState(false);
  const [editingCity, setEditingCity] = useState(null);
  const [cityForm, setCityForm] = useState({ name: '', province: '', urbanization_level: '' });
  const [dataForm, setDataForm] = useState({
  sdg_goal: '',
  city: '',
  year: ''
});

  const [years] = useState(['2020', '2021', '2022', '2023', '2024']);

  // Base API URL
  const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';


  // SDG configuration with proper mapping
  const sdgConfig = {
    1: { name: 'No Poverty', icon: Users, color: '#e74c3c', description: 'End poverty in all its forms everywhere' },
    2: { name: 'Zero Hunger', icon: Utensils, color: '#f39c12', description: 'End hunger, achieve food security and improved nutrition' },
    3: { name: 'Good Health', icon: Heart, color: '#27ae60', description: 'Ensure healthy lives and promote well-being for all' },
    4: { name: 'Quality Education', icon: GraduationCap, color: '#3498db', description: 'Ensure inclusive and equitable quality education' },
    6: { name: 'Clean Water', icon: Droplets, color: '#1abc9c', description: 'Ensure availability and sustainable management of water' },
    7: { name: 'Clean Energy', icon: Zap, color: '#f1c40f', description: 'Ensure access to affordable, reliable, sustainable energy' },
    11: { name: 'Sustainable Cities', icon: Building, color: '#e67e22', description: 'Make cities and human settlements inclusive and sustainable' }
  };

  // CSS Styles
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f5f6fa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      backgroundColor: 'white',
      borderBottom: '1px solid #e1e8ed',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '70px'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      color: '#2c3e50'
    },
    logoIcon: {
      color: '#3498db',
      marginRight: '12px'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      margin: 0,
      color: '#2c3e50'
    },
    subtitle: {
      fontSize: '14px',
      color: '#7f8c8d',
      margin: 0
    },
    headerActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    searchContainer: {
      position: 'relative'
    },
    searchInput: {
      paddingLeft: '40px',
      paddingRight: '16px',
      paddingTop: '8px',
      paddingBottom: '8px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '14px',
      width: '250px',
      outline: 'none',
      transition: 'border-color 0.3s'
    },
    searchIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#95a5a6'
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s'
    },
    primaryButton: {
      backgroundColor: '#3498db',
      color: 'white'
    },
    dangerButton: {
      backgroundColor: '#e74c3c',
      color: 'white'
    },
    secondaryButton: {
      backgroundColor: '#ecf0f1',
      color: '#2c3e50'
    },
    mainContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '32px 20px',
      display: 'flex',
      gap: '24px',
      transition: 'margin-left 0.3s ease'
    },
    sidebar: {
      width: '280px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      transition: 'transform 0.3s ease',
      position: 'relative'
    },
    sidebarHidden: {
      transform: 'translateX(-100%)'
    },
    sidebarMobile: {
      position: 'fixed',
      top: '70px',
      left: '0',
      height: 'calc(100vh - 70px)',
      backgroundColor: 'white',
      zIndex: 1000,
      boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
      padding: '20px',
      overflowY: 'auto'
    },
    hamburgerButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4px 6px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      backgroundColor: 'transparent',
      transition: 'background-color 0.3s',
      marginLeft: '8px'
    },
    overlay: {
      position: 'fixed',
      top: '70px',
      left: '0',
      width: '100%',
      height: 'calc(100vh - 70px)',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 999,
      display: 'none'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e1e8ed'
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '16px'
    },
    navList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    navItem: {
      width: '100%',
      padding: '12px',
      border: 'none',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.3s',
      backgroundColor: 'transparent'
    },
    navItemActive: {
      backgroundColor: '#ebf3fd',
      color: '#3498db',
      borderLeft: '4px solid #3498db'
    },
    iconContainer: {
      width: '32px',
      height: '32px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '12px'
    },
    mainPanel: {
      flex: 1
    },
    contentCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e1e8ed',
      overflow: 'hidden'
    },
    contentHeader: {
      padding: '24px',
      borderBottom: '1px solid #e1e8ed',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    contentTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#2c3e50',
      margin: 0
    },
    contentSubtitle: {
      fontSize: '14px',
      color: '#7f8c8d',
      margin: '4px 0 0 0'
    },
    contentBody: {
      padding: '24px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    tableHeader: {
      backgroundColor: '#f8f9fa'
    },
    tableHeaderCell: {
      padding: '12px 16px',
      textAlign: 'left',
      fontSize: '12px',
      fontWeight: '600',
      color: '#6c757d',
      textTransform: 'uppercase',
      borderBottom: '1px solid #dee2e6'
    },
    tableCell: {
      padding: '12px 16px',
      fontSize: '14px',
      color: '#2c3e50',
      borderBottom: '1px solid #dee2e6'
    },
    tableRow: {
      transition: 'background-color 0.3s'
    },
    formGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#2c3e50',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      fontSize: '14px',
      outline: 'none',
      transition: 'border-color 0.3s'
    },
    select: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      fontSize: '14px',
      backgroundColor: 'white',
      outline: 'none',
      cursor: 'pointer',
      maxHeight: '200px',
      overflow: 'auto'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      width: '500px',
      maxWidth: '90vw',
      maxHeight: '80vh',
      overflow: 'auto'
    },
    modalTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '16px'
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px',
      marginTop: '16px'
    },
    overviewGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px'
    },
    sdgCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e1e8ed',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    sdgCardHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '16px'
    },
    sdgIconContainer: {
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '16px'
    },
    sdgTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#2c3e50',
      margin: 0
    },
    sdgSubtitle: {
      fontSize: '14px',
      color: '#7f8c8d',
      margin: 0
    },
    sdgDescription: {
      color: '#5a6c7d',
      fontSize: '14px',
      marginBottom: '16px',
      lineHeight: '1.5'
    },
    sdgFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '14px'
    },
    dataPoints: {
      color: '#7f8c8d'
    },
    viewButton: {
      color: '#3498db',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '14px',
      fontWeight: '500'
    },
    loadingContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 0',
      color: '#7f8c8d'
    },
    errorContainer: {
      textAlign: 'center',
      padding: '48px 0'
    },
    errorIcon: {
      color: '#e74c3c',
      marginBottom: '16px'
    },
    errorText: {
      color: '#e74c3c',
      marginBottom: '16px'
    },
    emptyState: {
      textAlign: 'center',
      padding: '48px 0',
      color: '#7f8c8d'
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      marginTop: '16px'
    },
    summary: {
      backgroundColor: '#ebf3fd',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px'
    },
    summaryText: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      fontSize: '14px',
      color: '#2c3e50'
    }
  };

  // API Functions
  const fetchSDGsOverview = async () => {
    setLoading(prev => ({ ...prev, overview: true }));
    setError(prev => ({ ...prev, overview: null }));

    try {
      const response = await fetch(`${BASE_URL}/api/sdgs/`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      if (result.success) {
        setSdgList(result.sdgs);
      } else {
        throw new Error(result.error || 'Failed to fetch SDGs');
      }
    } catch (err) {
      setError(prev => ({ ...prev, overview: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, overview: false }));
    }
  };

 const fetchCities = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/cities/`, { 
      credentials: 'include' 
    });
    
    if (response.ok) {
      const result = await response.json();
      
      // Handle different response formats
      if (Array.isArray(result)) {
        // Direct array response
        setCities(result);
      } else if (result.success && result.cities) {
        // Wrapped response with success flag
        setCities(result.cities);
      } else if (result.results && Array.isArray(result.results)) {
        // Paginated response
        setCities(result.results);
      } else if (result.data && Array.isArray(result.data)) {
        // Data wrapper
        setCities(result.data);
      } else {
        console.error('Unexpected API response format:', result);
        setCities([]);
      }
      return;
    }
    
    console.error('Failed to fetch cities from API - Status:', response.status);
    setCities([]);
    
  } catch (err) {
    console.error('Error fetching cities:', err);
    setCities([]);
  }
};

  const fetchSDGIndicators = async (sdgNumber) => {
  // Define actual database fields for each SDG based on your admin.py
  const sdgFields = {
    1: ['income_level', 'access_to_education', 'social_protection'],
    2: ['malnutrition_rate', 'food_insecurity'], 
    3: ['access_to_healthcare', 'maternal_mortality', 'vaccination_coverage'],
    4: ['literacy_rate', 'school_enrollment', 'ict_access'],
    6: ['acess_to_clean_water', 'sanitation_coverage'], // Note: 'acess' spelling matches database
    7: ['electricity_access', 'clean_fuel_use', 'renewable_energy_share'],
    11: ['air_quality_index', 'transport_access', 'infrastructure_score']
  };
  
  setSdgIndicators(sdgFields[sdgNumber] || []);
};

  const addCity = async (cityData) => {
  try {
    console.log('Sending city data:', cityData); // Debug log
    const response = await fetch(`${BASE_URL}/api/cities/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        name: cityData.name,
        province: cityData.province || '',
        urbanization_level: cityData.urbanization_level || 'Urban'
      })
    });
    
    console.log('Response status:', response.status); // Debug log
    const result = await response.json();
    console.log('Response data:', result); // Debug log
    
    if (result.success) {
      await fetchCities(); // Wait for cities to refresh
      setShowCityForm(false);
      setCityForm({ name: '', province: '', urbanization_level: '' });
      alert('City added successfully!');
    } else {
      alert('Error adding city: ' + (result.error || 'Unknown error'));
    }
  } catch (err) {
    console.error('Error adding city:', err);
    alert('Error adding city: ' + err.message);
  }
};

  const deleteCity = async (cityId) => {
    try {
      await fetch(`${BASE_URL}/api/cities/${cityId}/`, {
        method: 'DELETE',
        credentials: 'include'
      });
      fetchCities();
    } catch (err) {
      console.error('Error deleting city:', err);
    }
  };

  const addData = async (data) => {
  try {
    console.log('Adding complete SDG data:', data);
    
    // Prepare data for API with all indicators
    const apiData = {
      city_id: parseInt(data.city),
      year: parseInt(data.year)
    };
    
    // Add all indicator values
    let indicatorCount = 0;
    sdgIndicators.forEach(indicator => {
      if (data[indicator] && data[indicator] !== '') {
        apiData[indicator] = parseFloat(data[indicator]);
        indicatorCount++;
      }
    });
    
    console.log(`Submitting ${indicatorCount} indicators:`, apiData);
    
    // Validate all indicators are provided
    if (indicatorCount !== sdgIndicators.length) {
      alert(`Please fill all ${sdgIndicators.length} indicators. Currently filled: ${indicatorCount}`);
      return;
    }
    
    const response = await fetch(`${BASE_URL}/api/data/sdg${data.sdg_goal}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(apiData)
    });
    
    const result = await response.json();
    console.log('Response result:', result);
    
    if (result.success) {
      setShowDataForm(false);
      // Reset form completely
      const resetForm = { sdg_goal: '', city: '', year: '' };
      sdgIndicators.forEach(indicator => {
        resetForm[indicator] = '';
      });
      setDataForm(resetForm);
      
      alert(`✅ Complete SDG ${data.sdg_goal} data for ${data.year} added successfully!`);
      
      // Refresh current SDG data if viewing
      if (activeTab !== 'overview' && !isNaN(activeTab)) {
        fetchSDGData(activeTab);
      }
    } else {
      alert('❌ Error adding data: ' + (result.error || 'Unknown error'));
    }
  } catch (err) {
    console.error('Error adding data:', err);
    alert('❌ Error adding data: ' + err.message);
  }
};
  const fetchSDGData = async (sdgNumber) => {
    setLoading(prev => ({ ...prev, [sdgNumber]: true }));
    setError(prev => ({ ...prev, [sdgNumber]: null }));

    try {
      const params = new URLSearchParams();
      if (filters.city) params.append('city', filters.city);
      if (filters.year) params.append('year', filters.year);
      if (filters.page) params.append('page', filters.page);
      if (filters.page_size) params.append('page_size', filters.page_size);

      const url = `${BASE_URL}/api/data/sdg/${sdgNumber}/?${params}`;
      const response = await fetch(url, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setSdgData(prev => ({ ...prev, [sdgNumber]: result }));
    } catch (err) {
      setError(prev => ({ ...prev, [sdgNumber]: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, [sdgNumber]: false }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, login: true }));

    try {
      const response = await fetch(`${BASE_URL}/api/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(loginForm)
      });

      const result = await response.json();
      
      if (result.success) {
        setUser(result.user);
        setShowLogin(false);
        setLoginForm({ username: '', password: '' });
      } else {
        setError(prev => ({ ...prev, login: result.error }));
      }
    } catch (err) {
      setError(prev => ({ ...prev, login: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, login: false }));
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${BASE_URL}/api/auth/logout/`, {
        method: 'POST',
        credentials: 'include'
      });
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
      setUser(null);
    }
  };

  const checkAuth = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/check/`, {
        credentials: 'include'
      });
      const result = await response.json();
      if (result.authenticated) {
        setUser(result.user);
      }
    } catch (err) {
      console.error('Auth check error:', err);
    }
  };

  // Effects
  useEffect(() => {
    checkAuth();
    fetchSDGsOverview();
    fetchCities();
  }, []);

  // Handle responsive sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarVisible(true); // Always show on desktop
      } else {
        setSidebarVisible(false); // Hide by default on mobile
      }
    };

    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (activeTab !== 'overview' && activeTab !== 'cities' && activeTab !== 'add-data' && !isNaN(activeTab)) {
      fetchSDGData(activeTab);
    }
  }, [activeTab, filters]);

  // Reset filters when changing SDG tabs
  useEffect(() => {
    if (activeTab !== 'overview' && activeTab !== 'cities' && activeTab !== 'add-data' && !isNaN(activeTab)) {
      // Reset filters when switching to a different SDG
      setFilters({
        city: '',
        year: '',
        page: 1,
        page_size: 20
      });
    }
  }, [activeTab]);

  // Utility functions
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const applyFilters = () => {
    if (activeTab !== 'overview' && activeTab !== 'cities' && activeTab !== 'add-data' && !isNaN(activeTab)) {
      fetchSDGData(activeTab);
    }
  };

  const resetFilters = () => {
    setFilters({
      city: '',
      year: '',
      page: 1,
      page_size: 20
    });
  };

  const filterData = (items) => {
    if (!searchTerm || !items) return items;
    
    if (Array.isArray(items)) {
      return items.filter(item => 
        JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return items;
  };

  // Render functions
  const renderCitiesManagement = () => {
  // Fetch cities if not already loaded
  if (cities.length === 0) {
    fetchCities();
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3>Cities Management</h3>
        <button onClick={() => setShowCityForm(true)} style={{...styles.button, ...styles.primaryButton}}>
          <Plus size={16} /> Add City
        </button>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeaderCell}>City Name</th>
              <th style={styles.tableHeaderCell}>Province</th>
              <th style={styles.tableHeaderCell}>Urbanization Level</th>
              <th style={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cities.length > 0 ? (
              cities.map(city => (
                <tr key={city.city_id}>
                  <td style={styles.tableCell}>{city.city_name}</td>
                  <td style={styles.tableCell}>{city.province || '-'}</td>
                  <td style={styles.tableCell}>{city.urbanization_level || '-'}</td>
                  <td style={styles.tableCell}>
                    <button onClick={() => deleteCity(city.city_id)} style={{...styles.button, color: '#e74c3c'}}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{...styles.tableCell, textAlign: 'center', padding: '40px'}}>
                  No cities found. Add some cities to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showCityForm && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Add New City</h3>
            <div style={styles.formGroup}>
              <label style={styles.label}>City Name</label>
              <input
                type="text"
                value={cityForm.name}
                onChange={(e) => setCityForm(prev => ({...prev, name: e.target.value}))}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Province</label>
              <select
                value={cityForm.province}
                onChange={(e) => setCityForm(prev => ({...prev, province: e.target.value}))}
                style={styles.select}
                required
              >
                <option value="">Select Province</option>
                <option value="Punjab">Punjab</option>
                <option value="Sindh">Sindh</option>
                <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                <option value="Balochistan">Balochistan</option>
                <option value="Federal">Federal</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Urbanization Level</label>
              <select
                value={cityForm.urbanization_level}
                onChange={(e) => setCityForm(prev => ({...prev, urbanization_level: e.target.value}))}
                style={styles.select}
                required
              >
                <option value="">Select Level</option>
                <option value="Urban">Urban</option>
                <option value="Semi-Urban">Semi-Urban</option>
                <option value="Rural">Rural</option>
              </select>
            </div>
            <div style={styles.buttonGroup}>
              <button 
                onClick={() => addCity(cityForm)} 
                style={{...styles.button, ...styles.primaryButton}}
                disabled={!cityForm.name || !cityForm.province || !cityForm.urbanization_level}
              >
                <Save size={16} /> Save
              </button>
              <button onClick={() => setShowCityForm(false)} style={{...styles.button, ...styles.secondaryButton}}>
                <X size={16} /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

  const renderDataEntry = () => (
  <div>
    <h3>Add Complete SDG Data</h3>
    <div style={styles.formGroup}>
      <label style={styles.label}>SDG Goal</label>
      <select
        value={dataForm.sdg_goal}
        onChange={(e) => {
          // Reset all form data when SDG changes
          const newForm = { sdg_goal: e.target.value, city: '', year: '' };
          // Clear all indicator values
          sdgIndicators.forEach(indicator => {
            newForm[indicator] = '';
          });
          setDataForm(newForm);
          
          if (e.target.value) {
            fetchSDGIndicators(e.target.value);
          }
        }}
        style={styles.select}
      >
        <option value="">Select SDG</option>
        {Object.entries(sdgConfig).map(([num, config]) => (
          <option key={num} value={num}>SDG {num}: {config.name}</option>
        ))}
      </select>
    </div>
    
    {dataForm.sdg_goal && (
      <>
        <div style={styles.formGroup}>
          <label style={styles.label}>City</label>
          <select
            value={dataForm.city}
            onChange={(e) => setDataForm(prev => ({...prev, city: e.target.value}))}
            style={styles.select}
          >
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city.city_id} value={city.city_id}>
                {city.city_name}, {city.province}
              </option>
            ))}
          </select>
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Year</label>
          <select
            value={dataForm.year}
            onChange={(e) => setDataForm(prev => ({...prev, year: e.target.value}))}
            style={styles.select}
          >
            <option value="">Select Year</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Show all indicators section */}
        {dataForm.city && dataForm.year && (
          <div style={{
            marginTop: '25px', 
            padding: '20px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '12px',
            border: '1px solid #e1e8ed'
          }}>
            <h4 style={{
              margin: '0 0 20px 0', 
              color: '#2c3e50',
              fontSize: '18px',
              fontWeight: '600'
            }}>
              📊 Complete SDG {dataForm.sdg_goal} Data Entry
            </h4>
            <p style={{
              margin: '0 0 20px 0',
              color: '#7f8c8d',
              fontSize: '14px'
            }}>
              Enter values for all indicators for <strong>{cities.find(c => c.city_id == dataForm.city)?.city_name}</strong> in <strong>{dataForm.year}</strong>
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px'
            }}>
              {sdgIndicators.map((indicator, index) => (
                <div key={index} style={{
                  ...styles.formGroup,
                  backgroundColor: 'white',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid #ddd'
                }}>
                  <label style={{
                    ...styles.label,
                    fontWeight: '500',
                    marginBottom: '8px'
                  }}>
                    {indicator.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim()}
                    <span style={{color: '#e74c3c'}}> *</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={dataForm[indicator] || ''}
                    onChange={(e) => setDataForm(prev => ({...prev, [indicator]: e.target.value}))}
                    style={{
                      ...styles.input,
                      borderColor: dataForm[indicator] ? '#27ae60' : '#ddd'
                    }}
                    placeholder="Enter value"
                    required
                  />
                  {dataForm[indicator] && (
                    <span style={{
                      fontSize: '12px',
                      color: '#27ae60',
                      marginTop: '4px',
                      display: 'block'
                    }}>
                      ✓ Value entered
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Progress indicator */}
            <div style={{marginTop: '20px', marginBottom: '20px'}}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{fontSize: '14px', color: '#2c3e50'}}>
                  Progress: {sdgIndicators.filter(indicator => dataForm[indicator]).length} of {sdgIndicators.length} indicators filled
                </span>
                <span style={{fontSize: '14px', color: '#7f8c8d'}}>
                  {Math.round((sdgIndicators.filter(indicator => dataForm[indicator]).length / sdgIndicators.length) * 100)}%
                </span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#e1e8ed',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(sdgIndicators.filter(indicator => dataForm[indicator]).length / sdgIndicators.length) * 100}%`,
                  height: '100%',
                  backgroundColor: '#3498db',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
            
            <button 
              onClick={() => addData(dataForm)} 
              style={{
                ...styles.button, 
                ...styles.primaryButton,
                width: '100%',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                opacity: (!dataForm.sdg_goal || !dataForm.city || !dataForm.year || 
                         sdgIndicators.some(indicator => !dataForm[indicator])) ? 0.5 : 1,
                cursor: (!dataForm.sdg_goal || !dataForm.city || !dataForm.year || 
                        sdgIndicators.some(indicator => !dataForm[indicator])) ? 'not-allowed' : 'pointer'
              }}
              disabled={!dataForm.sdg_goal || !dataForm.city || !dataForm.year || 
                        sdgIndicators.some(indicator => !dataForm[indicator])}
            >
              <Save size={20} /> 
              Add Complete SDG {dataForm.sdg_goal} Data for {dataForm.year}
            </button>
            
            {sdgIndicators.some(indicator => !dataForm[indicator]) && (
              <p style={{
                color: '#e74c3c', 
                fontSize: '14px', 
                marginTop: '12px',
                textAlign: 'center',
                backgroundColor: '#fdf2f2',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #fecaca'
              }}>
                ⚠️ Please fill all {sdgIndicators.length} indicators before submitting
              </p>
            )}
          </div>
        )}
      </>
    )}
  </div>
);

  const renderDataTable = (data) => {
    if (!data) return null;
    
    const items = data.data || data;
    
    if (Array.isArray(items) && items.length === 0) {
      return (
        <div style={styles.emptyState}>
          <Database size={48} style={{ opacity: 0.5, marginBottom: '16px' }} />
          <p>No data available for current filters</p>
          <button 
            onClick={resetFilters}
            style={{...styles.button, ...styles.primaryButton, marginTop: '8px'}}
          >
            Reset Filters
          </button>
        </div>
      );
    }

    if (Array.isArray(items)) {
      const filteredItems = filterData(items);
      if (filteredItems.length === 0) {
        return (
          <div style={styles.emptyState}>
            <Search size={48} style={{ opacity: 0.5, marginBottom: '16px' }} />
            <p>No results found for "{searchTerm}"</p>
          </div>
        );
      }

      const sampleItem = filteredItems[0];
      // Filter out all ID columns from display
      const allColumns = sampleItem ? Object.keys(sampleItem) : [];
      const columns = allColumns.filter(column => 
        !column.toLowerCase().includes('id') && 
        !column.toLowerCase().includes('_id') &&
        column !== 'id'
      );

      return (
        <div>
          {data.total && (
            <div style={styles.summary}>
              <div style={styles.summaryText}>
                <span><strong>Total Records:</strong> {data.total}</span>
                <span><strong>Current Page:</strong> {data.current_page || filters.page}</span>
                {data.total_pages && <span><strong>Total Pages:</strong> {data.total_pages}</span>}
                <span><strong>Showing:</strong> {filteredItems.length} items</span>
              </div>
            </div>
          )}

          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead style={styles.tableHeader}>
                <tr>
                  {columns.map((column) => (
                    <th key={column} style={styles.tableHeaderCell}>
                      {column.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr 
                    key={index} 
                    style={styles.tableRow}
                    onMouseEnter={(e) => e.target.closest('tr').style.backgroundColor = '#f8f9fa'}
                    onMouseLeave={(e) => e.target.closest('tr').style.backgroundColor = 'transparent'}
                  >
                    {columns.map((column) => (
                      <td key={column} style={styles.tableCell}>
                        {typeof item[column] === 'object' && item[column] !== null ? 
                          JSON.stringify(item[column]) : 
                          String(item[column] ?? '-')
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data.total_pages > 1 && (
            <div style={styles.pagination}>
              <button
                onClick={() => setFilters(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                disabled={filters.page <= 1}
                style={{
                  ...styles.button, 
                  ...styles.secondaryButton,
                  opacity: filters.page <= 1 ? 0.5 : 1,
                  cursor: filters.page <= 1 ? 'not-allowed' : 'pointer'
                }}
              >
                Previous
              </button>
              <span style={{ padding: '8px 12px' }}>
                Page {filters.page} of {data.total_pages}
              </span>
              <button
                onClick={() => setFilters(prev => ({ ...prev, page: Math.min(data.total_pages, prev.page + 1) }))}
                disabled={filters.page >= data.total_pages}
                style={{
                  ...styles.button, 
                  ...styles.secondaryButton,
                  opacity: filters.page >= data.total_pages ? 0.5 : 1,
                  cursor: filters.page >= data.total_pages ? 'not-allowed' : 'pointer'
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div style={styles.card}>
        <pre style={{ fontSize: '14px', overflow: 'auto', whiteSpace: 'pre-wrap' }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    );
  };

  const renderOverview = () => {
  if (loading.overview) {
    return (
      <div style={styles.loadingContainer}>
        <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', color: '#3498db' }} />
        <span style={{ marginLeft: '8px' }}>Loading SDGs...</span>
      </div>
    );
  }

  if (error.overview) {
    return (
      <div style={styles.errorContainer}>
        <AlertCircle size={48} style={styles.errorIcon} />
        <p style={styles.errorText}>Error: {error.overview}</p>
        <button 
          onClick={fetchSDGsOverview}
          style={{...styles.button, ...styles.dangerButton}}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={styles.overviewGrid}>
      {sdgList.map((sdg) => {
        const config = sdgConfig[sdg.goal_number];
        if (!config) return null;
        
        const Icon = config.icon;
        
        return (
          <div 
            key={sdg.id}
            style={{
              ...styles.sdgCard,
              ':hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }
            }}
            onClick={() => setActiveTab(sdg.goal_number.toString())}
            onMouseEnter={(e) => e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'}
            onMouseLeave={(e) => e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'}
          >
            <div style={styles.sdgCardHeader}>
              <div style={{...styles.sdgIconContainer, backgroundColor: config.color}}>
                <Icon size={24} color="white" />
              </div>
              <div>
                <h3 style={styles.sdgTitle}>SDG {sdg.goal_number}</h3>
                <p style={styles.sdgSubtitle}>{config.name}</p>
              </div>
            </div>
            <p style={styles.sdgDescription}>{sdg.description}</p>
            <div style={styles.sdgFooter}>
              <span style={styles.dataPoints}>
                {sdg.data_points} data points
              </span>
              <div style={styles.viewButton}>
                <BarChart3 size={16} />
                View Charts & Data
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

  const renderSDGCharts = (sdgNumber, data) => {
  if (!data || !data.data || data.data.length === 0) {
    return (
      <div style={styles.emptyState}>
        <BarChart3 size={48} style={{ opacity: 0.5, marginBottom: '16px' }} />
        <p>No data available for charts</p>
        <p style={{ fontSize: '14px', color: '#7f8c8d' }}>Add some data to see individual indicator charts</p>
      </div>
    );
  }

  const chartData = data.data;
  const config = sdgConfig[sdgNumber];
  
  // Updated indicators mapping with exact field names from your admin.py
  const indicators = {
    1: ['income_level', 'access_to_education', 'social_protection'],
    2: ['malnutrition_rate', 'food_insecurity'],
    3: ['access_to_healthcare', 'maternal_mortality', 'vaccination_coverage'],
    4: ['literacy_rate', 'school_enrollment', 'ict_access'],
    6: ['acess_to_clean_water', 'sanitation_coverage'], // Note: 'acess' spelling matches database
    7: ['electricity_access', 'clean_fuel_use', 'renewable_energy_share'],
    11: ['air_quality_index', 'transport_access', 'infrastructure_score']
  };

  const sdgIndicators = indicators[sdgNumber] || [];
  const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22'];

  // Process data for each indicator across all years
  const processIndicatorData = () => {
    const indicatorYearData = {};
    const allYears = new Set();
    
    // Initialize structure
    sdgIndicators.forEach(indicator => {
      indicatorYearData[indicator] = {};
    });
    
    // Collect all data points
    chartData.forEach(item => {
      const year = item.year;
      allYears.add(year);
      
      sdgIndicators.forEach(indicator => {
        // Check multiple possible field name variations
        let fieldValue = null;
        
        // Try exact match first
        if (item[indicator] !== null && item[indicator] !== undefined) {
          fieldValue = item[indicator];
        }
        // Try capitalized version
        else if (item[indicator.charAt(0).toUpperCase() + indicator.slice(1)] !== null && 
                 item[indicator.charAt(0).toUpperCase() + indicator.slice(1)] !== undefined) {
          fieldValue = item[indicator.charAt(0).toUpperCase() + indicator.slice(1)];
        }
        // Try all caps version
        else if (item[indicator.toUpperCase()] !== null && item[indicator.toUpperCase()] !== undefined) {
          fieldValue = item[indicator.toUpperCase()];
        }
        // Try snake_case variations
        else if (item[indicator.replace(/_/g, '')] !== null && item[indicator.replace(/_/g, '')] !== undefined) {
          fieldValue = item[indicator.replace(/_/g, '')];
        }
        
        if (fieldValue !== null) {
          if (!indicatorYearData[indicator][year]) {
            indicatorYearData[indicator][year] = [];
          }
          indicatorYearData[indicator][year].push(parseFloat(fieldValue));
          console.log(`Found data for ${indicator} in year ${year}:`, fieldValue);
        }
      });
    });

    // Calculate averages for each indicator per year
    const processedData = {};
    sdgIndicators.forEach(indicator => {
      processedData[indicator] = {};
      Array.from(allYears).forEach(year => {
        if (indicatorYearData[indicator][year]) {
          const values = indicatorYearData[indicator][year];
          processedData[indicator][year] = values.reduce((a, b) => a + b, 0) / values.length;
        }
      });
    });

    return {
      indicatorData: processedData,
      years: Array.from(allYears).sort()
    };
  };

  const { indicatorData, years } = processIndicatorData();

  // Create individual chart for each indicator
  const renderIndicatorChart = (indicator, index) => {
    const indicatorValues = indicatorData[indicator];
    const yearsWithData = years.filter(year => indicatorValues[year] !== undefined);
    const maxValue = yearsWithData.length > 0 ? Math.max(...yearsWithData.map(year => indicatorValues[year]), 1) : 1;
    const color = colors[index % colors.length];
    
    return (
      <div key={indicator} style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e1e8ed',
        marginBottom: '24px'
      }}>
        {/* Chart Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '20px',
          paddingBottom: '12px',
          borderBottom: '1px solid #e1e8ed'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            backgroundColor: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '12px'
          }}>
            <BarChart3 size={16} color="white" />
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{
              margin: 0,
              fontSize: '16px',
              fontWeight: '600',
              color: '#2c3e50'
            }}>
              {indicator.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim()}
            </h4>
            <p style={{
              margin: '2px 0 0 0',
              fontSize: '12px',
              color: '#7f8c8d'
            }}>
              {yearsWithData.length} years of data • Max: {maxValue.toFixed(2)}
            </p>
          </div>
          <div style={{
            backgroundColor: `${color}15`,
            color: color,
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: '500'
          }}>
            Chart #{index + 1}
          </div>
        </div>

        {/* Bar Chart for this indicator */}
        <div style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          padding: '20px'
        }}>
          {yearsWithData.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#7f8c8d'
            }}>
              <div style={{
                fontSize: '14px',
                marginBottom: '8px'
              }}>
                No data available for this indicator
              </div>
              <div style={{ fontSize: '12px' }}>
                Expected field name: <code style={{backgroundColor: '#e1e8ed', padding: '2px 4px', borderRadius: '3px'}}>{indicator}</code>
              </div>
            </div>
          ) : (
            <>
              {/* Chart Container */}
              <div style={{
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'center',
                height: '200px',
                backgroundColor: 'white',
                borderRadius: '6px',
                padding: '16px',
                border: '1px solid #e1e8ed',
                marginBottom: '16px',
                gap: '12px'
              }}>
                {yearsWithData.map(year => {
                  const value = indicatorValues[year];
                  const barHeight = (value / maxValue) * 150;
                  
                  return (
                    <div key={year} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      flex: 1,
                      maxWidth: '80px'
                    }}>
                      {/* Value Label */}
                      <div style={{
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: color,
                        marginBottom: '8px',
                        backgroundColor: `${color}15`,
                        padding: '4px 8px',
                        borderRadius: '4px',
                        minWidth: '40px',
                        textAlign: 'center'
                      }}>
                        {value.toFixed(1)}
                      </div>
                      
                      {/* Bar */}
                      <div style={{
                        width: '40px',
                        height: `${barHeight}px`,
                        backgroundColor: color,
                        borderRadius: '4px 4px 0 0',
                        marginBottom: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.opacity = '0.8';
                        e.target.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.opacity = '1';
                        e.target.style.transform = 'scale(1)';
                      }}
                      title={`${year}: ${value.toFixed(2)}`}
                      />
                      
                      {/* Year Label */}
                      <div style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#2c3e50',
                        textAlign: 'center'
                      }}>
                        {year}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chart Statistics */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '12px',
                fontSize: '11px',
                color: '#7f8c8d'
              }}>
                <div style={{
                  backgroundColor: 'white',
                  padding: '8px',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontWeight: 'bold', color: color }}>
                    {Math.min(...yearsWithData.map(year => indicatorValues[year])).toFixed(1)}
                  </div>
                  <div>Min Value</div>
                </div>
                <div style={{
                  backgroundColor: 'white',
                  padding: '8px',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontWeight: 'bold', color: color }}>
                    {maxValue.toFixed(1)}
                  </div>
                  <div>Max Value</div>
                </div>
                <div style={{
                  backgroundColor: 'white',
                  padding: '8px',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontWeight: 'bold', color: color }}>
                    {(yearsWithData.reduce((sum, year) => sum + indicatorValues[year], 0) / yearsWithData.length).toFixed(1)}
                  </div>
                  <div>Average</div>
                </div>
                <div style={{
                  backgroundColor: 'white',
                  padding: '8px',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontWeight: 'bold', color: color }}>
                    {yearsWithData.length}
                  </div>
                  <div>Data Points</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ marginTop: '24px' }}>
      {/* Main Header */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e1e8ed',
        marginBottom: '24px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              backgroundColor: config.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '16px'
            }}>
              <BarChart3 size={24} color="white" />
            </div>
            <div>
              <h3 style={{
                margin: 0,
                fontSize: '20px',
                fontWeight: '600',
                color: '#2c3e50'
              }}>
                SDG {sdgNumber} Individual Indicator Charts
              </h3>
              <p style={{
                margin: '4px 0 0 0',
                fontSize: '14px',
                color: '#7f8c8d'
              }}>
                {config.name} - {sdgIndicators.length} separate charts for detailed analysis
              </p>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '12px',
          fontSize: '14px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: config.color }}>
              {sdgIndicators.length}
            </div>
            <div style={{ color: '#7f8c8d', fontSize: '12px' }}>
              Individual Charts
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: config.color }}>
              {years.length}
            </div>
            <div style={{ color: '#7f8c8d', fontSize: '12px' }}>
              Years Covered
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: config.color }}>
              {chartData.length}
            </div>
            <div style={{ color: '#7f8c8d', fontSize: '12px' }}>
              Total Records
            </div>
          </div>
        </div>
      </div>

      {/* Individual Charts for Each Indicator */}
      {sdgIndicators.map((indicator, index) => renderIndicatorChart(indicator, index))}
    </div>
  );
};
  const renderContent = () => {
    if (activeTab === 'overview') {
      return renderOverview();
    }

    if (activeTab === 'cities') {
      return renderCitiesManagement();
    }

    if (activeTab === 'add-data') {
      return renderDataEntry();
    }

    const sdgNumber = parseInt(activeTab);
    const currentData = sdgData[sdgNumber];
    const isLoading = loading[sdgNumber];
    const currentError = error[sdgNumber];

    if (isLoading) {
      return (
        <div style={styles.loadingContainer}>
          <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', color: '#3498db' }} />
          <span style={{ marginLeft: '8px' }}>Loading SDG {sdgNumber} data...</span>
        </div>
      );
    }

    if (currentError) {
      return (
        <div style={styles.errorContainer}>
          <AlertCircle size={48} style={styles.errorIcon} />
          <p style={styles.errorText}>Error: {currentError}</p>
          <button 
            onClick={() => fetchSDGData(sdgNumber)}
            style={{...styles.button, ...styles.dangerButton}}
          >
            Try Again
          </button>
        </div>
      );
    }

    if (!currentData) {
  return (
    <div style={styles.emptyState}>
      <p>Click "Load Data" to fetch SDG {sdgNumber} information</p>
      <button 
        onClick={() => fetchSDGData(sdgNumber)}
        style={{...styles.button, ...styles.primaryButton, marginTop: '16px'}}
      >
        Load Data
      </button>
    </div>
  );
}

return (
  <div>
    {/* Charts Section - Available to ALL users */}
    {renderSDGCharts(sdgNumber, currentData)}
    
    {/* Data Table Section */}
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e1e8ed',
      marginTop: '24px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#2c3e50',
          margin: 0
        }}>
          📊 Raw Data Table
        </h3>
        <div style={{
          fontSize: '12px',
          color: '#7f8c8d',
          backgroundColor: '#f8f9fa',
          padding: '4px 8px',
          borderRadius: '4px'
        }}>
          Interactive charts above • Data table below
        </div>
      </div>
      {renderDataTable(currentData)}
    </div>
  </div>
);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            <BarChart3 size={32} style={styles.logoIcon} />
            <div>
              <h1 style={styles.title}>SustainX Dashboard</h1>
              <p style={styles.subtitle}>SDG Data Management System</p>
            </div>
          </div>
          
          <div style={styles.headerActions}>
            <div style={styles.searchContainer}>
              <Search size={16} style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search data..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
                onFocus={(e) => e.target.style.borderColor = '#3498db'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                  <User size={16} />
                  <span>Welcome, {user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  style={{...styles.button, color: '#e74c3c'}}
                  onMouseEnter={(e) => e.target.style.color = '#c0392b'}
                  onMouseLeave={(e) => e.target.style.color = '#e74c3c'}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                style={{...styles.button, ...styles.primaryButton}}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
              >
                <LogIn size={16} />
                Admin Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Login Modal */}
      {showLogin && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Admin Login</h2>
            <form onSubmit={handleLogin}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Username</label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = '#3498db'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = '#3498db'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                  required
                />
              </div>
              {error.login && (
                <p style={{ color: '#e74c3c', fontSize: '14px', marginBottom: '16px' }}>
                  {error.login}
                </p>
              )}
              <div style={styles.buttonGroup}>
                <button
                  type="submit"
                  disabled={loading.login}
                  style={{
                    ...styles.button, 
                    ...styles.primaryButton, 
                    flex: 1,
                    opacity: loading.login ? 0.5 : 1
                  }}
                >
                  {loading.login ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : 'Login'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowLogin(false);
                    setError(prev => ({ ...prev, login: null }));
                  }}
                  style={{...styles.button, ...styles.secondaryButton, flex: 1}}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* City Form Modal */}
      {showCityForm && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Add New City</h3>
            <div style={styles.formGroup}>
              <label style={styles.label}>City Name</label>
              <input
                type="text"
                value={cityForm.name}
                onChange={(e) => setCityForm(prev => ({...prev, name: e.target.value}))}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Population</label>
              <input
                type="number"
                value={cityForm.population}
                onChange={(e) => setCityForm(prev => ({...prev, population: e.target.value}))}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Area (km²)</label>
              <input
                type="number"
                value={cityForm.area}
                onChange={(e) => setCityForm(prev => ({...prev, area: e.target.value}))}
                style={styles.input}
              />
            </div>
            <div style={styles.buttonGroup}>
              <button 
  onClick={() => addCity(cityForm)} 
  style={{...styles.button, ...styles.primaryButton}}
  disabled={!cityForm.name || !cityForm.province || !cityForm.urbanization_level}
>
  <Save size={16} /> Save
</button>
              <button onClick={() => setShowCityForm(false)} style={{...styles.button, ...styles.secondaryButton}}>
                <X size={16} /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Data Form Modal */}
      {showDataForm && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            {renderDataEntry()}
            <div style={styles.buttonGroup}>
              <button
                onClick={() => setShowDataForm(false)}
                style={{...styles.button, ...styles.secondaryButton}}
              >
                <X size={16} /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Overlay */}
      {sidebarVisible && isMobile && (
        <div 
          style={{...styles.overlay, display: 'block'}} 
          onClick={() => setSidebarVisible(false)}
        />
      )}

      <div style={styles.mainContent}>
        {/* Sidebar */}
        <aside style={{
          ...styles.sidebar,
          ...(isMobile ? styles.sidebarMobile : {}),
          ...(!sidebarVisible ? styles.sidebarHidden : {})
        }}>
          <nav style={styles.card}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{...styles.cardTitle, marginBottom: '0'}}>Navigation</h2>
              {isMobile && (
                <button
                  onClick={() => setSidebarVisible(false)}
                  style={{...styles.hamburgerButton, padding: '4px'}}
                >
                  <X size={16} color="#7f8c8d" />
                </button>
              )}
            </div>
            <ul style={styles.navList}>
              <li>
                <button
                  onClick={() => setActiveTab('overview')}
                  style={{
                    ...styles.navItem,
                    ...(activeTab === 'overview' ? styles.navItemActive : {})
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== 'overview') {
                      e.target.style.backgroundColor = '#f8f9fa';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== 'overview') {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{...styles.iconContainer, backgroundColor: '#95a5a6'}}>
                    <Info size={16} color="white" />
                  </div>
                  <span>Overview</span>
                </button>
              </li>
              
              {user && (
                <>
                  <li>
                    <button
                      onClick={() => setActiveTab('cities')}
                      style={{
                        ...styles.navItem,
                        ...(activeTab === 'cities' ? styles.navItemActive : {})
                      }}
                      onMouseEnter={(e) => {
                        if (activeTab !== 'cities') {
                          e.target.style.backgroundColor = '#f8f9fa';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeTab !== 'cities') {
                          e.target.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      <div style={{...styles.iconContainer, backgroundColor: '#9b59b6'}}>
                        <Building size={16} color="white" />
                      </div>
                      <span>Manage Cities</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('add-data')}
                      style={{
                        ...styles.navItem,
                        ...(activeTab === 'add-data' ? styles.navItemActive : {})
                      }}
                      onMouseEnter={(e) => {
                        if (activeTab !== 'add-data') {
                          e.target.style.backgroundColor = '#f8f9fa';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeTab !== 'add-data') {
                          e.target.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      <div style={{...styles.iconContainer, backgroundColor: '#16a085'}}>
                        <Plus size={16} color="white" />
                      </div>
                      <span>Add Data</span>
                    </button>
                  </li>
                </>
              )}
              
              {Object.entries(sdgConfig).map(([number, config]) => {
                const Icon = config.icon;
                const isActive = activeTab === number;
                const hasData = sdgData[number];
                const isLoading = loading[number];
                
                return (
                  <li key={number}>
                    <button
                      onClick={() => setActiveTab(number)}
                      style={{
                        ...styles.navItem,
                        ...(isActive ? styles.navItemActive : {})
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.target.style.backgroundColor = '#f8f9fa';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.target.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      <div style={{...styles.iconContainer, backgroundColor: config.color}}>
                        <Icon size={16} color="white" />
                      </div>
                      <span style={{ flex: 1, textAlign: 'left' }}>SDG {number}</span>
                      {isLoading && <Loader2 size={16} style={{ animation: 'spin 1s linear infinite', marginLeft: '8px' }} />}
                      {hasData && !isLoading && (
                        <div style={{
                          width: '8px',
                          height: '8px',
                          backgroundColor: '#27ae60',
                          borderRadius: '50%',
                          marginLeft: '8px'
                        }} />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Filters */}
          {activeTab !== 'overview' && activeTab !== 'cities' && activeTab !== 'add-data' && (
            <div style={styles.card}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={styles.cardTitle}>Filters</h3>
                <Filter size={16} color="#7f8c8d" />
              </div>
              
              <div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>City ({cities.length} available)</label>
                  <select
                    value={filters.city}
                    onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value, page: 1 }))}
                    style={styles.select}
                  >
                    <option value="">All Cities</option>
                    {cities.map((city, index) => (
                      <option key={city.city_id || index} value={city.city_name}>
                        {city.city_name} {city.province ? `(${city.province})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Year</label>
                  <select
                    value={filters.year}
                    onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value, page: 1 }))}
                    style={styles.select}
                  >
                    <option value="">All Years</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Page Size</label>
                  <select
                    value={filters.page_size}
                    onChange={(e) => setFilters(prev => ({ ...prev, page_size: parseInt(e.target.value), page: 1 }))}
                    style={styles.select}
                  >
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                    <option value={50}>50 per page</option>
                    <option value={100}>100 per page</option>
                  </select>
                </div>

                <div style={styles.buttonGroup}>
                  <button
                    onClick={applyFilters}
                    style={{...styles.button, ...styles.primaryButton, flex: 1}}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
                  >
                    Apply
                  </button>
                  <button
                    onClick={resetFilters}
                    style={{...styles.button, ...styles.secondaryButton, flex: 1}}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#d5d8db'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#ecf0f1'}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main style={{
          ...styles.mainPanel,
          marginLeft: !isMobile && !sidebarVisible ? '-280px' : '0',
          width: !isMobile && !sidebarVisible ? 'calc(100% + 280px)' : '100%',
          transition: 'margin-left 0.3s ease, width 0.3s ease'
        }}>
          <div style={styles.contentCard}>
            <div style={styles.contentHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={toggleSidebar}
                  style={{
                    ...styles.hamburgerButton,
                    padding: '6px',
                    borderRadius: '6px',
                    backgroundColor: '#ebf3fd'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#d6e9ff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#ebf3fd';
                  }}
                  title="Toggle Navigation"
                >
                  <Menu size={16} color="#3498db" />
                </button>
                <div>
                  <h2 style={styles.contentTitle}>
    {activeTab === 'overview' ? 'SDG Overview' : 
     activeTab === 'cities' ? 'Cities Management' :
     activeTab === 'add-data' ? 'Add New Data' :
     `📊 SDG ${activeTab}: ${sdgConfig[activeTab]?.name} - Charts & Data`}
  </h2>
                  {activeTab !== 'overview' && activeTab !== 'cities' && activeTab !== 'add-data' && sdgConfig[activeTab] && (
                    <p style={styles.contentSubtitle}>
                      {sdgConfig[activeTab].description}
                    </p>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {activeTab !== 'overview' && activeTab !== 'cities' && activeTab !== 'add-data' && user && (
                  <button
                    onClick={() => {
                      setDataForm(prev => ({...prev, sdg_goal: activeTab}));
                      setShowDataForm(true);
                      fetchSDGIndicators(activeTab);
                    }}
                    style={{...styles.button, ...styles.primaryButton}}
                    title="Add new data for this SDG"
                  >
                    <Plus size={16} /> Add Data
                  </button>
                )}
                {activeTab !== 'overview' && activeTab !== 'cities' && activeTab !== 'add-data' && (
                  <button
                    onClick={() => fetchSDGData(parseInt(activeTab))}
                    disabled={loading[activeTab]}
                    style={{
                      ...styles.button,
                      backgroundColor: 'transparent',
                      color: '#7f8c8d',
                      opacity: loading[activeTab] ? 0.5 : 1
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#2c3e50'}
                    onMouseLeave={(e) => e.target.style.color = '#7f8c8d'}
                    title="Refresh data"
                  >
                    <RotateCcw size={16} style={{ animation: loading[activeTab] ? 'spin 1s linear infinite' : 'none' }} />
                  </button>
                )}
              </div>
            </div>
            <div style={styles.contentBody}>
              {renderContent()}
            </div>
          </div>
        </main>
      </div>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
  
};

export default SustainXDashboard;