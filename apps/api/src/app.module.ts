import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './config/env.config';
import { DrizzleModule } from './db/drizzle.module';
import { ProductsModule } from './products/products.module';
import { BrandsModule } from './brands/brands.module';
import { CatalogModule } from './catalog/catalog.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { type Database, DrizzleProvider } from './db/drizzle.provider';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import * as authSchema from './db/auth-schema';
import { authConfig } from './lib/auth';

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
    AuthModule.forRootAsync({
      imports: [DrizzleModule],
      inject: [DrizzleProvider],
      useFactory: (db: Database) => ({
        auth: betterAuth({
          ...authConfig,
          database: drizzleAdapter(db, {
            provider: 'pg',
            schema: authSchema,
          }),
        }),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
