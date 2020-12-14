import { InsurancePlan } from '../../types/index.enum'

export interface IConvertScoreToPlan {
  execute(score: number): InsurancePlan;
}
