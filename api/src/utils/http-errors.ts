export enum ErrorStatusCode {
  BAD_REQUEST_ERROR = 400,
  UNAUTHORIZED_ERROR = 401,
  FORBIDDEN_ERROR = 403,
  NOT_FOUND_ERROR = 404,
  CONFLICT_ERROR = 409,
  UNPROCESSABLE_ENTITY_ERROR = 422,
  INTERNAL_SERVER_ERROR = 500
}

export enum ErrorCode {
  BAD_REQUEST_ERROR = "BAD_REQUEST_ERROR",
  UNAUTHORIZED_ERROR = "UNAUTHORIZED_ERROR",
  FORBIDDEN_ERROR = "FORBIDDEN_ERROR",
  NOT_FOUND_ERROR = "NOT_FOUND_ERROR",
  CONFLICT_ERROR = "CONFLICT_ERROR",
  UNPROCESSABLE_ENTITY_ERROR = "UNPROCESSABLE_ENTITY_ERROR",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR"
}

export interface HttpError<E> {
  error: E;
  message: string;
  statusCode: number;
}
export class HttpErrorHandler<E> extends Error implements HttpError<E> {
  public readonly statusCode: number;
  public readonly error: E;
  public readonly message: string;

  constructor({ statusCode, error, message }: HttpError<E>) {
    super(message);
    Object.setPrototypeOf(this, HttpErrorHandler.prototype);

    this.statusCode = statusCode;
    this.error = error;
    this.message = message;
  }

  static customError<E = ErrorCode>({
    statusCode,
    errorCode,
    message
  }: {
    statusCode: ErrorStatusCode;
    message: string;
    errorCode: E;
  }) {
    return new HttpErrorHandler({
      statusCode,
      error: errorCode,
      message
    });
  }

  static badRequestError<E = ErrorCode>(message = "bad request error.") {
    return new HttpErrorHandler({
      statusCode: ErrorStatusCode.BAD_REQUEST_ERROR,
      error: ErrorCode.BAD_REQUEST_ERROR as E,
      message
    });
  }

  static notFoundError<E = ErrorCode>(message = "not found error.") {
    return new HttpErrorHandler({
      statusCode: ErrorStatusCode.NOT_FOUND_ERROR,
      error: ErrorCode.NOT_FOUND_ERROR as E,
      message
    });
  }

  static unauthorizedError<E = ErrorCode>(message = "unauthorized error.") {
    return new HttpErrorHandler({
      statusCode: ErrorStatusCode.UNAUTHORIZED_ERROR,
      error: ErrorCode.UNAUTHORIZED_ERROR as E,
      message
    });
  }

  static internalServerError<E = ErrorCode>(
    message = "internal server error."
  ) {
    return new HttpErrorHandler({
      statusCode: ErrorStatusCode.INTERNAL_SERVER_ERROR,
      error: ErrorCode.INTERNAL_SERVER_ERROR as E,
      message
    });
  }
}
