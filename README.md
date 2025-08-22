# SustainX - SDG Dashboard Project

A comprehensive web application for tracking and visualizing Sustainable Development Goals (SDGs) data across cities and regions.

## 🌍 Project Overview

SustainX is a full-stack web application that provides:
- Interactive dashboard for SDG data visualization
- City-based data management
- Responsive design for all devices
- Admin panel for data entry and management
- RESTful API for data access

## 🏗️ Architecture

### Backend (Django)
- **Framework**: Django with Django REST Framework
- **Database**: SQLite (development) / MySQL (production)
- **Features**: 
  - User authentication
  - SDG data management
  - City management
  - RESTful API endpoints

### Frontend (React)
- **Framework**: React with functional components and hooks
- **UI**: Custom CSS-in-JS styling
- **Features**:
  - Responsive design
  - Interactive charts and visualizations
  - Filter and search capabilities
  - Mobile-friendly sidebar navigation

## 📁 Project Structure

```
SustainX/
├── backend/                 # Django backend
│   ├── sustainx/           # Main Django project
│   ├── sdg_app/            # SDG data models and API
│   ├── auth_app/           # Authentication
│   ├── requirements.txt    # Python dependencies
│   └── manage.py          # Django management script
│
├── sdg-dashboard/          # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   └── App.js         # Main App component
│   ├── public/            # Static assets
│   └── package.json       # Node.js dependencies
│
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anila-Younas/SustainX.git
   cd SustainX
   ```

2. **Create virtual environment**
   ```bash
   cd backend
   python -m venv sustainx_env
   
   # On Windows
   sustainx_env\Scripts\activate
   
   # On macOS/Linux
   source sustainx_env/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Database setup**
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py collectstatic
   ```

6. **Run development server**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd sdg-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment configuration**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API URL
   ```

4. **Run development server**
   ```bash
   npm start
   ```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```
SECRET_KEY=your-secret-key-here
DEBUG=True
DB_NAME=sustainx
DB_USER=your-db-username
DB_PASSWORD=your-db-password
DB_HOST=localhost
DB_PORT=3306
ALLOWED_HOSTS=127.0.0.1,localhost,yourdomain.com
```

#### Frontend (.env.local)
```
REACT_APP_API_URL=http://localhost:8000
```

## 📊 SDG Goals Covered

The application tracks data for the following SDGs:
- **SDG 1**: No Poverty
- **SDG 2**: Zero Hunger
- **SDG 3**: Good Health and Well-being
- **SDG 4**: Quality Education
- **SDG 6**: Clean Water and Sanitation
- **SDG 7**: Affordable and Clean Energy
- **SDG 11**: Sustainable Cities and Communities

## 🔐 Security Features

- Environment variable configuration for sensitive data
- CSRF protection
- CORS configuration
- User authentication and authorization
- SQL injection protection through Django ORM

## 🌐 Deployment

### Production Considerations

1. **Database**: Switch to PostgreSQL or MySQL for production
2. **Static Files**: Configure proper static file serving
3. **Environment Variables**: Use secure environment variable management
4. **HTTPS**: Enable SSL/TLS encryption
5. **Performance**: Implement caching and optimization

### Example Production Environment
- **Backend**: PythonAnywhere, Heroku, or AWS
- **Frontend**: Netlify, Vercel, or AWS S3
- **Database**: PostgreSQL or MySQL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 API Documentation

### Main Endpoints

- `GET /api/sdgs/` - List all SDGs
- `GET /api/data/sdg/{number}/` - Get data for specific SDG
- `POST /api/data/sdg{number}/` - Add new SDG data
- `GET /api/cities/` - List all cities
- `POST /api/cities/` - Add new city
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout

## 🐛 Known Issues

- Database folder is excluded from repository for security
- Ensure environment variables are properly configured before deployment

## 📞 Support

For support, email anila.younas@example.com or create an issue in the repository.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for sustainable development**-Backend-