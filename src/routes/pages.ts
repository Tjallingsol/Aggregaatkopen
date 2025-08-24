import { Hono } from 'hono'
import { generateMetaTags } from '../middleware/seo'

const pages = new Hono()

// Basis HTML template
function createPageHTML(content: string, seoData: any, pageClass = '') {
  const metaTags = generateMetaTags(seoData)
  
  return `<!DOCTYPE html>
<html lang="nl">
<head>
    ${metaTags}
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="/static/styles.css" rel="stylesheet">
    <script>
        tailwind.config = {
          theme: {
            extend: {
              colors: {
                'aggregaat-blue': '#1e40af',
                'aggregaat-green': '#059669',
                'aggregaat-orange': '#ea580c'
              }
            }
          }
        }
    </script>
</head>
<body class="bg-gray-50 ${pageClass}">
    <!-- Header / Navigation -->
    <header class="bg-white shadow-lg sticky top-0 z-50">
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <h1 class="text-2xl font-bold text-aggregaat-blue">
                        <i class="fas fa-bolt mr-2"></i>
                        <a href="/">Aggregaatkopen.com</a>
                    </h1>
                </div>
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-4">
                        <a href="/" class="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">Home</a>
                        <a href="/aggregaat-kopen-voor-thuis" class="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">Voor Thuis</a>
                        <a href="/stille-aggregaat-kopen" class="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">Stille Aggregaten</a>
                        <a href="/diesel-aggregaat-kopen" class="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">Diesel</a>
                        <a href="/professionele-aggregaat-kopen" class="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">Professioneel</a>
                        <a href="/keuzehulp" class="bg-aggregaat-orange text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700">Keuzehulp</a>
                    </div>
                </div>
                <div class="md:hidden">
                    <button id="mobile-menu-btn" class="text-gray-600 hover:text-gray-900">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
        </nav>
        <!-- Mobile menu -->
        <div id="mobile-menu" class="md:hidden hidden bg-white border-t">
            <div class="px-2 pt-2 pb-3 space-y-1">
                <a href="/" class="block px-3 py-2 text-base font-medium text-gray-900">Home</a>
                <a href="/aggregaat-kopen-voor-thuis" class="block px-3 py-2 text-base font-medium text-gray-600">Voor Thuis</a>
                <a href="/stille-aggregaat-kopen" class="block px-3 py-2 text-base font-medium text-gray-600">Stille Aggregaten</a>
                <a href="/diesel-aggregaat-kopen" class="block px-3 py-2 text-base font-medium text-gray-600">Diesel</a>
                <a href="/professionele-aggregaat-kopen" class="block px-3 py-2 text-base font-medium text-gray-600">Professioneel</a>
                <a href="/keuzehulp" class="block px-3 py-2 text-base font-medium bg-aggregaat-orange text-white rounded">Keuzehulp</a>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main>
        ${content}
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white">
        <div class="max-w-7xl mx-auto py-12 px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 class="text-lg font-bold mb-4">
                        <i class="fas fa-bolt mr-2"></i>
                        Aggregaatkopen.com
                    </h3>
                    <p class="text-gray-300 text-sm">
                        Dé expert gids voor aggregaat kopen in Nederland. Vergelijk de beste aggregaten en vind het perfecte model voor jouw situatie.
                    </p>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Categorieën</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="/aggregaat-kopen-voor-thuis" class="text-gray-300 hover:text-white">Aggregaat voor Thuis</a></li>
                        <li><a href="/stille-aggregaat-kopen" class="text-gray-300 hover:text-white">Stille Aggregaten</a></li>
                        <li><a href="/diesel-aggregaat-kopen" class="text-gray-300 hover:text-white">Diesel Aggregaten</a></li>
                        <li><a href="/professionele-aggregaat-kopen" class="text-gray-300 hover:text-white">Professionele Aggregaten</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Hulp & Info</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="/keuzehulp" class="text-gray-300 hover:text-white">Aggregaat Keuzehulp</a></li>
                        <li><a href="/koopgids" class="text-gray-300 hover:text-white">Koopgids</a></li>
                        <li><a href="/blog" class="text-gray-300 hover:text-white">Blog & Tips</a></li>
                        <li><a href="/veelgestelde-vragen" class="text-gray-300 hover:text-white">Veelgestelde Vragen</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Contact</h4>
                    <ul class="space-y-2 text-sm text-gray-300">
                        <li><i class="fas fa-envelope mr-2"></i>info@aggregaatkopen.com</li>
                        <li><i class="fas fa-phone mr-2"></i>085-1234567</li>
                        <li><i class="fas fa-clock mr-2"></i>Ma-Vr 9:00-17:00</li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
                <p>&copy; 2024 Aggregaatkopen.com - Alle rechten voorbehouden | 
                <a href="/privacy" class="hover:text-white">Privacy</a> | 
                <a href="/disclaimer" class="hover:text-white">Disclaimer</a></p>
            </div>
        </div>
    </footer>

    <script src="/static/app.js"></script>
</body>
</html>`
}

// Homepage
pages.get('/', (c) => {
  const seoData = c.get('seo')
  
  const content = `
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-aggregaat-blue to-blue-700 text-white py-16">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-6">
                Aggregaat Kopen? 
                <span class="text-yellow-300">Vergelijk de Beste!</span>
            </h1>
            <p class="text-xl md:text-2xl mb-8 text-blue-100">
                Ontdek de beste aggregaten voor thuis, stille modellen, diesel aggregaten en professionele generators. 
                Expert reviews en eerlijke vergelijkingen.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/keuzehulp" class="bg-aggregaat-orange hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition">
                    <i class="fas fa-search mr-2"></i>
                    Start Keuzehulp
                </a>
                <a href="/stille-aggregaat-kopen" class="bg-white hover:bg-gray-100 text-aggregaat-blue px-8 py-4 rounded-lg text-lg font-semibold transition">
                    Stille Aggregaten
                </a>
            </div>
        </div>
    </section>

    <!-- Features / USP Section -->
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">Waarom Aggregaatkopen.com?</h2>
                <p class="text-xl text-gray-600">Dé expert gids voor het kopen van aggregaten in Nederland</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="text-center p-6">
                    <div class="bg-aggregaat-blue text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-star text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3">Expert Reviews</h3>
                    <p class="text-gray-600">Onafhankelijke reviews en tests van alle populaire aggregaat merken en modellen.</p>
                </div>
                
                <div class="text-center p-6">
                    <div class="bg-aggregaat-green text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-balance-scale text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3">Eerlijke Vergelijkingen</h3>
                    <p class="text-gray-600">Vergelijk specificaties, prijzen en prestaties van verschillende aggregaten.</p>
                </div>
                
                <div class="text-center p-6">
                    <div class="bg-aggregaat-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-lightbulb text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3">Persoonlijk Advies</h3>
                    <p class="text-gray-600">Vind het perfecte aggregaat voor jouw specifieke situatie en budget.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Categorieën Section -->
    <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">Populaire Categorieën</h2>
                <p class="text-xl text-gray-600">Kies de categorie die het beste bij jouw behoeften past</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <a href="/aggregaat-kopen-voor-thuis" class="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 text-center">
                    <div class="text-4xl text-aggregaat-blue mb-4">
                        <i class="fas fa-home"></i>
                    </div>
                    <h3 class="text-lg font-semibold mb-2">Voor Thuis</h3>
                    <p class="text-gray-600 text-sm">Aggregaten voor thuisgebruik, noodstroom en kleine projecten</p>
                </a>
                
                <a href="/stille-aggregaat-kopen" class="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 text-center">
                    <div class="text-4xl text-aggregaat-green mb-4">
                        <i class="fas fa-volume-mute"></i>
                    </div>
                    <h3 class="text-lg font-semibold mb-2">Stille Aggregaten</h3>
                    <p class="text-gray-600 text-sm">Geluidsarme aggregaten voor woonwijken en campings</p>
                </a>
                
                <a href="/diesel-aggregaat-kopen" class="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 text-center">
                    <div class="text-4xl text-aggregaat-orange mb-4">
                        <i class="fas fa-gas-pump"></i>
                    </div>
                    <h3 class="text-lg font-semibold mb-2">Diesel Aggregaten</h3>
                    <p class="text-gray-600 text-sm">Krachtige diesel generators voor zwaar gebruik</p>
                </a>
                
                <a href="/professionele-aggregaat-kopen" class="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 text-center">
                    <div class="text-4xl text-blue-600 mb-4">
                        <i class="fas fa-industry"></i>
                    </div>
                    <h3 class="text-lg font-semibold mb-2">Professioneel</h3>
                    <p class="text-gray-600 text-sm">Industriële aggregaten voor zakelijk gebruik</p>
                </a>
            </div>
        </div>
    </section>

    <!-- Top Producten Section -->
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">Populaire Aggregaten</h2>
                <p class="text-xl text-gray-600">De meest gekozen aggregaten door onze bezoekers</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-gray-50 rounded-lg p-6">
                    <div class="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full inline-block mb-3">
                        #1 BESTSELLER
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Honda EU22i Inverter</h3>
                    <p class="text-gray-600 mb-4">Ultra stil inverter aggregaat perfect voor camping en thuisgebruik. Slechts 48-57 dB geluidsniveau.</p>
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-2xl font-bold text-aggregaat-green">€1.899</span>
                        <span class="text-sm text-gray-500">2200W</span>
                    </div>
                    <a href="/aggregaat/honda-eu22i" class="bg-aggregaat-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition w-full block text-center">
                        Bekijk Details
                    </a>
                </div>
                
                <div class="bg-gray-50 rounded-lg p-6">
                    <div class="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full inline-block mb-3">
                        BESTE PRIJS-KWALITEIT
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Kipor IG2600</h3>
                    <p class="text-gray-600 mb-4">Betrouwbaar inverter aggregaat met uitstekende prijs-kwaliteitverhouding voor thuisgebruik.</p>
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-2xl font-bold text-aggregaat-green">€899</span>
                        <span class="text-sm text-gray-500">2600W</span>
                    </div>
                    <a href="/aggregaat/kipor-ig2600" class="bg-aggregaat-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition w-full block text-center">
                        Bekijk Details
                    </a>
                </div>
                
                <div class="bg-gray-50 rounded-lg p-6">
                    <div class="bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded-full inline-block mb-3">
                        PROFESSIONEEL
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Kubota GL11000</h3>
                    <p class="text-gray-600 mb-4">Krachtige diesel aggregaat voor professioneel gebruik met lange looptijd en hoge betrouwbaarheid.</p>
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-2xl font-bold text-aggregaat-green">€4.899</span>
                        <span class="text-sm text-gray-500">11000W</span>
                    </div>
                    <a href="/aggregaat/kubota-gl11000" class="bg-aggregaat-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition w-full block text-center">
                        Bekijk Details
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-gradient-to-r from-aggregaat-green to-green-700 text-white">
        <div class="max-w-4xl mx-auto px-4 text-center">
            <h2 class="text-3xl font-bold mb-4">Nog twijfels over welk aggregaat te kiezen?</h2>
            <p class="text-xl mb-8 text-green-100">
                Gebruik onze interactieve keuzehulp en vind binnen 2 minuten het perfecte aggregaat voor jouw situatie.
            </p>
            <a href="/keuzehulp" class="bg-white text-aggregaat-green px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition inline-block">
                <i class="fas fa-compass mr-2"></i>
                Start Keuzehulp Nu
            </a>
        </div>
    </section>
  `
  
  return c.html(createPageHTML(content, seoData))
})

// Aggregaat kopen voor thuis pagina
pages.get('/aggregaat-kopen-voor-thuis', (c) => {
  const seoData = c.get('seo')
  
  const content = `
    <!-- Breadcrumb -->
    <div class="bg-gray-100 py-4">
        <div class="max-w-7xl mx-auto px-4">
            <nav class="text-sm">
                <a href="/" class="text-aggregaat-blue hover:underline">Home</a>
                <span class="mx-2 text-gray-500">/</span>
                <span class="text-gray-700">Aggregaat Kopen voor Thuis</span>
            </nav>
        </div>
    </div>

    <!-- Hero -->
    <section class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4">
            <h1 class="text-4xl font-bold text-gray-900 mb-6">
                Aggregaat Kopen voor Thuis: Complete Gids 2024
            </h1>
            <p class="text-xl text-gray-600 mb-8 leading-relaxed">
                Zoek je een betrouwbaar aggregaat voor thuisgebruik? Of je nu noodstroom nodig hebt tijdens stroomstoringen, 
                of stroom wilt voor DIY-projecten in de schuur, wij helpen je het perfecte thuisaggregaat te vinden.
            </p>
        </div>
    </section>

    <!-- Inhoudsopgave -->
    <section class="py-8 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4">
            <div class="bg-white rounded-lg p-6 shadow-sm">
                <h2 class="text-2xl font-semibold mb-4">
                    <i class="fas fa-list mr-2 text-aggregaat-blue"></i>
                    Inhoudsopgave
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul class="space-y-2">
                        <li><a href="#wat-is-een-aggregaat" class="text-aggregaat-blue hover:underline">1. Wat is een Aggregaat?</a></li>
                        <li><a href="#waarom-aggregaat-thuis" class="text-aggregaat-blue hover:underline">2. Waarom een Aggregaat voor Thuis?</a></li>
                        <li><a href="#types-thuisaggregaten" class="text-aggregaat-blue hover:underline">3. Types Thuisaggregaten</a></li>
                        <li><a href="#capaciteit-berekenen" class="text-aggregaat-blue hover:underline">4. Capaciteit Berekenen</a></li>
                    </ul>
                    <ul class="space-y-2">
                        <li><a href="#brandstof-keuze" class="text-aggregaat-blue hover:underline">5. Brandstof Keuze</a></li>
                        <li><a href="#geluidsoverlast" class="text-aggregaat-blue hover:underline">6. Geluidsoverlast Voorkomen</a></li>
                        <li><a href="#beste-merken" class="text-aggregaat-blue hover:underline">7. Beste Merken</a></li>
                        <li><a href="#aankoop-tips" class="text-aggregaat-blue hover:underline">8. Aankoop Tips</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Wat is een Aggregaat -->
    <section id="wat-is-een-aggregaat" class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Wat is een Aggregaat?</h2>
            <div class="prose prose-lg max-w-none">
                <p class="text-gray-700 mb-6">
                    Een aggregaat, ook wel generator of stroommachine genoemd, is een apparaat dat mechanische energie 
                    omzet in elektrische energie. Voor thuisgebruik zijn dit meestal draagbare units die met benzine, 
                    diesel of gas werken om elektriciteit te produceren wanneer het reguliere stroomnet niet beschikbaar is.
                </p>
                
                <div class="bg-blue-50 border-l-4 border-aggregaat-blue p-6 mb-8">
                    <h3 class="text-lg font-semibold text-aggregaat-blue mb-2">
                        <i class="fas fa-lightbulb mr-2"></i>
                        Wist je dat?
                    </h3>
                    <p class="text-gray-700">
                        Het gemiddelde Nederlandse huishouden gebruikt ongeveer 3500 kWh per jaar. 
                        Voor noodstroom heb je meestal een aggregaat van 3000-5000W nodig om de belangrijkste apparaten te laten werken.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Waarom Aggregaat voor Thuis -->
    <section id="waarom-aggregaat-thuis" class="py-12 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">Waarom een Aggregaat voor Thuis Kopen?</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 class="text-xl font-semibold mb-4 text-aggregaat-green">
                        <i class="fas fa-shield-alt mr-2"></i>
                        Noodstroom Voorziening
                    </h3>
                    <ul class="space-y-2 text-gray-700">
                        <li><i class="fas fa-check text-aggregaat-green mr-2"></i>Koelkast en vriezer blijven werken</li>
                        <li><i class="fas fa-check text-aggregaat-green mr-2"></i>Verwarming en cv-ketel operationeel</li>
                        <li><i class="fas fa-check text-aggregaat-green mr-2"></i>Internet en communicatie beschikbaar</li>
                        <li><i class="fas fa-check text-aggregaat-green mr-2"></i>Verlichting in hele huis</li>
                    </ul>
                </div>
                
                <div>
                    <h3 class="text-xl font-semibold mb-4 text-aggregaat-orange">
                        <i class="fas fa-tools mr-2"></i>
                        DIY en Hobby Projecten  
                    </h3>
                    <ul class="space-y-2 text-gray-700">
                        <li><i class="fas fa-check text-aggregaat-orange mr-2"></i>Stroom in schuur of garage</li>
                        <li><i class="fas fa-check text-aggregaat-orange mr-2"></i>Elektrisch gereedschap gebruiken</li>
                        <li><i class="fas fa-check text-aggregaat-orange mr-2"></i>Tuinprojecten en buitenwerk</li>
                        <li><i class="fas fa-check text-aggregaat-orange mr-2"></i>Mobiele werkplek creëren</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Types Aggregaten -->
    <section id="types-thuisaggregaten" class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">Types Aggregaten voor Thuisgebruik</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="border rounded-lg p-6 hover:shadow-lg transition">
                    <div class="text-4xl text-aggregaat-blue mb-4 text-center">
                        <i class="fas fa-volume-down"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3 text-center">Inverter Aggregaten</h3>
                    <p class="text-gray-600 mb-4">
                        Perfect voor gevoelige elektronische apparaten. Zeer stil en brandstofzuinig.
                    </p>
                    <ul class="text-sm space-y-1 text-gray-700">
                        <li><i class="fas fa-plus text-green-500 mr-2"></i>Zeer laag geluidsniveau</li>
                        <li><i class="fas fa-plus text-green-500 mr-2"></i>Zuivere sinusgolf</li>
                        <li><i class="fas fa-plus text-green-500 mr-2"></i>Brandstofzuinig</li>
                        <li><i class="fas fa-minus text-red-500 mr-2"></i>Hogere aanschafprijs</li>
                    </ul>
                </div>
                
                <div class="border rounded-lg p-6 hover:shadow-lg transition">
                    <div class="text-4xl text-aggregaat-green mb-4 text-center">
                        <i class="fas fa-bolt"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3 text-center">Conventionele Aggregaten</h3>
                    <p class="text-gray-600 mb-4">
                        Betrouwbare workhorses voor zwaarder werk en langdurig gebruik.
                    </p>
                    <ul class="text-sm space-y-1 text-gray-700">
                        <li><i class="fas fa-plus text-green-500 mr-2"></i>Lagere aanschafkosten</li>
                        <li><i class="fas fa-plus text-green-500 mr-2"></i>Robuust en duurzaam</li>
                        <li><i class="fas fa-plus text-green-500 mr-2"></i>Hoge capaciteit mogelijk</li>
                        <li><i class="fas fa-minus text-red-500 mr-2"></i>Meer geluid</li>
                    </ul>
                </div>
                
                <div class="border rounded-lg p-6 hover:shadow-lg transition">
                    <div class="text-4xl text-aggregaat-orange mb-4 text-center">
                        <i class="fas fa-home"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3 text-center">Standby Generatoren</h3>
                    <p class="text-gray-600 mb-4">
                        Permanent geïnstalleerde systemen die automatisch inschakelen.
                    </p>
                    <ul class="text-sm space-y-1 text-gray-700">
                        <li><i class="fas fa-plus text-green-500 mr-2"></i>Volledig automatisch</li>
                        <li><i class="fas fa-plus text-green-500 mr-2"></i>Hele huis voorzien</li>
                        <li><i class="fas fa-plus text-green-500 mr-2"></i>Altijd gereed</li>
                        <li><i class="fas fa-minus text-red-500 mr-2"></i>Hoge investering</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Capaciteit Calculator -->
    <section id="capaciteit-berekenen" class="py-12 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">Hoeveel Vermogen Heb Je Nodig?</h2>
            
            <div class="bg-white rounded-lg shadow-md p-8">
                <h3 class="text-xl font-semibold mb-6">Bereken je Benodigde Capaciteit</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h4 class="font-semibold mb-4">Veelgebruikte Apparaten (Watt)</h4>
                        <div class="space-y-3">
                            <div class="flex justify-between py-2 border-b">
                                <span>Koelkast</span>
                                <span class="font-medium">150-400W</span>
                            </div>
                            <div class="flex justify-between py-2 border-b">
                                <span>Vriezer</span>
                                <span class="font-medium">100-300W</span>
                            </div>
                            <div class="flex justify-between py-2 border-b">
                                <span>CV-ketel</span>
                                <span class="font-medium">100-200W</span>
                            </div>
                            <div class="flex justify-between py-2 border-b">
                                <span>LED verlichting (10 lampen)</span>
                                <span class="font-medium">100W</span>
                            </div>
                            <div class="flex justify-between py-2 border-b">
                                <span>TV + decoder</span>
                                <span class="font-medium">200W</span>
                            </div>
                            <div class="flex justify-between py-2 border-b">
                                <span>Laptop + internet</span>
                                <span class="font-medium">100W</span>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold mb-4">Aanbevolen Capaciteit</h4>
                        <div class="space-y-4">
                            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                                <h5 class="font-semibold text-green-800 mb-2">Basis Noodstroom (2000-3000W)</h5>
                                <p class="text-sm text-green-700">
                                    Koelkast, enkele lampen, opladers, kleine apparaten
                                </p>
                            </div>
                            
                            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h5 class="font-semibold text-blue-800 mb-2">Comfort Noodstrom (3000-5000W)</h5>
                                <p class="text-sm text-blue-700">
                                    Basis + verwarming, TV, computer, meer verlichting
                                </p>
                            </div>
                            
                            <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                <h5 class="font-semibold text-orange-800 mb-2">Volledig Huis (5000W+)</h5>
                                <p class="text-sm text-orange-700">
                                    Alle essentiële apparaten gelijktijdig gebruiken
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Top Aanbevelingen -->
    <section class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">Top 5 Aggregaten voor Thuis</h2>
            
            <div class="space-y-6">
                <div class="bg-gray-50 rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div class="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full">
                        #1 BESTSELLER
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl font-semibold mb-2">Honda EU22i Inverter Generator</h3>
                        <p class="text-gray-600 mb-2">
                            Ultra-stil inverter aggregaat perfect voor thuisgebruik. Ideaal voor gevoelige elektronische apparaten.
                        </p>
                        <div class="flex flex-wrap gap-4 text-sm">
                            <span class="bg-green-100 text-green-800 px-2 py-1 rounded">2200W</span>
                            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded">48-57 dB</span>
                            <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded">8u runtime</span>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-2xl font-bold text-aggregaat-green mb-2">€1.899</div>
                        <a href="/aggregaat/honda-eu22i" class="bg-aggregaat-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                            Bekijk Details
                        </a>
                    </div>
                </div>

                <div class="bg-gray-50 rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div class="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
                        #2 PRIJS-KWALITEIT
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl font-semibold mb-2">Kipor IG2600 Inverter</h3>
                        <p class="text-gray-600 mb-2">
                            Uitstekende prijs-kwaliteitverhouding met inverter technologie voor een betaalbare prijs.
                        </p>
                        <div class="flex flex-wrap gap-4 text-sm">
                            <span class="bg-green-100 text-green-800 px-2 py-1 rounded">2600W</span>
                            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded">58 dB</span>
                            <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded">10u runtime</span>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-2xl font-bold text-aggregaat-green mb-2">€899</div>
                        <a href="/aggregaat/kipor-ig2600" class="bg-aggregaat-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                            Bekijk Details
                        </a>
                    </div>
                </div>

                <div class="bg-gray-50 rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div class="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                        #3 STIL & KRACHTIG
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl font-semibold mb-2">Yamaha EF3000iSE</h3>
                        <p class="text-gray-600 mb-2">
                            Professionele kwaliteit inverter met elektrische start en uitstekende geluidsisolatie.
                        </p>
                        <div class="flex flex-wrap gap-4 text-sm">
                            <span class="bg-green-100 text-green-800 px-2 py-1 rounded">3000W</span>
                            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded">57 dB</span>
                            <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded">20u runtime</span>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-2xl font-bold text-aggregaat-green mb-2">€2.499</div>
                        <a href="/aggregaat/yamaha-ef3000ise" class="bg-aggregaat-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                            Bekijk Details
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="text-center mt-8">
                <a href="/stille-aggregaat-kopen" class="bg-aggregaat-green text-white px-8 py-3 rounded-lg hover:bg-green-700 transition">
                    Bekijk Alle Stille Aggregaten
                </a>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-12 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">Veelgestelde Vragen</h2>
            
            <div class="space-y-4">
                <div class="bg-white rounded-lg shadow-sm">
                    <button class="w-full text-left p-6 focus:outline-none faq-button">
                        <div class="flex justify-between items-center">
                            <h3 class="text-lg font-semibold">Hoeveel kost het om een aggregaat te laten draaien?</h3>
                            <i class="fas fa-plus text-aggregaat-blue faq-icon"></i>
                        </div>
                    </button>
                    <div class="px-6 pb-6 faq-content hidden">
                        <p class="text-gray-600">
                            De kosten zijn afhankelijk van brandstofverbruik en brandstofprijzen. Een gemiddeld 3000W aggregaat 
                            verbruikt ongeveer 1-1.5 liter benzine per uur. Bij een benzineprijs van €1.70 per liter kost dit 
                            €1.70-2.55 per uur gebruik.
                        </p>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow-sm">
                    <button class="w-full text-left p-6 focus:outline-none faq-button">
                        <div class="flex justify-between items-center">
                            <h3 class="text-lg font-semibold">Mag ik een aggregaat in een woonwijk gebruiken?</h3>
                            <i class="fas fa-plus text-aggregaat-blue faq-icon"></i>
                        </div>
                    </button>
                    <div class="px-6 pb-6 faq-content hidden">
                        <p class="text-gray-600">
                            Ja, maar houd rekening met geluidsnormen. Overdag (7:00-19:00) mag het geluidsniveau maximaal 50 dB zijn, 
                            's avonds en nachts 40 dB. Kies daarom bij voorkeur een stil inverter aggregaat en informeer je buren.
                        </p>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow-sm">
                    <button class="w-full text-left p-6 focus:outline-none faq-button">
                        <div class="flex justify-between items-center">
                            <h3 class="text-lg font-semibold">Kan ik mijn aggregaat binnen gebruiken?</h3>
                            <i class="fas fa-plus text-aggregaat-blue faq-icon"></i>
                        </div>
                    </button>
                    <div class="px-6 pb-6 faq-content hidden">
                        <p class="text-gray-600">
                            Nee, gebruik een aggregaat nooit binnen of in gesloten ruimtes! Aggregaten produceren giftige 
                            uitlaatgassen (koolmonoxide) die dodelijk kunnen zijn. Plaats het aggregaat altijd buiten, 
                            minimaal 3 meter van ramen en deuren.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-gradient-to-r from-aggregaat-blue to-blue-700 text-white">
        <div class="max-w-4xl mx-auto px-4 text-center">
            <h2 class="text-3xl font-bold mb-4">Klaar om jouw Perfect Thuisaggregaat te Vinden?</h2>
            <p class="text-xl mb-8 text-blue-100">
                Gebruik onze aggregaat keuzehulp en vind binnen 2 minuten het ideale aggregaat voor jouw thuissituatie.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/keuzehulp" class="bg-aggregaat-orange hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition">
                    <i class="fas fa-search mr-2"></i>
                    Start Keuzehulp
                </a>
                <a href="/stille-aggregaat-kopen" class="bg-white hover:bg-gray-100 text-aggregaat-blue px-8 py-4 rounded-lg text-lg font-semibold transition">
                    Bekijk Stille Aggregaten
                </a>
            </div>
        </div>
    </section>
  `
  
  return c.html(createPageHTML(content, seoData))
})

// Stille aggregaat kopen pagina
pages.get('/stille-aggregaat-kopen', (c) => {
  const seoData = c.get('seo')
  
  const content = `
    <!-- Breadcrumb -->
    <div class="bg-gray-100 py-4">
        <div class="max-w-7xl mx-auto px-4">
            <nav class="text-sm">
                <a href="/" class="text-aggregaat-blue hover:underline">Home</a>
                <span class="mx-2 text-gray-500">/</span>
                <span class="text-gray-700">Stille Aggregaat Kopen</span>
            </nav>
        </div>
    </div>

    <!-- Hero -->
    <section class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4">
            <h1 class="text-4xl font-bold text-gray-900 mb-6">
                Stille Aggregaat Kopen: De Beste Geluidsarme Aggregaten 2024
            </h1>
            <p class="text-xl text-gray-600 mb-8 leading-relaxed">
                Zoek je een stil aggregaat dat de buren niet stoort? Ontdek onze selectie van de stilste aggregaten 
                met het laagste geluidsniveau. Perfect voor woonwijken, campings en situaties waar geluid een probleem is.
            </p>
            
            <div class="bg-green-50 border-l-4 border-aggregaat-green p-6 mb-8">
                <h3 class="text-lg font-semibold text-aggregaat-green mb-2">
                    <i class="fas fa-volume-mute mr-2"></i>
                    Stil Aggregaat Voordelen
                </h3>
                <ul class="text-gray-700 space-y-1">
                    <li><i class="fas fa-check text-aggregaat-green mr-2"></i>Geluidsniveau vanaf 48 dB (zo stil als een bibliotheek)</li>
                    <li><i class="fas fa-check text-aggregaat-green mr-2"></i>Geen problemen met buren of camping regels</li>
                    <li><i class="fas fa-check text-aggregaat-green mr-2"></i>Ook 's nachts veilig te gebruiken</li>
                    <li><i class="fas fa-check text-aggregaat-green mr-2"></i>Zuivere stroom voor gevoelige apparaten</li>
                </ul>
            </div>
        </div>
    </section>

    <!-- Geluidsniveau Uitleg -->
    <section class="py-12 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">Geluidsniveaus Uitgelegd</h2>
            
            <div class="bg-white rounded-lg shadow-md p-8">
                <p class="text-gray-600 mb-6">
                    Het geluidsniveau wordt gemeten in decibel (dB). Hoe lager het getal, hoe stiller het aggregaat. 
                    Hier zie je wat verschillende geluidsniveaus betekenen:
                </p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="space-y-4">
                        <div class="flex items-center gap-4 p-4 border rounded-lg">
                            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <span class="text-green-800 font-bold">48-52</span>
                            </div>
                            <div>
                                <h4 class="font-semibold text-green-800">Ultra Stil</h4>
                                <p class="text-sm text-gray-600">Zo stil als een bibliotheek of rustige slaapkamer</p>
                            </div>
                        </div>
                        
                        <div class="flex items-center gap-4 p-4 border rounded-lg">
                            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                <span class="text-blue-800 font-bold">53-57</span>
                            </div>
                            <div>
                                <h4 class="font-semibold text-blue-800">Stil</h4>
                                <p class="text-sm text-gray-600">Vergelijkbaar met een rustig gesprek</p>
                            </div>
                        </div>
                        
                        <div class="flex items-center gap-4 p-4 border rounded-lg">
                            <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                                <span class="text-yellow-800 font-bold">58-62</span>
                            </div>
                            <div>
                                <h4 class="font-semibold text-yellow-800">Acceptabel</h4>
                                <p class="text-sm text-gray-600">Overdag acceptabel in woonwijken</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="space-y-4">
                        <div class="flex items-center gap-4 p-4 border rounded-lg">
                            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                                <span class="text-orange-800 font-bold">63-67</span>
                            </div>
                            <div>
                                <h4 class="font-semibold text-orange-800">Luid</h4>
                                <p class="text-sm text-gray-600">Hoorbaar voor omgeving, beperkt gebruik</p>
                            </div>
                        </div>
                        
                        <div class="flex items-center gap-4 p-4 border rounded-lg">
                            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                <span class="text-red-800 font-bold">68+</span>
                            </div>
                            <div>
                                <h4 class="font-semibold text-red-800">Zeer Luid</h4>
                                <p class="text-sm text-gray-600">Stoort omgeving, alleen voor professioneel gebruik</p>
                            </div>
                        </div>
                        
                        <div class="bg-blue-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-aggregaat-blue mb-2">Wettelijke Normen</h4>
                            <ul class="text-sm text-gray-700 space-y-1">
                                <li>• Overdag (7-19u): max 50 dB</li>
                                <li>• Avond (19-23u): max 45 dB</li>
                                <li>• Nacht (23-7u): max 40 dB</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Top 10 Stille Aggregaten -->
    <section class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">Top 10 Stilste Aggregaten 2024</h2>
            
            <div class="space-y-6">
                <!-- #1 Honda EU22i -->
                <div class="bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-lg p-6">
                    <div class="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                        <div class="bg-yellow-400 text-yellow-900 text-sm font-bold px-4 py-2 rounded-full">
                            #1 STILSTE
                        </div>
                        <div class="flex-1">
                            <h3 class="text-2xl font-bold mb-2">Honda EU22i Inverter Generator</h3>
                            <p class="text-gray-700 mb-3">
                                De absolute winnaar op gebied van stilte. Met slechts 48-57 dB is dit het stilste aggregaat 
                                in zijn klasse. Perfect voor campings en woonwijken.
                            </p>
                            <div class="flex flex-wrap gap-3">
                                <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                    <i class="fas fa-volume-mute mr-1"></i>48-57 dB
                                </span>
                                <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                    <i class="fas fa-bolt mr-1"></i>2200W
                                </span>
                                <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                                    <i class="fas fa-clock mr-1"></i>8.1u runtime
                                </span>
                                <span class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                                    <i class="fas fa-weight mr-1"></i>21.1 kg
                                </span>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-3xl font-bold text-aggregaat-green mb-2">€1.899</div>
                            <div class="space-y-2">
                                <a href="/aggregaat/honda-eu22i" class="block bg-aggregaat-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition text-center">
                                    Volledige Review
                                </a>
                                <a href="#" class="block bg-aggregaat-green text-white px-6 py-2 rounded-lg hover:bg-green-700 transition text-center">
                                    <i class="fas fa-external-link-alt mr-1"></i>Beste Prijs
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- #2 Yamaha EF2000iS -->
                <div class="bg-gray-50 rounded-lg p-6">
                    <div class="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                        <div class="bg-blue-100 text-blue-800 text-sm font-bold px-4 py-2 rounded-full">
                            #2 PREMIUM STIL
                        </div>
                        <div class="flex-1">
                            <h3 class="text-xl font-bold mb-2">Yamaha EF2000iS</h3>
                            <p class="text-gray-700 mb-3">
                                Yamaha's stilste model met uitstekende bouwkwaliteit. Zeer betrouwbaar en perfect voor gevoelige apparaten.
                            </p>
                            <div class="flex flex-wrap gap-3">
                                <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">51-61 dB</span>
                                <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">2000W</span>
                                <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">10.5u runtime</span>
                                <span class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">19.5 kg</span>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-2xl font-bold text-aggregaat-green mb-2">€1.649</div>
                            <div class="space-y-2">
                                <a href="/aggregaat/yamaha-ef2000is" class="block bg-aggregaat-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition text-center">
                                    Review Lezen
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- #3 Kipor IG2600 -->
                <div class="bg-gray-50 rounded-lg p-6">
                    <div class="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                        <div class="bg-green-100 text-green-800 text-sm font-bold px-4 py-2 rounded-full">
                            #3 BESTE PRIJS
                        </div>
                        <div class="flex-1">
                            <h3 class="text-xl font-bold mb-2">Kipor IG2600 Inverter</h3>
                            <p class="text-gray-700 mb-3">
                                Uitstekende prijs-kwaliteitverhouding. Stil genoeg voor campings en veel vermogen voor de prijs.
                            </p>
                            <div class="flex flex-wrap gap-3">
                                <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">58 dB</span>
                                <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">2600W</span>
                                <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">10u runtime</span>
                                <span class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">22 kg</span>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-2xl font-bold text-aggregaat-green mb-2">€899</div>
                            <div class="space-y-2">
                                <a href="/aggregaat/kipor-ig2600" class="block bg-aggregaat-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition text-center">
                                    Review Lezen
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Meer producten... -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-gray-50 rounded-lg p-6">
                        <div class="flex justify-between items-start mb-3">
                            <h3 class="text-lg font-semibold">#4 Hyundai HY2000Si</h3>
                            <span class="text-lg font-bold text-aggregaat-green">€749</span>
                        </div>
                        <p class="text-gray-600 text-sm mb-3">Budget-vriendelijke inverter met acceptabel geluidsniveau</p>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Geluidsniveau:</span>
                                <span class="font-medium">59 dB</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Vermogen:</span>
                                <span class="font-medium">2000W</span>
                            </div>
                        </div>
                        <a href="/aggregaat/hyundai-hy2000si" class="block bg-aggregaat-blue text-white px-4 py-2 rounded text-center mt-4 hover:bg-blue-700 transition">
                            Bekijk Details
                        </a>
                    </div>

                    <div class="bg-gray-50 rounded-lg p-6">
                        <div class="flex justify-between items-start mb-3">
                            <h3 class="text-lg font-semibold">#5 Briggs & Stratton P2200</h3>
                            <span class="text-lg font-bold text-aggregaat-green">€999</span>
                        </div>
                        <p class="text-gray-600 text-sm mb-3">Amerikaans merk met goede garantie en service</p>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Geluidsniveau:</span>
                                <span class="font-medium">59 dB</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Vermogen:</span>
                                <span class="font-medium">2200W</span>
                            </div>
                        </div>
                        <a href="/aggregaat/briggs-stratton-p2200" class="block bg-aggregaat-blue text-white px-4 py-2 rounded text-center mt-4 hover:bg-blue-700 transition">
                            Bekijk Details
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="text-center mt-8">
                <a href="/vergelijking-stille-aggregaten" class="bg-aggregaat-green text-white px-8 py-3 rounded-lg hover:bg-green-700 transition">
                    Vergelijk Alle Stille Aggregaten
                </a>
            </div>
        </div>
    </section>

    <!-- Tips voor Stil Gebruik -->
    <section class="py-12 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">Tips om je Aggregaat Nog Stiller te Maken</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="bg-white rounded-lg p-6 shadow-sm">
                    <h3 class="text-xl font-semibold mb-4 text-aggregaat-blue">
                        <i class="fas fa-map-marker-alt mr-2"></i>
                        Juiste Plaatsing
                    </h3>
                    <ul class="space-y-3 text-gray-700">
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Plaats op zachte ondergrond (gras in plaats van beton)</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Minimaal 3 meter van ramen en deuren</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Uitlaat weg van bewoning richten</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Gebruik trillingsdempende matjes</li>
                    </ul>
                </div>

                <div class="bg-white rounded-lg p-6 shadow-sm">
                    <h3 class="text-xl font-semibold mb-4 text-aggregaat-green">
                        <i class="fas fa-tools mr-2"></i>
                        Extra Geluidsisolatie
                    </h3>
                    <ul class="space-y-3 text-gray-700">
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Bouw een geluidsscherm rond het aggregaat</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Gebruik geluidsabsorberende materialen</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Zorg voor voldoende ventilatie</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Overweeg een geluidsdempende kast</li>
                    </ul>
                </div>

                <div class="bg-white rounded-lg p-6 shadow-sm">
                    <h3 class="text-xl font-semibold mb-4 text-aggregaat-orange">
                        <i class="fas fa-clock mr-2"></i>
                        Slim Gebruik
                    </h3>
                    <ul class="space-y-3 text-gray-700">
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Gebruik ECO-modus voor minder geluid</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Vermijd gebruik tijdens rustige uren</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Belasting geleidelijk opbouwen</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Regelmatig onderhoud voor optimale prestaties</li>
                    </ul>
                </div>

                <div class="bg-white rounded-lg p-6 shadow-sm">
                    <h3 class="text-xl font-semibold mb-4 text-purple-600">
                        <i class="fas fa-users mr-2"></i>
                        Sociale Overwegingen
                    </h3>
                    <ul class="space-y-3 text-gray-700">
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Informeer je buren vooraf</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Respecteer campingregels</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Kies voor de stillere tijden</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Overweeg alternatieven zoals powerbanks</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Vergelijkingstabel -->
    <section class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">Snelle Vergelijking Top 5 Stilste Aggregaten</h2>
            
            <div class="overflow-x-auto">
                <table class="w-full bg-white border border-gray-200 rounded-lg shadow">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Geluid (dB)</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vermogen (W)</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Runtime (u)</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gewicht (kg)</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prijs</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr class="bg-yellow-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">Honda EU22i</div>
                                <div class="text-sm text-gray-500">Inverter</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    48-57
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2200</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">8.1</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">21.1</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">€1.899</td>
                        </tr>
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">Yamaha EF2000iS</div>
                                <div class="text-sm text-gray-500">Inverter</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    51-61
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2000</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">10.5</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">19.5</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">€1.649</td>
                        </tr>
                        <tr class="bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">Kipor IG2600</div>
                                <div class="text-sm text-gray-500">Inverter</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                    58
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2600</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">10.0</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">22.0</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">€899</td>
                        </tr>
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">Hyundai HY2000Si</div>
                                <div class="text-sm text-gray-500">Inverter</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                    59
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2000</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">8.0</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">23.5</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">€749</td>
                        </tr>
                        <tr class="bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">Briggs P2200</div>
                                <div class="text-sm text-gray-500">Inverter</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                    59
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2200</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">9.5</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">25.0</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">€999</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
  `
  
  return c.html(createPageHTML(content, seoData))
})

// Diesel aggregaat kopen pagina
pages.get('/diesel-aggregaat-kopen', (c) => {
  const seoData = c.get('seo')
  
  const content = `
    <!-- Breadcrumb -->
    <div class="bg-gray-100 py-4">
        <div class="max-w-7xl mx-auto px-4">
            <nav class="text-sm">
                <a href="/" class="text-aggregaat-blue hover:underline">Home</a>
                <span class="mx-2 text-gray-500">/</span>
                <span class="text-gray-700">Diesel Aggregaat Kopen</span>
            </nav>
        </div>
    </div>

    <!-- Hero -->
    <section class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4">
            <h1 class="text-4xl font-bold text-gray-900 mb-6">
                Diesel Aggregaat Kopen: Krachtige Diesel Generatoren voor Professioneel Gebruik
            </h1>
            <p class="text-xl text-gray-600 mb-8 leading-relaxed">
                Zoek je een betrouwbare diesel aggregaat voor zwaar gebruik? Diesel generatoren bieden uitstekende 
                prestaties voor langdurig en intensief gebruik. Ontdek onze selectie van professionele diesel aggregaten.
            </p>
            
            <div class="bg-orange-50 border-l-4 border-aggregaat-orange p-6 mb-8">
                <h3 class="text-lg font-semibold text-aggregaat-orange mb-2">
                    <i class="fas fa-gas-pump mr-2"></i>
                    Waarom Kiezen voor Diesel?
                </h3>
                <ul class="text-gray-700 space-y-1">
                    <li><i class="fas fa-check text-aggregaat-orange mr-2"></i>Brandstofzuiniger dan benzine aggregaten</li>
                    <li><i class="fas fa-check text-aggregaat-orange mr-2"></i>Langere levensduur en betrouwbaarheid</li>
                    <li><i class="fas fa-check text-aggregaat-orange mr-2"></i>Geschikt voor continue gebruik</li>
                    <li><i class="fas fa-check text-aggregaat-orange mr-2"></i>Lagere onderhoudskosten op lange termijn</li>
                </ul>
            </div>
        </div>
    </section>

    <!-- Diesel vs Benzine Vergelijking -->
    <section class="py-12 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">Diesel vs Benzine Aggregaten</h2>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="bg-white rounded-lg shadow-md p-8">
                    <div class="text-center mb-6">
                        <div class="w-16 h-16 bg-aggregaat-orange text-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-gas-pump text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-aggregaat-orange">Diesel Aggregaten</h3>
                    </div>
                    
                    <div class="space-y-4">
                        <div class="flex items-start gap-3">
                            <i class="fas fa-plus-circle text-green-500 mt-1"></i>
                            <div>
                                <h4 class="font-semibold">Brandstofzuinig</h4>
                                <p class="text-sm text-gray-600">30-50% minder brandstofverbruik dan benzine</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start gap-3">
                            <i class="fas fa-plus-circle text-green-500 mt-1"></i>
                            <div>
                                <h4 class="font-semibold">Duurzaam</h4>
                                <p class="text-sm text-gray-600">Dieselmotoren gaan langer mee</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start gap-3">
                            <i class="fas fa-plus-circle text-green-500 mt-1"></i>
                            <div>
                                <h4 class="font-semibold">Hoog Koppel</h4>
                                <p class="text-sm text-gray-600">Beter voor zware belastingen</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start gap-3">
                            <i class="fas fa-minus-circle text-red-500 mt-1"></i>
                            <div>
                                <h4 class="font-semibold">Hogere Aanschafprijs</h4>
                                <p class="text-sm text-gray-600">Duurdere initiële investering</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start gap-3">
                            <i class="fas fa-minus-circle text-red-500 mt-1"></i>
                            <div>
                                <h4 class="font-semibold">Meer Geluid</h4>
                                <p class="text-sm text-gray-600">Meestal luider dan benzine</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-md p-8">
                    <div class="text-center mb-6">
                        <div class="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-tint text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-blue-500">Benzine Aggregaten</h3>
                    </div>
                    
                    <div class="space-y-4">
                        <div class="flex items-start gap-3">
                            <i class="fas fa-plus-circle text-green-500 mt-1"></i>
                            <div>
                                <h4 class="font-semibold">Lagere Kosten</h4>
                                <p class="text-sm text-gray-600">Goedkoper om aan te schaffen</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start gap-3">
                            <i class="fas fa-plus-circle text-green-500 mt-1"></i>
                            <div>
                                <h4 class="font-semibold">Stiller</h4>
                                <p class="text-sm text-gray-600">Vooral inverter modellen</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start gap-3">
                            <i class="fas fa-plus-circle text-green-500 mt-1"></i>
                            <div>
                                <h4 class="font-semibold">Lichter Gewicht</h4>
                                <p class="text-sm text-gray-600">Gemakkelijker te verplaatsen</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start gap-3">
                            <i class="fas fa-minus-circle text-red-500 mt-1"></i>
                            <div>
                                <h4 class="font-semibold">Hoger Verbruik</h4>
                                <p class="text-sm text-gray-600">Meer brandstof per uur</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start gap-3">
                            <i class="fas fa-minus-circle text-red-500 mt-1"></i>
                            <div>
                                <h4 class="font-semibold">Korte Levensduur</h4>
                                <p class="text-sm text-gray-600">Minder uren gebruik mogelijk</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Top Diesel Aggregaten -->
    <section class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">Beste Diesel Aggregaten 2024</h2>
            
            <div class="space-y-6">
                <!-- Kubota GL11000 -->
                <div class="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 rounded-lg p-6">
                    <div class="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                        <div class="bg-orange-400 text-orange-900 text-sm font-bold px-4 py-2 rounded-full">
                            #1 PROFESSIONEEL
                        </div>
                        <div class="flex-1">
                            <h3 class="text-2xl font-bold mb-2">Kubota GL11000 Diesel Generator</h3>
                            <p class="text-gray-700 mb-3">
                                Top-kwaliteit diesel aggregaat met Kubota motor. Uitstekende betrouwbaarheid voor 
                                professioneel en industrieel gebruik. Lange looptijd en lage onderhoudskosten.
                            </p>
                            <div class="flex flex-wrap gap-3">
                                <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                    <i class="fas fa-bolt mr-1"></i>11000W
                                </span>
                                <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                    <i class="fas fa-gas-pump mr-1"></i>Diesel
                                </span>
                                <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                                    <i class="fas fa-clock mr-1"></i>12u runtime
                                </span>
                                <span class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                                    <i class="fas fa-volume-up mr-1"></i>69 dB
                                </span>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-3xl font-bold text-aggregaat-green mb-2">€4.899</div>
                            <div class="space-y-2">
                                <a href="/aggregaat/kubota-gl11000" class="block bg-aggregaat-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition text-center">
                                    Volledige Review
                                </a>
                                <a href="#" class="block bg-aggregaat-green text-white px-6 py-2 rounded-lg hover:bg-green-700 transition text-center">
                                    <i class="fas fa-external-link-alt mr-1"></i>Beste Prijs
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Yanmar YDG5500N -->
                <div class="bg-gray-50 rounded-lg p-6">
                    <div class="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                        <div class="bg-blue-100 text-blue-800 text-sm font-bold px-4 py-2 rounded-full">
                            #2 BETROUWBAAR
                        </div>
                        <div class="flex-1">
                            <h3 class="text-xl font-bold mb-2">Yanmar YDG5500N Diesel</h3>
                            <p class="text-gray-700 mb-3">
                                Yanmar diesel motor bekend om betrouwbaarheid. Perfect voor bouw en professionele toepassingen.
                            </p>
                            <div class="flex flex-wrap gap-3">
                                <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">5500W</span>
                                <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Diesel</span>
                                <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">10u runtime</span>
                                <span class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">68 dB</span>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-2xl font-bold text-aggregaat-green mb-2">€2.899</div>
                            <div class="space-y-2">
                                <a href="/aggregaat/yanmar-ydg5500n" class="block bg-aggregaat-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition text-center">
                                    Review Lezen
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Pramac P6000s -->
                <div class="bg-gray-50 rounded-lg p-6">
                    <div class="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                        <div class="bg-green-100 text-green-800 text-sm font-bold px-4 py-2 rounded-full">
                            #3 STIL DIESEL
                        </div>
                        <div class="flex-1">
                            <h3 class="text-xl font-bold mb-2">Pramac P6000s Silent Diesel</h3>
                            <p class="text-gray-700 mb-3">
                                Stille diesel generator in geluidsgeïsoleerde behuizing. Ideaal waar geluid een factor is.
                            </p>
                            <div class="flex flex-wrap gap-3">
                                <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">6000W</span>
                                <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Diesel</span>
                                <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">15u runtime</span>
                                <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">59 dB</span>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-2xl font-bold text-aggregaat-green mb-2">€3.499</div>
                            <div class="space-y-2">
                                <a href="/aggregaat/pramac-p6000s" class="block bg-aggregaat-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition text-center">
                                    Review Lezen
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Toepassingsgebieden -->
    <section class="py-12 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">Waar Worden Diesel Aggregaten Gebruikt?</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div class="bg-white rounded-lg p-6 text-center shadow-sm">
                    <div class="text-4xl text-aggregaat-orange mb-4">
                        <i class="fas fa-hard-hat"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3">Bouw & Constructie</h3>
                    <p class="text-gray-600">Betrouwbare stroom op bouwplaatsen waar geen netaansluiting beschikbaar is.</p>
                </div>
                
                <div class="bg-white rounded-lg p-6 text-center shadow-sm">
                    <div class="text-4xl text-blue-600 mb-4">
                        <i class="fas fa-industry"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3">Industriële Backup</h3>
                    <p class="text-gray-600">Noodstroomvoorziening voor kritische industriële processen en machines.</p>
                </div>
                
                <div class="text-center shadow-sm">
                    <div class="text-4xl text-aggregaat-green mb-4">
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3">Evenementen</h3>
                    <p class="text-gray-600">Stroom voor grote evenementen, festivals en buitenactiviteiten.</p>
                </div>
                
                <div class="bg-white rounded-lg p-6 text-center shadow-sm">
                    <div class="text-4xl text-purple-600 mb-4">
                        <i class="fas fa-tractor"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3">Landbouw</h3>
                    <p class="text-gray-600">Betrouwbare stroom voor melkmachines, koeling en andere landbouwapparatuur.</p>
                </div>
                
                <div class="bg-white rounded-lg p-6 text-center shadow-sm">
                    <div class="text-4xl text-red-600 mb-4">
                        <i class="fas fa-ambulance"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3">Nooddiensten</h3>
                    <p class="text-gray-600">Mobiele stroomvoorziening voor hulpdiensten en calamiteitensituaties.</p>
                </div>
                
                <div class="bg-white rounded-lg p-6 text-center shadow-sm">
                    <div class="text-4xl text-yellow-600 mb-4">
                        <i class="fas fa-broadcast-tower"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3">Telecom</h3>
                    <p class="text-gray-600">Backup power voor zendmasten en telecommunicatie infrastructuur.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Onderhouds Tips -->
    <section class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">Onderhoud van Diesel Aggregaten</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="bg-blue-50 rounded-lg p-6">
                    <h3 class="text-xl font-semibold mb-4 text-aggregaat-blue">
                        <i class="fas fa-calendar mr-2"></i>
                        Periodiek Onderhoud
                    </h3>
                    <ul class="space-y-3 text-gray-700">
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Olie vervangen elke 100-200 draaiuren</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Luchtfilter reinigen/vervangen</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Brandstoffilter vervangen</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Koelsysteem controleren</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Uitlaatsysteem inspecteren</li>
                    </ul>
                </div>

                <div class="bg-green-50 rounded-lg p-6">
                    <h3 class="text-xl font-semibold mb-4 text-aggregaat-green">
                        <i class="fas fa-tools mr-2"></i>
                        Dagelijks Onderhoud
                    </h3>
                    <ul class="space-y-3 text-gray-700">
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Oliepeil controleren voor opstarten</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Koelvloeistofniveau checken</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Brandstofniveau controleren</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Lekkages inspecteren</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Aggregaat warmdraaien voor belasting</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-gradient-to-r from-aggregaat-orange to-red-700 text-white">
        <div class="max-w-4xl mx-auto px-4 text-center">
            <h2 class="text-3xl font-bold mb-4">Klaar voor een Betrouwbaar Diesel Aggregaat?</h2>
            <p class="text-xl mb-8 text-orange-100">
                Vergelijk diesel aggregaten en vind het perfecte model voor jouw professionele toepassing.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/keuzehulp" class="bg-white text-aggregaat-orange px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition">
                    <i class="fas fa-search mr-2"></i>
                    Start Keuzehulp
                </a>
                <a href="/professionele-aggregaat-kopen" class="bg-aggregaat-green hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition">
                    Professionele Aggregaten
                </a>
            </div>
        </div>
    </section>
  `
  
  return c.html(createPageHTML(content, seoData))
})

// Professionele aggregaat kopen pagina
pages.get('/professionele-aggregaat-kopen', (c) => {
  const seoData = c.get('seo')
  
  const content = `
    <!-- Breadcrumb -->
    <div class="bg-gray-100 py-4">
        <div class="max-w-7xl mx-auto px-4">
            <nav class="text-sm">
                <a href="/" class="text-aggregaat-blue hover:underline">Home</a>
                <span class="mx-2 text-gray-500">/</span>
                <span class="text-gray-700">Professionele Aggregaat Kopen</span>
            </nav>
        </div>
    </div>

    <!-- Hero -->
    <section class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4">
            <h1 class="text-4xl font-bold text-gray-900 mb-6">
                Professionele Aggregaat Kopen: Industriële Generators voor Zwaar Gebruik
            </h1>
            <p class="text-xl text-gray-600 mb-8 leading-relaxed">
                Zoek je een professioneel aggregaat voor zakelijk of industrieel gebruik? Ontdek onze selectie van 
                high-end aggregaten die betrouwbare stroom leveren voor de meest veeleisende toepassingen.
            </p>
            
            <div class="bg-blue-50 border-l-4 border-aggregaat-blue p-6 mb-8">
                <h3 class="text-lg font-semibold text-aggregaat-blue mb-2">
                    <i class="fas fa-industry mr-2"></i>
                    Professionele Kwaliteit Kenmerken
                </h3>
                <ul class="text-gray-700 space-y-1">
                    <li><i class="fas fa-check text-aggregaat-blue mr-2"></i>Ontworpen voor continue gebruik 24/7</li>
                    <li><i class="fas fa-check text-aggregaat-blue mr-2"></i>Industriële motoren met lange levensduur</li>
                    <li><i class="fas fa-check text-aggregaat-blue mr-2"></i>Automatische start en transfer switches</li>
                    <li><i class="fas fa-check text-aggregaat-blue mr-2"></i>Remote monitoring en controle mogelijk</li>
                </ul>
            </div>
        </div>
    </section>

    <!-- Categorieën Professioneel -->
    <section class="py-12 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">Typen Professionele Aggregaten</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                    <div class="text-4xl text-aggregaat-blue mb-4 text-center">
                        <i class="fas fa-home"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3 text-center">Standby Generatoren</h3>
                    <p class="text-gray-600 mb-4">
                        Permanent geïnstalleerde systemen die automatisch inschakelen bij stroomuitval. 
                        Perfect voor bedrijven die geen stroomproblemen kunnen hebben.
                    </p>
                    <ul class="text-sm space-y-2 text-gray-700">
                        <li><i class="fas fa-check text-green-500 mr-2"></i>10kW - 2000kW+</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Automatische start/stop</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Continue monitoring</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Natuurgas of diesel</li>
                    </ul>
                </div>
                
                <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                    <div class="text-4xl text-aggregaat-green mb-4 text-center">
                        <i class="fas fa-truck"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3 text-center">Mobiele Generators</h3>
                    <p class="text-gray-600 mb-4">
                        Draagbare professionele units op wielen of trailers. Ideaal voor bouwplaatsen, 
                        evenementen en tijdelijke stroomvoorziening.
                    </p>
                    <ul class="text-sm space-y-2 text-gray-700">
                        <li><i class="fas fa-check text-green-500 mr-2"></i>5kW - 500kW</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Robuuste constructie</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Weersbestendige behuizing</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Diesel motoren</li>
                    </ul>
                </div>
                
                <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                    <div class="text-4xl text-aggregaat-orange mb-4 text-center">
                        <i class="fas fa-bolt"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3 text-center">Prime Power Generatoren</h3>
                    <p class="text-gray-600 mb-4">
                        Voor locaties zonder netaansluiting waar continue stroom nodig is. 
                        Ontworpen voor onbeperkt gebruik als hoofdstroomvoorziening.
                    </p>
                    <ul class="text-sm space-y-2 text-gray-700">
                        <li><i class="fas fa-check text-green-500 mr-2"></i>20kW - 3000kW+</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Continue duty rating</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Zware industriële motoren</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Uitgebreide garantie</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Vermogen Calculator -->
    <section class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">Professionele Vermogen Calculator</h2>
            
            <div class="bg-gray-50 rounded-lg p-8">
                <h3 class="text-xl font-semibold mb-6">Bereken Uw Benodigde Professionele Capaciteit</h3>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h4 class="font-semibold mb-4">Zakelijke/Industriële Apparaten (kW)</h4>
                        <div class="space-y-3">
                            <div class="flex justify-between py-2 border-b">
                                <span>Kantoorverlichting (100m²)</span>
                                <span class="font-medium">2-4 kW</span>
                            </div>
                            <div class="flex justify-between py-2 border-b">
                                <span>Computers & Servers (10 units)</span>
                                <span class="font-medium">3-5 kW</span>
                            </div>
                            <div class="flex justify-between py-2 border-b">
                                <span>Airconditioning (100m²)</span>
                                <span class="font-medium">10-15 kW</span>
                            </div>
                            <div class="flex justify-between py-2 border-b">
                                <span>Industriële machine (gemiddeld)</span>
                                <span class="font-medium">15-30 kW</span>
                            </div>
                            <div class="flex justify-between py-2 border-b">
                                <span>Groot kantoorpornd (500m²)</span>
                                <span class="font-medium">50-100 kW</span>
                            </div>
                            <div class="flex justify-between py-2 border-b">
                                <span>Kleine fabriek</span>
                                <span class="font-medium">100-500 kW</span>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold mb-4">Aanbevolen Professionele Capaciteit</h4>
                        <div class="space-y-4">
                            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                                <h5 class="font-semibold text-green-800 mb-2">Klein Kantoor (10-30 kW)</h5>
                                <p class="text-sm text-green-700">
                                    Verlichting, computers, airco, kleine apparaten
                                </p>
                            </div>
                            
                            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h5 class="font-semibold text-blue-800 mb-2">Middelgroot Bedrijf (30-150 kW)</h5>
                                <p class="text-sm text-blue-700">
                                    Volledige kantooruitrusting, productielijn, koeling
                                </p>
                            </div>
                            
                            <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                <h5 class="font-semibold text-orange-800 mb-2">Industrieel (150kW+)</h5>
                                <p class="text-sm text-orange-700">
                                    Zware machines, productie, continue processen
                                </p>
                            </div>
                            
                            <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                <h5 class="font-semibold text-purple-800 mb-2">Data Center (500kW+)</h5>
                                <p class="text-sm text-purple-700">
                                    Servers, koeling, UPS systemen, redundantie
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Top Professionele Aggregaten -->
    <section class="py-12 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">Top Professionele Aggregaten</h2>
            
            <div class="space-y-8">
                <!-- Cummins Onan -->
                <div class="bg-white rounded-lg shadow-md p-8">
                    <div class="flex flex-col lg:flex-row gap-8">
                        <div class="flex-1">
                            <div class="flex items-center gap-4 mb-4">
                                <div class="bg-blue-100 text-blue-800 text-sm font-bold px-4 py-2 rounded-full">
                                    PREMIUM MERK
                                </div>
                                <h3 class="text-2xl font-bold">Cummins Onan RS Series</h3>
                            </div>
                            <p class="text-gray-700 mb-4">
                                Wereldwijde marktleider in standby generatoren. Cummins Onan staat synoniem voor 
                                betrouwbaarheid in kritische toepassingen zoals ziekenhuizen en datacenters.
                            </p>
                            <div class="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <h4 class="font-semibold text-sm text-gray-500 mb-1">VERMOGEN RANGE</h4>
                                    <p class="text-lg font-bold">20kW - 150kW</p>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-sm text-gray-500 mb-1">BRANDSTOF</h4>
                                    <p class="text-lg font-bold">Natuurgas/Diesel</p>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-sm text-gray-500 mb-1">GARANTIE</h4>
                                    <p class="text-lg font-bold">5 jaar</p>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-sm text-gray-500 mb-1">TOEPASSING</h4>
                                    <p class="text-lg font-bold">Standby</p>
                                </div>
                            </div>
                            <ul class="text-sm space-y-1 text-gray-600">
                                <li><i class="fas fa-check text-green-500 mr-2"></i>QuietConnect™ geluidsreductie</li>
                                <li><i class="fas fa-check text-green-500 mr-2"></i>Mobile Link™ remote monitoring</li>
                                <li><i class="fas fa-check text-green-500 mr-2"></i>Automatische transfer switch</li>
                                <li><i class="fas fa-check text-green-500 mr-2"></i>24/7 dealer ondersteuning</li>
                            </ul>
                        </div>
                        <div class="text-center lg:text-right">
                            <div class="text-2xl font-bold text-aggregaat-green mb-4">€15.000 - €45.000</div>
                            <div class="space-y-3">
                                <a href="/merk/cummins-onan" class="block bg-aggregaat-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                                    Bekijk Alle Modellen
                                </a>
                                <a href="#" class="block bg-aggregaat-green text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
                                    <i class="fas fa-phone mr-2"></i>Offerte Aanvragen
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Caterpillar -->
                <div class="bg-white rounded-lg shadow-md p-8">
                    <div class="flex flex-col lg:flex-row gap-8">
                        <div class="flex-1">
                            <div class="flex items-center gap-4 mb-4">
                                <div class="bg-yellow-100 text-yellow-800 text-sm font-bold px-4 py-2 rounded-full">
                                    INDUSTRIEEL
                                </div>
                                <h3 class="text-2xl font-bold">Caterpillar DE Series</h3>
                            </div>
                            <p class="text-gray-700 mb-4">
                                Robuuste industriële generatoren voor de zwaarste omstandigheden. CAT staat bekend 
                                om uitzonderlijke duurzaamheid en prestaties in extreme condities.
                            </p>
                            <div class="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <h4 class="font-semibold text-sm text-gray-500 mb-1">VERMOGEN RANGE</h4>
                                    <p class="text-lg font-bold">50kW - 3000kW+</p>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-sm text-gray-500 mb-1">BRANDSTOF</h4>
                                    <p class="text-lg font-bold">Diesel</p>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-sm text-gray-500 mb-1">DUTY</h4>
                                    <p class="text-lg font-bold">Prime/Standby</p>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-sm text-gray-500 mb-1">TOEPASSING</h4>
                                    <p class="text-lg font-bold">Industrieel</p>
                                </div>
                            </div>
                            <ul class="text-sm space-y-1 text-gray-600">
                                <li><i class="fas fa-check text-green-500 mr-2"></i>Cat ACERT™ technologie</li>
                                <li><i class="fas fa-check text-green-500 mr-2"></i>EMCP 4 controle systeem</li>
                                <li><i class="fas fa-check text-green-500 mr-2"></i>Modulaire constructie</li>
                                <li><i class="fas fa-check text-green-500 mr-2"></i>Wereldwijde service netwerk</li>
                            </ul>
                        </div>
                        <div class="text-center lg:text-right">
                            <div class="text-2xl font-bold text-aggregaat-green mb-4">€35.000 - €500.000+</div>
                            <div class="space-y-3">
                                <a href="/merk/caterpillar" class="block bg-aggregaat-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                                    Bekijk Alle Modellen
                                </a>
                                <a href="#" class="block bg-aggregaat-green text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
                                    <i class="fas fa-phone mr-2"></i>Offerte Aanvragen
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Kohler -->
                <div class="bg-white rounded-lg shadow-md p-8">
                    <div class="flex flex-col lg:flex-row gap-8">
                        <div class="flex-1">
                            <div class="flex items-center gap-4 mb-4">
                                <div class="bg-green-100 text-green-800 text-sm font-bold px-4 py-2 rounded-full">
                                    PREMIUM RESIDENTIAL
                                </div>
                                <h3 class="text-2xl font-bold">Kohler Generator Systems</h3>
                            </div>
                            <p class="text-gray-700 mb-4">
                                Kohler combineert kwaliteit met elegantie. Perfect voor high-end residentiële 
                                toepassingen en kleinere commerciële installaties.
                            </p>
                            <div class="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <h4 class="font-semibold text-sm text-gray-500 mb-1">VERMOGEN RANGE</h4>
                                    <p class="text-lg font-bold">8kW - 200kW</p>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-sm text-gray-500 mb-1">BRANDSTOF</h4>
                                    <p class="text-lg font-bold">Natuurgas/Propaan</p>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-sm text-gray-500 mb-1">DESIGN</h4>
                                    <p class="text-lg font-bold">Premium</p>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-sm text-gray-500 mb-1">WARRANTY</h4>
                                    <p class="text-lg font-bold">5-10 jaar</p>
                                </div>
                            </div>
                            <ul class="text-sm space-y-1 text-gray-600">
                                <li><i class="fas fa-check text-green-500 mr-2"></i>OnCue® Plus Generator Management</li>
                                <li><i class="fas fa-check text-green-500 mr-2"></i>Corrosion-resistant enclosures</li>
                                <li><i class="fas fa-check text-green-500 mr-2"></i>Low vibration design</li>
                                <li><i class="fas fa-check text-green-500 mr-2"></i>Extended warranty options</li>
                            </ul>
                        </div>
                        <div class="text-center lg:text-right">
                            <div class="text-2xl font-bold text-aggregaat-green mb-4">€8.000 - €65.000</div>
                            <div class="space-y-3">
                                <a href="/merk/kohler" class="block bg-aggregaat-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                                    Bekijk Alle Modellen
                                </a>
                                <a href="#" class="block bg-aggregaat-green text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
                                    <i class="fas fa-phone mr-2"></i>Offerte Aanvragen
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Belangrijke Overwegingin -->
    <section class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">Belangrijke Overwegingen bij Professionele Aankoop</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-6">
                    <div class="bg-blue-50 border-l-4 border-aggregaat-blue p-6">
                        <h3 class="text-lg font-semibold text-aggregaat-blue mb-3">
                            <i class="fas fa-clipboard-list mr-2"></i>
                            Load Analysis (Belasting Analyse)
                        </h3>
                        <p class="text-gray-700 text-sm mb-3">
                            Professionele load analysis is essentieel voor het kiezen van de juiste capaciteit. 
                            Onze experts helpen bij het bepalen van uw exacte stroombehoeften.
                        </p>
                        <ul class="text-sm text-gray-700 space-y-1">
                            <li>• Piekbelasting berekening</li>
                            <li>• Startup currents analyse</li>
                            <li>• Toekomstige uitbreidingen</li>
                            <li>• Load sequencing planning</li>
                        </ul>
                    </div>
                    
                    <div class="bg-green-50 border-l-4 border-aggregaat-green p-6">
                        <h3 class="text-lg font-semibold text-aggregaat-green mb-3">
                            <i class="fas fa-tools mr-2"></i>
                            Installatie & Commissioning
                        </h3>
                        <p class="text-gray-700 text-sm mb-3">
                            Professionele installatie door gecertificeerde technici zorgt voor optimale prestaties 
                            en veiligheid van uw generator systeem.
                        </p>
                        <ul class="text-sm text-gray-700 space-y-1">
                            <li>• Locatie planning & voorbereiding</li>
                            <li>• Elektrische aansluitingen</li>
                            <li>• Brandstof systeem installatie</li>
                            <li>• Uitgebreide testen & validatie</li>
                        </ul>
                    </div>
                </div>
                
                <div class="space-y-6">
                    <div class="bg-orange-50 border-l-4 border-aggregaat-orange p-6">
                        <h3 class="text-lg font-semibold text-aggregaat-orange mb-3">
                            <i class="fas fa-handshake mr-2"></i>
                            Service & Onderhoud Contracten
                        </h3>
                        <p class="text-gray-700 text-sm mb-3">
                            Regelmatig preventief onderhoud is cruciaal voor betrouwbaarheid. 
                            Onze service contracten zorgen voor optimale beschikbaarheid.
                        </p>
                        <ul class="text-sm text-gray-700 space-y-1">
                            <li>• Preventief onderhoudsschema</li>
                            <li>• 24/7 emergency service</li>
                            <li>• Remote monitoring services</li>
                            <li>• Originele onderdelen garantie</li>
                        </ul>
                    </div>
                    
                    <div class="bg-purple-50 border-l-4 border-purple-600 p-6">
                        <h3 class="text-lg font-semibold text-purple-600 mb-3">
                            <i class="fas fa-shield-alt mr-2"></i>
                            Compliance & Certificeringen
                        </h3>
                        <p class="text-gray-700 text-sm mb-3">
                            Zorg dat uw generator voldoet aan alle relevante normen en regelgeving 
                            voor uw specifieke toepassing en locatie.
                        </p>
                        <ul class="text-sm text-gray-700 space-y-1">
                            <li>• CE markering & EMC compliance</li>
                            <li>• Geluidsnormen (Wm/Wbo)</li>
                            <li>• Emissie regelgeving</li>
                            <li>• Brandveiligheids voorschriften</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-gradient-to-r from-aggregaat-blue to-blue-700 text-white">
        <div class="max-w-4xl mx-auto px-4 text-center">
            <h2 class="text-3xl font-bold mb-4">Klaar voor een Professioneel Generator Project?</h2>
            <p class="text-xl mb-8 text-blue-100">
                Onze experts helpen u bij het selecteren, installeren en onderhouden van uw professionele generator systeem.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#" class="bg-aggregaat-orange hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition">
                    <i class="fas fa-phone mr-2"></i>
                    Gratis Consultatie
                </a>
                <a href="/keuzehulp" class="bg-white hover:bg-gray-100 text-aggregaat-blue px-8 py-4 rounded-lg text-lg font-semibold transition">
                    <i class="fas fa-calculator mr-2"></i>
                    Capaciteit Calculator
                </a>
            </div>
        </div>
    </section>
  `
  
  return c.html(createPageHTML(content, seoData))
})

// Keuzehulp pagina
pages.get('/keuzehulp', (c) => {
  const seoData = {
    title: 'Aggregaat Keuzehulp - Vind het Perfecte Aggregaat in 2 Minuten',
    description: 'Onze interactieve keuzehulp helpt je het perfecte aggregaat te vinden. Beantwoord 5 simpele vragen en krijg gepersonaliseerde aanbevelingen.',
    keywords: ['aggregaat keuzehulp', 'aggregaat kiezen', 'welk aggregaat', 'aggregaat advies']
  }
  
  const content = `
    <!-- Breadcrumb -->
    <div class="bg-gray-100 py-4">
        <div class="max-w-7xl mx-auto px-4">
            <nav class="text-sm">
                <a href="/" class="text-aggregaat-blue hover:underline">Home</a>
                <span class="mx-2 text-gray-500">/</span>
                <span class="text-gray-700">Aggregaat Keuzehulp</span>
            </nav>
        </div>
    </div>

    <!-- Hero -->
    <section class="py-12 bg-gradient-to-r from-aggregaat-blue to-blue-700 text-white">
        <div class="max-w-4xl mx-auto px-4 text-center">
            <h1 class="text-4xl font-bold mb-6">
                <i class="fas fa-search mr-3"></i>
                Aggregaat Keuzehulp
            </h1>
            <p class="text-xl mb-8 text-blue-100">
                Vind in 2 minuten het perfecte aggregaat voor jouw situatie. 
                Beantwoord 5 simpele vragen en krijg gepersonaliseerde aanbevelingen.
            </p>
            <div class="bg-white/10 rounded-lg p-6 text-left">
                <h3 class="text-lg font-semibold mb-3">✓ Dit krijg je:</h3>
                <ul class="space-y-2 text-blue-100">
                    <li><i class="fas fa-check mr-2 text-green-300"></i>Top 5 aanbevelingen op maat</li>
                    <li><i class="fas fa-check mr-2 text-green-300"></i>Waarom deze aggregaten bij je passen</li>
                    <li><i class="fas fa-check mr-2 text-green-300"></i>Directe prijsvergelijking</li>
                    <li><i class="fas fa-check mr-2 text-green-300"></i>Links naar de beste aanbieders</li>
                </ul>
            </div>
        </div>
    </section>

    <!-- Quiz Container -->
    <section class="py-12 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4">
            <!-- Progress Bar -->
            <div class="mb-8">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium text-aggregaat-blue">Voortgang</span>
                    <span class="text-sm font-medium text-aggregaat-blue" id="progress-text">Vraag 1 van 5</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-aggregaat-blue h-2 rounded-full transition-all duration-300" id="progress-bar" style="width: 20%"></div>
                </div>
            </div>

            <!-- Quiz Questions -->
            <div class="bg-white rounded-lg shadow-md p-8" id="quiz-container">
                <div id="quiz-loading" class="text-center py-8">
                    <i class="fas fa-spinner fa-spin text-4xl text-aggregaat-blue mb-4"></i>
                    <p class="text-gray-600">Keuzehulp wordt geladen...</p>
                </div>
            </div>

            <!-- Results Container -->
            <div class="hidden" id="results-container">
                <div class="bg-white rounded-lg shadow-md p-8">
                    <div class="text-center mb-8">
                        <div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-check text-2xl"></i>
                        </div>
                        <h2 class="text-3xl font-bold text-gray-900 mb-2">Jouw Perfecte Aggregaten!</h2>
                        <p class="text-gray-600" id="results-message">We hebben de beste aanbevelingen voor je gevonden.</p>
                    </div>
                    
                    <div id="recommendations-list" class="space-y-6">
                        <!-- Aanbevelingen worden hier ingeladen -->
                    </div>
                    
                    <div class="text-center mt-8">
                        <button onclick="restartQuiz()" class="bg-aggregaat-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition mr-4">
                            <i class="fas fa-redo mr-2"></i>
                            Opnieuw Beginnen
                        </button>
                        <a href="/" class="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition">
                            Terug naar Home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Help Section -->
    <section class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4">
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">Hulp Nodig?</h2>
                <p class="text-xl text-gray-600">Onze experts staan klaar om je persoonlijk te helpen</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="text-center p-6">
                    <div class="w-16 h-16 bg-aggregaat-blue text-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-phone text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Bel ons</h3>
                    <p class="text-gray-600 mb-3">Persoonlijk advies van onze experts</p>
                    <a href="tel:085-1234567" class="text-aggregaat-blue hover:underline font-medium">085-1234567</a>
                </div>
                
                <div class="text-center p-6">
                    <div class="w-16 h-16 bg-aggregaat-green text-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-envelope text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">E-mail ons</h3>
                    <p class="text-gray-600 mb-3">Stuur je vraag en krijg binnen 24u antwoord</p>
                    <a href="mailto:info@aggregaatkopen.com" class="text-aggregaat-green hover:underline font-medium">info@aggregaatkopen.com</a>
                </div>
                
                <div class="text-center p-6">
                    <div class="w-16 h-16 bg-aggregaat-orange text-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-comments text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Live Chat</h3>
                    <p class="text-gray-600 mb-3">Chat direct met onze specialisten</p>
                    <button class="text-aggregaat-orange hover:underline font-medium">Start Chat</button>
                </div>
            </div>
        </div>
    </section>
  `
  
  return c.html(createPageHTML(content, seoData, 'quiz-page'))
})

// SEO Routes - robots.txt en sitemap
pages.get('/robots.txt', (c) => {
  return c.text(`User-agent: *
Allow: /

Sitemap: https://aggregaatkopen.com/sitemap.xml

Allow: /static/
Allow: /assets/
Allow: /images/

Disallow: /api/
Disallow: /admin/
Disallow: /_worker.js
Disallow: /_routes.json

Crawl-delay: 1`)
})

pages.get('/sitemap.xml', (c) => {
  c.header('Content-Type', 'application/xml')
  // Hier zou je de sitemap dynamisch kunnen genereren
  // Voor nu serveren we de statische versie
  return c.text('Sitemap wordt geladen...')
})

export { pages as pagesRouter }