import { Loan, NewLoan } from '@/modules/loans/domain/loans.type.js'

export type LoanRepository = {
  countActiveLoansByUserId: (userId: string) => Promise<number>
  findActiveLoanByUserIdAndBookId: (
    userId: string,
    bookId: string,
  ) => Promise<Loan | null>
  createLoan: (newLoan: NewLoan) => Promise<Loan>
  findLoanById: (loanId: string) => Promise<Loan | null>
  returnBookById: (
    loanId: string,
    overDue: boolean,
    returnDate: Date,
  ) => Promise<Loan>
  findLoans: () => Promise<Loan[]>
  findLoansByUserId: (userId: string) => Promise<Loan[]>
}
