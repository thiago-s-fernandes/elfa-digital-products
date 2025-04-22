import { ErrorStatusCode, HttpErrorHandler } from "@/utils/http-errors";
import { HttpResponseHandler, SuccessCodes } from "@/utils/http-response";
import type { BaseBrandRepository } from "@/repositories/interfaces/brand.interface";
import type { BaseProductRepository } from "@/repositories/interfaces/product.interface";
import {
  type ProductCreateInputSchema,
  type ProductCreateSuccessResponseSchema,
  type ProductFindAllInputSchema,
  type ProductFindAllSuccessResponseSchema,
  productCreateBodySchema,
  productFindAllQuerySchema,
  ProductResponseCode
} from "@/schemas/product.schema";

export class ProductService {
  constructor(
    private readonly productRepository: BaseProductRepository,
    private readonly brandRepository: BaseBrandRepository
  ) {}

  public async findAll(
    input: ProductFindAllInputSchema
  ): Promise<ProductFindAllSuccessResponseSchema> {
    try {
      const { query } = input;

      const parsedQuery = productFindAllQuerySchema.parse(query);

      const data = await this.productRepository.findAll({
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

  public async create(
    input: ProductCreateInputSchema
  ): Promise<ProductCreateSuccessResponseSchema> {
    try {
      const { body } = input;

      const parsedBody = productCreateBodySchema.parse(body);

      const hasBrand = await this.brandRepository.findOne({
        params: {
          id: parsedBody.brandId
        }
      });

      if (!hasBrand) {
        throw HttpErrorHandler.customError({
          statusCode: ErrorStatusCode.NOT_FOUND_ERROR,
          errorCode: ProductResponseCode.BRAND_NOT_FOUND,
          message: "brand not found."
        });
      }

      const hasProduct = await this.productRepository.findOne({
        params: {
          name: parsedBody.name,
          brandId: parsedBody.brandId
        }
      });

      if (hasProduct) {
        throw HttpErrorHandler.customError({
          statusCode: ErrorStatusCode.CONFLICT_ERROR,
          errorCode: ProductResponseCode.PRODUCT_ALREADY_REGISTERED,
          message: "product with this name and brand already exists."
        });
      }

      await this.productRepository.create({
        body: {
          ...parsedBody
        }
      });

      return HttpResponseHandler.success(
        { message: "product created with successfully." },
        SuccessCodes.CREATED
      );
    } catch (error) {
      if (error instanceof HttpErrorHandler) {
        throw error;
      }

      throw HttpErrorHandler.internalServerError();
    }
  }
}
