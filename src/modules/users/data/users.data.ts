import { db, DBExecutor } from '@/db/client.js'
import { users } from '@/db/schema.js'
import { UserRepository } from '@/modules/users/domain/users.repository.js'
import { eq } from 'drizzle-orm'

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
  }
}

export const userData = makeUserRepository(db)
