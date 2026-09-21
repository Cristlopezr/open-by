import { betterAuth, BetterAuthOptions } from 'better-auth';

export const authConfig = {
  emailAndPassword: {
    enabled: true,
  },
} satisfies BetterAuthOptions;

export const auth = betterAuth({
  ...authConfig,
});
