import { BrandRepository } from "@/repositories/prisma/brand.repository";
import { ProductController } from "@/controllers/product.controller";
import { ProductRepository } from "@/repositories/prisma/product.repository";
import { ProductService } from "@/services/product.service";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { FastifyTypedInstance } from "@/@types/fastify";
import type { PrismaClient } from "@prisma/client";
import {
  productCreateBodySchema,
  productCreateSuccessResponseSchema,
  productErrBadRequestErrorResponseSchema,
  productErrConflictErrorResponseSchema,
  productErrForbiddenErrorResponseSchema,
  productErrInternalServerErrorResponseSchema,
  productErrNotFoundErrorResponseSchema,
  productFindAllQuerySchema,
  productFindAllSuccessResponseSchema,
  type ProductCreateBodySchema,
  type ProductFindAllQuerySchema,
} from "@/schemas/product.schema";

export async function routes({ app, prisma }: { app: FastifyTypedInstance; prisma: PrismaClient }) {
  const brandRepository = new BrandRepository(prisma);
  const productRepository = new ProductRepository(prisma);
  const productService = new ProductService(productRepository, brandRepository);
  const productController = new ProductController(productService);

  app.get(
    "/products",
    {
      schema: {
        summary: "Find All",
        description: "Find all products.",
        tags: ["Product"],
        querystring: productFindAllQuerySchema,
        response: {
          200: productFindAllSuccessResponseSchema,
          400: productErrBadRequestErrorResponseSchema,
          403: productErrForbiddenErrorResponseSchema,
          500: productErrInternalServerErrorResponseSchema,
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const query = request.query as ProductFindAllQuerySchema;

      const response = await productController.handleFindAll({ query });

      return reply.status(response.statusCode).send(response);
    },
  );

  app.post(
    "/products",
    {
      schema: {
        summary: "Create",
        description: "Create product.",
        tags: ["Product"],
        body: productCreateBodySchema,
        response: {
          201: productCreateSuccessResponseSchema,
          400: productErrBadRequestErrorResponseSchema,
          403: productErrForbiddenErrorResponseSchema,
          404: productErrNotFoundErrorResponseSchema,
          409: productErrConflictErrorResponseSchema,
          500: productErrInternalServerErrorResponseSchema,
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const body = request.body as ProductCreateBodySchema;

      const response = await productController.handleCreate({ body });

      return reply.status(response.statusCode).send(response);
    },
  );
}
