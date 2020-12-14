import { Joi, SchemaOptions } from 'celebrate'

import { MaritalStatus, OwnershipStatus } from '../../../../../../types/index.enum'

export const CreateRiskProfileSchema: SchemaOptions = {
  body: Joi.object({
    age: Joi.number().min(0).required(),
    dependents: Joi.number().min(0).required(),
    house: Joi.object().keys({
      ownership_status: Joi.string().valid(OwnershipStatus.MORTGAGED, OwnershipStatus.OWNED)
    }).optional(),
    income: Joi.number().min(0).required(),
    marital_status: Joi.string().valid(MaritalStatus.MARRIED, MaritalStatus.SINGLE),
    risk_questions: Joi.array().items(Joi.number()).length(3).required(),
    vehicle: Joi.object().keys({
      year: Joi.number().min(0)
    }).optional()
  }).required()
}
