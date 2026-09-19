import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  createProductSchema,
  type CreateProductDto,
} from './dto/create-product.dto';
import {
  updateProductSchema,
  type UpdateProductDto,
} from './dto/update-product.dto';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import {
  findProductsQuerySchema,
  type FindProductsQueryDto,
} from './dto/find-products-query.dto';

@Controller('admin/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createProductSchema))
    createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(
    @Query(new ZodValidationPipe(findProductsQuerySchema))
    query: FindProductsQueryDto,
  ) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ZodValidationPipe(updateProductSchema))
    updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  deactivate(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productsService.deactivate(id);
  }
}
