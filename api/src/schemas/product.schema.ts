import "zod-openapi/extend";
import { ErrorCode, ErrorStatusCode } from "@/utils/http-errors";
import { SuccessCodes } from "@/utils/http-response";
import { z } from "zod";
import {
  errBadRequestErrorResponseSchema,
  errForbiddenErrorResponseSchema,
  errInternalServerErrorResponseSchema
} from "@/shared/schemas/errors.schema";
import {
  descriptionSchema,
  imageSchema,
  priceSchema,
  productNameSchema,
  productSchema,
  stringSchema,
  uuidSchema
} from "@/shared/schemas/models.schema";

// Codes
export enum ProductResponseCode {
  PRODUCT_ALREADY_REGISTERED = "PRODUCT_ALREADY_REGISTERED",
  BRAND_NOT_FOUND = "BRAND_NOT_FOUND"
}

// Find One
export const productFindOneParamsSchema = z
  .object({
    name: productNameSchema,
    brandId: uuidSchema
  })
  .strict();
export type ProductFindOneParamsSchema = z.infer<
  typeof productFindOneParamsSchema
>;

export const productFindOneInputSchema = z
  .object({
    params: productFindOneParamsSchema
  })
  .strict();
export type ProductFindOneInputSchema = z.infer<
  typeof productFindOneInputSchema
>;

// Find All
export const productFindAllQuerySchema = z
  .object({
    search: stringSchema.optional(),
    name: productNameSchema.optional(),
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
      .openapi({ example: "desc" })
  })
  .strict();
export type ProductFindAllQuerySchema = z.infer<
  typeof productFindAllQuerySchema
>;

export const productFindAllInputSchema = z
  .object({
    query: productFindAllQuerySchema
  })
  .strict();
export type ProductFindAllInputSchema = z.infer<
  typeof productFindAllInputSchema
>;

export const productFindAllSuccessResponseSchema = z
  .object({
    data: z.object({
      products: z.array(productSchema),
      totalItems: z.number(),
      currentPage: z.number(),
      totalPages: z.number()
    }),
    statusCode: z.literal(SuccessCodes.SUCCESS)
  })
  .strict();
export type ProductFindAllSuccessResponseSchema = z.infer<
  typeof productFindAllSuccessResponseSchema
>;

// Create
export const productCreateBodySchema = z
  .object({
    name: productNameSchema,
    price: priceSchema,
    description: descriptionSchema.optional(),
    image: imageSchema.optional(),
    brandId: uuidSchema
  })
  .strict();
export type ProductCreateBodySchema = z.infer<typeof productCreateBodySchema>;

export const productCreateInputSchema = z
  .object({
    body: productCreateBodySchema
  })
  .strict();
export type ProductCreateInputSchema = z.infer<typeof productCreateInputSchema>;

export const productCreateSuccessResponseSchema = z
  .object({
    data: z.object({
      message: z.string().default("product created with successfully.")
    }),
    statusCode: z.literal(SuccessCodes.CREATED)
  })
  .strict();
export type ProductCreateSuccessResponseSchema = z.infer<
  typeof productCreateSuccessResponseSchema
>;

// Errors
export const productErrBadRequestErrorResponseSchema =
  errBadRequestErrorResponseSchema;
export const productErrForbiddenErrorResponseSchema =
  errForbiddenErrorResponseSchema;
export const productErrInternalServerErrorResponseSchema =
  errInternalServerErrorResponseSchema;
export const productErrNotFoundErrorResponseSchema = z.object({
  error: z
    .union([
      z.literal(ErrorCode.NOT_FOUND_ERROR),
      z.literal(ProductResponseCode.BRAND_NOT_FOUND)
    ])
    .default(ErrorCode.NOT_FOUND_ERROR),
  message: z.string().default("not found error."),
  statusCode: z.literal(ErrorStatusCode.NOT_FOUND_ERROR)
});
export const productErrConflictErrorResponseSchema = z
  .object({
    error: z
      .union([
        z.literal(ErrorCode.CONFLICT_ERROR),
        z.literal(ProductResponseCode.PRODUCT_ALREADY_REGISTERED)
      ])
      .default(ErrorCode.CONFLICT_ERROR),
    message: z.string().default("conflict error."),
    statusCode: z.literal(ErrorStatusCode.CONFLICT_ERROR)
  })
  .strict();
