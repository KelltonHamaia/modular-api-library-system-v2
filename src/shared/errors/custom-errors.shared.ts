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
  // This one has to be dynamic because the business rule can be anything (inside the project)
  constructor(message: string) {
    super(message, 422)
  }
}
