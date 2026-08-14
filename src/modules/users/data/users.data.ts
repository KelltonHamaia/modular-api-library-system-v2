import { db, DBExecutor } from '@/db/client.js'
import { users } from '@/db/schema.js'
import { UserRepository } from '@/modules/users/domain/users.repository.js'
import { and, eq, inArray } from 'drizzle-orm'

export const makeUserRepository = (executor: DBExecutor): UserRepository => {
  return {
    async createUser(newUser) {
      const [user] = await executor.insert(users).values(newUser).returning()
      return user
    },

    async findByEmail(email) {
      const [user] = await executor
        .select()
        .from(users)
        .where(eq(users.email, email))
      return user ?? null
    },

    async findById(id) {
      const [user] = await executor.select().from(users).where(eq(users.id, id))
      return user ?? null
    },

    async updateStatus(id, status) {
      const [user] = await executor
        .update(users)
        .set({ status })
        .where(eq(users.id, id))
        .returning()
      return user
    },

    async findActiveUsersById(ids) {
      const activeUsers = await executor
        .select()
        .from(users)
        .where(and(eq(users.status, 'ACTIVE'), inArray(users.id, ids)))
      return activeUsers
    },
  }
}

export const userData = makeUserRepository(db)
