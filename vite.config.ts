import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

const here = dirname(fileURLToPath(import.meta.url))

/**
 * In DEV, read the library from its source next door instead of the installed copy.
 *
 * `internet-object` is depended on as `file:../io-js2`, and pnpm **copies** a `file:` dependency
 * into the store at install time. It does not link it. So the copy is a snapshot taken once, and
 * nothing that happens in io-js2 afterwards reaches this app — not a rebuild, and certainly not
 * `tsup --watch`, which writes to `io-js2/dist` where nobody here is looking.
 *
 * That is not a theoretical hazard. It cost three separate debugging sessions:
 *
 *   - a copy four builds old, from a fortnight earlier, silently in use;
 *   - a sample document that stopped reporting its syntax errors, because the running library
 *     predated the fix that put them on the sink -- with the give-away being an error CODE the
 *     current library no longer emits;
 *   - and vite's own pre-bundled dependency cache in `node_modules/.vite`, which kept serving the
 *     stale copy even after the copy itself was refreshed.
 *
 * Aliasing to the source removes all three at once: there is no copy, no cache of a copy, and no
 * build step between an edit in io-js2 and a reload here. `pnpm build:watch` is not needed for
 * this app at all.
 *
 * DEV ONLY. `vite build` deliberately keeps using the installed package, because a production
 * build must exercise what a user actually installs. Set `IO_LOCAL=0` to opt out.
 */
const localSource = resolve(here, '../io-js2/src/index.ts')
const useLocalSource = process.env.IO_LOCAL !== '0' && existsSync(localSource)

/**
 * The playground is versioned by publish date (YYYYMMDD), not semver — it ships continuously and
 * has no API for anyone to pin. Stamped at build time so it can never drift from what is deployed.
 */
function buildVersion(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  define: {
    __APP_VERSION__: JSON.stringify(buildVersion()),
  },
  plugins: [
    react(),
    tsconfigPaths(),
    {
      name: 'io-local-source-banner',
      configResolved() {
        if (command !== 'serve') return
        console.log(
          useLocalSource
            ? '\n  internet-object: ../io-js2/src  (live source — no build step needed)\n'
            : '\n  internet-object: the installed copy  (pnpm COPIES file: deps — run `pnpm install` after building io-js2)\n'
        )
      },
    },
  ],
  resolve: {
    alias: command === 'serve' && useLocalSource
      ? { 'internet-object': localSource }
      : {},
  },
  optimizeDeps: {
    include: ['monaco-editor'],
    // The alias points at a source tree that changes while the server runs; pre-bundling it would
    // reintroduce exactly the stale cache this is here to avoid.
    exclude: useLocalSource ? ['internet-object'] : [],
  },
  build: {
    outDir: 'build',
    sourcemap: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          monaco: ['monaco-editor', '@monaco-editor/react'],
          react: ['react', 'react-dom', 'react-router-dom'],
          mui: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          vendor: ['react-resizable-panels', 'lz-string']
        }
      }
    }
  },
  server: {
    port: 4000,
    open: true
  },
  worker: {
    format: 'es'
  }
}))

