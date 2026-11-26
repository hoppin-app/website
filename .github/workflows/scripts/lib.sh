#!/usr/bin/env bash
#
# Shared helpers for the CI scripts in this folder.
# Source this file from a component script; do not run it directly.
#
# Every component script follows this contract:
#
#     .github/workflows/scripts/<component>.sh <command>
#
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
OUT_DIR="${CI_OUT_DIR:-$ROOT/build/ci}"
mkdir -p "$OUT_DIR"
cd "$ROOT"

soft() {
    local name="$1"
    shift
    if "$@"; then
        return 0
    fi
    echo "::warning title=${name}::${name} reported problems (non-blocking)"
}

dispatch() {
    local command="${1:-}"
    if [[ -n "$command" ]] && declare -F "cmd_${command}" >/dev/null; then
        shift
        "cmd_${command}" "$@"
        return
    fi
    echo "usage: $0 <command>" >&2
    echo "commands:" >&2
    declare -F | awk '{print $3}' | sed -n 's/^cmd_/  /p' >&2
    return 2
}
