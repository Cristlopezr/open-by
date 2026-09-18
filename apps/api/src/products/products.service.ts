import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import type { UpdateProductDto } from './dto/update-product.dto';
import { DrizzleProvider, type Database } from '../db/drizzle.provider';
import { productsTable } from '../db/schema';
import { and, eq, ilike, type SQL } from 'drizzle-orm';
import type { FindProductsQueryDto } from './dto/find-products-query.dto';

@Injectable()
export class ProductsService {
  constructor(@Inject(DrizzleProvider) private readonly db: Database) {}

  async create(createProductDto: CreateProductDto) {
    return this.db.insert(productsTable).values(createProductDto).returning();
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

  async findByBarcode(barcode: string) {
    const [product] = await this.db
      .select()
      .from(productsTable)
      .where(
        and(
          eq(productsTable.barcode, barcode),
          eq(productsTable.active, true),
        ),
      )
      .limit(1);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
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

  remove(id: string) {
    return this.db
      .update(productsTable)
      .set({ active: false })
      .where(eq(productsTable.id, id))
      .returning();
  }
}
