import type { BaseProductRepository } from "@/repositories/interfaces/product.interface";
import { type PrismaClient } from "@prisma/client";
import type {
  ProductCreateInputSchema,
  ProductFindOneInputSchema,
  ProductFindAllInputSchema
} from "@/schemas/product.schema";

export class ProductRepository implements BaseProductRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async findAll(input: ProductFindAllInputSchema) {
    const { query } = input;

    const {
      orderBy = "createdAt",
      orderDirection = "desc",
      page = "1",
      per_page = "10",
      name,
      search
    } = query ?? {};

    const parsedPage = Math.max(parseInt(page), 1);
    const parsedPerPage = Math.max(parseInt(per_page), 1);
    const skip = (parsedPage - 1) * parsedPerPage;

    const where = {
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
                      mode: "insensitive" as const
                    }
                  },
                  {
                    description: {
                      contains: search,
                      mode: "insensitive" as const
                    }
                  },
                  {
                    brand: {
                      name: {
                        contains: search,
                        mode: "insensitive" as const
                      }
                    }
                  }
                ]
              }
            ]
          : [])
      ]
    };

    const products = await this.prisma.product.findMany({
      where,
      orderBy: {
        [orderBy]: orderDirection
      },
      skip,
      take: parsedPerPage,
      omit: { brandId: true },
      include: {
        brand: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    const totalItems = await this.prisma.product.count({ where });
    const totalPages = Math.ceil(totalItems / parsedPerPage);

    return {
      products,
      totalItems,
      currentPage: parsedPage,
      totalPages
    };
  }

  public async findOne(input: ProductFindOneInputSchema) {
    const {
      params: { name, brandId }
    } = input;

    const product = await this.prisma.product.findUnique({
      where: {
        name_brandId: {
          name,
          brandId
        }
      }
    });

    return product;
  }

  public async create(input: ProductCreateInputSchema) {
    const { body } = input;

    const product = await this.prisma.product.create({
      data: {
        ...body
      }
    });

    return product;
  }
}
