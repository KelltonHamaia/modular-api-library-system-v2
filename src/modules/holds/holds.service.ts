import * as domain from '@/modules/holds/domain/holds.domain.js'
import { holdsData } from '@/modules/holds/data/holds.data.js'
import { HoldsRepository } from '@/modules/holds/domain/holds.repositoty.js'
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
