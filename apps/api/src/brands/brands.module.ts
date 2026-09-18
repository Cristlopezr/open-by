import { Module } from '@nestjs/common';
import { DrizzleModule } from '../db/drizzle.module';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';

@Module({
  imports: [DrizzleModule],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
