#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_DIR = __dirname;

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.zip': 'application/zip',
  '.md': 'text/markdown',
  '.txt': 'text/plain'
};

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  
  // Handle root path - show download page
  if (req.url === '/') {
    const downloadPage = `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Download FAQ Bestanden - Aggregaatkopen.com</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    <div class="max-w-4xl mx-auto p-8">
        <div class="bg-white rounded-lg shadow-lg p-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">
                <i class="fas fa-download mr-3 text-orange-500"></i>
                Download FAQ Bestanden
            </h1>
            <p class="text-gray-600 mb-8">
                Download de bestanden om de FAQ sectie toe te voegen aan aggregaatkopen.com
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Hoofdbestanden -->
                <div class="bg-gray-50 p-6 rounded-lg">
                    <h2 class="text-xl font-semibold mb-4">
                        <i class="fas fa-file-code mr-2 text-blue-500"></i>
                        Hoofdbestanden (HTML)
                    </h2>
                    <div class="space-y-2">
                        <a href="/index.html" class="block text-blue-600 hover:text-blue-800 underline" download>
                            <i class="fas fa-home mr-2"></i>index.html (Homepage met FAQ)
                        </a>
                        <a href="/keuzehulp.html" class="block text-blue-600 hover:text-blue-800 underline" download>
                            <i class="fas fa-search mr-2"></i>keuzehulp.html
                        </a>
                        <a href="/aggregaat-kopen-voor-thuis.html" class="block text-blue-600 hover:text-blue-800 underline" download>
                            <i class="fas fa-home mr-2"></i>aggregaat-kopen-voor-thuis.html
                        </a>
                        <a href="/stille-aggregaat-kopen.html" class="block text-blue-600 hover:text-blue-800 underline" download>
                            <i class="fas fa-volume-mute mr-2"></i>stille-aggregaat-kopen.html
                        </a>
                        <a href="/diesel-aggregaat-kopen.html" class="block text-blue-600 hover:text-blue-800 underline" download>
                            <i class="fas fa-gas-pump mr-2"></i>diesel-aggregaat-kopen.html
                        </a>
                        <a href="/professionele-aggregaat-kopen.html" class="block text-blue-600 hover:text-blue-800 underline" download>
                            <i class="fas fa-industry mr-2"></i>professionele-aggregaat-kopen.html
                        </a>
                    </div>
                </div>

                <!-- Static bestanden -->
                <div class="bg-gray-50 p-6 rounded-lg">
                    <h2 class="text-xl font-semibold mb-4">
                        <i class="fas fa-code mr-2 text-green-500"></i>
                        Static Bestanden (JS/CSS)
                    </h2>
                    <div class="space-y-2">
                        <a href="/static/app.js" class="block text-green-600 hover:text-green-800 underline" download>
                            <i class="fas fa-file-code mr-2"></i>app.js (Keuzehulp)
                        </a>
                        <a href="/static/styles.css" class="block text-green-600 hover:text-green-800 underline" download>
                            <i class="fas fa-palette mr-2"></i>styles.css (Styling)
                        </a>
                        <a href="/static/faq.js" class="block text-green-600 hover:text-green-800 underline" download>
                            <i class="fas fa-question-circle mr-2"></i>faq.js (FAQ JavaScript)
                        </a>
                    </div>
                </div>

                <!-- Zip bestanden -->
                <div class="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                    <h2 class="text-xl font-semibold mb-4">
                        <i class="fas fa-file-archive mr-2 text-orange-500"></i>
                        Complete Pakket
                    </h2>
                    <a href="/vimexx-final-upload.zip" class="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition" download>
                        <i class="fas fa-download mr-2"></i>
                        Download Alles (ZIP)
                    </a>
                    <p class="text-sm text-gray-600 mt-2">Alle bestanden in één zip bestand</p>
                </div>

                <!-- Instructies -->
                <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                    <h2 class="text-xl font-semibold mb-4">
                        <i class="fas fa-info-circle mr-2 text-blue-500"></i>
                        Instructies
                    </h2>
                    <a href="/VIMEXX_UPLOAD_INSTRUCTIES.md" class="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition" download>
                        <i class="fas fa-file-text mr-2"></i>
                        Upload Instructies
                    </a>
                    <p class="text-sm text-gray-600 mt-2">Stap-voor-stap upload gids</p>
                </div>
            </div>

            <div class="mt-8 p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
                <h3 class="text-lg font-semibold text-yellow-800 mb-2">
                    <i class="fas fa-exclamation-triangle mr-2"></i>
                    Belangrijke Upload Locatie
                </h3>
                <p class="text-yellow-700">
                    Upload alle bestanden naar: <strong>https://web0111.zxcs.nl:2222/CMD_FILE_MANAGER/domains/aggregaatkopen.com/public%5Fhtml</strong>
                </p>
                <p class="text-sm text-yellow-600 mt-2">
                    Het belangrijkste bestand is <strong>index.html</strong> - dit bevat de complete FAQ sectie!
                </p>
            </div>
        </div>
    </div>
</body>
</html>
    `;
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(downloadPage);
    return;
  }

  // Handle file downloads
  let filePath = path.join(BASE_DIR, req.url);
  
  // Security check - prevent directory traversal
  if (!filePath.startsWith(BASE_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  const extname = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';
  
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(500);
        res.end('Server Error: ' + error.code);
      }
    } else {
      // Set download headers for certain file types
      const headers = { 'Content-Type': contentType };
      if (extname === '.zip' || extname === '.html' || extname === '.js' || extname === '.css') {
        const filename = path.basename(filePath);
        headers['Content-Disposition'] = `attachment; filename="${filename}"`;
      }
      
      res.writeHead(200, headers);
      res.end(content);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Download server running on http://localhost:${PORT}`);
  console.log(`📁 Serving files from: ${BASE_DIR}`);
  console.log(`💾 Download page: http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
  console.log('\\n🛑 Server shutting down...');
  server.close(() => {
    console.log('✅ Server stopped');
    process.exit(0);
  });
});