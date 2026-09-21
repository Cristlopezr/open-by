import { Controller, Get, Param, Query } from '@nestjs/common';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { CatalogService } from './catalog.service';
import {
  findCatalogBrandsQuerySchema,
  type FindCatalogBrandsQueryDto,
} from './dto/find-catalog-brands-query.dto';
import {
  findCatalogProductByBarcodeParamsSchema,
  type FindCatalogProductByBarcodeParamsDto,
} from './dto/find-catalog-product-by-barcode-params.dto';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@AllowAnonymous()
@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('products/by-barcode/:barcode')
  findProductByBarcode(
    @Param(new ZodValidationPipe(findCatalogProductByBarcodeParamsSchema))
    params: FindCatalogProductByBarcodeParamsDto,
  ) {
    return this.catalogService.findProductByBarcode(params.barcode);
  }

  @Get('brands')
  findBrands(
    @Query(new ZodValidationPipe(findCatalogBrandsQuerySchema))
    query: FindCatalogBrandsQueryDto,
  ) {
    return this.catalogService.findBrands(query);
  }
}
