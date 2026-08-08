import { z } from 'zod/v4'

export const createBookSchema = z.object({
  title: z.string('Title is required'),
  author: z.string('Author is required'),
  totalCopies: z
    .number('totalCopies is required')
    .min(1, 'totalCopies must be greater than zero'),
})
