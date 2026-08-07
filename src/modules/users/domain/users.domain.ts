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

export const assertEmailIsNotTaken = (
  user: User | null,
  email: string,
): void => {
  if (user && user.email === email) {
    throw new customErrors.BusinessRuleError('Email provided already taken.')
  }
}
