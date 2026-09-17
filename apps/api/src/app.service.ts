import { Inject, Injectable } from '@nestjs/common';
import { DrizzleProvider } from './db/drizzle.provider';
import { productsTable } from './db/schema';

@Injectable()
export class AppService {
  constructor(@Inject(DrizzleProvider) private db) {}

  async getHello() {
    const products = await this.db.select().from(productsTable);
    return products;
  }
}
