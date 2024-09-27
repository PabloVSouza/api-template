import type { Request, Response, NextFunction } from 'express'
import { validateToken } from '@/utils/JWTIntegration'
import { PrismaClient } from '@prisma/client'

const verifyUser = async (id: number) => {
  const db = new PrismaClient()
  const dbPerson = await db.person.findUnique({ where: { id } })
  return !!dbPerson
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  const title = 'Authorization Error'

  if (!authorization) throw { title, statusCode: 400, message: 'Missing Authorization Header' }

  try {
    const payload = await validateToken(authorization)
    if (authorization && !!payload) {
      res.locals.jwt = payload
      const { id } = payload

      if (!(await verifyUser(Number(id)))) throw null
      next()
    }
  } catch (_e) {
    throw { title, statusCode: 401, message: 'Invalid Token' }
  }
}
