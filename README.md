# Internet Object Playground

Welcome to the Internet Object Playground! This interactive platform is designed to let you explore and experiment with the Internet Object (IO) format, a new-age, schema-first, tiny serialization alternative aimed at overcoming the limitations of JSON. Whether you're a developer, a data enthusiast, or just curious about data serialization, this playground offers a hands-on experience to understand and appreciate the capabilities of Internet Object.

![image](https://github.com/maniartech/InternetObject-Playground/assets/134134/300a2868-6831-49bc-b71f-ff02084bf3f1)

## ✨ Features

- **Interactive Editor:** Experiment with IO syntax in real-time using Monaco editor
- **Schema Validation:** Test how IO schemas validate and structure your data
- **Instant Feedback:** See parsing results, validation errors, and schema enforcement live
- **Error Navigation:** Click errors to jump directly to the problem in your code
- **Performance Benchmarks:** Compare IO's efficiency against JSON and other formats
- **Examples Library:** Learn from a variety of common and advanced use cases
- **Non-blocking Parsing:** Large documents parse in the background keeping the UI responsive

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

The playground provides a modern, responsive environment for experimenting with Internet Object:

- **Fast Development:** Quick startup and instant hot-reload for rapid iteration
- **Background Parsing:** Complex parses run in background threads, keeping the editor responsive
- **Dual Output Modes:** View parsed results as formatted JSON or minified data
- **Error Handling:** Clear error messages with one-click navigation to problem locations

## 🧪 Testing

Run the test suite to ensure everything works correctly:

```bash
npm test              # Watch mode
npm run test:ui       # Interactive UI
npm run test:run      # CI mode
```

## 📚 Documentation

- **[Web Worker Implementation](./docs/WEB_WORKER.md)** - Background parsing architecture and usage
- **[Vite Migration Guide](./docs/VITE_MIGRATION.md)** - Complete migration from Create React App
- **[Security Audit Guidelines](./SECURITY-AUDIT.md)** - Security best practices
- **[Phase 6: Web Worker Plan](./docs/phase-6-web-worker-plan.md)** - Original worker implementation plan

## Specification

For a deep dive into the Internet Object format, visit the [official documentation](https://docs.internetobject.org). You'll find comprehensive guides, detailed API documentation, and much more to help you get the most out of Internet Object.

## License

This project is licensed under the `MIT License`.
