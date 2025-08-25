#!/bin/bash

# Script to test FTP connection to Vimexx
# Helps diagnose "530 Login incorrect" errors

echo "🔍 Testing FTP connection to Vimexx..."

# Check if required environment variables are set
if [ -z "$VIMEXX_SERVER" ] || [ -z "$VIMEXX_USERNAME" ] || [ -z "$VIMEXX_PASSWORD" ]; then
    echo "❌ Error: Missing environment variables"
    echo "Please set:"
    echo "export VIMEXX_SERVER='your-ftp-server.vimexx.nl'"
    echo "export VIMEXX_USERNAME='u30980p25062'"
    echo "export VIMEXX_PASSWORD='your-password'"
    exit 1
fi

echo "Testing connection to: $VIMEXX_SERVER"
echo "Username: $VIMEXX_USERNAME"
echo ""

# Test 1: Check if server is reachable
echo "🌐 Test 1: Checking if server is reachable..."
ping -c 3 $VIMEXX_SERVER
if [ $? -eq 0 ]; then
    echo "✅ Server is reachable"
else
    echo "❌ Server is not reachable - check server address"
fi
echo ""

# Test 2: Check if FTP port is open
echo "🔌 Test 2: Checking FTP port 21..."
nc -zv $VIMEXX_SERVER 21 2>&1
if [ $? -eq 0 ]; then
    echo "✅ FTP port 21 is open"
else
    echo "❌ FTP port 21 is not accessible"
fi
echo ""

# Test 3: Try basic FTP connection
echo "🔐 Test 3: Testing FTP authentication..."
curl --connect-timeout 10 -v "ftp://$VIMEXX_SERVER/" --user "$VIMEXX_USERNAME:$VIMEXX_PASSWORD" 2>&1 | head -20

echo ""
echo "🔧 Test 4: Trying lftp connection..."
if command -v lftp &> /dev/null; then
    lftp -u "$VIMEXX_USERNAME","$VIMEXX_PASSWORD" "ftp://$VIMEXX_SERVER:21" << EOF
set ftp:ssl-allow false
set ssl:verify-certificate false
set net:timeout 10
pwd
ls -la
quit
EOF
else
    echo "ℹ️  lftp not installed, skipping this test"
fi

echo ""
echo "📋 Common causes of '530 Login incorrect':"
echo "1. Wrong username (check Vimexx control panel)"
echo "2. Wrong password (check Vimexx control panel)"  
echo "3. Wrong server address (should be your Vimexx FTP server)"
echo "4. Account not activated for FTP"
echo "5. IP restrictions on FTP access"
echo ""
echo "💡 Check your Vimexx control panel for correct FTP settings!"