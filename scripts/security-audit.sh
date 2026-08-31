#!/bin/bash

# Security Audit Script for IO Playground
# This script performs comprehensive security checks and maintenance

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if pnpm is available
check_pnpm() {
    if ! command -v pnpm &> /dev/null; then
        print_error "pnpm is not installed or not in PATH"
        exit 1
    fi
}

# Function to check if package.json exists
check_package_json() {
    if [ ! -f "package.json" ]; then
        print_error "package.json not found. Are you in the correct directory?"
        exit 1
    fi
}

# Function to ensure the lockfile exists
ensure_lockfile() {
    if [ ! -f "pnpm-lock.yaml" ]; then
        print_warning "pnpm-lock.yaml not found. Installing dependencies..."
        pnpm install
        print_success "Dependencies installed and pnpm-lock.yaml created"
    fi
}

# Function to run security audit
run_audit() {
    print_status "Running pnpm audit..."
    if pnpm audit --audit-level moderate; then
        print_success "No moderate or higher vulnerabilities found!"
        return 0
    else
        print_warning "Vulnerabilities detected."
        return 1
    fi
}

# Function to attempt automatic fixes
attempt_fix() {
    print_status "Checking for available security fixes..."
    print_status "'pnpm audit --fix' adds overrides to package.json; review them before committing."

    # Show detailed audit information
    pnpm audit --audit-level low || true
}

# Function to check for outdated packages
check_outdated() {
    print_status "Checking for outdated packages..."
    if pnpm outdated; then
        print_warning "Some packages are outdated. Consider updating them with 'pnpm update'."
    else
        print_success "All packages are up to date"
    fi
}

# Function to validate project builds
validate_build() {
    print_status "Validating project can build successfully..."
    if pnpm build; then
        print_success "Project builds successfully"
    else
        print_error "Project build failed. Please check for breaking changes."
        exit 1
    fi
}

# Function to run tests if available
run_tests() {
    # Ask package.json whether the script exists, rather than running the test runner
    # with a flag just to see whether it errors.
    if node -e "process.exit(require('./package.json').scripts['test:run'] ? 0 : 1)"; then
        print_status "Running tests..."
        if pnpm test:run; then
            print_success "Tests passed"
        else
            print_warning "Tests failed"
        fi
    else
        print_warning "Tests not available or configured"
    fi
}

# Main execution
main() {
    echo "🔒 IO Playground Security Audit Script"
    echo "======================================"
    echo ""

    # Pre-flight checks
    check_pnpm
    check_package_json

    # Ensure lockfile exists
    ensure_lockfile

    # Run security audit
    if ! run_audit; then
        attempt_fix
    fi

    # Check for outdated packages
    echo ""
    check_outdated

    # Validate build
    echo ""
    validate_build

    # Run tests
    echo ""
    run_tests

    echo ""
    print_success "Security audit completed!"
    echo ""
    echo "📋 Next Steps:"
    echo "  1. Review any remaining vulnerabilities"
    echo "  2. Update outdated packages if needed"
    echo "  3. Test application functionality"
    echo "  4. Commit and push changes"
    echo ""
    echo "📖 For detailed guidelines, see SECURITY-AUDIT.md"
}

# Execute main function
main "$@"
