@echo off
REM SustainX Setup Script for Windows

echo 🌍 Setting up SustainX Project...

REM Backend setup
echo 📁 Setting up Backend...
cd backend

REM Create virtual environment if it doesn't exist
if not exist "sustainx_env" (
    echo Creating virtual environment...
    python -m venv sustainx_env
)

REM Activate virtual environment
echo Activating virtual environment...
call sustainx_env\Scripts\activate

REM Install Python dependencies
echo Installing Python dependencies...
pip install -r requirements.txt

REM Setup environment file
if not exist ".env" (
    echo Creating environment file...
    copy .env.example .env
    echo ⚠️ Please edit backend\.env with your configuration
)

REM Run migrations
echo Running database migrations...
python manage.py migrate

REM Create superuser (optional)
set /p create_superuser="Do you want to create a superuser? (y/n): "
if "%create_superuser%"=="y" (
    python manage.py createsuperuser
)

REM Collect static files
echo Collecting static files...
python manage.py collectstatic --noinput

REM Frontend setup
echo 📱 Setting up Frontend...
cd ..\sdg-dashboard

REM Install Node.js dependencies
echo Installing Node.js dependencies...
npm install

REM Setup environment file
if not exist ".env.local" (
    echo Creating frontend environment file...
    copy .env.example .env.local
    echo ⚠️ Please edit sdg-dashboard\.env.local with your API URL
)

echo ✅ Setup complete!
echo.
echo 🚀 To start the application:
echo Backend:  cd backend ^&^& sustainx_env\Scripts\activate ^&^& python manage.py runserver
echo Frontend: cd sdg-dashboard ^&^& npm start

pause
