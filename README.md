# SustainX 🌍

**Comprehensive SDG Data Management & Visualization Platform for Pakistan**

SustainX is a full-stack web application designed to manage, analyze, and visualize Sustainable Development Goals (SDG) data across Pakistani cities. Built with React and Django, it provides an intuitive dashboard for tracking progress across multiple SDG indicators with dynamic charts and comprehensive data management capabilities.

## 🌟 Features

### 📊 **Dynamic Data Visualization**
- Individual indicator charts for each SDG with year-wise comparison
- Interactive bar charts showing trends and patterns across multiple years
- Real-time chart updates when new data is added
- Color-coded indicators for easy identification
- Responsive design for desktop and mobile devices

### 🎯 **SDG Coverage (7 Goals)**
- **SDG 1**: No Poverty (Income Level, Access to Education, Social Protection)
- **SDG 2**: Zero Hunger (Malnutrition Rate, Food Insecurity)
- **SDG 3**: Good Health and Well-being (Healthcare Access, Maternal Mortality, Vaccination Coverage)
- **SDG 4**: Quality Education (Literacy Rate, School Enrollment, ICT Access)
- **SDG 6**: Clean Water and Sanitation (Access to Clean Water, Sanitation Coverage)
- **SDG 7**: Affordable and Clean Energy (Electricity Access, Clean Fuel Use, Renewable Energy Share)
- **SDG 11**: Sustainable Cities and Communities (Air Quality Index, Transport Access, Infrastructure Score)

### 🔐 **User Management**
- **Public Access**: View SDG data and interactive charts for all users
- **Admin Access**: Complete CRUD operations for data and cities management
- Secure authentication system with session-based management
- Role-based permissions and access controls

### 📈 **Data Management**
- Add complete SDG data with all indicators at once for specific years
- City management with full CRUD operations
- Advanced data filtering by city, year, and pagination
- Real-time data validation and comprehensive error handling
- Auto-updating visualizations when new data is added

### 🏙️ **Geographic Coverage**
- Major Pakistani cities including Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad
- Province-wise data organization (Punjab, Sindh, KPK, Balochistan, Federal)
- Urban, Semi-Urban, and Rural classification

### 🎨 **User Experience**
- Clean and intuitive dashboard interface
- Responsive design for all screen sizes
- Interactive hover effects and detailed tooltips
- Loading states and comprehensive error handling
- Modern UI with consistent design language

## 🛠️ Technology Stack

### **Frontend**
- **React 18.3.1** - UI library for building interactive components
- **Lucide React** - Modern icon library for UI elements
- **Custom CSS** - Responsive styling with modern design patterns
- **Fetch API** - HTTP client for seamless API communication

### **Backend**
- **Django 4.2.7** - Robust web framework
- **MySQL Database** - Reliable data storage with complex relationships
- **PyMySQL** - MySQL database adapter for Python
- **Django ORM** - Object-relational mapping for database operations
- **Django Admin** - Built-in admin interface for data management
- **django-cors-headers** - Cross-origin resource sharing handling

### **API Architecture**
- RESTful API design with comprehensive endpoints
- JSON response format for efficient data transfer
- Session-based authentication for secure access
- Advanced filtering and pagination support
- Comprehensive error handling and validation

## 🚀 Installation & Setup

### Prerequisites
- **Python 3.8+** installed on your system
- **Node.js 16+** and **npm** for frontend development
- **MySQL Server** installed and running
- **Git** (optional, for version control)

## 🖥️ Backend Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/SustainX.git
cd SustainX
```

### 2. Create and Activate Virtual Environment
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv sustainx_env

# Activate virtual environment
# Windows:
sustainx_env\Scripts\activate

# macOS/Linux:
source sustainx_env/bin/activate

# Verify activation - you should see (sustainx_env) in your terminal prompt
```

### 3. Install Python Dependencies
```bash
# Install all required packages
pip install -r requirements.txt

# Note: This project uses PyMySQL instead of mysqlclient for better compatibility
# PyMySQL is already included in requirements.txt
```

### 4. Database Setup

#### 4.1 Create MySQL Database
```sql
-- Open MySQL command line or MySQL Workbench
-- Run these commands:
DROP DATABASE IF EXISTS sustainx;
CREATE DATABASE sustainx CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### 4.2 Configure Database Settings
Open `sustainx/settings.py` and update the database configuration:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'sustainx',
        'USER': 'your_mysql_username',     # Replace with your MySQL username
        'PASSWORD': 'your_mysql_password', # Replace with your MySQL password
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

#### 4.3 PyMySQL Configuration
Ensure `sustainx/__init__.py` contains:
```python
import pymysql
pymysql.install_as_MySQLdb()
```
*Note: This project uses PyMySQL as the MySQL adapter, which is already configured.*

### 5. Run Database Migrations
```bash
# Create migration files
python manage.py makemigrations

# Apply migrations to create database tables
python manage.py migrate
```

### 6. Create Admin User
```bash
python manage.py createsuperuser
# Enter username (e.g., 'admin')
# Enter email (optional)
# Enter password (remember this for admin login)
```

### 7. Load Sample Data
```bash
# Load initial SDG data
python load_data.py

# If this fails, manually run the SQL files in MySQL:
# 1. database/dbDDL.sql (creates tables)
# 2. database/dbDML.sql (inserts sample data)
```

### 8. Start Django Development Server
```bash
python manage.py runserver
```

**Expected Output:**
```
Watching for file changes with StatReloader
Performing system checks...
System check identified no issues (0 silenced).
Django version 4.2.7, using settings 'sustainx.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

### 9. Test Backend APIs
```bash
# In a new terminal, activate environment and test:
python test_backend.py
# Expected: 6-8 tests should pass
```

## ⚛️ Frontend Setup

### 1. Navigate to Frontend Directory
```bash
# Open a new terminal and navigate to the React app
cd SustainX/sdg-dashboard
```

### 2. Install Node.js Dependencies
```bash
# Install all required npm packages (using npm, not yarn)
npm install

# Install additional icon library
npm install lucide-react
```

### 3. Start React Development Server
```bash
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view sdg-dashboard in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

## 🌐 Application Access

After successful setup, you can access:

- **Frontend Dashboard**: http://localhost:3000
- **Backend API**: http://127.0.0.1:8000/api/
- **Django Admin Panel**: http://127.0.0.1:8000/admin/

## 📡 API Endpoints

### Public Endpoints (No Authentication Required)
```bash
# Get all SDGs
GET http://localhost:8000/api/sdgs/

# Get specific SDG data
GET http://localhost:8000/api/data/sdg/{goal_number}/

# Filter SDG data
GET http://localhost:8000/api/data/sdg/1/?city=Lahore&year=2023

# Get cities list
GET http://localhost:8000/api/cities/
```

### Admin Endpoints (Authentication Required)
```bash
# Admin login
POST http://localhost:8000/api/auth/login/

# Check authentication status
GET http://localhost:8000/api/auth/check/

# Add new SDG data
POST http://localhost:8000/api/data/sdg/{goal_number}/

# Add new city
POST http://localhost:8000/api/cities/
```

## 🎯 Usage Guide

### For Regular Users:
1. Visit http://localhost:3000
2. Browse SDG overview cards
3. Click any SDG to view detailed charts and data
4. Use filters to narrow down data by city and year
5. Explore interactive charts with hover tooltips

### For Administrators:
1. Click "Admin Login" button
2. Login with superuser credentials
3. Access "Manage Cities" to add/remove cities
4. Use "Add Data" to input new SDG data
5. View real-time chart updates after data entry

## 🔧 Troubleshooting

### Common Backend Issues

**PyMySQL Configuration:**
```bash
# Ensure PyMySQL is properly configured in sustainx/__init__.py
# This project uses PyMySQL instead of mysqlclient for better compatibility
```

**Database Connection Error:**
```bash
# Check MySQL credentials in settings.py
# Ensure MySQL server is running
# Verify database 'sustainx' exists
```

**Missing Dependencies:**
```bash
# Reinstall requirements
pip install -r requirements.txt
```

**Migration Conflicts:**
```bash
# Delete migration files and recreate
rm sdg_app/migrations/0001_*.py
python manage.py makemigrations sdg_app
python manage.py migrate
```

### Common Frontend Issues

**CORS Errors:**
- CORS is pre-configured for localhost:3000
- Ensure both servers are running on correct ports

**Module Not Found:**
```bash
# Reinstall dependencies using npm (not yarn)
rm -rf node_modules package-lock.json
npm install
```

**Charts Not Showing:**
- Check browser console (F12) for JavaScript errors
- Ensure backend is returning data for the specific SDG
- Verify field names match between frontend and backend

## 📊 Data Structure & Sources

### Available Data:
- **7 SDGs** with comprehensive indicators
- **Pakistani cities** with province classification
- **5 years** of data (2020-2024)
- **18+ data points** per SDG across multiple cities

### Data Sources:
- **Government Resources**: Official Pakistani government statistics and reports
- **International Organizations**: World Bank, UN agencies, and development partners
- **Research Institutions**: Academic and policy research data
- **Testing Data**: Dummy data added during application development and testing phases

### Database Schema:
```
SDGInfo → Cities → SDG1, SDG2, SDG3, SDG4, SDG6, SDG7, SDG11
```

### Data Categories:
- **Real Data**: Sourced from official government and international organization reports
- **Sample Data**: Representative data for demonstration and testing purposes
- **Dummy Data**: Test data created during application development for functionality testing

**Note**: The application contains a mix of real statistical data from credible sources and dummy data used for development and testing purposes. Users should verify data sources for production use and replace test data with current official statistics.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- **Sustainable Development Goals** framework by United Nations
- **Pakistani Government Data Sources** for official statistics and reports
- **International Organizations** (World Bank, UNDP, UNESCO) for development indicators
- **Research Institutions** for academic and policy research data
- **Django and React Communities** for excellent documentation and support
- **Open Source Contributors** for libraries and tools used in this project

**Data Disclaimer**: This application contains both real data sourced from government and international organizations, as well as dummy/test data created during development. For production use, please verify data sources and replace any test data with current official statistics.

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Ensure all prerequisites are correctly installed
3. Verify database credentials and connections
4. Test API endpoints in browser first
5. Check console logs for detailed error messages

---

**Built with ❤️ for sustainable development tracking in Pakistan** 🇵🇰
