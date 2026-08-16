import { Book } from '@/modules/books/domain/books.type.js'
import {
  CreateHoldInput,
  NewHold,
  HOLD_STATUS,
  Hold,
} from '@/modules/holds/domain/holds.type.js'
import * as CustomErrors from '@/shared/errors/custom-errors.shared.js'
const DEFAULT_STATUS: HOLD_STATUS = 'WAITING'

export const buildHold = (
  createHoldInput: CreateHoldInput,
  requestedAt: Date,
): NewHold => {
  return {
    ...createHoldInput,
    status: DEFAULT_STATUS,
    requestedAt: requestedAt,
  }
}

export const assertBookHasNoAvailableCopies = (book: Book) => {
  if (book.availableCopies > 0) {
    throw new CustomErrors.BusinessRuleError(
      'Book has available copies. No need to create hold.',
      'BOOK_HAS_AVAILABLE_COPIES',
    )
  }
}

export const assertHoldNotExists = (hold: Hold | null) => {
  if (hold) {
    throw new CustomErrors.ConflictError(
      'Cannot duplicate holds for same book.',
    )
  }
}

export const ensureHoldExists = (hold: Hold | null) => {
  if (!hold) {
    throw new CustomErrors.NotFoundError('Hold not found.')
  }
  return hold
}

export const assertHoldCanBeCancelled = (hold: Hold) => {
  const notAllowedToCancell = ['FULFILLED', 'CANCELLED']

  if (notAllowedToCancell.includes(hold.status)) {
    throw new CustomErrors.ConflictError(
      `Cannot cancell a hold that's already cancelled or fulfilled: Hold status ${hold.status}`,
    )
  }
}
