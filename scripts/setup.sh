#!/bin/bash

# Crypto Sales Funnel Platform - Setup Script
echo "🚀 Setting up Crypto Sales Funnel Platform..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🗄️ Setting up database..."
cd apps/api
npx prisma generate
cd ../..

# Copy environment variables
if [ ! -f .env ]; then
    echo "📝 Creating environment file..."
    cp .env.example .env
    echo "⚠️  Please update the .env file with your actual configuration values"
fi

# Start development environment
echo "🐳 Starting development environment..."
docker-compose -f docker-compose.dev.yml up -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Run database migrations
echo "🔄 Running database migrations..."
cd apps/api
npx prisma migrate dev --name init
cd ../..

echo "✅ Setup complete!"
echo ""
echo "🎉 Your Crypto Sales Funnel Platform is ready!"
echo ""
echo "Next steps:"
echo "1. Update the .env file with your API keys and configuration"
echo "2. Run 'npm run dev' to start the development servers"
echo "3. Visit http://localhost:3000 for the frontend"
echo "4. Visit http://localhost:4000/docs for the API documentation"
echo ""
echo "For more information, check the README.md file"
