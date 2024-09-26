import type { Request, Response, NextFunction } from 'express'

export default (err: any, _req: Request, res: Response, _next: NextFunction) => {
  // console.error(err)

  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      details: err.details || undefined
    }
  })
}
