import { db } from '@/db/client.js'
import { makeLoansRepository } from '@/modules/loans/data/loans.data.js'
import { CreateLoanInput } from '@/modules/loans/domain/loans.type.js'
import { getActiveUserById } from '@/modules/users/index.js'

import * as domain from '@/modules/loans/domain/loans.domain.js'
import { getBookById, makeBookRepository } from '@/modules/books/index.js'

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
