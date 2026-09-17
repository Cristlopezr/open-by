import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [swc.vite()],
  test: {
    globals: true,
    environment: 'node',
    clearMocks: true,
    include: ['src/**/*.spec.ts', 'test/**/*.e2e-spec.ts'],
    coverage: {
      provider: 'v8',
    },
  },
});
