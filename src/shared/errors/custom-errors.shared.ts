import { ErrorCode } from '@/shared/errors/erros-codes.shared.js'

export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: number,
  ) {
    super(message)
    this.name = this.constructor.name
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404)
  }
}

export class ConflictError extends AppError {
  constructor(
    message = 'Conflict. Maybe the data you sent has been used already',
  ) {
    super(message, 409)
  }
}

export class BusinessRuleError extends AppError {
  constructor(
    message: string,
    public readonly errorCode: ErrorCode,
  ) {
    super(message, 422)
  }
}
