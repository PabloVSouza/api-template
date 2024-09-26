import type { Request } from 'express'

class GetHelloWorld implements IMethod {
  public params: IMethodParams = {
    verb: 'get',
    route: '/'
  }
  public exec(_req: Request): Promise<any> | any {
    return { message: 'Hello World' }
  }
}

export default GetHelloWorld
