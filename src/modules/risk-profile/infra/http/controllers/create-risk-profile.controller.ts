import { Request, Response } from 'express'

import CreateRiskProfileUseCase from '../../../useCases/create-risk-profile.useCase'
import {
  CalculateRiskScore
} from '../../../../../shared/calculate-risk-score/implementations/calculate-risk-score.service'
import {
  ConvertScoreToPlan
} from '../../../../../shared/convert-score-to-plan/implementations/convert-score-to-plan.service'
import { handlingErrorRequest } from '../../../../../shared/errors/error.service'

export default class CreateRiskProfileController {
  public async create (request: Request, response: Response): Promise<Response> {
    const {
      age,
      dependents,
      house,
      income,
      marital_status,
      risk_questions,
      vehicle
    } = request.body

    try {
      const calculateRiskScore = new CalculateRiskScore()
      const convertScoreToPlan = new ConvertScoreToPlan()

      const riskProfileUseCase = new CreateRiskProfileUseCase(
        calculateRiskScore,
        convertScoreToPlan
      )

      const result = await riskProfileUseCase.execute({
        age,
        dependents,
        house,
        income,
        marital_status,
        risk_questions,
        vehicle
      })

      return response.json({ erro: false, result })
    } catch (error) {
      return handlingErrorRequest(error, request, response)
    }
  }
}
