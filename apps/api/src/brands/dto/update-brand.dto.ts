import { z } from 'zod';
import { createBrandSchema } from './create-brand.dto';

export const updateBrandSchema = createBrandSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required',
  });

export type UpdateBrandDto = z.infer<typeof updateBrandSchema>;
