import { NewUser, User, UserStatus } from '@/modules/users/domain/users.type.js'

export interface UserRepository {
  createUser: (newUser: NewUser) => Promise<User>
  findByEmail: (email: string) => Promise<User | null>
  findById: (id: string) => Promise<User | null>
  updateStatus: (id: string, status: UserStatus) => Promise<User>
}
