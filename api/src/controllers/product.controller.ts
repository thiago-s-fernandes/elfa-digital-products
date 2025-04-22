import type { ProductService } from "@/services/product.service";
import type {
  ProductCreateInputSchema,
  ProductCreateSuccessResponseSchema,
  ProductFindAllInputSchema,
  ProductFindAllSuccessResponseSchema,
} from "@/schemas/product.schema";

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  public async handleFindAll(
    input: ProductFindAllInputSchema
  ): Promise<ProductFindAllSuccessResponseSchema> {
    const response = await this.productService.findAll(input);

    return response;
  }

  public async handleCreate(
    input: ProductCreateInputSchema
  ): Promise<ProductCreateSuccessResponseSchema> {
    const response = await this.productService.create(input);

    return response;
  }
}
