# Internet Object Playground

Welcome to the Internet Object Playground! This interactive platform is designed to let you explore and experiment with the Internet Object (IO) format, a new-age, schema-first, tiny serialization alternative aimed at overcoming the limitations of JSON. Whether you're a developer, a data enthusiast, or just curious about data serialization, this playground offers a hands-on experience to understand and appreciate the capabilities of Internet Object.

![image](https://github.com/maniartech/InternetObject-Playground/assets/134134/300a2868-6831-49bc-b71f-ff02084bf3f1)

## ✨ Features

- **Interactive Editor:** Experiment with IO syntax in real-time with Monaco editor
- **Schema Validation:** Test how IO schemas validate and structure data
- **Background Parsing:** Web Worker-based parsing keeps UI responsive
- **Error Tracking:** Structured error handling with Monaco markers and navigation
- **Performance Benchmarks:** Compare IO's efficiency against JSON and other formats
- **Examples Library:** Access a variety of examples to learn common and advanced use cases

## 🚀 Performance

Built with Vite for blazing-fast development and optimized production builds:

- **Dev Server:** <1 second startup (20x faster than CRA)
- **HMR:** ~50ms hot module replacement (10x faster than CRA)
- **Bundle Size:** ~151 kB gzipped (optimized with code splitting)
- **Background Parsing:** Web Worker offloads parsing to prevent UI blocking

## 🔒 Security

This project follows strict security practices:

- **Daily**: Run `npm run audit` before commits
- **Weekly**: Run `npm run security:audit` for comprehensive checks
- **Automated**: GitHub Actions and Dependabot for continuous monitoring

### Quick Security Commands
```bash
# Check for vulnerabilities
npm run audit

# Fix auto-resolvable issues
npm run audit:fix

# Comprehensive security audit
npm run security:audit

# Check outdated dependencies
npm run deps:check
```

For detailed security guidelines, see [SECURITY-AUDIT.md](./SECURITY-AUDIT.md) or [SECURITY-QUICK-REF.md](./SECURITY-QUICK-REF.md) for quick reference.

## 📜 Development Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start Vite dev server (port 4000, fallback to next available) |
| `npm start` | Alias for `npm run dev` |
| `npm run build` | Production build with TypeScript check |
| `npm run build:check` | Build with full type checking |
| `npm run preview` | Preview production build locally |
| `npm test` | Run tests in watch mode with Vitest |
| `npm run test:ui` | Run tests with interactive UI |
| `npm run test:run` | Run tests once (CI mode) |
| `npm run audit` | Check for security vulnerabilities |
| `npm run security:audit` | Run comprehensive security audit |
| `npm run deps:check` | Check for outdated dependencies |

## 🏗️ Architecture

### Build System: Vite 6

Migrated from Create React App to Vite for:
- ⚡ **20x faster** dev server startup (<1s vs 15-20s)
- 🔥 **10x faster** HMR (~50ms vs 500ms)
- 📦 **40% smaller** node_modules (229 packages vs 1400+)
- 🎯 Modern ESM-first architecture

### Web Worker Parsing

Parser runs in a separate thread to keep UI responsive:

```typescript
// Enabled by default in Playground component
const { parse, isParsing } = useParseIO(
  documentText,
  schemaText,
  showSchema,
  minifiedOutput,
  skipErrors,
  { useWorker: true } // Background parsing enabled
);
```

**Benefits:**
- ✅ Non-blocking UI during complex parses
- ✅ Automatic timeout protection (5s default)
- ✅ Graceful cancellation on navigation
- ✅ Fallback to main thread if worker unavailable

### Package Structure

The playground uses the local `internet-object` package with dual ESM/CommonJS support:

```json
{
  "dependencies": {
    "internet-object": "file:../io-js2"
  }
}
```

The `io-js2` package exports both formats:
- `dist/esm/` - ES modules (used by Vite/browsers)
- `dist/cjs/` - CommonJS (Node.js compatibility)

## 🧪 Testing

Uses Vitest with happy-dom for fast, modern testing:

```bash
npm test              # Watch mode
npm run test:ui       # Interactive UI
npm run test:run      # CI mode
```

**Coverage:**
- ✅ Error sorting utilities (14 tests)
- ✅ JSON decoration generation (12 tests)
- 🎯 26/26 tests passing

## 📚 Documentation

- **[Web Worker Implementation](./docs/WEB_WORKER.md)** - Background parsing architecture and usage
- **[Vite Migration Guide](./docs/VITE_MIGRATION.md)** - Complete migration from Create React App
- **[Security Audit Guidelines](./SECURITY-AUDIT.md)** - Security best practices
- **[Phase 6: Web Worker Plan](./docs/phase-6-web-worker-plan.md)** - Original worker implementation plan

## Specification

For a deep dive into the Internet Object format, visit the [official documentation](https://docs.internetobject.org). You'll find comprehensive guides, detailed API documentation, and much more to help you get the most out of Internet Object.

## License

This project is licensed under the `MIT License`.
