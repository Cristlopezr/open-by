import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { and, asc, eq, ilike, type SQL } from 'drizzle-orm';
import { isPostgresUniqueViolation } from '../common/database/postgres-error.utils';
import { DrizzleProvider, type Database } from '../db/drizzle.provider';
import { productCategoriesTable } from '../db/schema';
import type { CreateProductCategoryDto } from './dto/create-product-category.dto';
import type { FindProductCategoriesQueryDto } from './dto/find-product-categories-query.dto';
import type { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { normalizeCategoryName } from './utils/category-name.utils';

@Injectable()
export class ProductCategoriesService {
  constructor(@Inject(DrizzleProvider) private readonly db: Database) {}

  async create(createProductCategoryDto: CreateProductCategoryDto) {
    try {
      const [category] = await this.db
        .insert(productCategoriesTable)
        .values({
          slug: createProductCategoryDto.slug,
          name: createProductCategoryDto.name,
          normalized_name: normalizeCategoryName(createProductCategoryDto.name),
        })
        .returning();

      return category;
    } catch (error) {
      if (isPostgresUniqueViolation(error)) {
        throw new ConflictException(
          'A category with this slug or name already exists',
        );
      }
      throw error;
    }
  }

  findAll(query: FindProductCategoriesQueryDto) {
    const filters: SQL[] = [];

    if (query.name) {
      filters.push(
        ilike(
          productCategoriesTable.normalized_name,
          `%${normalizeCategoryName(query.name)}%`,
        ),
      );
    }
    if (query.active !== undefined) {
      filters.push(eq(productCategoriesTable.active, query.active));
    }

    return this.db
      .select()
      .from(productCategoriesTable)
      .where(and(...filters))
      .orderBy(asc(productCategoriesTable.name))
      .limit(query.limit)
      .offset(query.offset);
  }

  async findOne(id: string) {
    const [category] = await this.db
      .select()
      .from(productCategoriesTable)
      .where(eq(productCategoriesTable.id, id))
      .limit(1);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: string, updateProductCategoryDto: UpdateProductCategoryDto) {
    try {
      const [category] = await this.db
        .update(productCategoriesTable)
        .set({
          name: updateProductCategoryDto.name,
          normalized_name: updateProductCategoryDto.name
            ? normalizeCategoryName(updateProductCategoryDto.name)
            : undefined,
        })
        .where(eq(productCategoriesTable.id, id))
        .returning();

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      return category;
    } catch (error) {
      if (isPostgresUniqueViolation(error)) {
        throw new ConflictException('A category with this name already exists');
      }
      throw error;
    }
  }

  async deactivate(id: string) {
    const [category] = await this.db
      .update(productCategoriesTable)
      .set({ active: false })
      .where(eq(productCategoriesTable.id, id))
      .returning();

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
}
