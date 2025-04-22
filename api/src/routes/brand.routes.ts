import { BrandController } from "@/controllers/brand.controller";
import { BrandRepository } from "@/repositories/prisma/brand.repository";
import { BrandService } from "@/services/brand.service";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { FastifyTypedInstance } from "@/@types/fastify";
import type { PrismaClient } from "@prisma/client";
import {
  brandErrBadRequestErrorResponseSchema,
  brandErrForbiddenErrorResponseSchema,
  brandErrInternalServerErrorResponseSchema,
  brandFindAllQuerySchema,
  brandFindAllSuccessResponseSchema,
  type BrandFindAllQuerySchema,
} from "@/schemas/brand.schema";

export async function routes({
  app,
  prisma,
}: {
  app: FastifyTypedInstance;
  prisma: PrismaClient;
}) {
  const brandRepository = new BrandRepository(prisma);
  const brandService = new BrandService(brandRepository);
  const brandController = new BrandController(brandService);

  app.get(
    "/brands",
    {
      schema: {
        summary: "Find All",
        description: "Find all brands.",
        tags: ["Brand"],
        querystring: brandFindAllQuerySchema,
        response: {
          200: brandFindAllSuccessResponseSchema,
          400: brandErrBadRequestErrorResponseSchema,
          403: brandErrForbiddenErrorResponseSchema,
          500: brandErrInternalServerErrorResponseSchema,
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const query = request.query as BrandFindAllQuerySchema;

      const response = await brandController.handleFindAll({ query });

      return reply.status(response.statusCode).send(response);
    }
  );
}
