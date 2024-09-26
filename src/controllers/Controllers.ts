import UserController from 'controllers/User/UserController'
import HelloWorldController from './HelloWorld/HelloWorldController'

class Controllers {
  public methods = {} as IMethods

  constructor() {
    const userController = new UserController()
    const helloWorldController = new HelloWorldController()
    this.methods = {
      ...userController.methods,
      ...helloWorldController.methods
    }
  }
}

export default Controllers
