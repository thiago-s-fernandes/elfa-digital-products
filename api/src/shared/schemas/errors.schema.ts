import { ErrorCode, ErrorStatusCode } from "@/utils/http-errors";
import { z } from "zod";

export const errBadRequestErrorResponseSchema = z.object({
  error: z.literal(ErrorCode.BAD_REQUEST_ERROR),
  message: z.string().default("bad request error."),
  statusCode: z.literal(ErrorStatusCode.BAD_REQUEST_ERROR)
});

export const errUnauthorizedErrorResponseSchema = z.object({
  error: z.literal(ErrorCode.UNAUTHORIZED_ERROR),
  message: z.string().default("unauthorized error."),
  statusCode: z.literal(ErrorStatusCode.UNAUTHORIZED_ERROR)
});

export const errForbiddenErrorResponseSchema = z.object({
  error: z.literal(ErrorCode.FORBIDDEN_ERROR),
  message: z.string().default("forbidden error."),
  statusCode: z.literal(ErrorStatusCode.FORBIDDEN_ERROR)
});

export const errNotFoundErrorResponseSchema = z.object({
  error: z.literal(ErrorCode.NOT_FOUND_ERROR),
  message: z.string().default("not found error."),
  statusCode: z.literal(ErrorStatusCode.NOT_FOUND_ERROR)
});

export const errConflictErrorResponseSchema = z.object({
  error: z.literal(ErrorCode.CONFLICT_ERROR),
  message: z.string().default("conflict error."),
  statusCode: z.literal(ErrorStatusCode.CONFLICT_ERROR)
});

export const errUnprocessableEntityErrorResponseSchema = z.object({
  error: z.literal(ErrorCode.UNPROCESSABLE_ENTITY_ERROR),
  message: z.string().default("unprocessable entity error."),
  statusCode: z.literal(ErrorStatusCode.UNPROCESSABLE_ENTITY_ERROR)
});

export const errInternalServerErrorResponseSchema = z.object({
  error: z.literal(ErrorCode.INTERNAL_SERVER_ERROR),
  message: z.string().default("internal server error."),
  statusCode: z.literal(ErrorStatusCode.INTERNAL_SERVER_ERROR)
});
