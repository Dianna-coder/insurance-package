import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { Router } from 'express'

import app from '../../../shared/infra/http/server'
import { IResponse } from '../dtos/create-risk-profile.dto'
import riskProfileRouter from '../infra/http/routes/risk-profile.routes'

chai.use(chaiHttp)

let router: Router

describe('INTEGRATION | Creating a risk profile', async () => {
  router = Router()
  router.use('/risk-profile', riskProfileRouter)

  app.use('/insurance-package', router)

  describe('POST /insurance-package/risk-profile - Successful risk profile creation', async () => {
    context('When the risk profile is created with all data being sent correctly', async () => {
      let requestResponse: {
        status: number;
        body: {
          erro?: boolean;
          message: string;
          result: IResponse
        }
      }

      before((done) => {
        chai.request(app).post('/insurance-package/risk-profile')
          .send({
            age: 61,
            dependents: 2,
            house: { ownership_status: 'owned' },
            income: 0,
            marital_status: 'married',
            risk_questions: [0, 1, 0],
            vehicle: { year: 2018 }
          })
          .then((response) => {
            requestResponse = {
              body: response.body,
              status: response.status
            }
            done()
          })
      })

      it('Must return status 200', (done) => {
        expect(requestResponse).to.have.status(200)
        done()
      })

      it('Should return error "false"', (done) => {
        expect(requestResponse.body.erro).to.be.equal(false)
        done()
      })

      it('Must return the result', (done) => {
        expect(requestResponse.body.result).to.not.be.undefined
        done()
      })
    })
  })
})
