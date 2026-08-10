import { createLoanSchema } from '@/modules/loans/http/loans.schemas.js'
import * as service from '@/modules/loans/loans.service.js'
import { idParamsSchema } from '@/shared/http/commom-schemas.http.js'
import { validateSchema } from '@/shared/http/validate-request-schemas.shared.js'
import { RequestHandler } from 'express'

export const postCreateLoan: RequestHandler = async (req, res) => {
  const createLoanInput = validateSchema(createLoanSchema, req, 'body')
  const result = await service.createLoan(createLoanInput)

  return res.status(201).json({ result })
}

export const patchReturnLoan: RequestHandler = async (req, res) => {
  const { id: loanId } = validateSchema(idParamsSchema, req, 'params')
  const result = await service.returnLoan(loanId)
  return res.status(200).json({ result })
}
