#!/bin/bash

# Quick test deployment to verify FTP connection works
echo "🔍 Quick FTP deployment test..."

# Je moet deze variabelen instellen met je echte Vimexx credentials:
# export VIMEXX_SERVER="je-server.vimexx.nl"
# export VIMEXX_USERNAME="u30980p25062" 
# export VIMEXX_PASSWORD="je-wachtwoord"

if [ -z "$VIMEXX_SERVER" ] || [ -z "$VIMEXX_USERNAME" ] || [ -z "$VIMEXX_PASSWORD" ]; then
    echo "❌ Stel eerst je FTP credentials in:"
    echo "export VIMEXX_SERVER='je-server.vimexx.nl'"
    echo "export VIMEXX_USERNAME='u30980p25062'"
    echo "export VIMEXX_PASSWORD='je-wachtwoord'"
    exit 1
fi

# Install lftp if needed
if ! command -v lftp &> /dev/null; then
    echo "📦 Installing lftp..."
    sudo apt-get update && sudo apt-get install -y lftp
fi

# Create simple test file
echo "<html><body><h1>Test Upload - $(date)</h1><p>Als je dit ziet, werkt FTP!</p></body></html>" > test.html

# Test FTP upload
echo "📤 Testing FTP upload..."
lftp -u "$VIMEXX_USERNAME","$VIMEXX_PASSWORD" ftp://$VIMEXX_SERVER:21 << EOF
set ftp:ssl-allow false
set ssl:verify-certificate false
set net:timeout 30
set ftp:passive-mode true

# Show current directory
pwd
ls -la

# Try to access public_html
cd public_html
pwd
ls -la

# Upload test file
put test.html

# List files to verify upload
ls -la

quit
EOF

echo "🌐 Test: https://aggregaatkopen.com/test.html"
rm test.html

echo ""
echo "Als de test werkt, run dan:"
echo "./deploy-to-vimexx-ftp.sh"