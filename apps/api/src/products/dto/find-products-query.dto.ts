import { z } from 'zod';
import { productBarcodeSchema } from './product-fields.schema';

export const findProductsQuerySchema = z.object({
  name: z.string().trim().min(1).max(255).optional(),
  barcode: productBarcodeSchema.optional(),
  brandId: z.uuid().optional(),
  countryCode: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{2}$/)
    .optional(),
  active: z
    .enum(['true', 'false'])
    .transform((value) => value === 'true')
    .optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

export type FindProductsQueryDto = z.infer<typeof findProductsQuerySchema>;
