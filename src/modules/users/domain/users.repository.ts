import { NewUser, User, UserStatus } from '@/modules/users/domain/users.type.js'

export interface UserRepository {
  createUser: (newUser: NewUser) => Promise<User>
  findUserByEmail: (email: string) => Promise<User | null>
  findUserById: (id: string) => Promise<User | null>
  updateUserStatus: (id: string, status: UserStatus) => Promise<User>
  findActiveUsersById: (ids: string[]) => Promise<User[]>
}
