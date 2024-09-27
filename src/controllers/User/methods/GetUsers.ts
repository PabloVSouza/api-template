import { PrismaClient } from '@prisma/client'
import type { Request } from 'express'

class GetUsers implements IMethod {
  constructor(private db: PrismaClient) {}

  public params: IMethodParams = {
    verb: 'post',
    requireAuth: true
  }

  public async exec(req: Request) {
    const personsDB = await this.db.person.findMany()
    return personsDB
  }
}

export default GetUsers
