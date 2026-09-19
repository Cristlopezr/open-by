import { Module } from '@nestjs/common';
import { DrizzleModule } from '../db/drizzle.module';
import { ProductCategoriesController } from './product-categories.controller';
import { ProductCategoriesService } from './product-categories.service';

@Module({
  imports: [DrizzleModule],
  controllers: [ProductCategoriesController],
  providers: [ProductCategoriesService],
})
export class ProductCategoriesModule {}
