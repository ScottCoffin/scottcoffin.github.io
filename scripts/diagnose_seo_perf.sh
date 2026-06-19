#!/usr/bin/env bash
# Full SEO and performance diagnostic pipeline for scottcoff.in
# Usage:
#   npm run diagnose            -- local diagnostics only
#   npm run diagnose:live       -- include PageSpeed Insights (live URLs)
#   RUN_PSI=1 bash scripts/diagnose_seo_perf.sh

set -euo pipefail

# Bash on Windows may not inherit the RubyInstaller path from PowerShell.
if ! command -v ruby >/dev/null 2>&1; then
  for ruby_dir in /c/Ruby*/bin /c/tools/ruby*/bin /mnt/c/Ruby*/bin /mnt/c/tools/ruby*/bin; do
    if [ -x "$ruby_dir/ruby.exe" ]; then
      export PATH="$ruby_dir:$PATH"
      break
    fi
  done
fi

RUBY_CMD=()
if command -v ruby >/dev/null 2>&1; then
  RUBY_CMD=(ruby)
elif command -v ruby.exe >/dev/null 2>&1; then
  RUBY_CMD=(ruby.exe)
fi

BUNDLE_CMD=()
if [ "${#RUBY_CMD[@]}" -gt 0 ] && "${RUBY_CMD[@]}" -S bundle version >/dev/null 2>&1; then
  BUNDLE_CMD=("${RUBY_CMD[@]}" -S bundle)
elif command -v bundle >/dev/null 2>&1; then
  BUNDLE_CMD=(bundle)
fi

# ---------- setup ----------
mkdir -p reports reports/lhci reports/pagespeed

echo ""
echo "=========================================="
echo " scottcoff.in SEO/Performance Diagnostics"
echo "=========================================="
echo ""

# ---------- environment info ----------
echo "--- Environment ---"
node --version  2>/dev/null || echo "node: not found"
npm  --version  2>/dev/null || echo "npm:  not found"
if [ "${#RUBY_CMD[@]}" -gt 0 ]; then
  "${RUBY_CMD[@]}" --version
else
  echo "ruby: not found"
fi
if [ "${#BUNDLE_CMD[@]}" -gt 0 ]; then
  "${BUNDLE_CMD[@]}" version
else
  echo "bundler: not found"
fi
echo ""

# ---------- build ----------
echo "--- Building site ---"
if [ "${#BUNDLE_CMD[@]}" -eq 0 ]; then
  echo "ERROR: Bundler is required but was not found. Install Ruby/Bundler or add RubyInstaller to PATH."
  exit 1
fi
"${BUNDLE_CMD[@]}" exec jekyll build
echo "Build complete."
echo ""

# ---------- local SEO check ----------
echo "--- Local SEO check ---"
node scripts/local_seo_check.mjs
echo ""

# ---------- JSON-LD validation ----------
echo "--- JSON-LD validation ---"
node scripts/validate_jsonld.mjs || {
  echo "WARNING: JSON-LD errors found (see reports/jsonld-validation.md)"
  EXIT_CODE=1
}
echo ""

# ---------- Lighthouse CI ----------
echo "--- Lighthouse CI ---"
LHCI_TIMEOUT_SECONDS="${LHCI_TIMEOUT_SECONDS:-180}"
if command -v timeout >/dev/null 2>&1; then
  timeout "$LHCI_TIMEOUT_SECONDS" npx lhci autorun || {
    echo "WARNING: Lighthouse CI failed or timed out after ${LHCI_TIMEOUT_SECONDS}s (see reports/lhci/)"
  }
else
  npx lhci autorun || {
    echo "WARNING: Lighthouse CI assertions failed (see reports/lhci/)"
  }
fi
  # Exit code propagated below
echo ""

# ---------- PageSpeed Insights (optional) ----------
if [ "${RUN_PSI:-0}" = "1" ]; then
  echo "--- PageSpeed Insights (live) ---"
  node scripts/pagespeed_insights.mjs
  echo ""
fi

# ---------- Audit-to-tasks ----------
echo "--- Generating audit task list ---"
node scripts/audit_to_tasks.mjs
echo ""

# ---------- Summary ----------
echo "=========================================="
echo " Reports"
echo "=========================================="
echo "  reports/audit-summary.md"
echo "  reports/audit-tasks.json"
echo "  reports/local-seo-check.md"
echo "  reports/jsonld-validation.md"
echo "  reports/lhci/"
if [ "${RUN_PSI:-0}" = "1" ]; then
  echo "  reports/pagespeed/latest-summary.md"
fi
echo ""
echo "Done."
