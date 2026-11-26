#!/usr/bin/env bash
#
# Checks for the Next.js website.
#
# Usage:
#   website.sh install    Install the exact dependencies from package-lock.json.
#   website.sh lint       Run ESLint.
#   website.sh typecheck  Check TypeScript without emitting files.
#   website.sh build      Create a production Next.js build.
#   website.sh audit      Check dependencies for high-severity vulnerabilities.
#
source "$(dirname "${BASH_SOURCE[0]}")/lib.sh"

cmd_install() {
    npm ci
}

cmd_lint() {
    npm run lint
}

cmd_typecheck() {
    npx tsc --noEmit
}

cmd_build() {
    npm run build
}

cmd_audit() {
    soft "npm-audit" npm audit --audit-level=high
}

dispatch "$@"
