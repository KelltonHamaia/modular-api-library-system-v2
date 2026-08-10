import { db } from '@/db/client.js'
import { makeLoansRepository } from '@/modules/loans/data/loans.data.js'
import { CreateLoanInput } from '@/modules/loans/domain/loans.type.js'
import { getActiveUserById } from '@/modules/users/index.js'

import * as domain from '@/modules/loans/domain/loans.domain.js'
import {
  getBookById,
  makeBookRepository,
  assertAvailableCopiesIncreased,
} from '@/modules/books/index.js'

export const createLoan = async (createLoanInput: CreateLoanInput) => {
  const { bookId, userId } = createLoanInput
  const user = await getActiveUserById(userId)

  const newLoan = await db.transaction(async (tx) => {
    const bookRepository = makeBookRepository(tx)
    const loanRepository = makeLoansRepository(tx)

    const [book, activeLoan, countActiveLoans] = await Promise.all([
      getBookById(bookId, bookRepository),
      loanRepository.findActiveLoanByUserIdAndBookId(user.id, bookId),
      loanRepository.countActiveLoansByUserId(user.id),
    ])

    domain.assertBookHasAvailableCopy(book.availableCopies)
    domain.assertNoActiveLoanForBook(activeLoan)
    domain.assertWithinLoanLimit(countActiveLoans)

    const builtLoan = domain.buildLoan(createLoanInput, new Date())
    const loan = await loanRepository.createLoan(builtLoan)
    await bookRepository.decreaseAvailableCopy(bookId)

    return loan
  })

  return newLoan
}

export const returnLoan = async (loanId: string) => {
  return await db.transaction(async (tx) => {
    const loanRepository = makeLoansRepository(tx)
    const bookRepository = makeBookRepository(tx)

    const rawLoan = await loanRepository.findLoanById(loanId)
    const loan = domain.ensureLoanExists(rawLoan)
    domain.ensureLoanHasNotBeenReturned(loan)

    const returnDate = new Date()
    const isOverDue = domain.calculateLoanIsOverdue(loan.dueDate, new Date())
    const returnedLoan = await loanRepository.returnBookById(
      loan.id,
      isOverDue,
      returnDate,
    )
    const book = await bookRepository.increaseAvailableCopy(loan.bookId)
    assertAvailableCopiesIncreased(book)
    return returnedLoan
  })
}
