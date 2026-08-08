import z from 'zod/v4'

export const createUserSchema = z.object({
  name: z.string('Name is required'),
  email: z.email('Invalid value for email'),
})

export const updateUserStatusSchema = z.object({
  status: z.enum(['ACTIVE', 'SUSPENDED']),
})
