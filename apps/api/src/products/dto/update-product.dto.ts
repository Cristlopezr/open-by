import { z } from 'zod';
import { createProductSchema } from './create-product.dto';

export const updateProductSchema = createProductSchema
  .omit({ barcode: true })
  .partial()
  .extend({
    active: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required',
  });

export type UpdateProductDto = z.infer<typeof updateProductSchema>;
