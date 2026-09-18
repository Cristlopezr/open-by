import { ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

export const DrizzleProvider = 'DrizzleProvider';
export type Database = NodePgDatabase<typeof schema>;

export const drizzleProvider = {
  provide: DrizzleProvider,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const connectionString = configService.get<string>('DATABASE_URL');
    const pool = new Pool({
      connectionString,
    });
    return drizzle({ client: pool });
  },
};
