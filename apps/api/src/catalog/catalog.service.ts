import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { and, asc, eq, ilike } from 'drizzle-orm';
import { normalizeBrandName } from '../brands/utils/brand-name.utils';
import { DrizzleProvider, type Database } from '../db/drizzle.provider';
import {
  brandsTable,
  openingRulesTable,
  productsTable,
} from '../db/schema';
import type { FindCatalogBrandsQueryDto } from './dto/find-catalog-brands-query.dto';

@Injectable()
export class CatalogService {
  constructor(@Inject(DrizzleProvider) private readonly db: Database) {}

  async findProductByBarcode(barcode: string) {
    const [catalogProduct] = await this.db
      .select({
        id: productsTable.id,
        barcode: productsTable.barcode,
        name: productsTable.name,
        quantity: productsTable.quantity,
        image_url: productsTable.image_url,
        countryCode: productsTable.country_code,
        brand: {
          id: brandsTable.id,
          name: brandsTable.name,
        },
        openingRule: {
          durationHours: openingRulesTable.duration_hours,
          storageCondition: openingRulesTable.storage_condition,
          instruction: openingRulesTable.instruction,
          confidence: openingRulesTable.confidence,
          verifiedAt: openingRulesTable.verified_at,
        },
      })
      .from(productsTable)
      .innerJoin(brandsTable, eq(productsTable.brand_id, brandsTable.id))
      .innerJoin(
        openingRulesTable,
        and(
          eq(openingRulesTable.product_id, productsTable.id),
          eq(openingRulesTable.verification_status, 'verified'),
        ),
      )
      .where(
        and(
          eq(productsTable.barcode, barcode),
          eq(productsTable.active, true),
        ),
      )
      .limit(1);

    if (!catalogProduct) {
      throw new NotFoundException('Catalog product not found');
    }

    return catalogProduct;
  }

  findBrands(query: FindCatalogBrandsQueryDto) {
    return this.db
      .select({
        id: brandsTable.id,
        name: brandsTable.name,
      })
      .from(brandsTable)
      .where(
        ilike(
          brandsTable.normalized_name,
          `%${normalizeBrandName(query.name)}%`,
        ),
      )
      .orderBy(asc(brandsTable.name))
      .limit(query.limit);
  }
}
