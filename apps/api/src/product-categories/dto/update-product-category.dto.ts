import { z } from 'zod';
import { createProductCategorySchema } from './create-product-category.dto';

export const updateProductCategorySchema = createProductCategorySchema
  .pick({ name: true })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required',
  });

export type UpdateProductCategoryDto = z.infer<
  typeof updateProductCategorySchema
>;
