#!/bin/bash

# SustainX Setup Script
echo "🌍 Setting up SustainX Project..."

# Backend setup
echo "📁 Setting up Backend..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "sustainx_env" ]; then
    echo "Creating virtual environment..."
    python -m venv sustainx_env
fi

# Activate virtual environment
echo "Activating virtual environment..."
source sustainx_env/bin/activate

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Setup environment file
if [ ! -f ".env" ]; then
    echo "Creating environment file..."
    cp .env.example .env
    echo "⚠️ Please edit backend/.env with your configuration"
fi

# Run migrations
echo "Running database migrations..."
python manage.py migrate

# Create superuser (optional)
read -p "Do you want to create a superuser? (y/n): " create_superuser
if [ "$create_superuser" = "y" ]; then
    python manage.py createsuperuser
fi

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Frontend setup
echo "📱 Setting up Frontend..."
cd ../sdg-dashboard

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm install

# Setup environment file
if [ ! -f ".env.local" ]; then
    echo "Creating frontend environment file..."
    cp .env.example .env.local
    echo "⚠️ Please edit sdg-dashboard/.env.local with your API URL"
fi

echo "✅ Setup complete!"
echo ""
echo "🚀 To start the application:"
echo "Backend:  cd backend && source sustainx_env/bin/activate && python manage.py runserver"
echo "Frontend: cd sdg-dashboard && npm start"
