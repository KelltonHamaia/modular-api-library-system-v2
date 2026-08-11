import { DBExecutor, db } from '@/db/client.js'
import { holds, holds } from '@/db/schema.js'
import { HoldsRepository } from '@/modules/holds/domain/holds.repositoty.js'
import { and, eq } from 'drizzle-orm'

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

      const [hold] = await executor.select().from(holds).where(conditions)
      return hold ?? null
    },

    async findHoldsByUserId(userId) {
      const userHolds = await executor
        .select()
        .from(holds)
        .where(eq(holds.userId, userId))
      return userHolds
    },
  }
}

export const holdsData = makeHoldsRepository(db)
