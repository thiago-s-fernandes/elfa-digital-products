import "zod-openapi/extend";
import { HttpResponseHandler } from "@/utils/http-response";
import { routes as brandRoutes } from "@/routes/brand.routes";
import { routes as productRoutes } from "@/routes/product.routes";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import prisma from "@/infra/database/prisma";
import ScalarApiReference from "@scalar/fastify-api-reference";
import {
  ErrorStatusCode,
  HttpErrorHandler,
  ErrorCode
} from "@/utils/http-errors";
import {
  fastifyZodOpenApiPlugin,
  fastifyZodOpenApiTransform,
  fastifyZodOpenApiTransformObject,
  serializerCompiler,
  type FastifyZodOpenApiTypeProvider,
  validatorCompiler
} from "fastify-zod-openapi";
import Fastify, {
  type FastifyError,
  type FastifyReply,
  type FastifyRequest
} from "fastify";
import type { FastifyTypedInstance } from "@/@types/fastify";
import type { PrismaClient } from "@prisma/client";

class FastifyServer {
  private app: FastifyTypedInstance;
  private prisma: PrismaClient;

  constructor() {
    this.app = Fastify().withTypeProvider<FastifyZodOpenApiTypeProvider>();

    this.prisma = prisma;
    this.setupCompilers();
    this.setupPlugins();
    this.setupRoutes();
    this.setupErrorHandler();
  }

  private setupPlugins(): void {
    this.app.register(cors, {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"]
    });
    this.app.register(fastifyZodOpenApiPlugin);
    this.app.register(fastifySwagger, {
      openapi: {
        info: { title: "Elfa - Digital Products", version: "1.0.0" }
      },
      transform: fastifyZodOpenApiTransform,
      transformObject: fastifyZodOpenApiTransformObject
    });
    this.app.register(ScalarApiReference, {
      routePrefix: "/docs"
    });
  }

  private setupCompilers(): void {
    this.app.setValidatorCompiler(validatorCompiler);
    this.app.setSerializerCompiler(serializerCompiler);
  }

  private setupRoutes(): void {
    this.app.register(app => productRoutes({ app, prisma }));
    this.app.register(app => brandRoutes({ app, prisma }));
  }

  private setupErrorHandler(): void {
    this.app.setNotFoundHandler((request, reply) => {
      const notFoundError = HttpResponseHandler.error({
        error: ErrorCode.NOT_FOUND_ERROR,
        message: `Route ${request.method} ${request.url} not found`,
        name: ErrorCode.NOT_FOUND_ERROR,
        statusCode: ErrorStatusCode.NOT_FOUND_ERROR
      });

      reply.status(ErrorStatusCode.NOT_FOUND_ERROR).send(notFoundError);
    });

    this.app.setErrorHandler(function (
      error: FastifyError,
      _request: FastifyRequest,
      reply: FastifyReply
    ) {
      if (error instanceof HttpErrorHandler) {
        const customErr = HttpResponseHandler.error(error);

        return reply.status(customErr.statusCode).send(customErr);
      }

      if (error.statusCode === 400) {
        const badRequestError = HttpResponseHandler.error({
          error: ErrorCode.BAD_REQUEST_ERROR,
          message: error.message,
          name: error.name,
          statusCode: ErrorStatusCode.BAD_REQUEST_ERROR
        });

        return reply.status(error.statusCode).send(badRequestError);
      }

      const customErr = HttpResponseHandler.error({
        error: ErrorCode.INTERNAL_SERVER_ERROR,
        message: "Something went wrong on the server",
        name: ErrorCode.INTERNAL_SERVER_ERROR,
        statusCode: ErrorStatusCode.INTERNAL_SERVER_ERROR
      });

      return reply.status(customErr.statusCode).send(customErr);
    });
  }

  public async start(): Promise<void> {
    try {
      await this.prisma.$connect();

      this.app.listen(
        {
          port: Number(process.env.API_PORT),
          host: process.env.API_HOST
        },
        (err, address) => {
          if (err) {
            this.app.log.error(err);
            process.exit(1);
          }
          this.app.log.info(`Server listening at ${address}`);
          console.info(`Server listening at ${address}`);
        }
      );
    } catch (error) {
      this.app.log.error("Error connecting to Prisma:", error);
      process.exit(1);
    }
  }

  public async stop(): Promise<void> {
    await this.app.close();
    await this.prisma.$disconnect();
    this.app.log.info("Server stopped and Prisma disconnected");
  }
}

export default FastifyServer;
