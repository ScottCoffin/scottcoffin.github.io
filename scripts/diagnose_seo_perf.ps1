$ErrorActionPreference = "Stop"

New-Item -ItemType Directory -Force -Path reports, reports/lhci, reports/pagespeed | Out-Null

Write-Host ""
Write-Host "=========================================="
Write-Host " scottcoff.in SEO/Performance Diagnostics"
Write-Host "=========================================="
Write-Host ""

Write-Host "--- Environment ---"
try { node --version } catch { Write-Host "node: not found" }
try { npm --version } catch { Write-Host "npm: not found" }
try { ruby --version } catch { Write-Host "ruby: not found" }
try { bundle version } catch { Write-Host "bundler: not found" }
Write-Host ""

Write-Host "--- Building site ---"
bundle exec jekyll build
Write-Host "Build complete."
Write-Host ""

Write-Host "--- Local SEO check ---"
node scripts/local_seo_check.mjs
Write-Host ""

Write-Host "--- JSON-LD validation ---"
try {
  node scripts/validate_jsonld.mjs
} catch {
  Write-Host "WARNING: JSON-LD errors found (see reports/jsonld-validation.md)"
}
Write-Host ""

Write-Host "--- Lighthouse CI ---"
$lhciTimeoutSeconds = if ($env:LHCI_TIMEOUT_SECONDS) { [int]$env:LHCI_TIMEOUT_SECONDS } else { 90 }
$repoRoot = (Get-Location).Path
$lhciJob = Start-Job -ScriptBlock {
  Set-Location $using:repoRoot
  npx lhci autorun
}

if (Wait-Job $lhciJob -Timeout $lhciTimeoutSeconds) {
  Receive-Job $lhciJob
  if ($lhciJob.State -ne "Completed") {
    Write-Host "WARNING: Lighthouse CI failed (see reports/lhci/)"
  }
} else {
  Stop-Job $lhciJob
  Receive-Job $lhciJob -ErrorAction SilentlyContinue
  Write-Host "WARNING: Lighthouse CI timed out after ${lhciTimeoutSeconds}s (see reports/lhci/)"
}
Remove-Job $lhciJob -Force
Write-Host ""

if ($env:RUN_PSI -eq "1") {
  Write-Host "--- PageSpeed Insights (live) ---"
  node scripts/pagespeed_insights.mjs
  Write-Host ""
}

Write-Host "--- Generating audit task list ---"
node scripts/audit_to_tasks.mjs
Write-Host ""

Write-Host "=========================================="
Write-Host " Reports"
Write-Host "=========================================="
Write-Host "  reports/audit-summary.md"
Write-Host "  reports/audit-tasks.json"
Write-Host "  reports/local-seo-check.md"
Write-Host "  reports/jsonld-validation.md"
Write-Host "  reports/lhci/"
if ($env:RUN_PSI -eq "1") {
  Write-Host "  reports/pagespeed/latest-summary.md"
}
Write-Host ""
Write-Host "Done."
