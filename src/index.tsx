import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { seoMiddleware } from './middleware/seo'
import { pagesRouter } from './routes/pages'
import { apiRouter } from './routes/api'

const app = new Hono()

// CORS middleware voor API routes
app.use('/api/*', cors())

// SEO middleware voor alle routes
app.use('*', seoMiddleware)

// Statische bestanden serveren
app.use('/static/*', serveStatic({ root: './public' }))
app.use('/assets/*', serveStatic({ root: './public' }))
app.use('/images/*', serveStatic({ root: './public' }))

// Routes
app.route('/api', apiRouter)
app.route('/', pagesRouter)

export default app