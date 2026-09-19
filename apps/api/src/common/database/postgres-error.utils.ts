import { DrizzleQueryError } from 'drizzle-orm';
import { DatabaseError } from 'pg';

const POSTGRES_UNIQUE_VIOLATION = '23505';
const POSTGRES_FOREIGN_KEY_VIOLATION = '23503';

function isPostgresErrorCode(error: unknown, code: string): boolean {
  return (
    error instanceof DrizzleQueryError &&
    error.cause instanceof DatabaseError &&
    error.cause.code === code
  );
}

export function isPostgresUniqueViolation(error: unknown): boolean {
  return isPostgresErrorCode(error, POSTGRES_UNIQUE_VIOLATION);
}

export function isPostgresForeignKeyViolation(error: unknown): boolean {
  return isPostgresErrorCode(error, POSTGRES_FOREIGN_KEY_VIOLATION);
}
