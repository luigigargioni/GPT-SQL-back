import express, { Application, json } from 'express'
import cors, { CorsOptions } from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import { getRoutes } from './routes'
import { CorsWhitelist } from './config/authentication'

export const app: Application = express()

const corsOptions: CorsOptions = {
  origin: CorsWhitelist,
  methods: 'GET, PUT, POST, DELETE, OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
}

app.use(json())
app.use(helmet())
app.use(cors(corsOptions))
app.use(compression())

getRoutes(app)
