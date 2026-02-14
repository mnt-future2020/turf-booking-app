#!/bin/bash

# TurfBooking App - Automated Setup Script
# This script will help you set up the application quickly

echo "🎯 TurfBooking App - Setup Script"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
echo "This may take a few minutes..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Dependencies installed successfully!"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found!"
    echo "Creating .env file with template..."
    cat > .env << 'EOF'
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/turf_booking"

# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"

# Optional: Payment Gateway
# STRIPE_SECRET_KEY=""
# STRIPE_PUBLISHABLE_KEY=""
EOF
    echo "✅ .env file created!"
    echo ""
    echo "⚠️  IMPORTANT: Please update DATABASE_URL in .env file"
    echo ""
fi

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npx prisma generate

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma client"
    exit 1
fi

echo ""
echo "✅ Prisma Client generated!"
echo ""

# Ask if user wants to push database schema
echo "📊 Do you want to push database schema now? (y/n)"
read -r response

if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo "Pushing schema to database..."
    npx prisma db push
    
    if [ $? -eq 0 ]; then
        echo "✅ Database schema pushed successfully!"
    else
        echo "⚠️  Failed to push schema. Please check your DATABASE_URL"
        echo "You can run 'npx prisma db push' manually later"
    fi
fi

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "✅ All dependencies installed"
echo "✅ Prisma client generated"
echo "✅ Environment configured"
echo ""
echo "📝 Next Steps:"
echo "1. Update DATABASE_URL in .env file (if not done)"
echo "2. Run: npx prisma db push (if not done)"
echo "3. Run: npm run dev"
echo "4. Open: http://localhost:3000"
echo ""
echo "📚 Read DOWNLOAD_INSTRUCTIONS.md for detailed setup"
echo ""
echo "Happy Coding! 🚀"
