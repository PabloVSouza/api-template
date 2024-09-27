import type { Request, Response, NextFunction } from 'express'
import { prismaError } from 'prisma-better-errors'

export default (err: any, _req: Request, res: Response, _next: NextFunction) => {
  // console.error(err)
  const title = err.title ?? 'Generic Error'
  const statusCode = err.statusCode ?? 500
  const message = err.message ?? 'Internal Server Error'
  const details = err.details ?? err.metaData ?? undefined

  res.status(statusCode).json({
    success: false,
    error: {
      title,
      message,
      details
    }
  })
}
