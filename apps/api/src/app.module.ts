import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './config/env.config';
import { DrizzleModule } from './db/drizzle.module';
import { ProductsModule } from './products/products.module';
import { BrandsModule } from './brands/brands.module';
import { CatalogModule } from './catalog/catalog.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
    }),
    DrizzleModule,
    ProductsModule,
    BrandsModule,
    ProductCategoriesModule,
    CatalogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
