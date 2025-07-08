import React, { useState, useEffect } from 'react';
import { Search, BarChart3, Users, Building, Droplets, Zap, Info, Database, Loader2, AlertCircle, RotateCcw, Heart, GraduationCap, Utensils, LogIn, LogOut, User, Filter, ChevronDown, Eye, Download } from 'lucide-react';

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
  const [filters, setFilters] = useState({
    city: '',
    year: '',
    page: 1,
    page_size: 20
  });
  const [cities] = useState([
    'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 
    'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala'
  ]);
  const [years] = useState(['2020', '2021', '2022', '2023', '2024']);

  // Base API URL
  const BASE_URL = 'http://localhost:8000';

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
      gap: '24px'
    },
    sidebar: {
      width: '280px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
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
    navItemHover: {
      backgroundColor: '#f8f9fa'
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
      cursor: 'pointer'
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
      width: '400px',
      maxWidth: '90vw'
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

  // Fetch all SDGs overview
  const fetchSDGsOverview = async () => {
    setLoading(prev => ({ ...prev, overview: true }));
    setError(prev => ({ ...prev, overview: null }));

    try {
      const response = await fetch(${BASE_URL}/api/sdgs/, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(HTTP error! status: ${response.status});
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

  // Fetch specific SDG data with filters
  const fetchSDGData = async (sdgNumber) => {
    setLoading(prev => ({ ...prev, [sdgNumber]: true }));
    setError(prev => ({ ...prev, [sdgNumber]: null }));

    try {
      const params = new URLSearchParams();
      if (filters.city) params.append('city', filters.city);
      if (filters.year) params.append('year', filters.year);
      if (filters.page) params.append('page', filters.page);
      if (filters.page_size) params.append('page_size', filters.page_size);

      const url = ${BASE_URL}/api/data/sdg/${sdgNumber}/?${params};
      const response = await fetch(url, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(HTTP error! status: ${response.status});
      }
      
      const result = await response.json();
      setSdgData(prev => ({ ...prev, [sdgNumber]: result }));
    } catch (err) {
      setError(prev => ({ ...prev, [sdgNumber]: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, [sdgNumber]: false }));
    }
  };

  // Login function
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, login: true }));

    try {
      const response = await fetch(${BASE_URL}/api/auth/login/, {
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

  // Logout function
  const handleLogout = async () => {
    try {
      await fetch(${BASE_URL}/api/auth/logout/, {
        method: 'POST',
        credentials: 'include'
      });
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
      setUser(null);
    }
  };

  // Check authentication on load
  const checkAuth = async () => {
    try {
      const response = await fetch(${BASE_URL}/api/auth/check/, {
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

  // Load initial data
  useEffect(() => {
    checkAuth();
    fetchSDGsOverview();
  }, []);

  // Load SDG data when tab changes or filters change
  useEffect(() => {
    if (activeTab !== 'overview' && !isNaN(activeTab)) {
      fetchSDGData(activeTab);
    }
  }, [activeTab, filters]);

  // Apply filters
  const applyFilters = () => {
    if (activeTab !== 'overview' && !isNaN(activeTab)) {
      fetchSDGData(activeTab);
    }
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      city: '',
      year: '',
      page: 1,
      page_size: 20
    });
  };

  // Filter data based on search term
  const filterData = (items) => {
    if (!searchTerm || !items) return items;
    
    if (Array.isArray(items)) {
      return items.filter(item => 
        JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return items;
  };

  // Render data table
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
      const columns = sampleItem ? Object.keys(sampleItem) : [];

      return (
        <div>
          {/* Data Summary */}
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

          {/* Data Table */}
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

          {/* Pagination */}
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

  // Render SDG overview cards
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
                  <Eye size={16} />
                  View Data
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Render content based on active tab
  const renderContent = () => {
    if (activeTab === 'overview') {
      return renderOverview();
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

    return renderDataTable(currentData);
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
            {/* Search */}
            <div style={styles.searchContainer}>
              <Search size={16} style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search data..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  ...styles.searchInput,
                  ':focus': { borderColor: '#3498db' }
                }}
                onFocus={(e) => e.target.style.borderColor = '#3498db'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>

            {/* User Menu */}
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
                  style={{
                    ...styles.input,
                    ':focus': { borderColor: '#3498db' }
                  }}
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
                  style={{
                    ...styles.input,
                    ':focus': { borderColor: '#3498db' }
                  }}
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

      <div style={styles.mainContent}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          {/* Navigation */}
          <nav style={styles.card}>
            <h2 style={styles.cardTitle}>Navigation</h2>
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
          {activeTab !== 'overview' && (
            <div style={styles.card}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={styles.cardTitle}>Filters</h3>
                <Filter size={16} color="#7f8c8d" />
              </div>
              
              <div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>City</label>
                  <select
                    value={filters.city}
                    onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value, page: 1 }))}
                    style={styles.select}
                  >
                    <option value="">All Cities</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
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
        <main style={styles.mainPanel}>
          <div style={styles.contentCard}>
            <div style={styles.contentHeader}>
              <div>
                <h2 style={styles.contentTitle}>
                  {activeTab === 'overview' ? 'SDG Overview' : SDG ${activeTab}: ${sdgConfig[activeTab]?.name}}
                </h2>
                {activeTab !== 'overview' && sdgConfig[activeTab] && (
                  <p style={styles.contentSubtitle}>
                    {sdgConfig[activeTab].description}
                  </p>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {activeTab !== 'overview' && (
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