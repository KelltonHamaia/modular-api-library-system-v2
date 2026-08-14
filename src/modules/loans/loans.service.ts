import { db } from '@/db/client.js'
import {
  loanData,
  makeLoansRepository,
} from '@/modules/loans/data/loans.data.js'
import { CreateLoanInput } from '@/modules/loans/domain/loans.type.js'
import {
  getActiveUserById,
  listActiveUsersByIds,
} from '@/modules/users/index.js'

import {
  assertAvailableCopiesIncreased,
  getBookById,
  makeBookRepository,
} from '@/modules/books/index.js'
import {
  listWaitingHoldByBookId,
  makeHoldsRepository,
} from '@/modules/holds/index.js'
import * as domain from '@/modules/loans/domain/loans.domain.js'
import { LoanRepository } from '@/modules/loans/domain/loans.repository.js'

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

    const waitingHolds = await listWaitingHoldByBookId(loan.bookId)

    const candidateUserIds = waitingHolds.map((hold) => hold.userId)
    const activeUser = await listActiveUsersByIds(candidateUserIds)
    const activeUserIds = new Set(activeUser.map((user) => user.id))

    let holdToFulfill = null

    for (const hold of waitingHolds) {
      if (!activeUserIds.has(hold.userId)) {
        continue
      }
      const holderActiveLoans = await loanRepository.countActiveLoansByUserId(
        hold.userId,
      )
      if (domain.isWithinLoanLimit(holderActiveLoans)) {
        holdToFulfill = hold
        break
      }
    }

    if (holdToFulfill) {
      const { bookId, userId } = holdToFulfill
      const createLoanInput = { bookId, userId }
      const builtLoan = domain.buildLoan(createLoanInput, new Date())
      const newLoan = await loanRepository.createLoan(builtLoan)
      const holdRepository = makeHoldsRepository(tx)
      await holdRepository.fulfillHoldById(holdToFulfill.id)
      return {
        returnedLoan,
        holdFulfilled: newLoan,
      }
    } else {
      const book = await bookRepository.increaseAvailableCopy(loan.bookId)
      assertAvailableCopiesIncreased(book)
      return {
        returnedLoan,
        holdFulfilled: null,
      }
    }
  })
}

export const listLoans = async (db: LoanRepository = loanData) => {
  const loans = await db.findLoans()
  return loans
}

export const listLoansByUserId = async (
  userId: string,
  db: LoanRepository = loanData,
) => {
  const loans = await db.findLoansByUserId(userId)
  return loans
}
