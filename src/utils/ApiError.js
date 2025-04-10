class ApiError extends Error {
  constructor(message, statusCode,errors = [],stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;
    this.isOperational = true; // This is an operational error, not a programming error
  
    if(stack) {
      this.stack = stack;
    }
    else {
      Error.captureStackTrace(this, this.constructor);
    }

}
}
export {ApiError}