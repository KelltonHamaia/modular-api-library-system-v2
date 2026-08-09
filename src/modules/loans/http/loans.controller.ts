import { createLoanSchema } from '@/modules/loans/http/loans.schemas.js'
import * as service from '@/modules/loans/loans.service.js'
import { validateSchema } from '@/shared/http/validate-request-schemas.shared.js'
import { RequestHandler } from 'express'

export const postCreateLoan: RequestHandler = async (req, res) => {
  const createLoanInput = validateSchema(createLoanSchema, req, 'body')
  const result = await service.createLoan(createLoanInput)

  return res.status(201).json({ result })
}
