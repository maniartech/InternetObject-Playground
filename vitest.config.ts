import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  // Mirrors the build-time stamp from vite.config.ts so modules using it work under test.
  define: {
    __APP_VERSION__: JSON.stringify('00000000'),
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/setupTests.ts'],
    css: true,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
  resolve: {
    alias: {
      'internet-object': path.resolve(__dirname, '../io-js2/dist/index.js'),
    },
  },
})
