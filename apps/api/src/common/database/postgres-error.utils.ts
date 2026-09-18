import { DrizzleQueryError } from 'drizzle-orm';
import { DatabaseError } from 'pg';

const POSTGRES_UNIQUE_VIOLATION = '23505';

export function isPostgresUniqueViolation(error: unknown): boolean {
  return (
    error instanceof DrizzleQueryError &&
    error.cause instanceof DatabaseError &&
    error.cause.code === POSTGRES_UNIQUE_VIOLATION
  );
}
