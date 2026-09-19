import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import type { UpdateProductDto } from './dto/update-product.dto';
import { DrizzleProvider, type Database } from '../db/drizzle.provider';
import { brandsTable, productsTable } from '../db/schema';
import { and, eq, ilike, type SQL } from 'drizzle-orm';
import type { FindProductsQueryDto } from './dto/find-products-query.dto';
import { isPostgresUniqueViolation } from '../common/database/postgres-error.utils';

@Injectable()
export class ProductsService {
  constructor(@Inject(DrizzleProvider) private readonly db: Database) {}

  async create(createProductDto: CreateProductDto) {
    await this.ensureBrandExists(createProductDto.brand_id);

    try {
      return await this.db
        .insert(productsTable)
        .values(createProductDto)
        .returning();
    } catch (error) {
      if (isPostgresUniqueViolation(error)) {
        throw new ConflictException(
          'A product with this barcode already exists',
        );
      }
      throw error;
    }
  }

  findAll(query: FindProductsQueryDto) {
    const filters: SQL[] = [];

    if (query.name) {
      filters.push(ilike(productsTable.name, `%${query.name}%`));
    }
    if (query.barcode) {
      filters.push(eq(productsTable.barcode, query.barcode));
    }
    if (query.brandId) {
      filters.push(eq(productsTable.brand_id, query.brandId));
    }
    if (query.countryCode) {
      filters.push(eq(productsTable.country_code, query.countryCode));
    }
    if (query.active !== undefined) {
      filters.push(eq(productsTable.active, query.active));
    }

    return this.db
      .select()
      .from(productsTable)
      .where(and(...filters))
      .limit(query.limit)
      .offset(query.offset);
  }

  async findOne(id: string) {
    const [product] = await this.db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, id))
      .limit(1);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id);

    if (updateProductDto.brand_id) {
      await this.ensureBrandExists(updateProductDto.brand_id);
    }

    const [product] = await this.db
      .update(productsTable)
      .set(updateProductDto)
      .where(eq(productsTable.id, id))
      .returning();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async deactivate(id: string) {
    const products = await this.db
      .update(productsTable)
      .set({ active: false })
      .where(eq(productsTable.id, id))
      .returning();

    if (products.length === 0) {
      throw new NotFoundException('Product not found');
    }

    return products;
  }

  private async ensureBrandExists(brandId: string) {
    const [brand] = await this.db
      .select({ id: brandsTable.id })
      .from(brandsTable)
      .where(eq(brandsTable.id, brandId))
      .limit(1);

    if (!brand) {
      throw new UnprocessableEntityException('Brand not found');
    }
  }
}
