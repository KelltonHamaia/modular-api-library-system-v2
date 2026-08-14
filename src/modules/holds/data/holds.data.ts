import { DBExecutor, db } from '@/db/client.js'
import { holds } from '@/db/schema.js'
import { HoldsRepository } from '@/modules/holds/domain/holds.repository.js'
import { and, asc, eq } from 'drizzle-orm'

export const makeHoldsRepository = (executor: DBExecutor): HoldsRepository => {
  return {
    async createHold(newHold) {
      const [hold] = await executor.insert(holds).values(newHold).returning()
      return hold
    },

    async findWaitingHoldByUserIdAndBookId(userId, bookId) {
      const conditions = and(
        eq(holds.userId, userId),
        eq(holds.bookId, bookId),
        eq(holds.status, 'WAITING'),
      )

      const [hold] = await executor
        .select()
        .from(holds)
        .where(conditions)
        .limit(1)
      return hold ?? null
    },

    async findHoldsByUserId(userId) {
      const userHolds = await executor
        .select()
        .from(holds)
        .where(eq(holds.userId, userId))
      return userHolds
    },

    async findHoldById(holdId) {
      const [hold] = await executor
        .select()
        .from(holds)
        .where(eq(holds.id, holdId))

      return hold ?? null
    },

    async cancelHoldById(holdId) {
      const [hold] = await executor
        .update(holds)
        .set({ status: 'CANCELLED' })
        .where(eq(holds.id, holdId))
        .returning()
      return hold
    },

    async listWaitingHoldByBookId(bookId) {
      const waitingHolds = await executor
        .select()
        .from(holds)
        .where(and(eq(holds.bookId, bookId), eq(holds.status, 'WAITING')))
        .orderBy(asc(holds.requestedAt))
      return waitingHolds
    },

    async fulfillHoldById(holdId) {
      const [fulfilledHold] = await executor
        .update(holds)
        .set({ status: 'FULFILED' })
        .where(eq(holds.id, holdId))
        .returning()
      return fulfilledHold
    },
  }
}

export const holdsData = makeHoldsRepository(db)
