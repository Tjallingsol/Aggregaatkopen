# 🚀 Vimexx Deployment Instructies - Aggregaatkopen.com

## 📦 Download Website Bestanden

**Download link**: https://page.gensparksite.com/project_backups/tooluse_q9SbLiHbTkWmknmgK6Xipg.tar.gz

Of gebruik de lokale bestanden in de `static-site/` directory.

## 📁 Bestanden die Geüpload Moeten Worden

```
static-site/
├── index.html          # Homepage
├── robots.txt          # SEO robots file  
├── sitemap.xml         # XML sitemap voor Google
├── .htaccess           # Apache configuratie
└── static/
    ├── app.js          # JavaScript functionaliteit
    ├── styles.css      # Custom CSS styling
    └── style.css       # Basis CSS
```

## 🔧 Vimexx Upload Stappen

### Stap 1: Inloggen op Vimexx
1. Log in op je Vimexx Control Panel
2. Ga naar **"Bestandsbeheer"** of **"File Manager"**

### Stap 2: Bestanden Uploaden
1. Navigeer naar de **`public_html`** directory (of je website directory)
2. Upload alle bestanden uit de `static-site/` directory
3. Zorg dat de mappenstructuur behouden blijft:
   ```
   public_html/
   ├── index.html
   ├── robots.txt
   ├── sitemap.xml
   ├── .htaccess
   └── static/
       ├── app.js
       ├── styles.css
       └── style.css
   ```

### Stap 3: Permissies Controleren
- Zorg dat `.htaccess` leesbaar is (644 permissies)
- Controleer dat alle bestanden juiste permissies hebben

## 🌐 DNS & Domain Setup

### Als je het domain nog niet hebt ingesteld:
1. Ga naar **DNS Beheer** in je Vimexx panel
2. Voeg A-record toe die wijst naar je Vimexx server IP
3. Wacht tot DNS propagatie voltooid is (kan 24-48 uur duren)

### SSL Certificaat:
- Vimexx biedt gratis Let's Encrypt SSL
- Activeer dit in je Control Panel onder **SSL/TLS**

## ✅ Website Testen

Na upload, test deze URLs:
- `https://yourdomain.com/` - Homepage
- `https://yourdomain.com/robots.txt` - Robots file
- `https://yourdomain.com/sitemap.xml` - XML Sitemap
- `https://yourdomain.com/static/styles.css` - CSS bestand

## 🎯 SEO Setup na Deployment

### 1. Google Search Console
1. Ga naar [Google Search Console](https://search.google.com/search-console/)
2. Voeg je domain toe
3. Upload sitemap: `https://yourdomain.com/sitemap.xml`

### 2. Google Analytics (optioneel)
1. Maak Google Analytics account aan
2. Voeg tracking code toe aan `index.html`

### 3. Bing Webmaster Tools
1. Ga naar [Bing Webmaster](https://www.bing.com/webmasters/)
2. Voeg website toe en submit sitemap

## ⚡ Prestatie Optimalisatie

De `.htaccess` file bevat al:
- ✅ GZIP compressie
- ✅ Browser caching
- ✅ Security headers
- ✅ HTTPS redirect

## 🔧 Vimexx Specifieke Instellingen

### PHP Versie:
- Hoewel dit een statische site is, zet PHP op nieuwste versie (8.1+)

### Apache Modules:
Zorg dat deze modules actief zijn (meestal standaard bij Vimexx):
- mod_rewrite
- mod_deflate  
- mod_expires
- mod_headers

## 🚨 Belangrijke Opmerkingen

### ⚠️ Beperkingen van Statische Versie:
- **Keuzehulp**: Werkt beperkt (alleen frontend)
- **API calls**: Niet functioneel zonder backend
- **Dynamische content**: Beperkt tot client-side JavaScript

### 🔄 Voor Volledige Functionaliteit:
Als je de volledige functionaliteit wilt (keuzehulp, API, etc.), heb je Node.js hosting nodig:

1. **Vimexx VPS**: Upgrade naar VPS met Node.js support
2. **Upload volledige project**: Gebruik GitHub repo
3. **PM2 installatie**: Voor process management

## 📞 Vimexx Support

Als je problemen hebt:
- **Email**: support@vimexx.nl
- **Telefoon**: 088-4640018
- **Chat**: Via Vimexx Control Panel

## 🎉 Na Successful Upload

Je website is live op `https://yourdomain.com`!

**Test checklist:**
- ✅ Homepage laadt correct
- ✅ Navigation werkt
- ✅ CSS/JS bestanden laden
- ✅ Robots.txt bereikbaar
- ✅ Sitemap.xml bereikbaar
- ✅ HTTPS werkt
- ✅ Mobile responsive

## 📈 SEO Monitoring

Na 1-2 weken:
1. Check Google Search Console voor indexatie
2. Monitor ranking voor target keywords
3. Analyseer website prestaties

---

**Succes met je Aggregaatkopen.com website! 🚀**