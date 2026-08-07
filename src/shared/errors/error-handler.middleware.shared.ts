import type { ErrorRequestHandler } from 'express'
import { ZodError, z } from 'zod/v4'
import { AppError } from '@/shared/errors/custom-errors.shared.js'

export const errorHandlerMiddleware: ErrorRequestHandler = async (
  error,
  req,
  res,
  next,
) => {
  if (error instanceof ZodError) {
    const flattenError = z.flattenError(error)
    console.log(flattenError)
    return res.status(400).json({
      error: flattenError,
    })
  }

  if (error instanceof AppError) {
    console.log(error)
    res.status(error.code).json({
      message: error.message,
    })
  }

  console.log(error)
  res.status(500).json({
    error: 'Internal server error',
  })
}
