import { userData } from '@/modules/users/data/users.data.js'
import * as domain from '@/modules/users/domain/users.domain.js'
import { UserRepository } from '@/modules/users/domain/users.repository.js'
import {
  CreateUserInput,
  UserStatus,
} from '@/modules/users/domain/users.type.js'

export const createUser = async (
  createUserInput: CreateUserInput,
  repository: UserRepository = userData,
) => {
  const userWithEmail = await repository.findByEmail(createUserInput.email)
  domain.assertEmailIsNotTaken(userWithEmail, createUserInput.email)

  const builtUser = domain.buildNewUser(createUserInput)
  const newUser = await repository.createUser(builtUser)

  return newUser
}

export const getUserById = async (
  id: string,
  repository: UserRepository = userData,
) => {
  const rawUser = await repository.findById(id)
  const user = domain.ensureUserExists(rawUser)
  return user
}

export const updateUserStatusById = async (
  id: string,
  status: UserStatus,
  repository: UserRepository = userData,
) => {
  const rawUser = await repository.findById(id)
  const user = domain.ensureUserExists(rawUser)

  if (user.status === status) {
    return {
      user,
      statusChanged: false,
    }
  }

  const updatedUser = await repository.updateStatus(user.id, status)
  return {
    user: updatedUser,
    statusChanged: true,
  }
}

export const getActiveUserById = async (
  id: string,
  repository: UserRepository = userData,
) => {
  const rawUser = await repository.findById(id)
  const user = domain.ensureUserExists(rawUser)
  domain.assertUserIsActive(user)
  return user
}
