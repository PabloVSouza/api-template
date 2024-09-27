import md5 from 'md5'
import type { Request, Response } from 'express'
import { type PrismaClient } from '@prisma/client'
import Clone from 'utils/Clone'

class Me implements IMethod {
  constructor(private db: PrismaClient) {}

  public params: IMethodParams = {
    verb: 'get',
    requireAuth: true
  }

  public async exec(_req: Request, res: Response) {
    const { id } = res.locals.jwt

    const personDB = await this.db.person.findUnique({ where: { id } })

    if (personDB) {
      const response = Clone(personDB)
      delete response.password
      return response
    }
  }
}

export default Me
