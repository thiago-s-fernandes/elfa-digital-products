import type { Brand } from "@prisma/client";
import type {
  BrandFindAllInputSchema,
  BrandFindOneInputSchema,
} from "@/schemas/brand.schema";

export interface BaseBrandRepository {
  findOne(input: BrandFindOneInputSchema): Promise<Brand | null>;
  findAll(input: BrandFindAllInputSchema): Promise<Brand[]>;
}
