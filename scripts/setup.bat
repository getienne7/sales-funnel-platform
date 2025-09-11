@echo off
echo 🚀 Setting up Crypto Sales Funnel Platform...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker Desktop first.
    pause
    exit /b 1
)

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose is not installed. Please install Docker Compose first.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Generate Prisma client
echo 🗄️ Setting up database...
cd apps\api
call npx prisma generate
cd ..\..

REM Copy environment variables
if not exist .env (
    echo 📝 Creating environment file...
    copy .env.example .env
    echo ⚠️  Please update the .env file with your actual configuration values
)

REM Start development environment
echo 🐳 Starting development environment...
docker-compose -f docker-compose.dev.yml up -d

REM Wait for database to be ready
echo ⏳ Waiting for database to be ready...
timeout /t 10 /nobreak >nul

REM Run database migrations
echo 🔄 Running database migrations...
cd apps\api
call npx prisma migrate dev --name init
cd ..\..

echo ✅ Setup complete!
echo.
echo 🎉 Your Crypto Sales Funnel Platform is ready!
echo.
echo Next steps:
echo 1. Update the .env file with your API keys and configuration
echo 2. Run 'npm run dev' to start the development servers
echo 3. Visit http://localhost:3000 for the frontend
echo 4. Visit http://localhost:4000/docs for the API documentation
echo.
echo For more information, check the README.md file
pause
