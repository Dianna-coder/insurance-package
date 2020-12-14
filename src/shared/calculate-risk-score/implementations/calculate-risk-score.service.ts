import { ICalculateRiskScore } from '../calculate-risk-score.interface'

export class CalculateRiskScore implements ICalculateRiskScore {
  calculateVeryLowRiskScore (score: number): number {
    return score - 2
  }

  calculateLowRiskScore (score: number): number {
    return score - 1
  }

  calculateHighRiskScore (score: number): number {
    return score + 1
  }

  calculateIneligibleRiskScore (): number {
    return 80
  }
}
