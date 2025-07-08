# Internet Object Playground - WIP

Welcome to the Internet Object Playground! This interactive platform is designed to let you explore and experiment with the Internet Object (IO) format, a new-age, schema-first, tiny serialization alternative aimed at overcoming the limitations of JSON. Whether you're a developer, a data enthusiast, or just curious about data serialization, this playground offers a hands-on experience to understand and appreciate the capabilities of Internet Object.

![image](https://github.com/maniartech/InternetObject-Playground/assets/134134/300a2868-6831-49bc-b71f-ff02084bf3f1)

## Features

- **Interactive Editor:** Experiment with IO syntax in real-time.
- **Schema Validation:** Test how IO schemas validate and structure data.
- **Performance Benchmarks:** Compare IO's efficiency against JSON and other formats.
- **Examples Library:** Access a variety of examples to learn common and advanced use cases.

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
| `npm start` | Start development server on port 4000 |
| `npm run build` | Build for production |
| `npm test` | Run test suite |
| `npm run audit` | Check for security vulnerabilities |
| `npm run security:audit` | Run comprehensive security audit |
| `npm run deps:check` | Check for outdated dependencies |

## Specification

For a deep dive into the Internet Object format, visit the [official documentation](https://docs.internetobject.org). You'll find comprehensive guides, detailed API documentation, and much more to help you get the most out of Internet Object.

## License

This project is licensed under the `MIT License`.
