import { z } from 'zod/v4'

export const createLoanSchema = z.object({
  userId: z.uuid('User Id is required'),
  bookId: z.uuid('Book Id is required'),
})
