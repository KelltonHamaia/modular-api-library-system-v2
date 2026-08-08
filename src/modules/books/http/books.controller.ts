import { RequestHandler } from 'express'
import { validateSchema } from '@/shared/http/validate-request-schemas.shared.js'
import { createBookSchema } from '@/modules/books/http/books.schemas.js'
import * as service from '@/modules/books/books.service.js'

export const postCreateUser: RequestHandler = async (req, res) => {
  const createBookInput = validateSchema(createBookSchema, req, 'body')
  const result = await service.createBook(createBookInput)
  return res.status(201).json({ result })
}
