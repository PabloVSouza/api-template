import GetUsers from './methods/GetUsers'

class UserController implements IControllers {
  public methods: IMethods
  constructor() {
    const getUsers = new GetUsers()
    this.methods = { getUsers }
  }
}

export default UserController
