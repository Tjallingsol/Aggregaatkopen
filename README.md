# Aggregaatkopen.com

## Project Overview
- **Name**: Aggregaatkopen.com
- **Goal**: SEO-geoptimaliseerde affiliate website voor aggregaten (generatoren) in Nederland
- **Features**: Uitgebreide productgidsen, interactieve keuzehulp, vergelijkingen, en expert reviews

## URLs
- **Development**: https://3000-ig8c5hw723okbenkv4xhv-6532622b.e2b.dev
- **Production**: https://aggregaatkopen.com (pending deployment)

## Currently Completed Features

### ✅ Core Pages
- **Homepage**: Volledig SEO-geoptimaliseerd met hero section, categorieën en populaire producten
- **Aggregaat Kopen voor Thuis**: Uitgebreide gids met vermogen calculator, top aanbevelingen en FAQ
- **Stille Aggregaat Kopen**: Top 10 stilste aggregaten met geluidsniveau vergelijking
- **Diesel Aggregaat Kopen**: Professionele diesel generatoren met voor/nadelen vergelijking
- **Professionele Aggregaat Kopen**: Industriële generatoren voor zakelijk gebruik

### ✅ Interactive Features  
- **Keuzehulp**: 5-stappen interactieve quiz met gepersonaliseerde aanbevelingen
- **Product API**: REST API voor producten, categorieën en zoekfuncties
- **Responsive Design**: Volledig mobiel-vriendelijk met Tailwind CSS

### ✅ SEO Optimization
- **Meta Tags**: Unieke title, description en keywords per pagina
- **Structured Data**: Schema.org markup voor betere zoekresultaten
- **Sitemap**: Automatisch gegenereerde XML sitemap
- **Robots.txt**: Geconfigureerd voor optimale crawlability
- **Interne Links**: Strategische linkstructuur tussen gerelateerde pagina's

### ✅ Technical Features
- **Hono Framework**: Lightweight, snelle web framework
- **TypeScript**: Type-safe development
- **PM2**: Process management voor productie-ready deployment
- **API Routes**: RESTful API voor producten en keuzehulp

## Data Architecture

### Data Models
- **Product**: Naam, merk, type, vermogen, geluidsniveau, runtime, gewicht, brandstof, prijs, rating, features
- **Category**: Stille aggregaten, diesel aggregaten, professionele aggregaten
- **Quiz**: 5 vragen met multiple choice opties voor gepersonaliseerde aanbevelingen

### Storage Services
- **Static JSON**: Product data embedded in API routes
- **Local Storage**: Compare list en user preferences in browser
- **Future**: Cloudflare D1 database voor dynamic content

### Data Flow
1. User navigeert naar categorie pagina's
2. Product data wordt geladen via API routes  
3. Keuzehulp verzamelt user preferences
4. Algoritme matcht preferences met product eigenschappen
5. Gepersonaliseerde aanbevelingen met match percentage

## User Guide

### Voor Bezoekers:
1. **Browsen**: Navigeer door categorieën (Voor Thuis, Stille, Diesel, Professioneel)
2. **Keuzehulp Gebruiken**: Start de 2-minuten keuzehulp voor persoonlijke aanbevelingen  
3. **Producten Vergelijken**: Bekijk specificaties, voor/nadelen en prijzen
4. **Reviews Lezen**: Lees uitgebreide reviews met expert analysis

### Voor Ontwikkelaars:
1. **Development**: `npm run build && pm2 start ecosystem.config.cjs`
2. **API Testing**: GET `/api/products`, `/api/quiz/questions`
3. **SEO**: Sitemap beschikbaar op `/sitemap.xml`

## Deployment Status

### ✅ Development Environment
- **Status**: Active
- **Tech Stack**: Hono + TypeScript + TailwindCSS + PM2
- **Features**: All core functionality working
- **Performance**: Fast loading, responsive design

### ⏳ Production Deployment  
- **Platform**: Cloudflare Pages (pending)
- **Domain**: aggregaatkopen.com (pending)
- **CDN**: Cloudflare global network
- **SSL**: Automatic HTTPS

## Key SEO Targeting

### Primary Keywords
- aggregaat kopen
- aggregaat kopen voor thuis  
- stille aggregaat kopen
- diesel aggregaat kopen
- professionele aggregaat kopen

### Content Strategy
- **Informatief**: Uitgebreide gidsen en vergelijkingen
- **Commercieel**: Duidelijke call-to-actions naar affiliate partners
- **LLM-Vriendelijk**: Gestructureerde data voor AI assistenten
- **User-Focused**: Interactieve tools en persoonlijke aanbevelingen

## Technical Specifications

### Framework & Libraries
- **Backend**: Hono (lightweight web framework)
- **Frontend**: Vanilla JavaScript + TailwindCSS
- **Icons**: FontAwesome
- **Deployment**: Cloudflare Pages + PM2

### Performance Optimizations
- **Minified Assets**: Vite build optimization
- **CDN Libraries**: External CDN for common libraries
- **Lazy Loading**: Progressive content loading
- **SEO**: Meta tags, structured data, sitemap

### Browser Support
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari, Chrome Mobile  
- **Features**: ES6+, Fetch API, Local Storage

## Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Build project
npm run build

# Start development server  
pm2 start ecosystem.config.cjs

# View logs (non-blocking)
pm2 logs --nostream

# Stop server
pm2 stop aggregaatkopen
```

### File Structure
```
webapp/
├── src/
│   ├── index.tsx           # Main Hono application
│   ├── middleware/seo.ts   # SEO middleware & meta tags
│   └── routes/
│       ├── pages.ts        # All page routes
│       └── api.ts          # API endpoints
├── public/
│   ├── static/
│   │   ├── styles.css      # Custom CSS
│   │   └── app.js          # Frontend JavaScript
│   ├── robots.txt          # SEO robots file
│   └── sitemap.xml         # XML sitemap
└── scripts/
    └── generate-sitemap.js # Sitemap generator
```

## Next Steps & Roadmap

### 🎯 Immediate Priorities
1. **Cloudflare Deployment**: Deploy to production environment
2. **Domain Setup**: Configure aggregaatkopen.com domain
3. **Analytics**: Add Google Analytics and Search Console
4. **Affiliate Links**: Integrate real affiliate tracking

### 🚀 Feature Enhancements  
1. **More Products**: Expand product database with 50+ aggregaten
2. **Advanced Filters**: Price range, brand, capacity filtering
3. **User Reviews**: Allow visitor reviews and ratings
4. **Blog Section**: Weekly articles about generators and power solutions

### 📈 SEO Improvements
1. **Content Expansion**: Add 20+ detailed buying guides
2. **Local SEO**: Target specific Dutch regions and stores  
3. **Link Building**: Partner with relevant Dutch websites
4. **Schema Markup**: Enhanced structured data for rich snippets

## Contact & Support
- **Developer**: AI Assistant
- **Framework**: Built with Hono + Cloudflare Workers
- **Last Updated**: August 24, 2024