import type { BaseBrandRepository } from "@/repositories/interfaces/brand.interface";
import type { PrismaClient } from "@prisma/client";
import type {
  BrandFindAllInputSchema,
  BrandFindOneInputSchema,
} from "@/schemas/brand.schema";

export class BrandRepository implements BaseBrandRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async findAll(input: BrandFindAllInputSchema) {
    const { query } = input;

    const {
      orderBy = "createdAt",
      orderDirection = "desc",
      skip = "0",
      take = "10",
      name,
    } = query ?? {};

    const brands = await this.prisma.brand.findMany({
      where: {
        ...(name && {
          name: { contains: name, mode: "insensitive" },
        }),
      },
      orderBy: {
        [orderBy]: orderDirection,
      },
      skip: parseInt(skip),
      take: parseInt(take),
    });

    return brands;
  }

  public async findOne(input: BrandFindOneInputSchema) {
    const {
      params: { id },
    } = input;

    const brand = await this.prisma.brand.findUnique({
      where: {
        id,
      },
    });

    return brand;
  }
}
