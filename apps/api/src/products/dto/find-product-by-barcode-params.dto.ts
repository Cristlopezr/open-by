import { z } from 'zod';
import { productBarcodeSchema } from './product-fields.schema';

export const findProductByBarcodeParamsSchema = z.object({
  barcode: productBarcodeSchema,
});

export type FindProductByBarcodeParamsDto = z.infer<
  typeof findProductByBarcodeParamsSchema
>;
