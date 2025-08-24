import { Hono } from 'hono'

const api = new Hono()

// Productdata voor aggregaten
const productData = {
  categories: {
    'stil': {
      name: 'Stille Aggregaten',
      products: [
        {
          id: 'honda-eu22i',
          name: 'Honda EU22i',
          brand: 'Honda',
          type: 'Inverter',
          power: 2200,
          noise: 48,
          runtime: 8.1,
          weight: 21.1,
          fuel: 'Benzine',
          price: 1899,
          rating: 4.8,
          features: ['Ultra stil', 'Inverter technologie', 'Eco throttle', 'Parallel koppeling'],
          pros: ['Zeer stil (48-57 dB)', 'Uitstekende brandstofzuinigheid', 'Zuivere sinusgolf', 'Honda betrouwbaarheid'],
          cons: ['Hogere aanschafprijs', 'Beperkt vermogen voor zware apparaten']
        },
        {
          id: 'yamaha-ef2000is',
          name: 'Yamaha EF2000iS',
          brand: 'Yamaha',
          type: 'Inverter',
          power: 2000,
          noise: 51,
          runtime: 10.5,
          weight: 19.5,
          fuel: 'Benzine',
          price: 1649,
          rating: 4.7,
          features: ['Smart throttle', 'Inverter technologie', 'Stille werking', 'Compacte afmetingen'],
          pros: ['Zeer betrouwbaar', 'Lange runtime', 'Stil voor de capaciteit', 'Yamaha kwaliteit'],
          cons: ['Minder vermogen dan Honda', 'Geen parallel koppeling']
        },
        {
          id: 'kipor-ig2600',
          name: 'Kipor IG2600',
          brand: 'Kipor',
          type: 'Inverter',
          power: 2600,
          noise: 58,
          runtime: 10.0,
          weight: 22.0,
          fuel: 'Benzine',
          price: 899,
          rating: 4.3,
          features: ['Digitaal display', 'Eco modus', 'Overbelastingsbeveiliging', '12V uitgang'],
          pros: ['Uitstekende prijs-kwaliteit', 'Hoog vermogen', 'Goede runtime', 'Veel aansluitingen'],
          cons: ['Minder stil dan topmerken', 'Zwaardere constructie']
        }
      ]
    },
    'diesel': {
      name: 'Diesel Aggregaten',
      products: [
        {
          id: 'kubota-gl11000',
          name: 'Kubota GL11000',
          brand: 'Kubota',
          type: 'Diesel',
          power: 11000,
          noise: 69,
          runtime: 12.0,
          weight: 185,
          fuel: 'Diesel',
          price: 4899,
          rating: 4.6,
          features: ['Kubota diesel motor', 'Elektrische start', 'Voltmeter', 'Grote brandstoftank'],
          pros: ['Zeer betrouwbaar', 'Hoog vermogen', 'Brandstofzuinig', 'Lange levensduur'],
          cons: ['Zwaar en groot', 'Meer geluid', 'Hogere aanschafprijs']
        },
        {
          id: 'yanmar-ydg5500n',
          name: 'Yanmar YDG5500N',
          brand: 'Yanmar',
          type: 'Diesel',
          power: 5500,
          noise: 68,
          runtime: 10.0,
          weight: 120,
          fuel: 'Diesel',
          price: 2899,
          rating: 4.5,
          features: ['Yanmar L100N motor', 'Automatische stopontlasting', 'Robuuste constructie'],
          pros: ['Betrouwbare Yanmar motor', 'Goede prijs-kwaliteit', 'Professionele kwaliteit'],
          cons: ['Handmatige start', 'Beperkte geluidsisolatie']
        }
      ]
    },
    'professioneel': {
      name: 'Professionele Aggregaten',
      products: [
        {
          id: 'cummins-onan-rs20',
          name: 'Cummins Onan RS20',
          brand: 'Cummins',
          type: 'Standby',
          power: 20000,
          noise: 65,
          runtime: 999, // Onbeperkt met netaansluiting
          weight: 320,
          fuel: 'Natuurgas',
          price: 15000,
          rating: 4.9,
          features: ['Automatische start', 'Transfer switch', 'Remote monitoring', 'Weather-resistant'],
          pros: ['Volledig automatisch', 'Hoge betrouwbaarheid', 'Professionele installatie', 'Uitgebreide garantie'],
          cons: ['Hoge investering', 'Vereist professionele installatie', 'Periodiek onderhoud nodig']
        }
      ]
    }
  },
  
  // Keuzehulp vragen
  quizQuestions: [
    {
      id: 'usage',
      question: 'Waar ga je het aggregaat voornamelijk voor gebruiken?',
      type: 'single',
      options: [
        { value: 'home_backup', label: 'Noodstroom thuis', icon: 'fas fa-home' },
        { value: 'camping', label: 'Camping en recreatie', icon: 'fas fa-campground' },
        { value: 'construction', label: 'Bouw en klussen', icon: 'fas fa-hard-hat' },
        { value: 'professional', label: 'Professioneel/zakelijk', icon: 'fas fa-briefcase' }
      ]
    },
    {
      id: 'power_need',
      question: 'Hoeveel vermogen heb je ongeveer nodig?',
      type: 'single',
      options: [
        { value: 'low', label: 'Tot 2000W (kleine apparaten)', icon: 'fas fa-mobile-alt' },
        { value: 'medium', label: '2000-5000W (gemiddeld huishouden)', icon: 'fas fa-home' },
        { value: 'high', label: '5000-10000W (groot huishouden/bedrijf)', icon: 'fas fa-building' },
        { value: 'very_high', label: 'Meer dan 10000W (industrieel)', icon: 'fas fa-industry' }
      ]
    },
    {
      id: 'noise_preference',
      question: 'Hoe belangrijk is een laag geluidsniveau?',
      type: 'single',
      options: [
        { value: 'critical', label: 'Zeer belangrijk (woonwijk/camping)', icon: 'fas fa-volume-mute' },
        { value: 'important', label: 'Belangrijk (af en toe gebruik)', icon: 'fas fa-volume-down' },
        { value: 'moderate', label: 'Matig belangrijk (buitengebied)', icon: 'fas fa-volume-up' },
        { value: 'not_important', label: 'Niet belangrijk (industrie)', icon: 'fas fa-industry' }
      ]
    },
    {
      id: 'budget',
      question: 'Wat is je budget voor het aggregaat?',
      type: 'single',
      options: [
        { value: 'budget', label: 'Tot €1.000 (budgetvriendelijk)', icon: 'fas fa-coins' },
        { value: 'mid', label: '€1.000 - €3.000 (gemiddeld)', icon: 'fas fa-euro-sign' },
        { value: 'premium', label: '€3.000 - €10.000 (premium)', icon: 'fas fa-gem' },
        { value: 'professional', label: 'Meer dan €10.000 (professioneel)', icon: 'fas fa-crown' }
      ]
    },
    {
      id: 'fuel_preference',
      question: 'Welke brandstof heeft je voorkeur?',
      type: 'single',
      options: [
        { value: 'gasoline', label: 'Benzine (makkelijk verkrijgbaar)', icon: 'fas fa-gas-pump' },
        { value: 'diesel', label: 'Diesel (zuiniger, langere runtime)', icon: 'fas fa-truck' },
        { value: 'gas', label: 'Gas/LPG (schoner, stiller)', icon: 'fas fa-fire' },
        { value: 'no_preference', label: 'Geen voorkeur', icon: 'fas fa-question' }
      ]
    }
  ]
}

// API Routes
api.get('/products', (c) => {
  return c.json(productData.categories)
})

api.get('/products/:category', (c) => {
  const category = c.req.param('category')
  const categoryData = productData.categories[category]
  
  if (!categoryData) {
    return c.json({ error: 'Category not found' }, 404)
  }
  
  return c.json(categoryData)
})

api.get('/product/:id', (c) => {
  const productId = c.req.param('id')
  
  // Zoek product in alle categorieën
  for (const category of Object.values(productData.categories)) {
    const product = category.products.find(p => p.id === productId)
    if (product) {
      return c.json(product)
    }
  }
  
  return c.json({ error: 'Product not found' }, 404)
})

api.get('/quiz/questions', (c) => {
  return c.json(productData.quizQuestions)
})

api.post('/quiz/recommendations', async (c) => {
  const answers = await c.req.json()
  
  // Algoritme voor aanbevelingen op basis van antwoorden
  let recommendations = []
  let allProducts = []
  
  // Verzamel alle producten
  for (const category of Object.values(productData.categories)) {
    allProducts = [...allProducts, ...category.products]
  }
  
  // Filter en score producten op basis van antwoorden
  for (const product of allProducts) {
    let score = 0
    let matches = []
    
    // Gebruik filter
    if (answers.usage) {
      if (answers.usage === 'home_backup' && product.noise <= 60) {
        score += 30
        matches.push('Geschikt voor thuisgebruik')
      }
      if (answers.usage === 'camping' && product.noise <= 58) {
        score += 40
        matches.push('Stil genoeg voor camping')
      }
      if (answers.usage === 'construction' && product.power >= 3000) {
        score += 35
        matches.push('Voldoende vermogen voor klussen')
      }
      if (answers.usage === 'professional' && product.power >= 5000) {
        score += 45
        matches.push('Professionele capaciteit')
      }
    }
    
    // Vermogen filter
    if (answers.power_need) {
      if (answers.power_need === 'low' && product.power <= 2000) {
        score += 25
        matches.push('Past bij uw vermogenbehoefte')
      }
      if (answers.power_need === 'medium' && product.power >= 2000 && product.power <= 5000) {
        score += 30
        matches.push('Ideaal vermogen voor uw toepassing')
      }
      if (answers.power_need === 'high' && product.power >= 5000 && product.power <= 10000) {
        score += 35
        matches.push('Hoog vermogen zoals gewenst')
      }
      if (answers.power_need === 'very_high' && product.power >= 10000) {
        score += 40
        matches.push('Industriële capaciteit')
      }
    }
    
    // Geluid filter
    if (answers.noise_preference) {
      if (answers.noise_preference === 'critical' && product.noise <= 55) {
        score += 40
        matches.push('Ultra stil')
      }
      if (answers.noise_preference === 'important' && product.noise <= 65) {
        score += 25
        matches.push('Acceptabel geluidsniveau')
      }
      if (answers.noise_preference === 'moderate') {
        score += 15
        matches.push('Geluidsniveau geen probleem')
      }
      if (answers.noise_preference === 'not_important') {
        score += 10
        matches.push('Geluid geen factor')
      }
    }
    
    // Budget filter
    if (answers.budget) {
      if (answers.budget === 'budget' && product.price <= 1000) {
        score += 30
        matches.push('Past binnen uw budget')
      }
      if (answers.budget === 'mid' && product.price >= 1000 && product.price <= 3000) {
        score += 30
        matches.push('Goede prijs-kwaliteitverhouding')
      }
      if (answers.budget === 'premium' && product.price >= 3000 && product.price <= 10000) {
        score += 25
        matches.push('Premium kwaliteit')
      }
      if (answers.budget === 'professional' && product.price >= 10000) {
        score += 20
        matches.push('Professionele investering')
      }
    }
    
    // Brandstof voorkeur
    if (answers.fuel_preference && answers.fuel_preference !== 'no_preference') {
      const fuelMap = {
        'gasoline': 'Benzine',
        'diesel': 'Diesel',
        'gas': 'Gas'
      }
      
      if (product.fuel === fuelMap[answers.fuel_preference]) {
        score += 20
        matches.push(`${product.fuel} zoals gewenst`)
      }
    }
    
    // Voeg product toe als het een redelijke score heeft
    if (score >= 25) {
      recommendations.push({
        product,
        score,
        matches,
        percentage: Math.min(Math.round((score / 100) * 100), 100)
      })
    }
  }
  
  // Sorteer op score en neem top 5
  recommendations.sort((a, b) => b.score - a.score)
  recommendations = recommendations.slice(0, 5)
  
  return c.json({
    recommendations,
    message: `We hebben ${recommendations.length} aanbevelingen gevonden op basis van uw wensen.`
  })
})

// Vergelijkings API
api.post('/compare', async (c) => {
  const { productIds } = await c.req.json()
  
  const products = []
  for (const productId of productIds) {
    for (const category of Object.values(productData.categories)) {
      const product = category.products.find(p => p.id === productId)
      if (product) {
        products.push(product)
        break
      }
    }
  }
  
  return c.json({ products })
})

// Search API
api.get('/search', (c) => {
  const query = c.req.query('q')?.toLowerCase() || ''
  
  if (!query) {
    return c.json({ products: [] })
  }
  
  let results = []
  
  for (const category of Object.values(productData.categories)) {
    for (const product of category.products) {
      if (
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.type.toLowerCase().includes(query) ||
        product.features.some(f => f.toLowerCase().includes(query))
      ) {
        results.push(product)
      }
    }
  }
  
  return c.json({ products: results })
})

export { api as apiRouter }