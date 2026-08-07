import { NewUser, User } from '@/modules/users/domain/users.type.js'

export interface UserRepository {
  createUser: (newUser: NewUser) => Promise<User>
  findByEmail: (email: string) => Promise<User | null>
}
