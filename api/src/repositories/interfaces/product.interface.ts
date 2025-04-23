import type { Brand, Product } from "@prisma/client";
import type {
  ProductCreateInputSchema,
  ProductFindOneInputSchema,
  ProductFindAllInputSchema
} from "@/schemas/product.schema";

type BrandWithoutDates = Omit<Brand, "createdAt" | "updatedAt">;
type ProductWithBrand = Omit<Product, "brandId"> & { brand: BrandWithoutDates };
type FindOnePromiseReturn = Promise<Product | null>;
type FindAllPromiseReturn = Promise<{
  products: ProductWithBrand[];
  total: number;
}>;
type CreatePromiseReturn = Promise<Product>;

export interface BaseProductRepository {
  findOne(input: ProductFindOneInputSchema): FindOnePromiseReturn;
  findAll(input: ProductFindAllInputSchema): FindAllPromiseReturn;
  create(input: ProductCreateInputSchema): CreatePromiseReturn;
}
