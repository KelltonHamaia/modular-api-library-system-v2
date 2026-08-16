import {
  createHoldSchema,
  listHoldsQuerySchema,
} from '@/modules/holds/http/holds.schemas.js'
import { validateSchema } from '@/shared/http/validate-request-schemas.shared.js'
import { RequestHandler } from 'express'
import * as service from '@/modules/holds/holds.service.js'
import { idParamsSchema } from '@/shared/http/commom-schemas.http.js'

export const postCreateHold: RequestHandler = async (req, res) => {
  const createHoldInput = validateSchema(createHoldSchema, req, 'body')
  const result = await service.createHold(createHoldInput)
  return res.status(201).json({ result })
}

export const getListHolds: RequestHandler = async (req, res) => {
  const { userId } = validateSchema(listHoldsQuerySchema, req, 'query')
  const result = await service.getHoldsByUserId(userId)
  return res.status(200).json({ result })
}

export const deleteHoldById: RequestHandler = async (req, res) => {
  const { id } = validateSchema(idParamsSchema, req, 'params')
  const result = await service.cancelHoldById(id)
  return res.status(200).json({ result })
}
