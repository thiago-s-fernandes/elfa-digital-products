import "zod-openapi/extend";
import { SuccessCodes } from "@/utils/http-response";
import { z } from "zod";
import {
  errBadRequestErrorResponseSchema,
  errForbiddenErrorResponseSchema,
  errInternalServerErrorResponseSchema,
  errNotFoundErrorResponseSchema,
} from "@/shared/schemas/errors.schema";
import {
  brandNameSchema,
  brandSchema,
  uuidSchema,
} from "@/shared/schemas/models.schema";

// Find One
export const brandFindOneParamsSchema = z
  .object({
    id: uuidSchema,
  })
  .strict();
export type BrandFindOneParamsSchema = z.infer<typeof brandFindOneParamsSchema>;

export const brandFindOneInputSchema = z
  .object({
    params: brandFindOneParamsSchema,
  })
  .strict();
export type BrandFindOneInputSchema = z.infer<typeof brandFindOneInputSchema>;

// Find All
export const brandFindAllQuerySchema = z
  .object({
    name: brandNameSchema.optional(),
    skip: z
      .string()
      .regex(/^\d+$/)
      .default("0")
      .optional()
      .openapi({ example: "0" }),
    take: z
      .string()
      .regex(/^\d+$/)
      .default("10")
      .optional()
      .openapi({ example: "10" }),
    orderBy: z
      .enum(["name", "createdAt", "updatedAt"])
      .default("createdAt")
      .optional()
      .openapi({ example: "createdAt" }),
    orderDirection: z
      .enum(["asc", "desc"])
      .default("desc")
      .optional()
      .openapi({ example: "desc" }),
  })
  .strict();
export type BrandFindAllQuerySchema = z.infer<typeof brandFindAllQuerySchema>;

export const brandFindAllInputSchema = z
  .object({
    query: brandFindAllQuerySchema,
  })
  .strict();
export type BrandFindAllInputSchema = z.infer<typeof brandFindAllInputSchema>;

export const brandFindAllSuccessResponseSchema = z
  .object({
    data: z.array(brandSchema),
    statusCode: z.literal(SuccessCodes.SUCCESS),
  })
  .strict();
export type BrandFindAllSuccessResponseSchema = z.infer<
  typeof brandFindAllSuccessResponseSchema
>;

// Errors
export const brandErrBadRequestErrorResponseSchema =
  errBadRequestErrorResponseSchema;
export const brandErrForbiddenErrorResponseSchema =
  errForbiddenErrorResponseSchema;
export const brandErrNotFoundErrorResponseSchema =
  errNotFoundErrorResponseSchema;
export const brandErrInternalServerErrorResponseSchema =
  errInternalServerErrorResponseSchema;
