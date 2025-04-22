import "zod-openapi/extend";
import { z } from "zod";

// General
export const stringSchema = z.string().min(1);
export const uuidSchema = z
  .string()
  .uuid()
  .openapi({ example: "a9b8c7d6-e5d4-c3b2-a1b2-c3d4e5f6a7b8" });
export const productNameSchema = stringSchema.openapi({
  example: "Chinelo Calm"
});
export const brandNameSchema = stringSchema.openapi({ example: "Nike" });
export const descriptionSchema = stringSchema.openapi({
  example: "Description"
});
export const imageSchema = z.string().nonempty();
export const priceSchema = z.number().positive();
export const dateSchema = z
  .date()
  .openapi({ example: new Date().toISOString() });

// Brand
export const brandSchema = z
  .object({
    id: uuidSchema,
    name: brandNameSchema,
    createdAt: dateSchema,
    updatedAt: dateSchema
  })
  .strict();

// Product
export const productSchema = z
  .object({
    id: uuidSchema,
    name: productNameSchema,
    price: priceSchema,
    description: descriptionSchema.nullable(),
    image: imageSchema.nullable(),
    brand: brandSchema.omit({ createdAt: true, updatedAt: true }),
    createdAt: dateSchema,
    updatedAt: dateSchema
  })
  .strict();
