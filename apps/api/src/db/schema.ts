import { sql } from 'drizzle-orm';
import {
  uuid,
  integer,
  varchar,
  pgTable,
  pgEnum,
  numeric,
  timestamp,
  check,
  jsonb,
  text,
  boolean,
} from 'drizzle-orm/pg-core';

export const openingRuleVerificationStatus = pgEnum(
  'opening_rule_verification_status',
  ['rejected', 'pending', 'verified'],
);

export const catalogRequestStatus = pgEnum('catalog_request_status', [
  'pending',
  'processing',
  'resolved',
  'rejected',
]);

export const validationRunStatus = pgEnum('validation_run_status', [
  'pending',
  'running',
  'succeeded',
  'failed',
]);

export const brandsTable = pgTable('brands', {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  normalized_name: varchar({ length: 255 }).notNull().unique(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const productCategoriesTable = pgTable('product_categories', {
  id: uuid().defaultRandom().primaryKey(),
  slug: varchar({ length: 100 }).notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  normalized_name: varchar({ length: 255 }).notNull().unique(),
  active: boolean().notNull().default(true),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const productsTable = pgTable('products', {
  id: uuid().defaultRandom().primaryKey(),
  barcode: varchar({ length: 32 }).notNull().unique(),
  brand_id: uuid()
    .notNull()
    .references(() => brandsTable.id),
  category_id: uuid()
    .notNull()
    .references(() => productCategoriesTable.id),
  name: varchar({ length: 255 }).notNull(),
  quantity: varchar({ length: 64 }),
  image_url: varchar({ length: 2048 }),
  country_code: varchar({ length: 2 }).notNull(),
  active: boolean().notNull().default(true),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const openingRulesTable = pgTable(
  'opening_rules',
  {
    id: uuid().defaultRandom().primaryKey(),
    product_id: uuid()
      .notNull()
      .unique()
      .references(() => productsTable.id),
    duration_hours: integer().notNull(),
    storage_condition: varchar({ length: 255 }).notNull(),
    instruction: varchar({ length: 255 }).notNull(),
    verification_status: openingRuleVerificationStatus()
      .notNull()
      .default('pending'),
    confidence: numeric({ precision: 3, scale: 2, mode: 'number' }).notNull(),
    verified_at: timestamp({ withTimezone: true }),
  },
  (table) => [
    check('duration_hours_positive', sql`${table.duration_hours} > 0`),
    check(
      'confidence_between_zero_and_one',
      sql`${table.confidence} >= 0 and ${table.confidence} <= 1`,
    ),
  ],
);

export const catalogRequestsTable = pgTable(
  'catalog_requests',
  {
    id: uuid().defaultRandom().primaryKey(),
    barcode: varchar({ length: 32 }).notNull().unique(),
    status: catalogRequestStatus().notNull().default('pending'),
    scan_count: integer().notNull().default(1),
    first_seen_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
    last_seen_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
    resolved_product_id: uuid()
      .unique()
      .references(() => productsTable.id),
  },
  (table) => [
    check('catalog_request_scan_count_positive', sql`${table.scan_count} > 0`),
  ],
);

export const validationRunsTable = pgTable('validation_runs', {
  id: uuid().defaultRandom().primaryKey(),
  catalog_request_id: uuid()
    .notNull()
    .references(() => catalogRequestsTable.id),
  provider: varchar({ length: 100 }).notNull(),
  model: varchar({ length: 255 }).notNull(),
  status: validationRunStatus().notNull().default('pending'),
  result: jsonb(),
  error: text(),
  started_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  completed_at: timestamp({ withTimezone: true }),
});

export const evidenceTable = pgTable('evidence', {
  id: uuid().defaultRandom().primaryKey(),
  opening_rule_id: uuid()
    .notNull()
    .references(() => openingRulesTable.id),
  source_type: varchar({ length: 50 }).notNull(),
  source_url: varchar({ length: 2048 }).notNull(),
  extracted_text: text().notNull(),
  content_hash: varchar({ length: 64 }).notNull(),
  retrieved_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});
