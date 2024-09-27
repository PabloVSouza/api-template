import { Router, Request, Response, NextFunction } from 'express'
import requireAuth from 'middlewares/requireAuth'
import requiredLevel from '@/middlewares/requiredLevel'
import ErrorHandler from 'utils/ErrorHandler'
import ResponseFormatter from 'utils/ResponseFormatter'
import type Controllers from '@/controllers/Controllers'

class Routes {
  public routes: Router
  private availableMiddleWares = { requireAuth, requiredLevel } as { [key: string]: any }

  constructor(controllers: Controllers) {
    this.routes = Router()

    Object.values(controllers.controllers).forEach((controller) => {
      const methods = this.getMethods(controller)

      methods.forEach(({ methodName, exec, params }) => {
        const routePath = params.route ?? `/${methodName}`

        this.routes[params.verb](
          routePath,
          this.setParams(params),
          ...this.wrapMiddlewares(this.getMiddlewares(params)),
          this.wrapExecAsync(exec),
          ResponseFormatter
        )
      })
    })

    this.routes.use(ErrorHandler)
  }

  private setParams = (params: IMethodParams) => {
    return (_req: Request, res: Response, next: NextFunction) => {
      res.locals.params = params
      next()
    }
  }

  private getMethods(controller: IControllers) {
    return Object.entries(controller.methods).map(([methodName, objMethod]) => ({
      methodName,
      exec: objMethod.exec.bind(objMethod),
      params: objMethod.params
    }))
  }

  private getMiddlewares = (params: IMethodParams) => {
    return Object.keys(this.availableMiddleWares)
      .filter((key) => params[key])
      .map((key) => this.availableMiddleWares[key])
  }

  private wrapMiddlewares = (middlewares: Function[]) => {
    return middlewares.map(this.wrapMiddlewareAsync)
  }

  private wrapMiddlewareAsync = (middleware: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await middleware(req, res, next)
      } catch (err) {
        next(err)
      }
    }
  }

  private wrapExecAsync = (exec: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        res.locals.data = await exec(req, res, next)
        next()
      } catch (err) {
        next(err)
      }
    }
  }
}

export default Routes
