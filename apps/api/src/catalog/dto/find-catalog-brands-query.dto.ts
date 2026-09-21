import { z } from 'zod';

export const findCatalogBrandsQuerySchema = z.object({
  name: z.string().trim().min(1).max(255).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

export type FindCatalogBrandsQueryDto = z.infer<
  typeof findCatalogBrandsQuerySchema
>;
