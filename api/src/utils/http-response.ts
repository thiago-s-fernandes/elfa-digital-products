import { ErrorStatusCode, type HttpErrorHandler, type HttpError } from "@/utils/http-errors";

export enum SuccessCodes {
  SUCCESS = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
}

export interface HttpResponse<T> {
  data: T;
  statusCode: number;
}

export interface HttpResponseRepository<A, B> {
  data: A;
  code: B;
}

export class HttpResponseHandler {
  static success<T>(data: T, statusCode: number): HttpResponse<T> {
    return {
      data,
      statusCode,
    };
  }

  static error<E>(error: HttpErrorHandler<E>): HttpError<E> {
    const { error: errorCode, message, statusCode = ErrorStatusCode.INTERNAL_SERVER_ERROR } = error;

    return {
      error: errorCode,
      message,
      statusCode,
    };
  }

  static repository<A, B>(data: A, code: B): HttpResponseRepository<A, B> {
    return {
      data,
      code,
    };
  }
}
