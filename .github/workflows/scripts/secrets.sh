#!/usr/bin/env bash
#
# Scans the whole git history for committed secrets with the gitleaks CLI.
# (The gitleaks GitHub Action needs a paid licence for organisation repos;
# the CLI does not.)
#
# Usage:
#   secrets.sh scan  Fail if any secret is found anywhere in the history.
#
source "$(dirname "${BASH_SOURCE[0]}")/lib.sh"

readonly GITLEAKS_VERSION="${GITLEAKS_VERSION:-8.21.2}"

install_gitleaks() {
    command -v gitleaks >/dev/null && return
    local os arch
    case "$(uname -s)" in Linux) os=linux ;; Darwin) os=darwin ;; *) echo "unsupported OS" >&2; return 1 ;; esac
    case "$(uname -m)" in x86_64) arch=x64 ;; arm64|aarch64) arch=arm64 ;; *) echo "unsupported CPU" >&2; return 1 ;; esac
    curl -sSfL "https://github.com/gitleaks/gitleaks/releases/download/v${GITLEAKS_VERSION}/gitleaks_${GITLEAKS_VERSION}_${os}_${arch}.tar.gz" \
        | tar -xz -C "$OUT_DIR" gitleaks
    export PATH="$OUT_DIR:$PATH"
}

cmd_scan() {
    install_gitleaks
    gitleaks detect --source . --redact --verbose --report-path "$OUT_DIR/gitleaks.json"
}

dispatch "$@"
