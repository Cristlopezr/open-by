import { z } from 'zod';
import { productBarcodeSchema } from '../../products/dto/product-fields.schema';

export const findCatalogProductByBarcodeParamsSchema = z.object({
  barcode: productBarcodeSchema,
});

export type FindCatalogProductByBarcodeParamsDto = z.infer<
  typeof findCatalogProductByBarcodeParamsSchema
>;
