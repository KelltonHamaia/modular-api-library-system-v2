import { DBExecutor, db } from '@/db/client.js'
import { books } from '@/db/schema.js'
import { BooksRepository } from '@/modules/books/domain/books.repository.js'
import { and, eq, gt, lt, sql } from 'drizzle-orm'

export const makeBookRepository = (executor: DBExecutor): BooksRepository => {
  return {
    async createBook(newBook) {
      const [book] = await executor.insert(books).values(newBook).returning()
      return book
    },

    async findByTitleAndAuthor(title, author) {
      const condition = and(eq(books.title, title), eq(books.author, author))

      const [book] = await executor.select().from(books).where(condition)
      return book ?? null
    },

    async findAll() {
      return await executor.select().from(books)
    },

    async findBookById(id) {
      const [book] = await executor.select().from(books).where(eq(books.id, id))
      return book ?? null
    },

    async increaseAvailableCopy(bookId) {
      const [book] = await executor
        .update(books)
        .set({ availableCopies: sql`${books.availableCopies} + 1` })
        .where(
          and(
            eq(books.id, bookId),
            lt(books.availableCopies, books.totalCopies),
          ),
        )
        .returning()
      return book ?? null
    },

    async decreaseAvailableCopy(bookId) {
      const [book] = await executor
        .update(books)
        .set({ availableCopies: sql`${books.availableCopies} - 1` })
        .where(and(eq(books.id, bookId), gt(books.availableCopies, 0)))
        .returning()
      return book ?? null
    },
  }
}

export const bookData = await makeBookRepository(db)
