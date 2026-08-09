import { DBExecutor } from '@/db/client.js'
import { loans } from '@/db/schema.js'
import { LoanRepository } from '@/modules/loans/domain/loans.repository.js'
import { and, count, eq, isNull } from 'drizzle-orm'

export const makeLoansRepository = (executor: DBExecutor): LoanRepository => {
  return {
    async countActiveLoansByUserId(userId) {
      const [activeLoans] = await executor
        .select({
          total: count(),
        })
        .from(loans)
        .where(eq(loans.userId, userId))
      return activeLoans.total
    },

    async findActiveLoanByUserIdAndBookId(userId, bookId) {
      const [loan] = await executor
        .select()
        .from(loans)
        .where(
          and(
            eq(loans.userId, userId),
            eq(loans.bookId, bookId),
            isNull(loans.returnDate),
          ),
        )

      return loan
    },

    async createLoan(newLoan) {
      const [loan] = await executor.insert(loans).values(newLoan).returning()
      return loan
    },
  }
}
