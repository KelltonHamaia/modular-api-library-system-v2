import { type Request } from 'express'
import { ZodType } from 'zod/v4'

type RequestSource = 'body' | 'params' | 'query'

export const validateSchema = <T>(
  schema: ZodType<T>,
  request: Request,
  option: RequestSource,
) => {
  return schema.parse(request[option])
}
