#!/bin/bash

# Vimexx Deployment Script
# Run dit script op je Vimexx server via SSH

echo "🚀 Starting Vimexx deployment..."

# Navigeer naar website directory
cd /home/jouwgebruiker/public_html

# Check if git repo exists
if [ ! -d ".git" ]; then
    echo "📥 Cloning repository for first time..."
    git clone https://github.com/Tjallingsol/Aggregaatkopen.git .
else
    echo "🔄 Pulling latest changes..."
    git pull origin main
fi

# Install dependencies (if Node.js is available)
if command -v npm &> /dev/null; then
    echo "📦 Installing dependencies..."
    npm install
    
    echo "🏗️ Building static site..."
    node generate-static.cjs
    
    echo "📁 Moving static files..."
    cp -r static-site/* ./
    rm -rf static-site/
else
    echo "⚠️ Node.js not available, using pre-built files"
    # Als Node.js niet beschikbaar is, gebruik de static-site bestanden
    if [ -d "static-site" ]; then
        cp -r static-site/* ./
        rm -rf static-site/
    fi
fi

echo "✅ Deployment completed!"
echo "🌐 Website updated at: https://jouwdomain.com"

# Set correct permissions
chmod 644 .htaccess
chmod -R 644 *.html *.css *.js *.txt *.xml
chmod 755 .

echo "🔐 Permissions set correctly"