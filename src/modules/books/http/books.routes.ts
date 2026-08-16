import { Router } from 'express'
import * as controller from '@/modules/books/http/books.controller.js'

export const booksRoutes = Router()
booksRoutes.post('/', controller.postCreateUser)
booksRoutes.get('/', controller.getListBooks)
booksRoutes.get('/:id', controller.getBookById)
