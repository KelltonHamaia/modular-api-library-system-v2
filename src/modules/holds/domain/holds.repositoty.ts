import { NewHold, Hold } from '@/modules/holds/domain/holds.type.js'

export type HoldsRepository = {
  createHold: (newHold: NewHold) => Promise<Hold>
  findWaitingHoldByUserIdAndBookId: (
    userId: string,
    bookId: string,
  ) => Promise<Hold | null>
}
