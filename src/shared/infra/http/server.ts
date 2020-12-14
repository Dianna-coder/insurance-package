import cors, { CorsOptions } from 'cors'
import express from 'express'
import helmet from 'helmet'

import { handlingErrorRequest } from '../../errors/error.service'

import routes from './routes'

const app = express()

const corsOptions: CorsOptions = {
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With'],
  credentials: true,
  methods: ['GET', 'OPTIONS'],
  origin: '*'
}

app.use(express.json())
app.use(helmet())
app.use(cors(corsOptions))

app.use('/insurance-package', routes)
app.use(handlingErrorRequest)

app.listen(3333, () => console.log('Server started on port 3333!'))

export default app
