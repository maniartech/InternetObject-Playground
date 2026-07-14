import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

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
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(buildVersion()),
  },
  plugins: [
    react(),
    tsconfigPaths(),
  ],
  optimizeDeps: {
    include: ['monaco-editor'],
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
})

