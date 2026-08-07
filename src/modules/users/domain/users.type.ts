export type UserStatus = 'ACTIVE' | 'SUSPENDED'

export type CreateUserInput = {
  name: string
  email: string
}

export type NewUser = CreateUserInput & { status: UserStatus }
export type User = NewUser & { id: string }
