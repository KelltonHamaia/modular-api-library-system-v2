import { NewHold, Hold } from '@/modules/holds/domain/holds.type.js'

export type HoldsRepository = {
  createHold: (newHold: NewHold) => Promise<Hold>
  findWaitingHoldByUserIdAndBookId: (
    userId: string,
    bookId: string,
  ) => Promise<Hold | null>

  findHoldsByUserId: (userId: string) => Promise<Hold[]>
  findHoldById: (holdId: string) => Promise<Hold | null>
  cancelHoldById: (holdId: string) => Promise<Hold>
}
