import { Context, Next } from 'hono'

interface SEOData {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  canonicalUrl?: string
  structuredData?: any
}

const defaultSEO: SEOData = {
  title: 'Aggregaat Kopen - Beste Aggregaten & Stroommachines | Aggregaatkopen.com',
  description: 'Ontdek de beste aggregaten voor thuis en professioneel gebruik. Vergelijk stille aggregaten, diesel aggregaten en meer. Expert koopgidsen en reviews.',
  keywords: [
    'aggregaat kopen',
    'aggregaat kopen voor thuis', 
    'stille aggregaat kopen',
    'stroom aggregaat kopen',
    'stil aggregaat kopen',
    'diesel aggregaat kopen',
    'aggregaat kopen diesel',
    'aggregaat diesel kopen',
    'professionele aggregaat kopen',
    'aggregaat kopen gamma',
    'stroommachine',
    'generator kopen',
    'noodstroom'
  ]
}

// SEO data per pagina
export const seoPages: Record<string, SEOData> = {
  '/': {
    ...defaultSEO,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Website",
      "name": "Aggregaatkopen.com",
      "description": "De beste plek om aggregaten te vergelijken en kopen",
      "url": "https://aggregaatkopen.com"
    }
  },
  '/aggregaat-kopen-voor-thuis': {
    title: 'Aggregaat Kopen voor Thuis - Complete Gids 2024 | Aggregaatkopen.com',
    description: 'Alles over aggregaat kopen voor thuis. Vergelijk stille aggregaten, capaciteit en prijzen. Expert advies voor het juiste thuisaggregaat.',
    keywords: ['aggregaat kopen voor thuis', 'thuisaggregaat', 'stille aggregaat thuis', 'noodstroom thuis'],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Aggregaat Kopen voor Thuis - Complete Gids",
      "description": "Uitgebreide gids voor het kiezen van het juiste aggregaat voor thuisgebruik"
    }
  },
  '/stille-aggregaat-kopen': {
    title: 'Stille Aggregaat Kopen - Top 10 Stil Draaiende Aggregaten 2024',
    description: 'Beste stille aggregaten vergelijken. Laag geluidsniveau, hoge kwaliteit. Expert reviews van stil aggregaat kopen voor woonwijken.',
    keywords: ['stille aggregaat kopen', 'stil aggregaat kopen', 'geluidsarme aggregaat', 'stille generator'],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": "stille-aggregaten",
      "category": "Stille Aggregaten"
    }
  },
  '/diesel-aggregaat-kopen': {
    title: 'Diesel Aggregaat Kopen - Professionele Diesel Generatoren | Vergelijk',
    description: 'Diesel aggregaten vergelijken en kopen. Betrouwbare diesel generatoren voor professioneel gebruik. Prijzen, specificaties en expert reviews.',
    keywords: ['diesel aggregaat kopen', 'aggregaat diesel kopen', 'professionele diesel aggregaat'],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Product", 
      "@id": "diesel-aggregaten",
      "category": "Diesel Aggregaten"
    }
  },
  '/professionele-aggregaat-kopen': {
    title: 'Professionele Aggregaat Kopen - Zwaar Industrieel Gebruik | Expert Gids',
    description: 'Professionele aggregaten voor industrieel gebruik. Vergelijk capaciteit, betrouwbaarheid en prijzen. Expert advies voor zakelijk gebruik.',
    keywords: ['professionele aggregaat kopen', 'industrieel aggregaat', 'zakelijke generator'],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Professionele Aggregaten"
    }
  }
}

export async function seoMiddleware(c: Context, next: Next) {
  // SEO data ophalen voor huidige route
  const path = c.req.path
  const seoData = seoPages[path] || defaultSEO
  
  // SEO data beschikbaar maken in context
  c.set('seo', seoData)
  
  await next()
}

export function generateMetaTags(seoData: SEOData): string {
  const canonicalUrl = seoData.canonicalUrl || `https://aggregaatkopen.com${seoData.canonicalUrl || ''}`
  
  return `
    <title>${seoData.title}</title>
    <meta name="description" content="${seoData.description}">
    <meta name="keywords" content="${seoData.keywords.join(', ')}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="UTF-8">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="${seoData.title}">
    <meta property="og:description" content="${seoData.description}">
    <meta property="og:image" content="${seoData.ogImage || 'https://aggregaatkopen.com/images/aggregaat-social.jpg'}">
    <meta property="og:url" content="${canonicalUrl}">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${seoData.title}">
    <meta name="twitter:description" content="${seoData.description}">
    <meta name="twitter:image" content="${seoData.ogImage || 'https://aggregaatkopen.com/images/aggregaat-social.jpg'}">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${canonicalUrl}">
    
    <!-- Structured Data -->
    ${seoData.structuredData ? `<script type="application/ld+json">${JSON.stringify(seoData.structuredData)}</script>` : ''}
  `
}