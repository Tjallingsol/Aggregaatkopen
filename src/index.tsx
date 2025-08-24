import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { seoMiddleware } from './middleware/seo'
import { pageRoutes } from './routes/pages'
import { apiRoutes } from './routes/api'

const app = new Hono()

// Middleware
app.use('/api/*', cors())
app.use('*', seoMiddleware)

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Routes
app.route('/api', apiRoutes)
app.route('/', pageRoutes)

export default app