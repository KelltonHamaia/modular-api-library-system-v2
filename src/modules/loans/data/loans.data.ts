import { db, DBExecutor } from '@/db/client.js'
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
        .limit(1)

      return loan
    },

    async createLoan(newLoan) {
      const [loan] = await executor.insert(loans).values(newLoan).returning()
      return loan
    },

    async findLoanById(loanId) {
      const [loan] = await executor
        .select()
        .from(loans)
        .where(eq(loans.id, loanId))
      return loan ?? null
    },

    async returnBookById(loanId, overDue, returnDate) {
      const [loan] = await executor
        .update(loans)
        .set({ overDue, returnDate })
        .where(eq(loans.id, loanId))
        .returning()
      return loan
    },

    async findLoans() {
      return await executor.select().from(loans)
    },

    async findLoansByUserId(userId) {
      const userLoans = await executor
        .select()
        .from(loans)
        .where(eq(loans.userId, userId))
      return userLoans
    },
  }
}

export const loanData = makeLoansRepository(db)
