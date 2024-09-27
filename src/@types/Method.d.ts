interface request extends Express.Request {}

interface response extends Express.Response {}

interface IMethodParams {
  requireAuth?: boolean
  requiredLevel?: number
  route?: string
  verb: 'get' | 'post' | 'put' | 'patch' | 'delete'
  [key: string]: any
}

interface IMethod {
  params: IMethodParams
  exec(req?: request, res?: response): Promise<any> | any
}
interface IMethods {
  [key: string]: IMethod
}
