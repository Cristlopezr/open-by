import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: z.ZodType) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      const { formErrors, fieldErrors } = z.flattenError(result.error);
      throw new BadRequestException({
        message: 'Validation failed',
        errors: [...formErrors, fieldErrors],
      });
    }
    return result.data;
  }
}
