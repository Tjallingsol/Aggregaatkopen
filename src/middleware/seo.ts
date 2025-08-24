import { Context, Next } from 'hono'

export interface SEOData {
  title: string
  description: string
  keywords: string
  canonical?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  structuredData?: any
}

export const seoMiddleware = async (c: Context, next: Next) => {
  // Add common SEO headers
  c.header('X-Content-Type-Options', 'nosniff')
  c.header('X-Frame-Options', 'DENY')
  c.header('X-XSS-Protection', '1; mode=block')
  
  await next()
}

export const renderPage = (c: Context, content: string, seoData: SEOData) => {
  const { 
    title, 
    description, 
    keywords, 
    canonical,
    ogTitle = title,
    ogDescription = description,
    ogImage = '/static/images/aggregaat-kopen-logo.jpg',
    structuredData 
  } = seoData

  const currentUrl = new URL(c.req.url).pathname
  const baseUrl = 'https://aggregaatkopen.com'
  const canonicalUrl = canonical || `${baseUrl}${currentUrl}`

  return c.html(`<!DOCTYPE html>
<html lang="nl" itemscope itemtype="https://schema.org/WebSite">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Primary Meta Tags -->
    <title>${title}</title>
    <meta name="title" content="${title}">
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keywords}">
    <meta name="robots" content="index, follow">
    <meta name="language" content="Dutch">
    <meta name="author" content="Aggregaat Kopen">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${canonicalUrl}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:title" content="${ogTitle}">
    <meta property="og:description" content="${ogDescription}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:locale" content="nl_NL">
    <meta property="og:site_name" content="Aggregaat Kopen">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${canonicalUrl}">
    <meta property="twitter:title" content="${ogTitle}">
    <meta property="twitter:description" content="${ogDescription}">
    <meta property="twitter:image" content="${ogImage}">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/static/images/favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="/static/images/apple-touch-icon.png">
    
    <!-- CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#1a365d',
                        secondary: '#2d3748',
                        accent: '#3182ce'
                    }
                }
            }
        }
    </script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="/static/css/style.css" rel="stylesheet">
    
    ${structuredData ? `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>` : ''}
</head>
<body class="bg-gray-50 text-gray-800">
    ${content}
    
    <!-- Analytics placeholder -->
    <script>
        // Google Analytics or other tracking code can be added here
        console.log('Page loaded: ${currentUrl}');
    </script>
    
    <script src="/static/js/main.js"></script>
</body>
</html>`)
}