import { Loan, NewLoan } from '@/modules/loans/domain/loans.type.js'

export type LoanRepository = {
  countActiveLoansByUserId: (userId: string) => Promise<number>
  findActiveLoanByUserIdAndBookId: (
    userId: string,
    bookId: string,
  ) => Promise<Loan | null>
  createLoan: (newLoan: NewLoan) => Promise<Loan>
}
