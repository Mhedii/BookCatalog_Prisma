class ApiError extends Error {
  success: boolean;
  stack?: string;
  constructor(
    success: boolean,
    message: string | undefined,
    stack = '' || undefined,
  ) {
    super(message);
    this.success = success;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
