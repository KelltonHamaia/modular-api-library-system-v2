import {
  createUserSchema,
  updateUserStatusSchema,
} from '@/modules/users/http/users.schemas.js'
import * as service from '@/modules/users/users.service.js'
import { idParamsSchema } from '@/shared/http/commom-schemas.http.js'
import { validateSchema } from '@/shared/http/validate-request-schemas.shared.js'
import { RequestHandler } from 'express'

export const postCreateUser: RequestHandler = async (req, res) => {
  const input = validateSchema(createUserSchema, req, 'body')
  const result = await service.createUser(input)
  return res.status(201).json({ result })
}

export const getUserById: RequestHandler = async (req, res) => {
  const { id } = validateSchema(idParamsSchema, req, 'params')
  const result = await service.getUserById(id)
  return res.status(200).json({ result })
}

export const patchUserStatusById: RequestHandler = async (req, res) => {
  const { id } = validateSchema(idParamsSchema, req, 'params')
  const { status } = validateSchema(updateUserStatusSchema, req, 'body')

  const result = await service.updateUserStatusById(id, status)
  return res.status(200).json({ result })
}
