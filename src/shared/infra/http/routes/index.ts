import { Router } from 'express'

import riskProfileRouter from '../../../../modules/risk-profile/infra/http/routes/risk-profile.routes'

const routes = Router()

routes.use('/risk-profile', riskProfileRouter)

export default routes
