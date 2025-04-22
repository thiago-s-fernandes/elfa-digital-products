import type { BrandService } from "@/services/brand.service";
import type {
  BrandFindAllInputSchema,
  BrandFindAllSuccessResponseSchema,
} from "@/schemas/brand.schema";

export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  public async handleFindAll(
    input: BrandFindAllInputSchema
  ): Promise<BrandFindAllSuccessResponseSchema> {
    const response = await this.brandService.findAll(input);

    return response;
  }
}
