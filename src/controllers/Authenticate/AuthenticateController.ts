import type { PrismaClient } from '@prisma/client'
import Authenticate from './methods/Authenticate'
import Me from './methods/Me'

class AuthenticateController implements IControllers {
  public methods: IMethods
  constructor(db: PrismaClient) {
    const authenticate = new Authenticate(db)
    const me = new Me(db)
    this.methods = { authenticate, me }
  }
}

export default AuthenticateController
