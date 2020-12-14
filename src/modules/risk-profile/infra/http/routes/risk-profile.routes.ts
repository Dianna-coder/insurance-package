import { celebrate, errors } from 'celebrate'
import { Router } from 'express'

import CreateRiskProfileController from '../controllers/create-risk-profile.controller'
import { CreateRiskProfileSchema } from './schemas/create-risk-profile.schema'

const riskProfileRouter = Router()

riskProfileRouter.use(errors())

const createRiskProfileController = new CreateRiskProfileController()

riskProfileRouter.post(
  '/',
  celebrate(CreateRiskProfileSchema),
  createRiskProfileController.create
)

export default riskProfileRouter
