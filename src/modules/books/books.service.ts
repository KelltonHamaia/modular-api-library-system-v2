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
