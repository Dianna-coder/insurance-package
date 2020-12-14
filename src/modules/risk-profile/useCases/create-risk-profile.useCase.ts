import {
  ConvertScoreToPlan
} from '../../../shared/convert-score-to-plan/implementations/convert-score-to-plan.service'
import { carIsFromTheLastFiveYears } from '../../../shared/utils/utils.service'

import {
  CalculateRiskScore
} from '../../../shared/calculate-risk-score/implementations/calculate-risk-score.service'
import { MaritalStatus, OwnershipStatus } from '../../../types/index.enum'
import { IRequest, IResponse } from '../dtos/create-risk-profile.dto'

class CreateRiskProfileUseCase {
  private calculateRiskScore: CalculateRiskScore
  private convertScoreToPlan: ConvertScoreToPlan

  constructor (
    calculateRiskScore: CalculateRiskScore,
    convertScoreToPlan: ConvertScoreToPlan
  ) {
    this.calculateRiskScore = calculateRiskScore
    this.convertScoreToPlan = convertScoreToPlan
  }

  public async execute ({
    age,
    dependents,
    house,
    income,
    marital_status,
    risk_questions,
    vehicle
  }: IRequest): Promise<IResponse> {
    const riskScore = risk_questions
      .reduce((total, value) => total + value)

    const insurance: { [key: string]: number } = {
      auto: riskScore,
      disability: riskScore,
      home: riskScore,
      life: riskScore
    }

    if (age < 30) {
      for (const key in insurance) {
        insurance[key] = this.calculateRiskScore.calculateVeryLowRiskScore(insurance[key])
      }
    }

    if (age >= 30 && age <= 40) {
      for (const key in insurance) {
        insurance[key] = this.calculateRiskScore.calculateLowRiskScore(insurance[key])
      }
    }

    if (income > 200000) {
      for (const key in insurance) {
        insurance[key] = this.calculateRiskScore.calculateLowRiskScore(insurance[key])
      }
    }

    if (house && house.ownership_status === OwnershipStatus.MORTGAGED) {
      insurance.disability = this.calculateRiskScore.calculateHighRiskScore(insurance.disability)
      insurance.home = this.calculateRiskScore.calculateHighRiskScore(insurance.home)
    }

    if (dependents > 0) {
      insurance.disability = this.calculateRiskScore.calculateHighRiskScore(insurance.disability)
      insurance.life = this.calculateRiskScore.calculateHighRiskScore(insurance.life)
    }

    if (marital_status === MaritalStatus.MARRIED) {
      insurance.life = this.calculateRiskScore.calculateHighRiskScore(insurance.life)
      insurance.disability = this.calculateRiskScore.calculateLowRiskScore(insurance.disability)
    }

    if (vehicle?.year) {
      if (carIsFromTheLastFiveYears(vehicle.year)) {
        insurance.auto = this.calculateRiskScore.calculateHighRiskScore(insurance.auto)
      }
    }

    if (income === 0 && !vehicle?.year && !house?.ownership_status) {
      insurance.disability = this.calculateRiskScore.calculateIneligibleRiskScore()
      insurance.auto = this.calculateRiskScore.calculateIneligibleRiskScore()
      insurance.home = this.calculateRiskScore.calculateIneligibleRiskScore()
    }

    if (age > 60) {
      insurance.disability = this.calculateRiskScore.calculateIneligibleRiskScore()
      insurance.life = this.calculateRiskScore.calculateIneligibleRiskScore()
    }

    const riskProfile = {
      auto: this.convertScoreToPlan.execute(insurance.auto),
      disability: this.convertScoreToPlan.execute(insurance.disability),
      home: this.convertScoreToPlan.execute(insurance.home),
      life: this.convertScoreToPlan.execute(insurance.life)
    }

    return riskProfile
  }
}

export default CreateRiskProfileUseCase
