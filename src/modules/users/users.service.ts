import { userData } from '@/modules/users/data/users.data.js'
import * as domain from '@/modules/users/domain/users.domain.js'
import { UserRepository } from '@/modules/users/domain/users.repository.js'
import { CreateUserInput } from '@/modules/users/domain/users.type.js'
import { IdParams } from '@/shared/http/commom-schemas.http.js'

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
