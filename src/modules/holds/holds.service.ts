import * as domain from '@/modules/holds/domain/holds.domain.js'
import { holdsData } from '@/modules/holds/data/holds.data.js'
import { HoldsRepository } from '@/modules/holds/domain/holds.repository.js'
import { CreateHoldInput } from '@/modules/holds/domain/holds.type.js'

import { getActiveUserById } from '@/modules/users/index.js'
import { getBookById } from '@/modules/books/index.js'

export const createHold = async (
  createHoldInput: CreateHoldInput,
  repository: HoldsRepository = holdsData,
) => {
  const [user, book] = await Promise.all([
    getActiveUserById(createHoldInput.userId),
    getBookById(createHoldInput.bookId),
  ])
  domain.assertBookHasNoAvailableCopies(book)
  const waitingHold = await repository.findWaitingHoldByUserIdAndBookId(
    user.id,
    book.id,
  )
  domain.assertHoldNotExists(waitingHold)
  const builtHold = domain.buildHold(createHoldInput, new Date())
  const newHold = await repository.createHold(builtHold)
  return newHold
}

export const getHoldsByUserId = async (
  userId: string,
  repository: HoldsRepository = holdsData,
) => {
  const userHolds = await repository.findHoldsByUserId(userId)
  return userHolds
}

export const cancelHoldById = async (
  holdId: string,
  repository: HoldsRepository = holdsData,
) => {
  const rawHold = await repository.findHoldById(holdId)
  const hold = domain.ensureHoldExists(rawHold)
  domain.assertHoldCanBeCancelled(hold)
  const cancelled = await repository.cancelHoldById(hold.id)
  return cancelled
}

export const listWaitingHoldByBookId = async (
  bookId: string,
  repository: HoldsRepository = holdsData,
) => {
  const holds = await repository.listWaitingHoldByBookId(bookId)
  return holds
}

export const fulfillHoldById = async (
  holdId: string,
  repository: HoldsRepository = holdsData,
) => {
  const fulfilledHold = await repository.fulfillHoldById(holdId)
  return fulfilledHold
}
