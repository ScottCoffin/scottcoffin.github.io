# SEO and Performance Self-Improvement Automation Workflow

This file is an implementation specification for an IDE coding agent working inside the repository for `https://scottcoff.in`.

The goal is to build a repeatable **diagnose → improve → diagnose** workflow for a Jekyll/GitHub Pages site using:

- Local Lighthouse / Lighthouse CI for fast pre-deployment checks
- PageSpeed Insights API for public deployed URL checks
- Optional Google Search Console API for indexing/canonical/search-performance data
- Optional GTmetrix API for an independent external performance check
- Local HTML/SEO validation scripts for canonical URLs, metadata, sitemap, internal-link leakage, and JSON-LD syntax

This workflow should prioritize **correctness, canonical identity, crawlability, accessibility, and stable layout** over chasing small Lighthouse score changes.

---

## 0. Operating principles for the IDE agent

Follow these rules throughout the implementation.

### Core rules

1. Make small, reviewable changes.
2. Run diagnostics before making improvements.
3. Make exactly one improvement per iteration unless explicitly instructed otherwise.
4. Rerun diagnostics after each improvement.
5. Compare before/after results.
6. Revert changes that break the build, degrade SEO/accessibility, or introduce visual regressions.
7. Do not remove content.
8. Do not remove analytics or third-party scripts unless there is explicit evidence they are unused and the user approves.
9. Do not make Search Console, DNS, indexing, or GTmetrix claims unless the corresponding external API/tool was actually run successfully.
10. Treat Lighthouse/PageSpeed performance scores as noisy. Prefer concrete audit failures and measurable byte/time savings.

### SEO priority order for this site

Prioritize issues in this order:

1. Canonical/internal-link leakage from `scottcoff.in` to `scottcoffin.github.io`
2. Broken internal links
3. Missing or duplicate titles/descriptions
4. Missing canonical tags or wrong canonical tags
5. Sitemap/robots issues
6. Missing or invalid structured data
7. Accessibility issues
8. Missing image dimensions and layout shift risks
9. Unoptimized images
10. Render-blocking resources
11. Unused CSS/JavaScript
12. Third-party script cost
13. Marginal performance score improvements

### Stop and ask for review if

Stop and request human review if any proposed fix requires:

1. Changing theme architecture substantially
2. Deleting existing content
3. Removing analytics or required theme scripts
4. Changing visual layout substantially
5. Adding a complex build pipeline
6. Storing secrets in the repo
7. A fix that improves performance but worsens accessibility or SEO
8. A change with less than 2% expected improvement but high code complexity

---

## 1. Initial repository inspection

First inspect the repo. Do not edit files in this step.

### Agent task

Inspect the repository and report:

1. Whether this appears to be Jekyll/GitHub Pages
2. Whether these files exist:
   - `_config.yml`
   - `Gemfile`
   - `package.json`
   - `_includes/head.html`
   - `_layouts/default.html`
   - `_data/navigation.yml`
   - `robots.txt`
   - `sitemap.xml`
   - `SEO_CHECKLIST.md`
3. Where these pages live:
   - homepage
   - `/Research/`
   - `/Data_Science/`
   - `/Media/`
   - `/Expertise/`
   - `/CV/`
4. Whether `{% seo %}` is used
5. Whether `jekyll-seo-tag` is configured
6. Whether `jekyll-sitemap` is configured
7. All hard-coded occurrences of:
   - `scottcoffin.github.io`
   - `http://scottcoffin.github.io`
   - `https://scottcoffin.github.io`
8. Existing build commands from README, Gemfile, GitHub Actions, or package scripts

### Required output

Return a concise file-by-file implementation plan before editing.

---

## 2. Add local Node-based diagnostic tooling

If no `package.json` exists, create one. If it exists, extend it conservatively.

### Desired dev dependencies

Add these development dependencies:

```json
{
  "@lhci/cli": "latest",
  "lighthouse": "latest",
  "http-server": "latest"
}
```

Only add `concurrently` or `wait-on` if genuinely useful.

### Desired `package.json` scripts

Adapt commands to the actual repo if needed.

```json
{
  "scripts": {
    "build:site": "bundle exec jekyll build",
    "serve:site": "npx http-server _site -p 4000",
    "lhci": "lhci autorun",
    "psi": "node scripts/pagespeed_insights.mjs",
    "audit:tasks": "node scripts/audit_to_tasks.mjs",
    "diagnose": "bash scripts/diagnose_seo_perf.sh",
    "diagnose:live": "RUN_PSI=1 bash scripts/diagnose_seo_perf.sh",
    "jsonld": "node scripts/validate_jsonld.mjs",
    "gsc": "node scripts/search_console_check.mjs",
    "gtmetrix": "node scripts/gtmetrix_check.mjs"
  },
  "devDependencies": {
    "@lhci/cli": "latest",
    "lighthouse": "latest",
    "http-server": "latest"
  }
}
```

### Add `.gitignore` entries

Add report outputs to `.gitignore` unless the user explicitly wants to version reports:

```gitignore
reports/lighthouse/
reports/lhci/
reports/pagespeed/
reports/search-console/
reports/gtmetrix/
reports/*.json
reports/*.csv
reports/*.html
reports/*.log
```

Keep curated Markdown summaries trackable only if desired. If uncertain, ignore all generated reports and let the user decide.

---

## 3. Create Lighthouse CI configuration

Create:

```text
lighthouserc.js
```

Use this as the starting configuration. Adjust paths only if the site uses different URL paths.

```js
module.exports = {
  ci: {
    collect: {
      staticDistDir: './_site',
      url: [
        'http://localhost:4000/',
        'http://localhost:4000/Research/',
        'http://localhost:4000/Data_Science/',
        'http://localhost:4000/Media/',
        'http://localhost:4000/Expertise/'
      ],
      numberOfRuns: 3,
      settings: {
        formFactor: 'mobile',
        screenEmulation: {
          mobile: true,
          width: 390,
          height: 844,
          deviceScaleFactor: 3,
          disabled: false
        },
        throttlingMethod: 'simulate'
      }
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.70 }],
        'categories:accessibility': ['error', { minScore: 0.90 }],
        'categories:best-practices': ['warn', { minScore: 0.90 }],
        'categories:seo': ['error', { minScore: 0.90 }]
      }
    },
    upload: {
      target: 'filesystem',
      outputDir: './reports/lhci'
    }
  }
};
```

If `staticDistDir` does not serve correctly in this repo, switch to a `startServerCommand` approach:

```js
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'bundle exec jekyll build && npx http-server _site -p 4000',
      startServerReadyPattern: 'Available on',
      url: [
        'http://localhost:4000/',
        'http://localhost:4000/Research/',
        'http://localhost:4000/Data_Science/',
        'http://localhost:4000/Media/',
        'http://localhost:4000/Expertise/'
      ],
      numberOfRuns: 3,
      settings: {
        formFactor: 'mobile',
        screenEmulation: {
          mobile: true,
          width: 390,
          height: 844,
          deviceScaleFactor: 3,
          disabled: false
        },
        throttlingMethod: 'simulate'
      }
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.70 }],
        'categories:accessibility': ['error', { minScore: 0.90 }],
        'categories:best-practices': ['warn', { minScore: 0.90 }],
        'categories:seo': ['error', { minScore: 0.90 }]
      }
    },
    upload: {
      target: 'filesystem',
      outputDir: './reports/lhci'
    }
  }
};
```

### Validation command

After setup, run:

```bash
npm run lhci
```

If this fails, fix the configuration before proceeding.

---

## 4. Create PageSpeed Insights API script

Create:

```text
scripts/pagespeed_insights.mjs
```

Purpose: run Google PageSpeed Insights against deployed public URLs and save both raw JSON and summary CSV.

### Requirements

1. Use Node.js built-in `fetch`.
2. If Node lacks global `fetch`, print a clear message requiring Node 18+.
3. Do not require an API key by default.
4. Support optional API key through:

```bash
PAGESPEED_API_KEY=...
```

5. Test these deployed URLs:

```js
[
  'https://scottcoff.in/',
  'https://scottcoff.in/Research/',
  'https://scottcoff.in/Data_Science/',
  'https://scottcoff.in/Media/',
  'https://scottcoff.in/Expertise/'
]
```

6. Test both strategies:
   - `mobile`
   - `desktop`

7. Request categories:
   - `performance`
   - `accessibility`
   - `best-practices`
   - `seo`

8. Save raw JSON results under:

```text
reports/pagespeed/YYYY-MM-DDTHH-mm-ss/
```

9. Create:

```text
reports/pagespeed/latest-summary.csv
reports/pagespeed/latest-summary.md
```

### Fields to extract into CSV

Use `NA` for missing values.

```text
timestamp
url
strategy
performance_score
accessibility_score
best_practices_score
seo_score
lcp_ms
cls
inp_ms_or_na
tbt_ms
fcp_ms
speed_index_ms
total_byte_weight
render_blocking_savings_ms
unused_css_savings_bytes
unused_js_savings_bytes
image_savings_bytes
canonical_audit_score
viewport_audit_score
meta_description_audit_score
crawlable_anchors_score
http_status_code
final_url
```

### API endpoint pattern

Use:

```text
https://www.googleapis.com/pagespeedonline/v5/runPagespeed
```

Parameters:

```text
url=<encoded URL>
strategy=mobile|desktop
category=performance
category=accessibility
category=best-practices
category=seo
key=<optional API key>
```

### Implementation notes

The script should:

1. Create report directories if missing.
2. Rate-limit requests modestly to avoid quota problems.
3. Retry once on transient HTTP 429/5xx.
4. Save raw API responses even if a page has a poor score.
5. Fail gracefully if a URL is unreachable.
6. Print a concise summary table to stdout.

---

## 5. Create report parser: audit-to-tasks

Create:

```text
scripts/audit_to_tasks.mjs
```

Purpose: read latest Lighthouse/PageSpeed reports and turn them into actionable engineering tasks.

### Inputs

Search for latest available reports from:

```text
reports/lhci/
reports/lighthouse/
reports/pagespeed/
```

### Outputs

Create:

```text
reports/audit-summary.md
reports/audit-tasks.json
```

### Extract from each report

For each URL:

1. Category scores:
   - performance
   - accessibility
   - best practices
   - SEO
2. Core metrics:
   - LCP
   - CLS
   - TBT
   - FCP
   - Speed Index
   - total byte weight
3. Failed SEO audits
4. Failed accessibility audits
5. Failed best-practices audits
6. High-impact performance opportunities

### Prioritize performance opportunities

Order issues by:

1. Largest Contentful Paint
2. render-blocking resources
3. unoptimized images
4. missing image width/height
5. cumulative layout shift
6. unused CSS
7. unused JavaScript
8. total byte weight
9. third-party scripts
10. font loading issues

### Each generated task must include

```json
{
  "page": "string",
  "source": "lighthouse|pagespeed|custom",
  "category": "seo|performance|accessibility|best-practices",
  "auditId": "string",
  "title": "string",
  "description": "string",
  "score": "number|null",
  "numericSavings": "object|null",
  "affectedAssets": ["string"],
  "likelySourceFiles": ["string"],
  "recommendedFix": "string",
  "risk": "low|medium|high",
  "canAttemptAutomatically": true
}
```

### Risk classification

Use these default risk rules:

#### Low risk

- Fixing canonical URLs
- Fixing internal links
- Adding missing meta descriptions
- Adding missing `alt` text
- Adding `width`/`height` to images
- Optimizing images without changing rendered dimensions
- Fixing typos
- Adding `loading="lazy"` to below-the-fold images

#### Medium risk

- Deferring scripts
- Moving CSS/JS
- Changing image formats in templates
- Modifying navigation templates
- Adding JSON-LD sitewide

#### High risk

- Removing scripts/styles
- Rewriting theme layout
- Introducing complex build tooling
- Changing visual design
- Removing content

### Markdown summary format

`reports/audit-summary.md` should include:

1. Timestamp
2. Pages tested
3. Score summary table
4. Top 10 actionable tasks
5. SEO/canonical warnings
6. Accessibility blockers
7. Performance opportunities
8. Recommended next single fix

---

## 6. Create local SEO/HTML validation script

Create:

```text
scripts/local_seo_check.mjs
```

Purpose: inspect built HTML directly for site-specific SEO problems that Lighthouse may not fully catch.

### Build expectation

This script assumes `_site` exists. The diagnose script will build before running it.

### Checks

For these generated files if present:

```text
_site/index.html
_site/Research/index.html
_site/Data_Science/index.html
_site/Media/index.html
_site/Expertise/index.html
```

Check:

1. Exactly one `<h1>` or a clearly acceptable theme equivalent
2. `<title>` exists
3. `<meta name="description">` exists
4. `<link rel="canonical">` exists
5. Canonical starts with `https://scottcoff.in`
6. No canonical contains `scottcoffin.github.io`
7. Internal links do not point to `scottcoffin.github.io`
8. No obviously broken internal links to missing `_site` paths
9. Images have `alt` attributes
10. Images have `width` and `height` where feasible
11. `robots.txt` exists
12. `sitemap.xml` exists
13. sitemap URLs use `https://scottcoff.in`
14. sitemap does not use `scottcoffin.github.io`

### Outputs

Write:

```text
reports/local-seo-check.md
reports/local-seo-check.json
```

Add a package script:

```json
"seo:check": "node scripts/local_seo_check.mjs"
```

---

## 7. Create JSON-LD syntax validator

Create:

```text
scripts/validate_jsonld.mjs
```

Purpose: validate local JSON-LD syntax without claiming Google rich-result eligibility.

### Requirements

1. Scan built HTML files under `_site/`.
2. Extract all blocks:

```html
<script type="application/ld+json">
...
</script>
```

3. Parse each block as JSON.
4. Report:
   - file
   - number of JSON-LD blocks
   - parse success/failure
   - error message if invalid
5. Save:

```text
reports/jsonld-validation.md
reports/jsonld-validation.json
```

### Important limitation

The script validates JSON syntax only. It must not claim that a page is eligible for Google rich results. Google Rich Results Test remains a manual check.

---

## 8. Create full diagnostic shell script

Create:

```text
scripts/diagnose_seo_perf.sh
```

Make it executable if possible.

### Behavior

1. Stop on errors:

```bash
set -euo pipefail
```

2. Create report directories:

```bash
mkdir -p reports reports/lhci reports/pagespeed
```

3. Print environment info:
   - Node version
   - npm version
   - Ruby version
   - Bundler version if available

4. Build site:

```bash
bundle exec jekyll build
```

5. Run local SEO check:

```bash
node scripts/local_seo_check.mjs
```

6. Run JSON-LD validation:

```bash
node scripts/validate_jsonld.mjs
```

7. Run Lighthouse CI:

```bash
npx lhci autorun
```

8. If `RUN_PSI=1`, run:

```bash
node scripts/pagespeed_insights.mjs
```

9. Run audit-to-tasks:

```bash
node scripts/audit_to_tasks.mjs
```

10. Print final locations:

```text
reports/audit-summary.md
reports/audit-tasks.json
reports/local-seo-check.md
reports/jsonld-validation.md
reports/lhci/
reports/pagespeed/latest-summary.md
```

### Script success criteria

The script should exit nonzero if:

1. Jekyll build fails
2. Local SEO check finds critical canonical leakage
3. JSON-LD is invalid
4. Lighthouse CI assertion fails for SEO or accessibility

The script should not fail solely for performance warnings.

---

## 9. Optional: Google Search Console API script

Only implement this after Search Console ownership verification is complete.

Create:

```text
scripts/search_console_check.mjs
```

### Purpose

Query Google Search Console for:

1. URL Inspection data
2. Search Analytics query/page data
3. Sitemap status if feasible

### Credentials

Do not hard-code credentials.

Support:

1. Google Application Default Credentials, or
2. OAuth flow documented in comments, or
3. Service account only if the Search Console property grants the service account access

If credentials are missing, exit with a clear setup message.

### Environment variables

```bash
GSC_SITE_URL="sc-domain:scottcoff.in"
GSC_DAYS=28
```

Default to:

```text
sc-domain:scottcoff.in
```

### URLs to inspect

```js
[
  'https://scottcoff.in/',
  'https://scottcoff.in/Research/',
  'https://scottcoff.in/Data_Science/',
  'https://scottcoff.in/Media/',
  'https://scottcoff.in/Expertise/'
]
```

### Outputs

```text
reports/search-console/url-inspection-latest.json
reports/search-console/search-analytics-latest.csv
reports/search-console/search-console-summary.md
```

### URL Inspection output should summarize

1. Inspection URL
2. Coverage/indexing state
3. Google-selected canonical
4. User-declared canonical
5. Last crawl time if available
6. Crawl status
7. Robots/indexing issues if present
8. Mobile usability if available

### Search Analytics output should include

For the past `GSC_DAYS`:

1. top queries
2. top pages
3. clicks
4. impressions
5. CTR
6. average position

Classify queries as:

```text
branded
topical
other
```

Use simple rules:

- Branded if query contains `scott`, `coffin`, `scott coffin`, `plastiverse`
- Topical if query contains `microplastic`, `pfas`, `toxicology`, `toxicokinetic`, `risk assessment`, `environmental toxicology`
- Otherwise other

Add package script:

```json
"gsc": "node scripts/search_console_check.mjs"
```

Do not include this in default `npm run diagnose`.

---

## 10. Optional: GTmetrix API script

Only implement this if the user wants an independent external performance service.

Create:

```text
scripts/gtmetrix_check.mjs
```

### Credentials

Do not hard-code credentials.

Use:

```bash
GTMETRIX_API_KEY=...
```

If missing, exit with clear setup instructions.

### Test URLs

```js
[
  'https://scottcoff.in/',
  'https://scottcoff.in/Research/'
]
```

### Outputs

```text
reports/gtmetrix/raw/
reports/gtmetrix/summary.md
```

### Summary should include

1. URL
2. test status
3. Lighthouse performance score if available
4. Web Vitals if available
5. page weight
6. request count
7. top issues if available
8. report URL if provided by API

Add package script:

```json
"gtmetrix": "node scripts/gtmetrix_check.mjs"
```

Do not include this in default `npm run diagnose`.

---

## 11. Main improvement-loop prompt for the IDE agent

After the tooling exists and `npm run diagnose` works, use this process.

### Agent instruction

Use the latest:

```text
reports/audit-summary.md
reports/audit-tasks.json
reports/local-seo-check.md
reports/jsonld-validation.md
```

Choose exactly **one** low-risk, high-impact improvement.

### Selection rules

Prefer issues affecting `/Research/` first.

Use this order:

1. Canonical/internal link problems
2. Missing or duplicate meta descriptions
3. Broken internal links
4. Missing image width/height causing CLS
5. Unoptimized images
6. Render-blocking local scripts/styles
7. Unused CSS/JS
8. Accessibility issues
9. Best-practices issues
10. Performance-only score improvements

### Improvement workflow

For the selected issue:

1. State the single issue selected and why.
2. Identify source files to modify.
3. Make the minimal fix.
4. Run local build.
5. Run:

```bash
npm run diagnose
```

6. Compare before/after:
   - performance score
   - accessibility score
   - best-practices score
   - SEO score
   - LCP
   - CLS
   - TBT
   - failed audit count
   - local SEO check warnings/errors
7. If the fix worsened the page, broke build, or created SEO/accessibility regressions, revert it.
8. If successful, report:
   - files changed
   - diff summary
   - before/after metrics
   - next recommended single issue

### Stop after

Stop after either:

1. 3 successful improvements, or
2. Remaining issues are medium/high risk, or
3. Remaining improvements are marginal and complex, or
4. Build/diagnostics cannot run reliably

---

## 12. Canonical-domain improvement task

This task is especially important for this site.

### Agent instruction

Audit and fix canonical domain leakage.

Problem to look for:

The public site should consistently use:

```text
https://scottcoff.in
```

Internal navigation, canonical tags, feeds, sitemap, footer links, and social/profile site links should not point to:

```text
https://scottcoffin.github.io
```

except where intentionally linking to GitHub-hosted source code or a GitHub profile/repository.

### Steps

1. Search repo for:

```bash
grep -R "scottcoffin.github.io" .
```

2. Replace internal/canonical/navigation/feed links with:

```text
https://scottcoff.in
```

3. Do not replace intentional GitHub source-code repository links.
4. Build site.
5. Search built output:

```bash
grep -R "scottcoffin.github.io" _site || true
```

6. Explain each remaining occurrence.

### Success criteria

1. `_site` contains no unwanted internal links to `scottcoffin.github.io`.
2. All canonical tags use `https://scottcoff.in`.
3. Sitemap uses `https://scottcoff.in`.
4. Internal navigation links use relative URLs or `https://scottcoff.in`.

---

## 13. Research page improvement task

Prioritize `/Research/` because it is a high-value SEO page.

### Agent instruction

Improve `/Research/` while preserving publication content.

### Required checks

1. Page has a unique title:
   - `Research | Scott Coffin, PhD`
2. Page has a unique meta description:
   - `Research by Scott Coffin, PhD on microplastics in drinking water, ecotoxicology, PFAS, New Approach Methodologies, toxicokinetics, computational toxicology, and regulatory risk assessment.`
3. Canonical URL is:
   - `https://scottcoff.in/Research/`
4. H1 exists and is clear:
   - `Research`
5. Add or preserve a short intro describing:
   - microplastics risk assessment
   - drinking water
   - PFAS toxicokinetics
   - computational toxicology / NAMs
   - regulatory science
6. Fix obvious typos and broken DOI links.
7. Do not remove publication entries.

### Known typo fixes to check

Replace:

```text
little or not toxicology testing
```

with:

```text
little or no toxicology testing
```

Replace:

```text
https.://doi.org/
```

with:

```text
https://doi.org/
```

Replace malformed concatenations such as:

```text
ShareMicroplastics
```

with:

```text
Share Microplastics
```

---

## 14. Image optimization task

### Agent instruction

Optimize images conservatively.

### Steps

1. Identify images loaded on `/Research/`, especially author/profile/sidebar images.
2. Record original:
   - file path
   - dimensions
   - byte size
   - rendered size
3. If an image is much larger than rendered size, create optimized derivatives.
4. Prefer WebP if the site/theme can support fallback safely.
5. Preserve visual appearance.
6. Add `width` and `height` attributes where feasible.
7. Add meaningful `alt` text.
8. Use `loading="lazy"` only for below-the-fold images.
9. Do not lazy-load above-the-fold author/profile/hero images if they contribute to LCP.
10. Build and diagnose again.

### Success criteria

1. Image byte weight reduced.
2. No broken images.
3. CLS does not worsen.
4. LCP does not worsen.
5. Accessibility does not worsen.

---

## 15. Render-blocking resources task

### Agent instruction

Reduce render-blocking resources conservatively.

### Steps

1. Identify local CSS and JS loaded on `/Research/`.
2. Identify whether JavaScript can safely use `defer`.
3. Do not defer scripts required before rendering.
4. Do not remove scripts unless clearly unused and low risk.
5. Avoid complex critical-CSS tooling.
6. Prefer minification if already supported by Jekyll/theme.
7. Build and diagnose again.

### Success criteria

1. No visual regression.
2. No JavaScript errors in browser console if checked.
3. Lighthouse render-blocking opportunity improves or remains stable.
4. Accessibility and SEO remain passing.

---

## 16. Accessibility task

### Agent instruction

Fix accessibility failures before marginal performance score issues.

### Common low-risk fixes

1. Add missing `alt` text.
2. Fix empty links/buttons.
3. Improve ambiguous link text.
4. Ensure heading order is logical.
5. Ensure sufficient accessible names for icons.
6. Avoid using color alone to communicate meaning.

### Do not

1. Redesign layout without review.
2. Remove content.
3. Hide content from assistive technologies unless clearly decorative.

---

## 17. Structured data task

### Agent instruction

Validate JSON-LD syntax locally and add structured data conservatively.

### Rules

1. Use `scripts/validate_jsonld.mjs` for syntax.
2. Do not claim Google rich-result eligibility from local syntax validation.
3. Use Google Rich Results Test manually for deployed pages.
4. Do not invent publication metadata.
5. Prefer page-level `Person`, `ProfilePage`, or `WebPage` JSON-LD over marking up every publication unless data are complete and accurate.

### Recommended structured data targets

Homepage:

- `ProfilePage`
- `Person`

Research page:

- `WebPage`
- `Person` as author/mainEntity
- `about` topics:
  - Microplastics
  - Environmental toxicology
  - PFAS
  - Risk assessment
  - Toxicokinetics
  - Computational toxicology

---

## 18. Search Console workflow after deployment

This requires site ownership verification first.

### Manual prerequisites

1. Verify `scottcoff.in` as a Domain property in Google Search Console using DNS TXT.
2. Submit:

```text
https://scottcoff.in/sitemap.xml
```

3. Use URL Inspection for:
   - `https://scottcoff.in/`
   - `https://scottcoff.in/Research/`
   - `https://scottcoff.in/Data_Science/`
   - `https://scottcoff.in/Media/`
   - `https://scottcoff.in/Expertise/`

### API diagnostics

After credentials are configured, run:

```bash
npm run gsc
```

### What to check

1. Google-selected canonical equals user-declared canonical.
2. Indexed status is valid or improving.
3. Sitemap is discovered.
4. Search Analytics shows impressions for:
   - Scott Coffin
   - Scott Coffin PhD
   - Scott Coffin microplastics
   - microplastics risk assessment
   - environmental toxicologist
   - PFAS toxicokinetics

---

## 19. Live PageSpeed workflow after deployment

After deploying changes to GitHub Pages/custom domain, run:

```bash
npm run psi
```

or:

```bash
npm run diagnose:live
```

### Compare live vs local

If local Lighthouse improves but PageSpeed does not:

1. Confirm deployment actually includes the changes.
2. Check whether PageSpeed tested the correct final URL.
3. Check redirects.
4. Check whether server/CDN caching is stale.
5. Wait and rerun.
6. Do not immediately undo local improvements if HTML/source confirms they are correct.

### Treat PSI field data carefully

If PageSpeed says insufficient real-user data are available, rely on lab diagnostics and Search Console until field data accumulate.

---

## 20. Optional GitHub Actions workflow

Only add CI after local diagnostics run reliably.

Create:

```text
.github/workflows/seo-performance.yml
```

Suggested workflow:

```yaml
name: SEO and Performance Diagnostics

on:
  pull_request:
  workflow_dispatch:

jobs:
  seo-performance:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Set up Ruby
        uses: ruby/setup-ruby@v1
        with:
          bundler-cache: true

      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install npm dependencies
        run: npm install

      - name: Run diagnostics
        run: npm run diagnose

      - name: Upload reports
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: seo-performance-reports
          path: reports/
```

Do not include PageSpeed Insights, Search Console, or GTmetrix in PR CI unless credentials/secrets and rate limits are configured safely.

---

## 21. Final implementation report format

After implementing the workflow, report:

```markdown
# SEO/performance automation implementation report

## Files changed

| File | Change |
|---|---|

## Commands added

| Command | Purpose |
|---|---|

## Diagnostics run

| Command | Result |
|---|---|

## Current baseline

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|

## Critical issues

## Low-risk next fixes

## Medium/high-risk issues requiring review

## Manual follow-up

- [ ] Verify Domain property in Google Search Console
- [ ] Submit sitemap
- [ ] Run URL Inspection
- [ ] Run Google Rich Results Test manually
- [ ] Run live PageSpeed after deployment
```

---

## 22. Quick-start command sequence

After implementation, the normal workflow should be:

```bash
npm install
npm run diagnose
```

After deployment:

```bash
npm run psi
```

After Search Console credentials are configured:

```bash
npm run gsc
```

For one improvement iteration, instruct the IDE agent:

```text
Use reports/audit-tasks.json and reports/audit-summary.md to select exactly one low-risk, high-impact issue affecting /Research/. Make the minimal fix, rerun npm run diagnose, compare before/after metrics, and revert if SEO/accessibility/build status worsens.
```

---

## 23. Expected repo additions

At minimum, this implementation should add or modify:

```text
package.json
lighthouserc.js
scripts/pagespeed_insights.mjs
scripts/audit_to_tasks.mjs
scripts/local_seo_check.mjs
scripts/validate_jsonld.mjs
scripts/diagnose_seo_perf.sh
.gitignore
```

Optional additions:

```text
scripts/search_console_check.mjs
scripts/gtmetrix_check.mjs
.github/workflows/seo-performance.yml
SEO_CHECKLIST.md
```

---

## 24. Notes on external tooling

### Lighthouse / Lighthouse CI

Use local Lighthouse and Lighthouse CI for repeatable pre-deployment diagnostics. They are suitable for an IDE agent because they can run against the locally built site and produce machine-readable reports.

### PageSpeed Insights API

Use PageSpeed Insights API for deployed public URLs. It can be automated and can return Lighthouse-based lab diagnostics and, when available, field data.

### Google Search Console API

Use only after site ownership is verified. This is the best programmatic source for Google-selected canonicals, indexing status, sitemap status, and actual search query/page performance.

### GTmetrix API

Use optionally as a second external performance opinion. It requires API credentials and should not be part of the default local loop.

### Rich Results Test

Use manually for Google-specific structured-data eligibility. Locally, only validate JSON-LD syntax.

---

## 25. Definition of done

The workflow is complete when:

1. `npm run diagnose` builds the site and produces reports.
2. `reports/audit-summary.md` exists.
3. `reports/audit-tasks.json` exists.
4. Local SEO checks detect canonical leakage if introduced.
5. JSON-LD syntax validation works.
6. Lighthouse CI runs against the key pages.
7. `npm run psi` can test deployed URLs.
8. The IDE agent can make one improvement, rerun diagnostics, and compare before/after.
9. The workflow avoids secrets in the repo.
10. The workflow does not require manual browser use except for Search Console setup and Rich Results Test verification.
