import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import {
  seedBrands,
  seedEvidence,
  seedOpeningRules,
  seedProductCategories,
  seedProducts,
} from './seed-data';
import {
  brandsTable,
  evidenceTable,
  openingRulesTable,
  productCategoriesTable,
  productsTable,
} from './schema';

const connectionString = process.env.DATABASE_URL;

if (process.env.NODE_ENV !== 'development') {
  throw new Error(
    `Seeding is allowed only in development. Current NODE_ENV: ${process.env.NODE_ENV}`,
  );
}

if (!connectionString) {
  throw new Error('DATABASE_URL is required to seed the database.');
}

const pool = new Pool({ connectionString });
const db = drizzle({ client: pool });

async function seed() {
  await db.transaction(async (tx) => {
    await tx.insert(brandsTable).values(seedBrands).onConflictDoNothing();
    await tx
      .insert(productCategoriesTable)
      .values(seedProductCategories)
      .onConflictDoNothing();
    await tx.insert(productsTable).values(seedProducts).onConflictDoNothing();
    await tx
      .insert(openingRulesTable)
      .values(seedOpeningRules)
      .onConflictDoNothing();
    await tx.insert(evidenceTable).values(seedEvidence).onConflictDoNothing();
  });
}

seed()
  .then(() => console.info('Database seeded successfully.'))
  .catch((error: unknown) => {
    console.error('Database seeding failed.', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
