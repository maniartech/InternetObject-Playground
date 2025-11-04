# Build Modernization Plan: CRA to Vite Migration

**Status:** 📋 Planned
**Priority:** Medium
**Impact:** Build performance, developer experience, future maintenance
**Date:** November 4, 2025

## Executive Summary

This document outlines the migration path from Create React App (CRA) to Vite, addressing current build tool limitations and preparing the IO Playground for modern development workflows.

## Current State Analysis

### Build Tool: Create React App (react-scripts 5.0.1)

**Pros:**
- ✅ Zero configuration - works out of the box
- ✅ Well-established ecosystem
- ✅ Known to the team

**Cons:**
- ❌ **Project unmaintained** - CRA is no longer actively developed
- ❌ **Babel dependency warning** - Missing `@babel/plugin-proposal-private-property-in-object`
- ❌ **Slow builds** - Webpack-based, slower than modern alternatives
- ❌ **Slow HMR** - Hot Module Replacement has noticeable lag
- ❌ **Large bundle** - 156.6 kB gzipped (could be smaller with Vite)
- ❌ **Outdated dependencies** - Security and compatibility risks
- ❌ **Limited customization** - Requires ejecting for advanced config

### Immediate Fix Applied

Added `@babel/plugin-proposal-private-property-in-object` to devDependencies to silence the warning:

```json
"devDependencies": {
  "@babel/plugin-proposal-private-property-in-object": "^7.21.11",
  "cross-env": "^7.0.3"
}
```

This is a **temporary workaround** until Vite migration is complete.

## Why Vite?

### Performance Benefits

| Metric | CRA (Webpack) | Vite | Improvement |
|--------|---------------|------|-------------|
| Cold start | ~15-20s | ~1-2s | **10x faster** |
| HMR | ~500-1000ms | ~50-100ms | **10x faster** |
| Build time | ~30-40s | ~10-15s | **3x faster** |
| Bundle size | 156.6 kB | ~120-140 kB | ~10-15% smaller |

### Developer Experience

- ⚡ **Instant server start** - No bundling on dev start
- ⚡ **Lightning fast HMR** - Updates in <100ms
- 🎯 **Native ESM** - Leverages browser capabilities
- 🔧 **Simple config** - vite.config.ts is intuitive
- 📦 **Modern by default** - ES2020+, tree-shaking, code splitting
- 🔌 **Rich plugin ecosystem** - React, TypeScript, PWA, etc.

### Future-Proofing

- ✅ **Active development** - Regular updates and improvements
- ✅ **Industry adoption** - Used by Nuxt, SvelteKit, Astro
- ✅ **TypeScript-first** - Better DX for typed projects
- ✅ **Framework agnostic** - Easy to switch if needed

## Migration Plan

### Phase 1: Preparation (Current)

**Status:** ✅ Complete

- [x] Add babel plugin workaround
- [x] Document current build metrics (156.6 kB, ~30s build)
- [x] Review dependencies for Vite compatibility
- [x] Create migration plan document

### Phase 2: Vite Setup (Estimated 2-4 hours)

**Tasks:**

1. **Install Vite and plugins**
   ```bash
   npm install --save-dev vite @vitejs/plugin-react vite-plugin-monaco-editor
   npm install --save-dev vite-tsconfig-paths
   ```

2. **Create `vite.config.ts`**
   ```typescript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import monacoEditorPlugin from 'vite-plugin-monaco-editor'
   import tsconfigPaths from 'vite-tsconfig-paths'

   export default defineConfig({
     plugins: [
       react(),
       tsconfigPaths(),
       monacoEditorPlugin({
         languageWorkers: ['json', 'typescript', 'javascript'],
         customWorkers: [
           {
             label: 'io',
             entry: 'monaco-editor/esm/vs/basic-languages/io/io.worker'
           }
         ]
       })
     ],
     build: {
       outDir: 'build',
       sourcemap: true,
       rollupOptions: {
         output: {
           manualChunks: {
             monaco: ['monaco-editor', '@monaco-editor/react'],
             react: ['react', 'react-dom', 'react-router-dom'],
             vendor: ['recoil', 'split-pane-react']
           }
         }
       }
     },
     server: {
       port: 4000,
       open: true
     },
     optimizeDeps: {
       include: ['monaco-editor']
     }
   })
   ```

3. **Update `index.html`**
   - Move from `public/index.html` to root
   - Add `<script type="module" src="/src/index.tsx"></script>`
   - Remove `%PUBLIC_URL%` placeholders

4. **Update `package.json` scripts**
   ```json
   {
     "scripts": {
       "dev": "vite",
       "build": "tsc && vite build",
       "preview": "vite preview",
       "test": "vitest"
     }
   }
   ```

### Phase 3: Monaco Editor Configuration (Estimated 1-2 hours)

**Challenge:** Monaco editor requires special worker configuration.

**Solution:**

1. **Use `vite-plugin-monaco-editor`** (already in config above)

2. **Update Monaco setup in `src/components/editor/monaco.ts`**
   ```typescript
   // Vite handles worker loading automatically via plugin
   // Remove manual worker URL configuration
   ```

3. **Test IO language registration**
   - Verify custom IO language still works
   - Ensure syntax highlighting functional
   - Test error markers display

### Phase 4: Testing Migration (Estimated 2-3 hours)

**Test Strategy:**

1. **Unit Tests** - Migrate Jest to Vitest
   ```typescript
   // vitest.config.ts
   import { defineConfig } from 'vitest/config'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     test: {
       globals: true,
       environment: 'jsdom',
       setupFiles: ['./src/setupTests.ts']
     }
   })
   ```

2. **Update test imports**
   ```typescript
   // Replace Jest globals with Vitest
   import { describe, it, expect, vi } from 'vitest'
   ```

3. **Verify all 26 tests pass**

### Phase 5: Build Optimization (Estimated 1-2 hours)

**Optimizations:**

1. **Code splitting strategy**
   - Monaco editor (largest chunk)
   - React libraries
   - Vendor dependencies
   - Route-based splitting (if needed)

2. **Asset optimization**
   - Image optimization plugin
   - CSS minification
   - Tree-shaking verification

3. **Bundle analysis**
   ```bash
   npm install --save-dev rollup-plugin-visualizer
   ```

### Phase 6: Deployment Update (Estimated 1 hour)

**Tasks:**

1. Update CI/CD pipeline (if exists)
2. Update deployment scripts
3. Verify production build works
4. Update documentation

## Critical Considerations

### Monaco Editor Workers

**Issue:** Monaco requires special worker handling.

**CRA Approach:**
```javascript
// Workers loaded via webpack
self.MonacoEnvironment = {
  getWorkerUrl: function(moduleId, label) {
    return './monaco-worker-loader.js'
  }
}
```

**Vite Approach:**
```javascript
// vite-plugin-monaco-editor handles this automatically
// Or use web workers API directly
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'

self.MonacoEnvironment = {
  getWorker: function(moduleId, label) {
    return new EditorWorker()
  }
}
```

### Environment Variables

**CRA:**
```env
REACT_APP_API_URL=https://api.example.com
```

**Vite:**
```env
VITE_API_URL=https://api.example.com
```

Update all `process.env.REACT_APP_*` to `import.meta.env.VITE_*`

### Browser Compatibility

**CRA:** Targets ES5 + polyfills (broader compatibility)
**Vite:** Targets modern browsers (ES2020+)

**Impact:** May drop IE11 support (acceptable for IO Playground)

## Risk Assessment

### Low Risk
- ✅ Breaking existing features (tests provide safety net)
- ✅ Build output differences (can verify byte-by-byte)
- ✅ Developer workflow disruption (Vite is familiar)

### Medium Risk
- ⚠️ Monaco editor integration (well-documented solution exists)
- ⚠️ Test migration (Vitest API similar to Jest)
- ⚠️ Environment variable changes (easy to find and replace)

### High Risk
- ❌ None identified

## Rollback Plan

If migration fails:

1. **Git branch strategy**
   - Create `feature/vite-migration` branch
   - Keep `master` on CRA until migration validated
   - Use feature flags if deploying partially

2. **Quick rollback**
   ```bash
   git checkout master
   npm install
   npm start
   ```

3. **Validation checklist**
   - [ ] All 26 tests pass
   - [ ] Dev server starts in <2s
   - [ ] HMR works in <100ms
   - [ ] Production build succeeds
   - [ ] Monaco editor functional
   - [ ] Error markers display correctly
   - [ ] JSON decorations work
   - [ ] Click-to-jump navigation works

## Timeline Estimate

| Phase | Estimated Time | Dependencies |
|-------|----------------|--------------|
| 1. Preparation | ✅ Complete | - |
| 2. Vite Setup | 2-4 hours | Phase 1 |
| 3. Monaco Config | 1-2 hours | Phase 2 |
| 4. Testing Migration | 2-3 hours | Phase 3 |
| 5. Build Optimization | 1-2 hours | Phase 4 |
| 6. Deployment | 1 hour | Phase 5 |
| **Total** | **7-12 hours** | - |

**Recommended:** Allocate 2 full working days for migration + testing.

## Success Metrics

### Performance
- [ ] Dev server starts in <2 seconds (vs. current ~15-20s)
- [ ] HMR updates in <100ms (vs. current ~500ms)
- [ ] Production build in <15s (vs. current ~30s)
- [ ] Bundle size <145 kB gzipped (vs. current 156.6 kB)

### Quality
- [ ] All tests pass (26/26)
- [ ] No console errors in dev
- [ ] No console warnings in production build
- [ ] Monaco editor fully functional
- [ ] Error highlighting works
- [ ] JSON decorations work

### Developer Experience
- [ ] Faster local development feedback loop
- [ ] Simpler configuration (vite.config.ts vs. ejected CRA)
- [ ] Better debugging with source maps
- [ ] Modern tooling and ecosystem

## Post-Migration Cleanup

After successful migration:

1. **Remove CRA dependencies**
   ```bash
   npm uninstall react-scripts
   npm uninstall @babel/plugin-proposal-private-property-in-object
   ```

2. **Clean up config files**
   - Delete `config/` directory (if ejected)
   - Remove CRA-specific settings from `package.json`

3. **Update documentation**
   - README.md setup instructions
   - CONTRIBUTING.md development guide
   - Add Vite-specific tips

## Alternative Considered

### Option 1: Stay with CRA
**Pros:** No migration effort
**Cons:** Unmaintained, slow, growing technical debt
**Decision:** ❌ Not recommended

### Option 2: Eject CRA and customize Webpack
**Pros:** Keep Webpack, more control
**Cons:** Complex config, manual maintenance, slower than Vite
**Decision:** ❌ Not recommended

### Option 3: Migrate to Next.js
**Pros:** Framework with SSR, great DX
**Cons:** Overkill for playground, different mental model
**Decision:** ❌ Not needed for this project

### Option 4: Migrate to Vite
**Pros:** Fast, modern, maintained, great DX
**Cons:** Migration effort (mitigated by small codebase)
**Decision:** ✅ **Recommended**

## Resources

### Official Documentation
- [Vite Guide](https://vitejs.dev/guide/)
- [vite-plugin-monaco-editor](https://github.com/vdesjs/vite-plugin-monaco-editor)
- [Vitest](https://vitest.dev/)

### Migration Guides
- [Vite: Migrating from CRA](https://vitejs.dev/guide/migration.html)
- [Monaco Editor with Vite](https://github.com/microsoft/monaco-editor/blob/main/docs/integrate-esm.md)

### Community Examples
- [vite-react-ts-starter](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)
- [Monaco Editor Vite Example](https://github.com/suren-atoyan/monaco-react)

## Conclusion

Migrating from CRA to Vite is a **highly recommended** modernization step that will:

1. **Improve developer experience** - 10x faster dev server and HMR
2. **Reduce build times** - 3x faster production builds
3. **Future-proof the project** - Active maintenance and ecosystem
4. **Maintain quality** - Existing tests provide safety net

The migration is **low risk** with a **clear rollback path** and **estimated 7-12 hours** of effort. The long-term benefits far outweigh the short-term investment.

**Recommendation:** Schedule migration for next sprint with dedicated time allocation.
