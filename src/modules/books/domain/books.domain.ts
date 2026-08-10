import {
  Book,
  CreateBookInput,
  NewBook,
} from '@/modules/books/domain/books.type.js'
import * as CustomErrors from '@/shared/errors/custom-errors.shared.js'
export const buildNewBook = (input: CreateBookInput): NewBook => {
  return {
    ...input,
    availableCopies: input.totalCopies,
  }
}

export const assertBookNotExists = (book: Book | null): void => {
  if (book) {
    throw new CustomErrors.ConflictError('Book already exists.')
  }
}

export const ensureBookExists = (book: Book | null) => {
  if (!book) {
    throw new CustomErrors.NotFoundError('Book not found.')
  }
  return book
}

export const assertAvailableCopiesIncreased = (book: Book | null) => {
  if (!book) {
    throw new CustomErrors.BusinessRuleError(
      'AvailableCopies cannot exceed TotalCopies',
    )
  }
}
