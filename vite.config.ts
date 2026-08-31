import { existsSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
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
 * nothing that happens in the library afterwards reaches this app — not a rebuild, and certainly
 * not `tsup --watch`, which writes to a directory nobody here is looking at.
 *
 * That is not a theoretical hazard. It cost three separate debugging sessions:
 *
 *   - a copy four builds old, from a fortnight earlier, silently in use;
 *   - a sample document that stopped reporting its syntax errors, because the running library
 *     predated the fix that put them on the sink — the give-away being an error CODE the current
 *     library no longer emits;
 *   - and vite's own pre-bundled dependency cache in `node_modules/.vite`, which kept serving the
 *     stale copy even after the copy itself was refreshed.
 *
 * Aliasing to the source removes all three: no copy, no cache of a copy, and no build step between
 * an edit in the library and a reload here.
 *
 * The location is resolved rather than assumed, the same way the library resolves its own siblings:
 * the repository is called `InternetObject-js`, so a plain `git clone` produces that name, while
 * this machine happens to use `io-js2`. Both are tried; `IO_LOCAL_PATH` overrides for any other
 * layout and `IO_LOCAL=0` opts out.
 *
 * DEV ONLY. `vite build` keeps using the installed dependency, because a production build must
 * exercise a real installed package rather than a working tree.
 */
function findLocalSource(): { entry: string | null; why: string } {
  if (process.env.IO_LOCAL === '0') {
    return { entry: null, why: 'IO_LOCAL=0 — using the installed dependency on purpose' }
  }

  const override = process.env.IO_LOCAL_PATH
  const candidates = override
    ? [resolve(here, override)]
    : ['../io-js2', '../InternetObject-js'].map((name) => resolve(here, name))

  for (const dir of candidates) {
    const entry = resolve(dir, 'src/index.ts')
    if (existsSync(entry)) return { entry, why: '' }
  }

  // An explicit path that does not resolve is a mistake worth naming. Falling back silently and
  // then advising "set IO_LOCAL_PATH" to somebody who has just set it is how a typo costs an hour.
  return override
    ? { entry: null, why: `IO_LOCAL_PATH=${override} has no src/index.ts — check the path` }
    : { entry: null, why: 'no sibling checkout found; set IO_LOCAL_PATH to point at one' }
}

const { entry: localSource, why: localSourceWhy } = findLocalSource()
const useLocalSource = localSource !== null

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
          localSource
            ? `\n  internet-object: ${relative(here, localSource)}  (live source — no build step needed)\n`
            : `\n  internet-object: the installed dependency  (${localSourceWhy})\n`
        )
      },
    },
  ],
  resolve: {
    // Typed explicitly: a conditional object literal widens to a union that `AliasOptions` will
    // not accept, and vite.config.ts is type-checked (tsconfig includes it) precisely so that a
    // mistake here is caught by `tsc` rather than by the dev server failing to start.
    alias: ((): Record<string, string> =>
      command === 'serve' && localSource ? { 'internet-object': localSource } : {})(),
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

