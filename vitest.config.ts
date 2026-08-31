import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { existsSync } from 'node:fs'
import path from 'path'

/**
 * Where tests import `internet-object` from.
 *
 * Vitest uses THIS file and ignores `vite.config.ts`, so the dev-server alias is not
 * inherited and a bare specifier has to be mapped here. This previously pointed at
 * `../io-js2/dist/index.js`, which the library does not emit — its build produces
 * `dist/esm/` and `dist/cjs/` — so every test importing the library failed to resolve.
 *
 * The sibling checkout is preferred for the same reason `vite.config.ts` prefers it in
 * dev: pnpm *copies* a `file:` dependency at install time, so the installed package is a
 * snapshot that goes stale silently. Tests that assert on the library's real data shapes
 * are worth little if they run against an old copy of it.
 */
function ioLibraryEntry(): string {
  const candidates = [
    path.resolve(__dirname, '../io-js2/dist/esm/index.js'),
    path.resolve(__dirname, '../InternetObject-js/dist/esm/index.js'),
    path.resolve(__dirname, 'node_modules/internet-object/dist/esm/index.js'),
  ]
  const found = candidates.find(existsSync)
  if (!found) {
    throw new Error(
      'internet-object not found for tests — build the library (npm run build in io-js2) or install the dependency.'
    )
  }
  return found
}

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
      'internet-object': ioLibraryEntry(),
    },
  },
})
