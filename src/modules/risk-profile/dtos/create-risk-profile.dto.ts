import { InsurancePlan } from '../../../types/index.enum'

export interface IRequest {
  age: number,
  dependents: number,
  house?: { ownership_status: 'owned' | 'mortgaged' },
  income: number,
  marital_status: 'single' | 'married',
  risk_questions: number[],
  vehicle?: { year: number }
}

export interface IResponse {
  auto: InsurancePlan,
  disability: InsurancePlan,
  home: InsurancePlan,
  life: InsurancePlan
}
