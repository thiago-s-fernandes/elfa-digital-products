import type { Brand } from "@prisma/client";
import type { BrandFindAllInputSchema, BrandFindOneInputSchema } from "@/schemas/brand.schema";

type FindOnePromiseReturn = Promise<Brand | null>;
type FindAllPromiseReturn = Promise<{
  brands: Brand[];
  total: number;
}>;

export interface BaseBrandRepository {
  findOne(input: BrandFindOneInputSchema): FindOnePromiseReturn;
  findAll(input: BrandFindAllInputSchema): FindAllPromiseReturn;
}
