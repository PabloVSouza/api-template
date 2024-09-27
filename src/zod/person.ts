import * as z from 'zod'

export const PersonModel = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  level: z.number().int().optional(),
  createdAt: z.date().optional()
})
