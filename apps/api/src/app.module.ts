import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './config/env.config';
import { DrizzleModule } from './db/drizzle.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
    }),
    DrizzleModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
