import UserController from 'controllers/User/UserController'
import HelloWorldController from 'controllers/HelloWorld/HelloWorldController'
import AuthenticateController from 'controllers/Authenticate/AuthenticateController'
import { PrismaClient } from '@prisma/client'

class Controllers {
  public controllers = {} as { [key: string]: IControllers }

  constructor() {
    const db = new PrismaClient()
    const helloWorldController = new HelloWorldController()
    const userController = new UserController(db)
    const authenticateController = new AuthenticateController(db)

    this.controllers = {
      helloWorldController,
      userController,
      authenticateController
    }
  }
}

export default Controllers
