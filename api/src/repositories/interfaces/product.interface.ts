import type { Brand, Product } from "@prisma/client";
import type {
  ProductCreateInputSchema,
  ProductFindOneInputSchema,
  ProductFindAllInputSchema,
} from "@/schemas/product.schema";

type BrandWithoutDates = Omit<Brand, "createdAt" | "updatedAt">;
type ProductId = Pick<Product, "id">;
type ProductWithoutBrandId = Omit<Product, "brandId">;
type ProductWithBrand = ProductWithoutBrandId & { brand: BrandWithoutDates };

export interface BaseProductRepository {
  findOne(input: ProductFindOneInputSchema): Promise<Product | null>;
  findAll(input: ProductFindAllInputSchema): Promise<ProductWithBrand[]>;
  create(input: ProductCreateInputSchema): Promise<ProductId>;
}
