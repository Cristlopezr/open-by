import { betterAuth, BetterAuthOptions } from 'better-auth';
import { admin } from 'better-auth/plugins';
import { passwordRules } from './auth-hooks';

export const authConfig = {
  plugins: [
    admin({
      defaultRole: 'user',
    }),
  ],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    /*  requireEmailVerification: true, */
  },
  emailVerification: {
    sendOnSignUp: true,
  },
  hooks: {
    before: passwordRules,
  },
  /* rateLimit: {
    window: 10,
    max: 100,
  }, */
} satisfies BetterAuthOptions;

export const auth = betterAuth({
  ...authConfig,
});
