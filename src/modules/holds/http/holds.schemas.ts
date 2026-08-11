import { z } from 'zod/v4'

export const createHoldSchema = z.object({
  userId: z.uuid('User Id is required'),
  bookId: z.uuid('Book Id is required'),
})

export const listHoldsQuerySchema = z.object({
  userId: z.uuid('User id is required '),
})
