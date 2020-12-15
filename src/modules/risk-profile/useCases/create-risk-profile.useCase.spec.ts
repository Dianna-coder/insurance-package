import { expect } from 'chai'

import {
  CalculateRiskScore
} from '../../../shared/calculate-risk-score/implementations/calculate-risk-score.service'
import {
  ConvertScoreToPlan
} from '../../../shared/convert-score-to-plan/implementations/convert-score-to-plan.service'
import { InsurancePlan } from '../../../types/index.enum'
import CreateRiskProfileUseCase from './create-risk-profile.useCase'

describe('UNIT | Test of risk profile creation', () => {
  let calculateRiskScore: CalculateRiskScore
  let convertScoreToPlan: ConvertScoreToPlan
  let createRiskProfileUseCase: CreateRiskProfileUseCase

  before(async () => {
    calculateRiskScore = new CalculateRiskScore()
    convertScoreToPlan = new ConvertScoreToPlan()

    createRiskProfileUseCase = new CreateRiskProfileUseCase(
      calculateRiskScore,
      convertScoreToPlan
    )
  })

  it('When the risk profile is successfully created', async () => {
    const riskProfile = await createRiskProfileUseCase.execute({
      age: 35,
      dependents: 2,
      house: { ownership_status: 'owned' },
      income: 0,
      marital_status: 'married',
      risk_questions: [0, 1, 0],
      vehicle: { year: 2018 }
    })

    expect(riskProfile.auto).be.eql(InsurancePlan.REGULAR)
    expect(riskProfile.disability).be.eql(InsurancePlan.ECONOMIC)
    expect(riskProfile.home).be.eql(InsurancePlan.ECONOMIC)
    expect(riskProfile.life).be.eql(InsurancePlan.REGULAR)
  })

  it('When the user has no income, vehicles or home', async () => {
    const riskProfile = await createRiskProfileUseCase.execute({
      age: 35,
      dependents: 2,
      income: 0,
      marital_status: 'married',
      risk_questions: [0, 1, 0]
    })

    expect(riskProfile.auto).be.eql(InsurancePlan.INELIGIBLE)
    expect(riskProfile.disability).be.eql(InsurancePlan.INELIGIBLE)
    expect(riskProfile.home).be.eql(InsurancePlan.INELIGIBLE)
    expect(riskProfile.life).be.eql(InsurancePlan.REGULAR)
  })

  it('When the user is over 60 years old', async () => {
    const riskProfile = await createRiskProfileUseCase.execute({
      age: 61,
      dependents: 2,
      house: { ownership_status: 'owned' },
      income: 0,
      marital_status: 'married',
      risk_questions: [0, 1, 0],
      vehicle: { year: 2018 }
    })

    expect(riskProfile.auto).be.eql(InsurancePlan.REGULAR)
    expect(riskProfile.disability).be.eql(InsurancePlan.INELIGIBLE)
    expect(riskProfile.home).be.eql(InsurancePlan.REGULAR)
    expect(riskProfile.life).be.eql(InsurancePlan.INELIGIBLE)
  })

  it('When the user is under 30 years old', async () => {
    const riskProfile = await createRiskProfileUseCase.execute({
      age: 29,
      dependents: 2,
      house: { ownership_status: 'owned' },
      income: 0,
      marital_status: 'married',
      risk_questions: [0, 1, 0],
      vehicle: { year: 2018 }
    })

    expect(riskProfile.auto).be.eql(InsurancePlan.ECONOMIC)
    expect(riskProfile.disability).be.eql(InsurancePlan.ECONOMIC)
    expect(riskProfile.home).be.eql(InsurancePlan.ECONOMIC)
    expect(riskProfile.life).be.eql(InsurancePlan.REGULAR)
  })

  it('When the user is between 30 and 40 years old', async () => {
    const riskProfile = await createRiskProfileUseCase.execute({
      age: 39,
      dependents: 2,
      house: { ownership_status: 'owned' },
      income: 0,
      marital_status: 'married',
      risk_questions: [0, 1, 0],
      vehicle: { year: 2018 }
    })

    expect(riskProfile.auto).be.eql(InsurancePlan.REGULAR)
    expect(riskProfile.disability).be.eql(InsurancePlan.ECONOMIC)
    expect(riskProfile.home).be.eql(InsurancePlan.ECONOMIC)
    expect(riskProfile.life).be.eql(InsurancePlan.REGULAR)
  })

  it('When the user has an income greater than 200000', async () => {
    const riskProfile = await createRiskProfileUseCase.execute({
      age: 35,
      dependents: 2,
      house: { ownership_status: 'owned' },
      income: 200001,
      marital_status: 'married',
      risk_questions: [0, 1, 0],
      vehicle: { year: 2018 }
    })

    expect(riskProfile.auto).be.eql(InsurancePlan.ECONOMIC)
    expect(riskProfile.disability).be.eql(InsurancePlan.ECONOMIC)
    expect(riskProfile.home).be.eql(InsurancePlan.ECONOMIC)
    expect(riskProfile.life).be.eql(InsurancePlan.REGULAR)
  })

  it('When the user has a mortgage', async () => {
    const riskProfile = await createRiskProfileUseCase.execute({
      age: 39,
      dependents: 2,
      house: { ownership_status: 'mortgaged' },
      income: 200000,
      marital_status: 'married',
      risk_questions: [0, 1, 0],
      vehicle: { year: 2018 }
    })

    expect(riskProfile.auto).be.eql(InsurancePlan.REGULAR)
    expect(riskProfile.disability).be.eql(InsurancePlan.REGULAR)
    expect(riskProfile.home).be.eql(InsurancePlan.REGULAR)
    expect(riskProfile.life).be.eql(InsurancePlan.REGULAR)
  })

  it('When the user has no dependents', async () => {
    const riskProfile = await createRiskProfileUseCase.execute({
      age: 39,
      dependents: 0,
      house: { ownership_status: 'mortgaged' },
      income: 200000,
      marital_status: 'married',
      risk_questions: [0, 1, 0],
      vehicle: { year: 2018 }
    })

    expect(riskProfile.auto).be.eql(InsurancePlan.REGULAR)
    expect(riskProfile.disability).be.eql(InsurancePlan.ECONOMIC)
    expect(riskProfile.home).be.eql(InsurancePlan.REGULAR)
    expect(riskProfile.life).be.eql(InsurancePlan.REGULAR)
  })

  it('When the user is single', async () => {
    const riskProfile = await createRiskProfileUseCase.execute({
      age: 39,
      dependents: 0,
      house: { ownership_status: 'mortgaged' },
      income: 200000,
      marital_status: 'single',
      risk_questions: [0, 1, 0],
      vehicle: { year: 2018 }
    })

    expect(riskProfile.auto).be.eql(InsurancePlan.REGULAR)
    expect(riskProfile.disability).be.eql(InsurancePlan.REGULAR)
    expect(riskProfile.home).be.eql(InsurancePlan.REGULAR)
    expect(riskProfile.life).be.eql(InsurancePlan.ECONOMIC)
  })

  it('When the user has a vehicle that has not been produced in the last five years', async () => {
    const riskProfile = await createRiskProfileUseCase.execute({
      age: 39,
      dependents: 0,
      house: { ownership_status: 'mortgaged' },
      income: 200000,
      marital_status: 'single',
      risk_questions: [0, 1, 0],
      vehicle: { year: 2014 }
    })

    expect(riskProfile.auto).be.eql(InsurancePlan.ECONOMIC)
    expect(riskProfile.disability).be.eql(InsurancePlan.REGULAR)
    expect(riskProfile.home).be.eql(InsurancePlan.REGULAR)
    expect(riskProfile.life).be.eql(InsurancePlan.ECONOMIC)
  })
})
