import { celebrate, errors } from 'celebrate'
import { Router } from 'express'

import CreateRiskProfileController from '../controllers/create-risk-profile.controller'
import { CreateRiskProfileSchema } from './schemas/create-risk-profile.schema'

const riskProfileRouter = Router()

const createRiskProfileController = new CreateRiskProfileController()

riskProfileRouter.post(
  '/',
  celebrate(CreateRiskProfileSchema),
  createRiskProfileController.create
)

riskProfileRouter.use(errors())

export default riskProfileRouter
