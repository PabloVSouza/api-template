import md5 from 'md5'
import type { Request } from 'express'
import { type PrismaClient } from '@prisma/client'
import { AuthenticateModel } from '@/zod/authenticate'
import { generateToken } from 'utils/JWTIntegration'

class Authenticate implements IMethod {
  public params: IMethodParams = {
    verb: 'post'
  }

  constructor(private db: PrismaClient) {}

  public async exec(req: Request) {
    AuthenticateModel.parse(req.body)

    const { email, password } = req.body

    const md5Password = md5(password)

    const dbPerson = await this.db.person.findFirst({ where: { email } })

    if (!dbPerson || md5Password !== dbPerson.password)
      throw { code: 400, message: 'Authentication Failed!' }

    const { id, level, name } = dbPerson
    const token = await generateToken({
      id,
      level,
      name
    })
    setTimeout(() => {}, 5000)
    return { id, level, name, token }
  }
}

export default Authenticate
