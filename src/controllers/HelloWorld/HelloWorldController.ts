import GetHelloWorld from './methods/GetHelloWorld'

class HelloWorldController implements IControllers {
  public methods: IMethods
  constructor() {
    const getHelloWorld = new GetHelloWorld()
    this.methods = { getHelloWorld }
  }
}

export default HelloWorldController
