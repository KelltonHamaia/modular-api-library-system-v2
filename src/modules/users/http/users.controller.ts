import { createUserSchema } from '@/modules/users/http/users.schemas.js'
import * as service from '@/modules/users/users.service.js'
import { idParamsSchema } from '@/shared/http/commom-schemas.http.js'
import { validateSchema } from '@/shared/http/validate-request-schemas.shared.js'
import { RequestHandler } from 'express'

export const postCreateUser: RequestHandler = async (req, res) => {
  const input = validateSchema(createUserSchema, req, 'body')
  const result = await service.createUser(input)
  return res.status(201).json({ result })
}
