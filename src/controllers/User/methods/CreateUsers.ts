import type { Request } from 'express'
import type { PrismaClient } from '@prisma/client'
import md5 from 'md5'
import { PersonModel } from '@/zod/person'
import { PrismaClientKnownRequestError, prismaError } from 'prisma-better-errors'

class CreateUser implements IMethod {
  constructor(private db: PrismaClient) {}

  public params: IMethodParams = {
    verb: 'post',
    requireAuth: true
  }

  public async exec(req: Request) {
    req.body.password = md5(req.body.password)
    PersonModel.parse(req.body)
    try {
      const dbPerson = await this.db.person.create({ data: req.body })
      return dbPerson
    } catch (err) {
      throw new prismaError(err as PrismaClientKnownRequestError)
    }
  }
}

export default CreateUser
