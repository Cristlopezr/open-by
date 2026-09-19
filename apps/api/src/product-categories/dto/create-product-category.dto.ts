import { z } from 'zod';

export const createProductCategorySchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, 'Slug is required')
    .max(100)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug must contain only lowercase letters, numbers, and hyphens',
    ),
  name: z.string().trim().min(1, 'Name is required').max(255),
});

export type CreateProductCategoryDto = z.infer<
  typeof createProductCategorySchema
>;
