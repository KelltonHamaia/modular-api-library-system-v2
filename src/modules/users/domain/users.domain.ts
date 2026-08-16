import {
  CreateUserInput,
  NewUser,
  User,
} from '@/modules/users/domain/users.type.js'
import * as customErrors from '@/shared/errors/custom-errors.shared.js'

export const buildNewUser = (input: CreateUserInput): NewUser => {
  return {
    ...input,
    status: 'ACTIVE',
  }
}

export const assertEmailIsNotTaken = (user: User | null): void => {
  if (user) {
    throw new customErrors.ConflictError('Email provided already taken.')
  }
}

export const ensureUserExists = (rawUser: User | null): User => {
  if (!rawUser) {
    throw new customErrors.NotFoundError('User not found')
  }
  return rawUser
}

export const assertUserIsActive = (user: User) => {
  if (user.status === 'SUSPENDED') {
    throw new customErrors.BusinessRuleError('User is suspended.')
  }
}
