#!/bin/bash

echo "🚨 EMERGENCY DEPLOYMENT - Fixing redirect loop"

# Je MOET deze variabelen instellen:
if [ -z "$VIMEXX_SERVER" ] || [ -z "$VIMEXX_USERNAME" ] || [ -z "$VIMEXX_PASSWORD" ]; then
    echo "❌ Stel FTP credentials in:"
    echo "export VIMEXX_SERVER='je-server.vimexx.nl'"
    echo "export VIMEXX_USERNAME='u30980p25062'"
    echo "export VIMEXX_PASSWORD='je-wachtwoord'"
    exit 1
fi

# Generate static site with NO-REDIRECT .htaccess
echo "🏗️ Generating safe static site..."
node generate-static.cjs

# Install lftp if needed
if ! command -v lftp &> /dev/null; then
    sudo apt-get update && sudo apt-get install -y lftp
fi

echo "📤 EMERGENCY FTP Upload - Uploading minimal .htaccess to STOP redirect loop..."

lftp -u "$VIMEXX_USERNAME","$VIMEXX_PASSWORD" ftp://$VIMEXX_SERVER:21 << EOF
set ftp:ssl-allow false
set ssl:verify-certificate false
set net:timeout 30
set ftp:passive-mode true

# Go to public_html
cd public_html

# Upload ONLY .htaccess first to stop the loop
put static-site/.htaccess

# Upload essential files
put static-site/index.html
put static-site/robots.txt  
put static-site/sitemap.xml

# Upload static directory
mirror -R static-site/static static

# List files to confirm
pwd
ls -la

quit
EOF

if [ $? -eq 0 ]; then
    echo "🎉 Emergency deployment successful!"
    echo "🌐 Test: https://aggregaatkopen.com"
    echo "⚠️  Check if redirect loop is GONE"
else
    echo "❌ Emergency deployment failed"
    echo "🔧 Try manual FTP upload via FileZilla or similar"
fi