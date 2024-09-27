import type { Request, Response, NextFunction } from 'express'

export default async (req: Request, res: Response, next: NextFunction) => {
  const title = 'Access Level Error'
  try {
    const { level } = res.locals.jwt

    const { requiredLevel } = res.locals.params

    if (!!requiredLevel && requiredLevel <= level) next()
    else throw null
  } catch (_e) {
    throw { title, statusCode: 401, message: 'User not Allowed' }
  }
}
