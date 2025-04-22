import { HttpErrorHandler } from "@/utils/http-errors";
import { HttpResponseHandler, SuccessCodes } from "@/utils/http-response";
import type { BaseBrandRepository } from "@/repositories/interfaces/brand.interface";
import {
  brandFindAllQuerySchema,
  type BrandFindAllInputSchema,
  type BrandFindAllSuccessResponseSchema
} from "@/schemas/brand.schema";

export class BrandService {
  constructor(private readonly brandRepository: BaseBrandRepository) {}

  public async findAll(
    input: BrandFindAllInputSchema
  ): Promise<BrandFindAllSuccessResponseSchema> {
    try {
      const { query } = input;

      const parsedQuery = brandFindAllQuerySchema.parse(query);

      const data = await this.brandRepository.findAll({
        query: parsedQuery
      });

      return HttpResponseHandler.success(data, SuccessCodes.SUCCESS);
    } catch (error) {
      if (error instanceof HttpErrorHandler) {
        throw error;
      }

      throw HttpErrorHandler.internalServerError();
    }
  }
}
