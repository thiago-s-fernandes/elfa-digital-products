import type { BaseProductRepository } from "@/repositories/interfaces/product.interface";
import { type PrismaClient } from "@prisma/client";
import type {
  ProductCreateInputSchema,
  ProductFindOneInputSchema,
  ProductFindAllInputSchema,
} from "@/schemas/product.schema";

export class ProductRepository implements BaseProductRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async findAll(input: ProductFindAllInputSchema) {
    const { query } = input;

    const {
      orderBy = "createdAt",
      orderDirection = "desc",
      skip = "0",
      take = "10",
      name,
      search,
    } = query ?? {};

    const products = await this.prisma.product.findMany({
      where: {
        AND: [
          ...(name
            ? [{ name: { contains: name, mode: "insensitive" as const } }]
            : []),
          ...(search
            ? [
                {
                  OR: [
                    {
                      name: {
                        contains: search,
                        mode: "insensitive" as const,
                      },
                    },
                    {
                      description: {
                        contains: search,
                        mode: "insensitive" as const,
                      },
                    },
                    {
                      brand: {
                        name: {
                          contains: search,
                          mode: "insensitive" as const,
                        },
                      },
                    },
                  ],
                },
              ]
            : []),
        ],
      },
      orderBy: {
        [orderBy]: orderDirection,
      },
      skip: parseInt(skip),
      take: parseInt(take),
      omit: { brandId: true },
      include: {
        brand: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return products;
  }

  public async findOne(input: ProductFindOneInputSchema) {
    const {
      params: { name, brandId },
    } = input;

    const product = await this.prisma.product.findUnique({
      where: {
        name_brandId: {
          name,
          brandId,
        },
      },
    });

    return product;
  }

  public async create(input: ProductCreateInputSchema) {
    const { body } = input;

    const product = await this.prisma.product.create({
      data: {
        ...body,
      },
      select: {
        id: true,
      },
    });

    return product;
  }
}
