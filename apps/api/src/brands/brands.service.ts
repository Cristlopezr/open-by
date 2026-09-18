import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { asc, eq, ilike } from 'drizzle-orm';
import { isPostgresUniqueViolation } from '../common/database/postgres-error.utils';
import { DrizzleProvider, type Database } from '../db/drizzle.provider';
import { brandsTable } from '../db/schema';
import { normalizeBrandName } from './utils/brand-name.utils';
import type { CreateBrandDto } from './dto/create-brand.dto';
import type { FindBrandsQueryDto } from './dto/find-brands-query.dto';
import type { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {
  constructor(@Inject(DrizzleProvider) private readonly db: Database) {}

  async create(createBrandDto: CreateBrandDto) {
    try {
      const [brand] = await this.db
        .insert(brandsTable)
        .values({
          name: createBrandDto.name,
          normalized_name: normalizeBrandName(createBrandDto.name),
        })
        .returning();

      return brand;
    } catch (error) {
      if (isPostgresUniqueViolation(error)) {
        throw new ConflictException('A brand with this name already exists');
      }
      throw error;
    }
  }

  findAll(query: FindBrandsQueryDto) {
    const nameFilter = query.name
      ? ilike(
          brandsTable.normalized_name,
          `%${normalizeBrandName(query.name)}%`,
        )
      : undefined;

    return this.db
      .select()
      .from(brandsTable)
      .where(nameFilter)
      .orderBy(asc(brandsTable.name))
      .limit(query.limit)
      .offset(query.offset);
  }

  async findOne(id: string) {
    const [brand] = await this.db
      .select()
      .from(brandsTable)
      .where(eq(brandsTable.id, id))
      .limit(1);

    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    return brand;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    try {
      const [brand] = await this.db
        .update(brandsTable)
        .set({
          name: updateBrandDto.name,
          normalized_name: updateBrandDto.name
            ? normalizeBrandName(updateBrandDto.name)
            : undefined,
        })
        .where(eq(brandsTable.id, id))
        .returning();

      if (!brand) {
        throw new NotFoundException('Brand not found');
      }

      return brand;
    } catch (error) {
      if (isPostgresUniqueViolation(error)) {
        throw new ConflictException('A brand with this name already exists');
      }
      throw error;
    }
  }
}
