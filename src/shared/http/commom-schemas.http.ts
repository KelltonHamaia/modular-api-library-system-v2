import z from 'zod/v4'

export const idParamsSchema = z.object({
  id: z.uuid(),
})

export type IdParams = z.infer<typeof idParamsSchema>
