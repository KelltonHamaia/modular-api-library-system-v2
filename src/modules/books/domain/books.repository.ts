import { Book, NewBook } from '@/modules/books/domain/books.type.js'

export type BooksRepository = {
  findByTitleAndAuthor: (title: string, author: string) => Promise<Book | null>
  createBook: (newBook: NewBook) => Promise<Book>
}
