#!/usr/bin/env node

/**
 * Sitemap Generator for Aggregaatkopen.com
 * Generates dynamic sitemap.xml based on routes and content
 */

const fs = require('fs');
const path = require('path');

// Configuration
const DOMAIN = 'https://aggregaatkopen.com';
const OUTPUT_FILE = path.join(__dirname, '..', 'public', 'sitemap.xml');

// Static pages with their properties
const staticPages = [
    {
        url: '/',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'daily',
        priority: '1.0'
    },
    {
        url: '/aggregaat-kopen-voor-thuis',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.9'
    },
    {
        url: '/stille-aggregaat-kopen',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.9'
    },
    {
        url: '/diesel-aggregaat-kopen',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.9'
    },
    {
        url: '/professionele-aggregaat-kopen',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.9'
    },
    {
        url: '/keuzehulp',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.8'
    }
];

// Product pages (these could be dynamically loaded from a database)
const productPages = [
    'honda-eu22i',
    'yamaha-ef2000is',
    'kipor-ig2600',
    'kubota-gl11000',
    'yanmar-ydg5500n',
    'cummins-onan-rs20',
    'pramac-p6000s',
    'hyundai-hy2000si',
    'briggs-stratton-p2200'
].map(productId => ({
    url: `/aggregaat/${productId}`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.7'
}));

// Brand pages
const brandPages = [
    'honda',
    'yamaha', 
    'kubota',
    'cummins-onan',
    'kipor',
    'pramac',
    'hyundai',
    'briggs-stratton',
    'caterpillar',
    'kohler'
].map(brand => ({
    url: `/merk/${brand}`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.6'
}));

// Category and comparison pages
const categoryPages = [
    {
        url: '/vergelijking-stille-aggregaten',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.6'
    },
    {
        url: '/vergelijking-diesel-aggregaten',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.6'
    },
    {
        url: '/blog',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.6'
    },
    {
        url: '/koopgids',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.6'
    },
    {
        url: '/veelgestelde-vragen',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.5'
    }
];

// Legal pages
const legalPages = [
    {
        url: '/privacy',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'yearly',
        priority: '0.3'
    },
    {
        url: '/disclaimer',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'yearly',
        priority: '0.3'
    },
    {
        url: '/contact',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.4'
    }
];

// Combine all pages
const allPages = [
    ...staticPages,
    ...productPages,
    ...brandPages,
    ...categoryPages,
    ...legalPages
];

// Generate XML sitemap
function generateSitemap() {
    const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`;

    const footer = `
</urlset>`;

    const urls = allPages.map(page => {
        return `
    <url>
        <loc>${DOMAIN}${page.url}</loc>
        <lastmod>${page.lastmod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`;
    }).join('');

    const sitemap = header + urls + footer;

    // Write to file
    fs.writeFileSync(OUTPUT_FILE, sitemap, 'utf8');
    
    console.log(`✅ Sitemap generated successfully!`);
    console.log(`📍 Location: ${OUTPUT_FILE}`);
    console.log(`📊 Total URLs: ${allPages.length}`);
    console.log(`🌍 Domain: ${DOMAIN}`);
    
    // Show breakdown
    console.log(`\n📋 Breakdown:`);
    console.log(`   - Static pages: ${staticPages.length}`);
    console.log(`   - Product pages: ${productPages.length}`);
    console.log(`   - Brand pages: ${brandPages.length}`);
    console.log(`   - Category pages: ${categoryPages.length}`);
    console.log(`   - Legal pages: ${legalPages.length}`);
}

// Validate URLs (optional)
function validateUrls() {
    console.log('🔍 Validating URLs...');
    
    const invalidUrls = allPages.filter(page => {
        return !page.url.startsWith('/') || 
               !page.lastmod || 
               !page.changefreq || 
               !page.priority;
    });
    
    if (invalidUrls.length > 0) {
        console.warn('⚠️  Found invalid URLs:');
        invalidUrls.forEach(page => console.warn(`   - ${page.url}`));
        return false;
    }
    
    console.log('✅ All URLs are valid');
    return true;
}

// Main execution
function main() {
    console.log('🚀 Starting sitemap generation for Aggregaatkopen.com...\n');
    
    if (!validateUrls()) {
        console.error('❌ Validation failed. Please fix URLs before generating sitemap.');
        process.exit(1);
    }
    
    try {
        generateSitemap();
        console.log('\n🎉 Sitemap generation completed successfully!');
    } catch (error) {
        console.error('❌ Error generating sitemap:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = {
    generateSitemap,
    validateUrls,
    allPages,
    DOMAIN
};