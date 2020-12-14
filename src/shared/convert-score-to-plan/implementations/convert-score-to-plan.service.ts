import { InsurancePlan } from '../../../types/index.enum'

import { IConvertScoreToPlan } from '../convert-score-to-plan.interface'

export class ConvertScoreToPlan implements IConvertScoreToPlan {
  execute (score: number): InsurancePlan {
    if (score <= 0) {
      return InsurancePlan.ECONOMIC
    }

    if (score === 1 || score === 2) {
      return InsurancePlan.REGULAR
    }

    if (score >= 3 && score !== 80) {
      return InsurancePlan.RESPONSIBLE
    }

    return InsurancePlan.INELIGIBLE
  }
}
