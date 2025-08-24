import { Hono } from 'hono'

export const apiRoutes = new Hono()

// API voor vergelijkingstool
apiRoutes.get('/vergelijk', (c) => {
  // Mock data voor aggregaten vergelijking
  const aggregaten = [
    {
      id: 1,
      naam: "Honda EU22i",
      type: "Stille Inverter",
      vermogen: "2200W",
      brandstof: "Benzine",
      geluidsniveau: "48-57dB",
      gewicht: "21kg",
      prijs: "€1,299",
      score: 9.2,
      voordelen: ["Zeer stil", "Inverter technologie", "Zuinig verbruik"],
      nadelen: ["Duurder in aanschaf"]
    },
    {
      id: 2,
      naam: "Kipor KDE6500E3",
      type: "Diesel",
      vermogen: "5500W",
      brandstof: "Diesel",
      geluidsniveau: "65dB",
      gewicht: "85kg", 
      prijs: "€2,149",
      score: 8.8,
      voordelen: ["Zeer zuinig", "Lange looptijd", "Robuust"],
      nadelen: ["Zwaar", "Hoger geluidsniveau"]
    },
    {
      id: 3,
      naam: "Hyundai HY3000Si",
      type: "Stille Inverter",
      vermogen: "3100W",
      brandstof: "Benzine",
      geluidsniveau: "58dB",
      gewicht: "29kg",
      prijs: "€649",
      score: 8.5,
      voordelen: ["Goede prijs-kwaliteit", "Inverter", "Lichtgewicht"],
      nadelen: ["Minder bekend merk"]
    }
  ]
  
  return c.json(aggregaten)
})

// API voor keuzehelper
apiRoutes.post('/keuzehelper', async (c) => {
  const body = await c.req.json()
  const { gebruik, vermogen, budget, geluid, brandstof } = body
  
  // Logica voor aanbevelingen
  const aanbevelingen = []
  
  if (gebruik === 'thuis' && geluid === 'belangrijk') {
    aanbevelingen.push({
      naam: "Honda EU22i",
      reden: "Perfecte combinatie van stilte en betrouwbaarheid voor thuisgebruik"
    })
  }
  
  if (gebruik === 'professioneel' && vermogen > 3000) {
    aanbevelingen.push({
      naam: "Kipor KDE6500E3", 
      reden: "Krachtig diesel aggregaat voor professioneel gebruik"
    })
  }
  
  return c.json({ 
    aanbevelingen,
    criteria: body
  })
})

// API voor reviews
apiRoutes.get('/reviews/:productId', (c) => {
  const productId = c.req.param('productId')
  
  // Mock reviews
  const reviews = [
    {
      id: 1,
      gebruiker: "Jan K.",
      beoordeling: 5,
      datum: "2024-01-15",
      titel: "Uitstekend aggregaat!",
      review: "Zeer tevreden met deze aankoop. Stil en betrouwbaar.",
      verified: true
    },
    {
      id: 2, 
      gebruiker: "Maria S.",
      beoordeling: 4,
      datum: "2024-01-10", 
      titel: "Goede kwaliteit",
      review: "Doet wat het moet doen. Goede service van de leverancier.",
      verified: true
    }
  ]
  
  return c.json(reviews)
})

// Search API
apiRoutes.get('/zoeken', (c) => {
  const query = c.req.query('q') || ''
  
  // Mock zoekresultaten
  const resultaten = [
    {
      titel: "Honda EU22i - Stille Inverter Aggregaat",
      url: "/aggregaat/honda-eu22i",
      beschrijving: "Zeer stil 2200W inverter aggregaat perfect voor camping en thuisgebruik"
    },
    {
      titel: "Diesel Aggregaten Vergelijking",
      url: "/diesel-aggregaat-kopen", 
      beschrijving: "Vergelijk de beste diesel aggregaten voor professioneel gebruik"
    }
  ]
  
  const gefilterd = resultaten.filter(item => 
    item.titel.toLowerCase().includes(query.toLowerCase()) ||
    item.beschrijving.toLowerCase().includes(query.toLowerCase())
  )
  
  return c.json({ query, resultaten: gefilterd })
})