import GetUsers from './methods/GetUsers'
import CreateUser from './methods/CreateUsers'
import type { PrismaClient } from '@prisma/client'

class UserController implements IControllers {
  public methods: IMethods
  constructor(db: PrismaClient) {
    const getUsers = new GetUsers(db)
    const createUser = new CreateUser(db)
    this.methods = { createUser, getUsers }
  }
}

export default UserController
