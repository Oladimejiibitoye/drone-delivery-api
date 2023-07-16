const AppError = require('./AppError');

class UnauthorizedError extends AppError {
  constructor(message) {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

class BadRequestError extends AppError {
  constructor(message) {
    super(message, 400);
    this.name = 'BadRequestError';
  }
}

class ForbiddenError extends AppError {
    constructor(message) {
      super(message, 403);
      this.name = 'ForbiddenError';
    }
}

class AlreadyApprovedError extends AppError {
  constructor(message) {
    super(message, 409);
    this.name = 'AlreadyApprovedError';
  }
}

class NotFoundError extends AppError {
    constructor(message) {
      super(message, 404);
      this.name = 'NotFoundError';
    }
}


module.exports = {
  UnauthorizedError,
  AlreadyApprovedError,
  NotFoundError,
  ForbiddenError,
  BadRequestError
};
