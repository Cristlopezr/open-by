import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { BrandsService } from './brands.service';
import { createBrandSchema, type CreateBrandDto } from './dto/create-brand.dto';
import {
  findBrandsQuerySchema,
  type FindBrandsQueryDto,
} from './dto/find-brands-query.dto';
import { updateBrandSchema, type UpdateBrandDto } from './dto/update-brand.dto';

@Controller('admin/brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createBrandSchema))
    createBrandDto: CreateBrandDto,
  ) {
    return this.brandsService.create(createBrandDto);
  }

  @Get()
  findAll(
    @Query(new ZodValidationPipe(findBrandsQuerySchema))
    query: FindBrandsQueryDto,
  ) {
    return this.brandsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.brandsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ZodValidationPipe(updateBrandSchema))
    updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, updateBrandDto);
  }
}
