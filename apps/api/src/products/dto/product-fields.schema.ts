import { z } from 'zod';

export const productBarcodeSchema = z
  .string()
  .trim()
  .regex(
    /^(?:\d{8}|\d{12}|\d{13}|\d{14})$/,
    'Barcode should have 8, 12, 13 or 14 digits',
  );

export const productImageUrlSchema = z
  .url('Image URL must be a valid absolute URL')
  .max(2048, 'Image URL must be at most 2048 characters')
  .refine(
    (url) => {
      try {
        return new URL(url).protocol === 'https:';
      } catch {
        return false;
      }
    },
    { message: 'Image URL must use HTTPS' },
  );
