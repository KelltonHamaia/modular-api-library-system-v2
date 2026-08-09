import * as domain from '@/modules/books/domain/books.domain.js'
import { bookData } from '@/modules/books/data/books.data.js'
import { CreateBookInput } from '@/modules/books/domain/books.type.js'
import { BooksRepository } from '@/modules/books/domain/books.repository.js'

export const createBook = async (
  input: CreateBookInput,
  repository: BooksRepository = bookData,
) => {
  const rawBook = await repository.findByTitleAndAuthor(
    input.title,
    input.author,
  )
  domain.assertBookNotExists(rawBook)

  const builtBook = domain.buildNewBook(input)
  const book = await repository.createBook(builtBook)
  return book
}

export const listAllBooks = async (repository: BooksRepository = bookData) => {
  const books = await repository.findAll()
  return books
}

export const getBookById = async (
  id: string,
  repository: BooksRepository = bookData,
) => {
  const rawBook = await repository.findBookById(id)
  const book = domain.ensureBookExists(rawBook)

  return book
}
