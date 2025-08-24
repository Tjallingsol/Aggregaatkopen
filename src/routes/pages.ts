import { Hono } from 'hono'
import { renderPage } from '../middleware/seo'
import { 
  homepageContent, 
  aggregaatKopenContent,
  stilleAggregatenContent,
  dieselAggregatenContent,
  professioneleAggregatenContent,
  koopgidsContent,
  vergelijkingenContent,
  blogContent 
} from '../content/pages'

export const pageRoutes = new Hono()

// Homepage
pageRoutes.get('/', (c) => {
  const seoData = {
    title: 'Aggregaat Kopen | Beste Stroomaggregaten 2024 | Vergelijk & Koop',
    description: 'Aggregaat kopen? ✓ Vergelijk de beste stille, diesel & professionele stroomaggregaten ✓ Koopgids & reviews ✓ Voor thuis & bedrijf ✓ Beste prijzen',
    keywords: 'aggregaat kopen, stroomaggregaat kopen, stille aggregaat, diesel aggregaat, aggregaat voor thuis, professionele aggregaat',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Aggregaat Kopen",
      "url": "https://aggregaatkopen.com",
      "description": "De beste plek om stroomaggregaten te vergelijken en kopen",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://aggregaatkopen.com/zoeken?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  }
  
  return renderPage(c, homepageContent(), seoData)
})

// Aggregaat kopen hoofdpagina
pageRoutes.get('/aggregaat-kopen', (c) => {
  const seoData = {
    title: 'Aggregaat Kopen 2024 | Complete Koopgids & Beste Merken',
    description: 'Aggregaat kopen? ✓ Complete koopgids ✓ Beste merken & modellen ✓ Prijsvergelijking ✓ Reviews & specificaties ✓ Voor elke toepassing',
    keywords: 'aggregaat kopen, stroomaggregaat kopen, beste aggregaat, aggregaat merken, aggregaat prijzen, koopgids aggregaat',
    canonical: 'https://aggregaatkopen.com/aggregaat-kopen'
  }
  
  return renderPage(c, aggregaatKopenContent(), seoData)
})

// Stille aggregaten
pageRoutes.get('/stille-aggregaat-kopen', (c) => {
  const seoData = {
    title: 'Stille Aggregaat Kopen | Beste Geluidsarme Stroomaggregaten 2024',
    description: 'Stille aggregaat kopen? ✓ Beste geluidsarme modellen ✓ Onder 60dB ✓ Voor camping & woonwijken ✓ Vergelijk prijzen & specificaties',
    keywords: 'stille aggregaat kopen, stil aggregaat kopen, geluidsarme aggregaat, stille stroomaggregaat, aggregaat geluidsniveau',
    canonical: 'https://aggregaatkopen.com/stille-aggregaat-kopen'
  }
  
  return renderPage(c, stilleAggregatentContent(), seoData)
})

// Diesel aggregaten
pageRoutes.get('/diesel-aggregaat-kopen', (c) => {
  const seoData = {
    title: 'Diesel Aggregaat Kopen | Krachtige Diesel Stroomaggregaten 2024',
    description: 'Diesel aggregaat kopen? ✓ Krachtige & zuinige diesel modellen ✓ Voor professioneel gebruik ✓ Lange looptijd ✓ Vergelijk specificaties & prijzen',
    keywords: 'diesel aggregaat kopen, aggregaat diesel kopen, diesel stroomaggregaat, professionele diesel aggregaat',
    canonical: 'https://aggregaatkopen.com/diesel-aggregaat-kopen'
  }
  
  return renderPage(c, dieselAggregatentContent(), seoData)
})

// Aggregaat voor thuis
pageRoutes.get('/aggregaat-kopen-voor-thuis', (c) => {
  const seoData = {
    title: 'Aggregaat Kopen voor Thuis | Beste Huishoudelijke Stroomaggregaten',
    description: 'Aggregaat kopen voor thuis? ✓ Beste modellen voor huishoudelijk gebruik ✓ Veilig & betrouwbaar ✓ Koopgids & tips ✓ Vergelijk prijzen',
    keywords: 'aggregaat kopen voor thuis, stroomaggregaat thuis, huishoudelijk aggregaat, aggregaat thuisgebruik',
    canonical: 'https://aggregaatkopen.com/aggregaat-kopen-voor-thuis'
  }
  
  return renderPage(c, aggregaatKopenContent(), seoData)
})

// Professionele aggregaten
pageRoutes.get('/professionele-aggregaat-kopen', (c) => {
  const seoData = {
    title: 'Professionele Aggregaat Kopen | Industriële Stroomaggregaten 2024',
    description: 'Professionele aggregaat kopen? ✓ Industriële kwaliteit ✓ Hoog vermogen ✓ Betrouwbaar & duurzaam ✓ Voor bedrijven & bouw ✓ Vergelijk modellen',
    keywords: 'professionele aggregaat kopen, industrieel aggregaat, zakelijk aggregaat, bouw aggregaat, hoog vermogen aggregaat',
    canonical: 'https://aggregaatkopen.com/professionele-aggregaat-kopen'
  }
  
  return renderPage(c, professioneleAggregatentContent(), seoData)
})

// Gamma aggregaten
pageRoutes.get('/aggregaat-kopen-gamma', (c) => {
  const seoData = {
    title: 'Aggregaat Kopen bij Gamma | Gamma Stroomaggregaten Overzicht 2024',
    description: 'Aggregaat kopen bij Gamma? ✓ Overzicht Gamma aggregaten ✓ Prijzen & modellen ✓ Alternatieven vergelijken ✓ Beste deals vinden',
    keywords: 'aggregaat kopen gamma, gamma aggregaat, gamma stroomaggregaat, bouwmarkt aggregaat',
    canonical: 'https://aggregaatkopen.com/aggregaat-kopen-gamma'
  }
  
  return renderPage(c, aggregaatKopenContent(), seoData)
})

// Koopgids
pageRoutes.get('/koopgids', (c) => {
  const seoData = {
    title: 'Aggregaat Koopgids 2024 | Hoe Kies Je het Juiste Stroomaggregaat?',
    description: 'Complete aggregaat koopgids ✓ Stap-voor-stap keuzehelper ✓ Vermogen berekenen ✓ Brandstof kiezen ✓ Beste merken ✓ Waar op letten?',
    keywords: 'aggregaat koopgids, stroomaggregaat kiezen, aggregaat keuzehelper, hoe aggregaat kiezen, aggregaat advies',
    canonical: 'https://aggregaatkopen.com/koopgids'
  }
  
  return renderPage(c, koopgidsContent(), seoData)
})

// Vergelijkingen
pageRoutes.get('/vergelijkingen', (c) => {
  const seoData = {
    title: 'Aggregaat Vergelijking | Beste Stroomaggregaten Vergeleken 2024',
    description: 'Aggregaten vergelijken ✓ Top 10 beste modellen ✓ Specificaties naast elkaar ✓ Prijs-kwaliteit vergelijking ✓ Reviews & ervaringen',
    keywords: 'aggregaat vergelijking, stroomaggregaten vergelijken, beste aggregaat 2024, aggregaat review, top aggregaten',
    canonical: 'https://aggregaatkopen.com/vergelijkingen'
  }
  
  return renderPage(c, vergelijkingenContent(), seoData)
})

// Blog
pageRoutes.get('/blog', (c) => {
  const seoData = {
    title: 'Aggregaat Blog | Tips, Nieuws & Handleidingen Stroomaggregaten',
    description: 'Aggregaat blog ✓ Laatste nieuws ✓ Gebruik tips ✓ Onderhoud handleidingen ✓ Product reviews ✓ Alles over stroomaggregaten',
    keywords: 'aggregaat blog, stroomaggregaat tips, aggregaat onderhoud, aggregaat nieuws, generator handleiding',
    canonical: 'https://aggregaatkopen.com/blog'
  }
  
  return renderPage(c, blogContent(), seoData)
})

// Individual blog posts
pageRoutes.get('/blog/:slug', (c) => {
  const slug = c.req.param('slug')
  // This would be expanded with actual blog content
  const seoData = {
    title: `${slug.replace(/-/g, ' ')} | Aggregaat Kopen Blog`,
    description: `Lees alles over ${slug.replace(/-/g, ' ')} in onze uitgebreide blog post over stroomaggregaten.`,
    keywords: `${slug.replace(/-/g, ' ')}, aggregaat, stroomaggregaat`,
    canonical: `https://aggregaatkopen.com/blog/${slug}`
  }
  
  return renderPage(c, `<div class="container mx-auto px-4 py-8"><h1>Blog post: ${slug}</h1><p>Content coming soon...</p></div>`, seoData)
})

// Sitemap
pageRoutes.get('/sitemap.xml', (c) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://aggregaatkopen.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://aggregaatkopen.com/aggregaat-kopen</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://aggregaatkopen.com/stille-aggregaat-kopen</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://aggregaatkopen.com/diesel-aggregaat-kopen</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://aggregaatkopen.com/aggregaat-kopen-voor-thuis</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://aggregaatkopen.com/professionele-aggregaat-kopen</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://aggregaatkopen.com/aggregaat-kopen-gamma</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://aggregaatkopen.com/koopgids</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://aggregaatkopen.com/vergelijkingen</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://aggregaatkopen.com/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`

  c.header('Content-Type', 'application/xml')
  return c.text(sitemap)
})

// Robots.txt
pageRoutes.get('/robots.txt', (c) => {
  const robots = `User-agent: *
Allow: /

Sitemap: https://aggregaatkopen.com/sitemap.xml

# Block admin areas if any
# Disallow: /admin/`

  c.header('Content-Type', 'text/plain')
  return c.text(robots)
})