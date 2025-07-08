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

# Function to check if yarn is available
check_yarn() {
    if ! command -v yarn &> /dev/null; then
        print_error "yarn is not installed or not in PATH"
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

# Function to ensure yarn.lock exists
ensure_lockfile() {
    if [ ! -f "yarn.lock" ]; then
        print_warning "yarn.lock not found. Installing dependencies..."
        yarn install
        print_success "Dependencies installed and yarn.lock created"
    fi
}

# Function to run security audit
run_audit() {
    print_status "Running yarn audit..."
    if yarn audit --level moderate; then
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
    print_warning "Note: Yarn doesn't have automatic vulnerability fixing like npm."
    print_status "Please review vulnerabilities and update packages manually or use yarn upgrade."

    # Show detailed audit information
    yarn audit --level info || true
}

# Function to check for outdated packages
check_outdated() {
    print_status "Checking for outdated packages..."
    if yarn outdated; then
        print_warning "Some packages are outdated. Consider updating them with 'yarn upgrade'."
    else
        print_success "All packages are up to date"
    fi
}

# Function to validate project builds
validate_build() {
    print_status "Validating project can build successfully..."
    if yarn build; then
        print_success "Project builds successfully"
    else
        print_error "Project build failed. Please check for breaking changes."
        exit 1
    fi
}

# Function to run tests if available
run_tests() {
    if yarn test --version > /dev/null 2>&1; then
        print_status "Running tests..."
        if yarn test --watchAll=false; then
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
    check_yarn
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
