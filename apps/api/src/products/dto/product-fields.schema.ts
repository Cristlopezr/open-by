import { z } from 'zod';

export const productBarcodeSchema = z
  .string()
  .trim()
  .regex(
    /^(?:\d{8}|\d{12}|\d{13}|\d{14})$/,
    'Barcode should have 8, 12, 13 or 14 digits',
  );
