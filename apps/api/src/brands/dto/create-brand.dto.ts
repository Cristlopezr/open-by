import { z } from 'zod';

export const createBrandSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(255),
});

export type CreateBrandDto = z.infer<typeof createBrandSchema>;
