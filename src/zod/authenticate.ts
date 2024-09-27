import * as z from 'zod'

export const AuthenticateModel = z.object({
  email: z.string(),
  password: z.string()
})
