#!/bin/bash

# Deploy aggregaatkopen.com to Vimexx via FTP
# Vimexx gebruikt FTP protocol op poort 21

echo "🚀 Starting FTP deployment to Vimexx..."

# Check if required environment variables are set
if [ -z "$VIMEXX_SERVER" ] || [ -z "$VIMEXX_USERNAME" ] || [ -z "$VIMEXX_PASSWORD" ]; then
    echo "❌ Error: Missing environment variables"
    echo "Please set: VIMEXX_SERVER, VIMEXX_USERNAME, VIMEXX_PASSWORD"
    echo ""
    echo "Example:"
    echo "export VIMEXX_SERVER='ftp.vimexx.nl'  # or your specific server"
    echo "export VIMEXX_USERNAME='u30980p25062'"
    echo "export VIMEXX_PASSWORD='your-password'"
    exit 1
fi

# Generate static site
echo "🏗️ Generating static website..."
node generate-static.cjs

if [ ! -d "static-site" ]; then
    echo "❌ Error: static-site directory not found"
    exit 1
fi

echo "✅ Static site generated successfully"
ls -la static-site/

# Test FTP connection
echo "🔍 Testing FTP connection..."
nc -zv $VIMEXX_SERVER 21 2>/dev/null
if [ $? -eq 0 ]; then
    echo "✅ FTP port 21 is accessible"
else
    echo "❌ FTP port 21 is not accessible"
    echo "Check server address: $VIMEXX_SERVER"
fi

# Install lftp if not present (better FTP client)
if ! command -v lftp &> /dev/null; then
    echo "📦 Installing lftp..."
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo apt-get update && sudo apt-get install -y lftp
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        brew install lftp
    else
        echo "❌ Please install lftp manually for your system"
        exit 1
    fi
fi

# Deploy via FTP using lftp (robust FTP client)
echo "📤 Deploying via FTP..."
lftp -u "$VIMEXX_USERNAME","$VIMEXX_PASSWORD" ftp://$VIMEXX_SERVER:21 << EOF
set ftp:ssl-allow false
set ssl:verify-certificate false
set net:timeout 30
set net:max-retries 3
set net:reconnect-interval-base 5
set ftp:passive-mode true

# Test connection and show current directory
pwd
ls -la

# Create public_html directory if it doesn't exist
mkdir -p public_html

# Change to public_html directory
cd public_html
pwd

# Upload all files from static-site
lcd static-site
mput -O . *

# Upload directories recursively
mirror -R static .

# Verify upload
ls -la
pwd

quit
EOF

if [ $? -eq 0 ]; then
    echo "🎉 FTP deployment successful!"
    echo "📍 Check your website at: https://aggregaatkopen.com"
    echo "⏰ Deployed at: $(date)"
else
    echo "❌ FTP deployment failed, trying alternative method..."
    
    # Alternative: Try with basic ftp command
    echo "📤 Trying basic FTP..."
    
    # Create FTP script
    cat > ftp_script.txt << EOF
open $VIMEXX_SERVER 21
user $VIMEXX_USERNAME $VIMEXX_PASSWORD
binary
passive
cd public_html
lcd static-site
mput *
quit
EOF
    
    ftp -n < ftp_script.txt
    rm ftp_script.txt
    
    if [ $? -eq 0 ]; then
        echo "🎉 Deployment successful via basic FTP!"
        echo "📍 Check your website at: https://aggregaatkopen.com"
    else
        echo "❌ All FTP methods failed"
        echo "🔍 Debug info:"
        echo "Server: $VIMEXX_SERVER"
        echo "Username: $VIMEXX_USERNAME"
        echo "Please verify credentials and server address with Vimexx"
        exit 1
    fi
fi