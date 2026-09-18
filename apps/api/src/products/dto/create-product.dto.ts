import { z } from 'zod';
import { productBarcodeSchema } from './product-fields.schema';

export const createProductSchema = z.object({
  barcode: productBarcodeSchema,
  brand_id: z.uuid('Brand id must be a valid uuid'),
  name: z.string().trim().min(1, 'Name is required').max(255),
  quantity: z.string().trim().max(64).optional(),
  country_code: z
    .string()
    .trim()
    .toUpperCase()
    .regex(
      /^[A-Z]{2}$/,
      'Country code must be a 2-letter ISO 3166-1 alpha-2 code',
    ),
});

export type CreateProductDto = z.infer<typeof createProductSchema>;
