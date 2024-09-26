import type { Request } from 'express'

class GetUsers implements IMethod {
  public params: IMethodParams = {
    verb: 'post',
    requireAuth: true
  }
  public exec(req: Request): Promise<any> | any {
    const { name } = req.body
    return { message: `Hello ${name}` }
  }
}

export default GetUsers
