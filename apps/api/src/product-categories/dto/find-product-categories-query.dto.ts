import { z } from 'zod';

export const findProductCategoriesQuerySchema = z.object({
  name: z.string().trim().min(1).max(255).optional(),
  active: z
    .enum(['true', 'false'])
    .transform((value) => value === 'true')
    .optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

export type FindProductCategoriesQueryDto = z.infer<
  typeof findProductCategoriesQuerySchema
>;
