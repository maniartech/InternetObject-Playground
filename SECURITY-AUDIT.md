# Security Audit Guidelines - IO Playground

This document provides comprehensive guidelines for performing regular security audits and maintaining the security posture of the `io-playground` project.

## 🚀 Quick Start for Developers

The project includes custom yarn scripts for easy security management:

```bash
# Daily security check (before commits)
yarn audit

# Check vulnerabilities with moderate level
yarn audit:fix

# Weekly comprehensive check
yarn security:check

# Monthly full security audit
yarn security:audit

# Check for outdated dependencies
yarn deps:check
```

> **💡 Tip**: Use these yarn scripts instead of direct yarn commands for consistency and enhanced functionality.

## 📋 Quick Reference

| Task | Command | Frequency |
|------|---------|-----------|
| Check vulnerabilities | `yarn audit` | Before each commit |
| Fix auto-resolvable issues | `yarn audit:fix` | Weekly |
| Check outdated packages | `yarn deps:check` | Weekly |
| Update dependencies | `yarn deps:update` | Monthly |
| Full security scan | `yarn security:audit` | Monthly |
| Comprehensive check | `yarn security:check` | As needed |
| Update and audit | `yarn deps:update-check` | Monthly |

## Regular Audit Procedures

### 1. Daily Development Checks

Before starting development work:

```bash
# Navigate to project directory
cd /e/Projects/internet-object/io-playground

# Check for vulnerabilities (using yarn script)
yarn audit

# If vulnerabilities found, check with moderate level
yarn audit:fix

# Alternative: use direct yarn commands
yarn audit --level moderate
```

### 2. Weekly Maintenance

Every week, perform these checks:

```bash
# Check for outdated packages (using npm script)
npm run deps:check

# Update packages to latest compatible versions
npm run deps:update

# Run security audit with moderate level
npm run security:check

# Fix any auto-resolvable vulnerabilities
npm run security:fix

# Alternative: update and audit in one command
npm run deps:update-check

# Test the application
npm start
```

### 3. Monthly Deep Security Review

Once per month, perform a comprehensive security review:

```bash
# Run comprehensive security audit script
npm run security:audit

# Check for major version updates
npm run deps:check

# Review and update overrides if needed
# Check package.json "overrides" section

# Run comprehensive tests
npm test

# Build project to ensure no breaking changes
npm run build

# Alternative: use direct commands
npm outdated
./scripts/security-audit.sh
```

## 🛠️ Handling Different Types of Vulnerabilities

### Available NPM Security Scripts

The project includes several custom npm scripts for security management:

| Script | Command | Purpose |
|--------|---------|---------|
| `npm run audit` | `npm audit` | Quick vulnerability check |
| `npm run audit:fix` | `npm audit fix` | Fix auto-resolvable issues |
| `npm run audit:full` | `npm audit && npm outdated` | Full audit with outdated packages |
| `npm run security:check` | `npm audit --audit-level moderate` | Security check with moderate level |
| `npm run security:fix` | `npm audit fix && npm audit` | Fix vulnerabilities and re-audit |
| `npm run security:audit` | `bash scripts/security-audit.sh` | Run comprehensive security script |
| `npm run deps:check` | `npm outdated` | Check for outdated dependencies |
| `npm run deps:update` | `npm update` | Update dependencies to latest compatible |
| `npm run deps:update-check` | `npm update && npm audit` | Update dependencies and audit |

### Usage Examples

```bash
# Quick daily check
npm run audit

# Weekly maintenance
npm run security:check
npm run deps:update-check

# Monthly comprehensive audit
npm run security:audit

# Emergency security fix
npm run security:fix
```

### Automatic Fixes
```bash
# For vulnerabilities that can be fixed automatically (using npm script)
npm run audit:fix

# Or use the security fix script (fixes and re-audits)
npm run security:fix

# Alternative: direct npm command
npm audit fix
```

### Manual Overrides
When automatic fixes aren't available or cause breaking changes, use package overrides:

1. Identify the vulnerable package and required version
2. Add to `package.json` overrides section:
```json
{
  "overrides": {
    "vulnerable-package": ">=secure-version"
  }
}
```
3. Reinstall dependencies: `npm install`

### Major Version Updates
For major dependency updates:

1. Check release notes and breaking changes
2. Update in a separate branch
3. Run full test suite
4. Test application functionality
5. Merge only after thorough testing

## 🤖 Automated Security Monitoring

### GitHub Actions Integration

Create `.github/workflows/security-audit.yml`:

```yaml
name: Security Audit

on:
  push:
    branches: [ master, main ]
  pull_request:
    branches: [ master, main ]
  schedule:
    # Run weekly on Sundays at 2 AM UTC
    - cron: '0 2 * * 0'

jobs:
  audit:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Run security audit
      run: npm audit --audit-level high

    - name: Check for outdated packages
      run: npm outdated || true
```

### Dependabot Configuration

Create `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "02:00"
    open-pull-requests-limit: 10
    reviewers:
      - "maniartech"
    assignees:
      - "maniartech"
```

## 📊 Current Security Configuration

### Package Overrides
The project currently uses these security overrides in `package.json`:

```json
{
  "overrides": {
    "nth-check": ">=2.0.1",
    "postcss": ">=8.4.31",
    "webpack-dev-server": ">=5.2.1"
  }
}
```

### Rationale for Overrides:
- **nth-check**: Fixed inefficient regex complexity vulnerability
- **postcss**: Fixed line return parsing error
- **webpack-dev-server**: Fixed source code exposure vulnerabilities

## 🔧 Troubleshooting Common Issues

### "No lockfile found" Error
```bash
# Create lockfile without installing
npm i --package-lock-only

# Then run audit
npm run audit
```

### Breaking Changes After Updates
```bash
# Rollback to previous state
git checkout package-lock.json
npm install

# Re-run security check
npm run security:check

# Then investigate the breaking change before re-applying
```

### Override Not Working
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install

# Verify security status
npm run audit
```

### Script Execution Issues
```bash
# Make security script executable (Linux/Mac)
chmod +x scripts/security-audit.sh

# Run security audit script directly
npm run security:audit

# Alternative: run script directly
bash scripts/security-audit.sh
```

## Security Metrics to Track

### Weekly Report
- Number of vulnerabilities found
- Number of vulnerabilities fixed
- Number of packages updated
- Test coverage status

### Monthly Report
- Dependency freshness score
- Security score improvement
- Breaking changes identified
- Time to resolution for critical issues

## Emergency Response

### Critical Vulnerability Response
1. **Immediate**: Stop deploying current version
2. **Within 2 hours**: Assess impact and create hotfix branch
3. **Within 4 hours**: Apply fix and test
4. **Within 8 hours**: Deploy fixed version
5. **Within 24 hours**: Post-mortem and process improvement

### Communication Protocol
- Notify team immediately for critical vulnerabilities
- Document all changes in commit messages
- Update this document with lessons learned

## Additional Resources

- [npm audit documentation](https://docs.npmjs.com/cli/v8/commands/npm-audit)
- [GitHub Security Advisories](https://github.com/advisories)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

## Document Maintenance

This document should be reviewed and updated:
- After each major dependency update
- When new security tools are added
- Quarterly as part of security review
- When security incidents occur

---

**Last Updated**: July 8, 2025
**Next Review**: October 8, 2025
