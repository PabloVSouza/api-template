import { Router, Request, Response, NextFunction } from 'express'
import requireAuth from '@/middlewares/requireAuth'
import ErrorHandler from '@/utils/ErrorHandler'
import ResponseFormatter from '@/utils/ResponseFormatter'

class Routes {
  public routes: Router
  private availableMiddleWares = { requireAuth } as { [key: string]: any }

  constructor(methods: IMethods) {
    this.routes = Router()

    for (const method of Object.keys(methods)) {
      const { params, exec } = methods[method]
      this.routes[params.verb](
        params.route ?? `/${method}`,
        ...this.wrapMiddlewares(this.getMiddlewares(params)),
        this.wrapAsync(exec),
        ResponseFormatter
      )
    }

    this.routes.use(ErrorHandler)
  }

  private getMiddlewares = (params: IMethodParams) => {
    const middleWareKeys = Object.keys(this.availableMiddleWares)

    const middleWares = Object.keys(params)
      .filter((param) => middleWareKeys.includes(param))
      .map((param) => this.availableMiddleWares[param])

    return middleWares
  }

  private wrapMiddlewares = (middlewares: Function[]) => {
    return middlewares.map((middleware) => this.wrapAsync(middleware))
  }

  private wrapAsync = (fn: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await fn(req, res, next)
        res.locals.data = result
        next()
      } catch (err) {
        next(err)
      }
    }
  }
}

export default Routes
