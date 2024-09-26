import type { Request, Response, NextFunction } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  if (!authorization) throw { statusCode: 400, message: 'Missing Authorization' }
  if (validadeAuth(authorization ?? '')) next()
  else throw { statusCode: 401, message: 'Bad Authorization' }
}

const validadeAuth = (authToken: string): boolean => {
  return authToken === 'Bearer Pablo'
}
