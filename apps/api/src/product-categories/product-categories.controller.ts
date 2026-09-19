import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import {
  createProductCategorySchema,
  type CreateProductCategoryDto,
} from './dto/create-product-category.dto';
import {
  findProductCategoriesQuerySchema,
  type FindProductCategoriesQueryDto,
} from './dto/find-product-categories-query.dto';
import {
  updateProductCategorySchema,
  type UpdateProductCategoryDto,
} from './dto/update-product-category.dto';
import { ProductCategoriesService } from './product-categories.service';

@Controller('admin/categories')
export class ProductCategoriesController {
  constructor(
    private readonly productCategoriesService: ProductCategoriesService,
  ) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createProductCategorySchema))
    createProductCategoryDto: CreateProductCategoryDto,
  ) {
    return this.productCategoriesService.create(createProductCategoryDto);
  }

  @Get()
  findAll(
    @Query(new ZodValidationPipe(findProductCategoriesQuerySchema))
    query: FindProductCategoriesQueryDto,
  ) {
    return this.productCategoriesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productCategoriesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ZodValidationPipe(updateProductCategorySchema))
    updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    return this.productCategoriesService.update(id, updateProductCategoryDto);
  }

  @Delete(':id')
  deactivate(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productCategoriesService.deactivate(id);
  }
}
