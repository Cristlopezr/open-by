import { APIError, createAuthMiddleware } from 'better-auth/api';

function validatePassword(password: string) {
  if (typeof password !== 'string') return;

  const hasUppercase = /\p{Lu}/u.test(password);
  const hasNumber = /\p{N}/u.test(password);
  const hasSymbol = /[^\p{L}\p{N}\s]/u.test(password);

  if (!hasUppercase || !hasNumber || !hasSymbol) {
    throw new APIError('BAD_REQUEST', {
      code: 'PASSWORD_REQUIREMENTS_NOT_MET',
      message:
        'Password must contain at least one uppercase letter, one number and one symbol.',
    });
  }
}

export const passwordRules = createAuthMiddleware(async (ctx) => {
  if (ctx.path === '/sign-up/email') {
    validatePassword(ctx.body?.password);
  }

  if (ctx.path === '/change-password' || ctx.path === '/reset-password') {
    validatePassword(ctx.body?.newPassword);
  }
});
