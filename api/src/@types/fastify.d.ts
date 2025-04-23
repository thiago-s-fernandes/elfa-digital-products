import type {
  FastifyInstance,
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
} from "fastify";
import type { FastifyZodOpenApiTypeProvider } from "fastify-zod-openapi";

export type FastifyTypedInstance = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  FastifyZodOpenApiTypeProvider
>;
