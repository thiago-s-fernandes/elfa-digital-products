import type { BaseBrandRepository } from "@/repositories/interfaces/brand.interface";
import type { PrismaClient } from "@prisma/client";
import type {
  BrandFindAllInputSchema,
  BrandFindOneInputSchema
} from "@/schemas/brand.schema";

export class BrandRepository implements BaseBrandRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async findAll(input: BrandFindAllInputSchema) {
    const { query } = input;

    const {
      orderBy = "createdAt",
      orderDirection = "desc",
      page = "1",
      per_page = "10",
      name
    } = query ?? {};

    const parsedPage = Math.max(parseInt(page), 1);
    const parsedPerPage = Math.max(parseInt(per_page), 1);
    const skip = (parsedPage - 1) * parsedPerPage;

    const where = {
      ...(name && {
        name: { contains: name, mode: "insensitive" as const }
      })
    };

    const brands = await this.prisma.brand.findMany({
      where,
      orderBy: {
        [orderBy]: orderDirection
      },
      skip,
      take: parsedPerPage
    });

    const totalItems = await this.prisma.brand.count({ where });
    const totalPages = Math.ceil(totalItems / parsedPerPage);

    return {
      brands,
      totalItems,
      currentPage: parsedPage,
      totalPages
    };
  }

  public async findOne(input: BrandFindOneInputSchema) {
    const {
      params: { id }
    } = input;

    const brand = await this.prisma.brand.findUnique({
      where: {
        id
      }
    });

    return brand;
  }
}
