#!/bin/bash
# ============================================
# Hadada Safaris — Build Static Export for cPanel
# ============================================
# This script creates a static export of the website
# suitable for uploading to cPanel's public_html directory.
#
# Usage: ./build-cpanel.sh
# Output: out/ directory with all static files
# ============================================

set -e

echo "🔄 Switching next.config.ts to static export mode..."

# Temporarily change output to "export"
sed -i 's/output: "standalone"/output: "export"/' next.config.ts

# Temporarily change root page to client-side redirect
cat > src/app/page.tsx << 'PAGEEOF'
'use client';

import { useEffect } from 'react';

export default function RootPage() {
  useEffect(() => {
    var supported = ['en', 'ar', 'zh', 'nl', 'fr', 'de', 'it', 'pt', 'ru', 'es'];
    var browserLang = (navigator.language || 'en').split('-')[0];
    var locale = supported.indexOf(browserLang) !== -1 ? browserLang : 'en';
    window.location.replace('/' + locale + '/');
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '1.1rem', color: '#333' }}>Redirecting to Hadada Safaris...</p>
        <p style={{ fontSize: '0.9rem', color: '#999' }}>
          If not redirected, <a href="/en/" style={{ color: '#B78A42' }}>click here</a>
        </p>
      </div>
    </div>
  );
}
PAGEEOF

# Temporarily disable proxy.ts (middleware)
if [ -f "src/proxy.ts" ]; then
  mv src/proxy.ts src/proxy.ts.bak
  echo "📦 Disabled proxy.ts for static build"
fi

echo "🏗️  Building static export..."
npx next build

echo "📄 Creating root index.html redirect..."
cat > out/index.html << 'HTMLEOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hadada Safaris — Redirecting...</title>
  <meta http-equiv="refresh" content="0;url=/en/">
  <script>
    (function() {
      var supported = ['en', 'ar', 'zh', 'nl', 'fr', 'de', 'it', 'pt', 'ru', 'es'];
      var browserLang = (navigator.language || navigator.userLanguage || 'en').split('-')[0];
      var locale = supported.indexOf(browserLang) !== -1 ? browserLang : 'en';
      window.location.replace('/' + locale + '/');
    })();
  </script>
  <style>
    body { display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; font-family: system-ui, -apple-system, sans-serif; background: #FAFAF7; }
    .redirect-box { text-align: center; }
    .redirect-box h1 { font-size: 1.5rem; color: #333; margin-bottom: 0.5rem; }
    .redirect-box p { color: #999; font-size: 0.9rem; }
    .redirect-box a { color: #B78A42; text-decoration: none; }
    .redirect-box a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="redirect-box">
    <h1>Hadada Safaris</h1>
    <p>Redirecting... <a href="/en/">click here</a> if not redirected.</p>
  </div>
</body>
</html>
HTMLEOF

echo "⚙️  Creating .htaccess for Apache/cPanel..."
cat > out/.htaccess << 'HTACCESSEOF'
# Hadada Safaris — cPanel .htaccess
# =====================================

# Enable URL rewriting
RewriteEngine On

# Force HTTPS (uncomment when SSL is configured on cPanel)
# RewriteCond %{HTTPS} off
# RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Remove .html extension and handle trailing slashes
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.*)$ $1.html [L]

# Custom 404 page
ErrorDocument 404 /404.html

# =====================================
# Performance & Caching
# =====================================

# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css
  AddOutputFilterByType DEFLATE application/javascript application/json
  AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/webp "access plus 1 month"
  ExpiresByType image/avif "access plus 1 month"
  ExpiresByType image/svg+xml "access plus 1 month"
  ExpiresByType image/x-icon "access plus 1 month"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"
  ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  <FilesMatch "\._next/static/">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
</IfModule>

# MIME Types
<IfModule mod_mime.c>
  AddType text/css .css
  AddType application/javascript .js
  AddType image/avif .avif
  AddType image/webp .webp
  AddType font/woff2 .woff2
</IfModule>
HTACCESSEOF

echo "📦 Creating ZIP file for upload..."
cd out && zip -r ../download/hadada-safaris-cpanel-deployment.zip . -x "*.txt" && cd ..

echo ""
echo "✅ Static export complete!"
echo ""
echo "📁 Files are in: out/"
echo "📦 ZIP package: download/hadada-safaris-cpanel-deployment.zip"
echo ""
echo "📋 To deploy to cPanel:"
echo "   1. Log into cPanel"
echo "   2. Go to File Manager"
echo "   3. Navigate to public_html"
echo "   4. Delete all existing files in public_html (if any)"
echo "   5. Upload the ZIP file"
echo "   6. Extract the ZIP file in public_html"
echo "   7. Make sure .htaccess is in the root of public_html"
echo "   8. Uncomment the HTTPS redirect in .htaccess after SSL is configured"
echo ""

# Restore original files
echo "🔄 Restoring development configuration..."
sed -i 's/output: "export"/output: "standalone"/' next.config.ts

cat > src/app/page.tsx << 'RESTOREEOF'
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/en/');
}
RESTOREEOF

if [ -f "src/proxy.ts.bak" ]; then
  mv src/proxy.ts.bak src/proxy.ts
  echo "📦 Restored proxy.ts"
fi

echo "✅ Development configuration restored!"
