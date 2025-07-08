# Security Guidelines - Quick Reference

This document provides quick reference commands for maintaining security in the IO Playground project.

## 🚀 Quick Commands

### Daily Security Checks
```bash
# Quick vulnerability check
yarn audit

# Check vulnerabilities with moderate level
yarn audit:fix
```

### Weekly Maintenance
```bash
# Comprehensive security check
yarn security:check

# Check and update dependencies
yarn deps:update-check

# Run full security audit script
yarn security:audit
```

### Emergency Security Response
```bash
# Check vulnerabilities with all levels
yarn audit --level info

# Check what broke after updates
yarn test
yarn build
```

## 📋 Security Checklist

### Before Each Commit
- [ ] Run `yarn audit`
- [ ] Fix any high/critical vulnerabilities
- [ ] Test application functionality

### Weekly Review
- [ ] Run `yarn security:audit`
- [ ] Review Dependabot PRs
- [ ] Update dependencies: `yarn deps:update`
- [ ] Test updated dependencies

### Monthly Deep Dive
- [ ] Review security overrides in package.json
- [ ] Check for major dependency updates
- [ ] Review and update security policies
- [ ] Run comprehensive tests

## 🔗 Related Files

- [SECURITY-AUDIT.md](./SECURITY-AUDIT.md) - Comprehensive security guidelines
- [.github/workflows/security-audit.yml](./.github/workflows/security-audit.yml) - Automated security checks
- [.github/dependabot.yml](./.github/dependabot.yml) - Automated dependency updates
- [scripts/security-audit.sh](./scripts/security-audit.sh) - Security audit script

---

For detailed security procedures, see [SECURITY-AUDIT.md](./SECURITY-AUDIT.md).
