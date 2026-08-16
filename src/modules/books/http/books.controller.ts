import { RequestHandler } from 'express'
import { validateSchema } from '@/shared/http/validate-request-schemas.shared.js'
import { createBookSchema } from '@/modules/books/http/books.schemas.js'
import * as service from '@/modules/books/books.service.js'
import { idParamsSchema } from '@/shared/http/commom-schemas.http.js'

export const postCreateBook: RequestHandler = async (req, res) => {
  const createBookInput = validateSchema(createBookSchema, req, 'body')
  const result = await service.createBook(createBookInput)
  return res.status(201).json({ result })
}

export const getListBooks: RequestHandler = async (req, res) => {
  const result = await service.listAllBooks()
  return res.status(200).json({ result })
}

export const getBookById: RequestHandler = async (req, res) => {
  const { id } = validateSchema(idParamsSchema, req, 'params')
  const result = await service.getBookById(id)
  return res.status(200).json({ result })
}
