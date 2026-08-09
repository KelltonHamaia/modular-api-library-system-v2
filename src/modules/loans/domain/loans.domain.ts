import { Book } from '@/modules/books/domain/books.type.js'
import {
  CreateLoanInput,
  Loan,
  NewLoan,
} from '@/modules/loans/domain/loans.type.js'
import * as CustomError from '@/shared/errors/custom-errors.shared.js'

const LOAN_DURATION_DAYS = 14
const LOANS_PER_USER = 3

const calculateDueDate = (loanRequestDate: Date): Date => {
  const dueDate = new Date(loanRequestDate)
  dueDate.setDate(dueDate.getDate() + LOAN_DURATION_DAYS)

  return dueDate
}

export const buildLoan = (
  input: CreateLoanInput,
  loanRequestDate: Date,
): NewLoan => {
  return {
    ...input,
    dueDate: calculateDueDate(loanRequestDate),
    returnDate: null,
    overDue: false,
  }
}

export const assertNoActiveLoanForBook = (loan: Loan | null) => {
  if (loan) {
    throw new CustomError.BusinessRuleError('Book already loaned by user')
  }
}

export const assertWithinLoanLimit = (totalLoans: number) => {
  if (totalLoans >= LOANS_PER_USER) {
    throw new CustomError.BusinessRuleError(
      'maximum amount of loans per user exceeded',
    )
  }
}

export const assertBookHasAvailableCopy = (availableCopies: number) => {
  if (availableCopies <= 0) {
    throw new CustomError.BusinessRuleError('Book has no copies left to loan.')
  }
}
