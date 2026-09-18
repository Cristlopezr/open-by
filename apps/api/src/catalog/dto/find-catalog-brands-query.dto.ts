import { z } from 'zod';

export const findCatalogBrandsQuerySchema = z.object({
  name: z.string().trim().min(1).max(255),
  limit: z.coerce.number().int().min(1).max(20).default(10),
});

export type FindCatalogBrandsQueryDto = z.infer<
  typeof findCatalogBrandsQuerySchema
>;
