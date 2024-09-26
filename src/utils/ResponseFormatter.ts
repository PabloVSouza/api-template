import type { Request, Response, NextFunction } from 'express'

export default (_req: Request, res: Response, _next: NextFunction) => {
  const { data } = res.locals
  res.json({
    success: true,
    data
  })
}
