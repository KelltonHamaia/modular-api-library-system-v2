import { Book, NewBook } from '@/modules/books/domain/books.type.js'

export type BooksRepository = {
  createBook: (newBook: NewBook) => Promise<Book>
  findByTitleAndAuthor: (title: string, author: string) => Promise<Book | null>
  findAll: () => Promise<Book[]>
  findBookById: (id: string) => Promise<Book | null>
  decreaseAvailableCopy: (bookId: string) => Promise<Book | null>
  increaseAvailableCopy: (bookId: string) => Promise<Book | null>
}
