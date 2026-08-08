import { DBExecutor, db } from '@/db/client.js'
import { books } from '@/db/schema.js'
import { BooksRepository } from '@/modules/books/domain/books.repository.js'
import { and, eq } from 'drizzle-orm'

export const makeBookRepository = async (
  executor: DBExecutor,
): Promise<BooksRepository> => {
  return {
    async findByTitleAndAuthor(title, author) {
      const condition = and(eq(books.title, title), eq(books.author, author))

      const [book] = await executor.select().from(books).where(condition)
      return book ?? null
    },
    async createBook(newBook) {
      const [book] = await executor.insert(books).values(newBook).returning()
      return book
    },
  }
}

export const bookData = await makeBookRepository(db)
