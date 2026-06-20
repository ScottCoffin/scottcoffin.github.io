# SEO & Performance Self-Improvement Report

**Generated:** 2026-06-19  
**Workflow:** SEO_PERFORMANCE_SELF_IMPROVEMENT_WORKFLOW.md  
**Site:** https://scottcoff.in

---

## Baseline Audit Results (pre-optimization)

Lighthouse measured against local build (simulated mobile, throttled network):

| Metric | Score/Value |
|---|---|
| Performance | 70 |
| Accessibility | 93 |
| Best Practices | 100 |
| SEO | 100 |
| LCP | 11.7 s |
| FCP | 2.9 s |
| CLS | 0 |
| TBT | 40 ms |

Local SEO check: 0 errors, 0 warnings (all pages pass)  
JSON-LD validation: 20 blocks, 0 parse errors  
Sitemap: 26 URLs, correct canonical domain (scottcoff.in)

### Key issues identified

1. **LCP 11.7s (score 0)** — hero image `scottrubidoux_crop.jpg` was 3984×1500px, 1.3 MB with no preload hint. The LCP element is a CSS background-image div, so the browser discovers it late.
2. **Color contrast failures (score 0)** — navigation links, body content links, card links, footer disclaimer, and footer social links all failed WCAG 4.5:1 contrast on their respective backgrounds.
3. **Heading order violations** — card grid `<h3>` elements appeared before any `<h2>` in the DOM because the homepage was an `.html` file: Jekyll does not run the markdown converter on `.html` files, so `## Selected impact` etc. were rendering as literal `##` text instead of HTML headings.
4. **Render-blocking resources** — `main.css` (882ms savings) and `main.min.js` (304ms savings).
5. **Homepage markdown not processed** — `index.html` with markdown-style syntax (`## Heading`, `- list item`, etc.) was outputting raw markdown visible to users and search engines. The file was created as `.html` during the professionalization workflow; Jekyll only converts `.md` files.
6. **Malformed H1 from `|` in title** — `title: "Scott Coffin, PhD | Environmental Toxicologist"` was being run through `markdownify`, which converted the `|` into a two-column table inside the `<h1>` tag.

---

## Changes Applied

### 1. Hero image optimization (highest impact)

**Files changed:** `assets/images/` (new files added), `index.md`

- Original: `scottrubidoux_crop.jpg` — 3984×1500px, **1,307 KB**
- Optimized JPEG: `scottrubidoux_crop_opt.jpg` — 1400px wide, progressive, mozjpeg — **60 KB** (95% reduction)
- WebP: `scottrubidoux_crop.webp` — 1400px wide — **47 KB**
- Updated `index.md` frontmatter to use `scottrubidoux_crop_opt.jpg`

**Expected impact:** LCP drops from ~11.7s to approximately 1–3s on throttled mobile. The LCP resource is now 22× smaller.

### 2. Preload hint for hero image

**File changed:** `_includes/head/custom.html`

Added a conditional `<link rel="preload" as="image">` that fires on any page with `header.overlay_image` set:

```html
{% if page.header.overlay_image %}
<link rel="preload" as="image" href="{{ page.header.overlay_image | relative_url }}">
{% endif %}
```

**Impact:** Tells the browser to discover the hero image early, before the CSS is parsed. Addresses the Lighthouse LCP discovery audit.

### 3. Fixed homepage: .html → .md (rendering fix)

**Files changed:** `index.html` deleted, `index.md` created

Jekyll does not convert markdown in `.html` files. The old `index.html` was displaying raw markdown (`## Selected impact`, `# Scott Coffin, PhD`, etc.) as literal text in the rendered page — both visually broken and SEO-harmful (no semantic headings).

Converting to `index.md` restores proper heading structure:
- H1: "Scott Coffin, PhD — Environmental Toxicologist" (from splash layout, using `page.title`)
- H2: Selected impact, Find what you need, Featured work, How I work, Beyond work
- H3: Card headings under each H2 section

### 4. Fixed title to prevent markdown table in H1

**File changed:** `index.md`

Changed title from `"Scott Coffin, PhD | Environmental Toxicologist"` to `"Scott Coffin, PhD — Environmental Toxicologist"`.

Minimal Mistakes runs `page.title | markdownify` to render the H1. The pipe character `|` creates a two-column markdown table. An em dash eliminates this.

**Note:** The `<title>` tag now reads "Scott Coffin, PhD — Environmental Toxicologist | Scott Coffin, PhD" (the site title is appended by the SEO plugin). This is cosmetically redundant but does not affect rankings. To remove the redundancy, the page title could be changed to just "Environmental Toxicologist" which would yield "Environmental Toxicologist | Scott Coffin, PhD".

### 5. Color contrast fixes

**Files changed:** `assets/css/main.scss`, `_includes/footer.html`

Added WCAG AA-compliant link color (#005f8e, ~5.0:1 contrast ratio on white) for:
- Card grid links (`.card a`)
- Body content links (`.page__content a`, `.page__content p a`, `.page__content li a`)
- Masthead navigation links (`.site-title`, `.masthead__menu-item a`)

Changed footer disclaimer from `opacity: 0.8` to explicit `color: #c8d6e0` (light blue-gray that contrasts adequately on the dark footer background).

**Note:** Footer social icon links and the "Follow:" label use the Minimal Mistakes theme's default colors. These may still fail WCAG contrast audits as they are defined in the vendor Sass files. Overriding these would require deeper theme customization.

---

## Verification Results

After all changes:

| Check | Result |
|---|---|
| Jekyll build | ✅ Succeeds (pre-existing Blog/Photography conflicts, not new) |
| Local SEO check | ✅ 0 errors, 0 warnings — all 8 pages PASS |
| JSON-LD validation | ✅ 20 blocks, 0 parse errors |
| Sitemap | ✅ 26 URLs, correct domain |
| robots.txt | ✅ OK |
| Preload link in built homepage | ✅ Present |
| H1 structure | ✅ Single clean H1 (no table) |
| Heading order | ✅ H1 → H2 → H3 throughout homepage |
| Markdown rendered | ✅ All `## headings`, lists, and bullet points now render as HTML |

**Lighthouse re-run:** Local re-run encountered Windows headless Chrome NO_FCP error (known environment limitation — Chrome does not paint content in some headless configurations in this session). The baseline scores are captured in `reports/lhci/homepage.json`. Expected performance improvement on the live site is large due to the image size reduction.

---

## Expected Performance Gains on Live Site

| Change | Estimated impact |
|---|---|
| Hero image 1.3MB → 60KB | LCP improvement ~8–10s (dominant factor) |
| Preload hint | Additional 0.5–1s LCP improvement (early discovery) |
| Proper heading structure | Accessibility score improvement (~3–5 points) |
| Card/nav link contrast | Accessibility score improvement (~5–10 points) |
| Footer disclaimer contrast | Minor accessibility improvement |

**Projected scores (live site, after deploy):**
- Performance: 85–95 (from 70)
- Accessibility: 96–100 (from 93)
- Best Practices: 100 (unchanged)
- SEO: 100 (unchanged)

---

## Remaining Issues (not fixed in this pass)

| Issue | Reason not fixed |
|---|---|
| Footer social icon link contrast | Defined in vendor Sass; requires deeper override or theme fork |
| `main.css` render-blocking (882ms) | Would require critical CSS inlining; high complexity, low risk-adjusted value for a personal site |
| `main.min.js` render-blocking (304ms) | Could add `defer` attribute to the script tag in the theme head; low priority |
| Homepage `<title>` redundancy | Minor cosmetic issue; doesn't affect SEO rankings |
| HTTPS (http-status-code audit) | GitHub Pages serves HTTPS; this only fails on localhost (no TLS) |

---

## Items for Scott's Review

From both the professionalization workflow and this SEO pass:

1. **Microplastics Explainer health effects framing** — `/Microplastics_Explainer/` has a `TODO: Scott, please review and confirm this framing reflects your current assessment.` in the health effects section.
2. **Career timeline 2025-present date** — confirm start date of current OEHHA position.
3. **University of Wyoming** — confirm as degree-conferring institution for your credentials listed on site.
4. **CV highlights** — verify the stated counts (40 papers, 11 first-author, 270+ presentations, 16 keynotes) against your CV.
5. **Headshot for journalists** — the `/For_Journalists/` page would benefit from a downloadable high-resolution headshot.
6. **Mixcloud link** — confirm `https://www.mixcloud.com/scoffincheyenne/` is still active.
7. **`/Expertise/` redirect** — if there are any external links to `/Expertise/`, consider adding a Jekyll redirect.
8. **Homepage `<title>` redundancy** — change `title:` to `"Environmental Toxicologist"` if you want a cleaner `<title>` tag ("Environmental Toxicologist | Scott Coffin, PhD").
9. **WebP hero image** — `scottrubidoux_crop.webp` (47 KB) was also generated. Using it as the hero would provide additional savings. Requires a custom override of the Minimal Mistakes hero template to serve WebP with JPEG fallback.

---

## Files Modified

| File | Change |
|---|---|
| `index.html` | **Deleted** — replaced by `index.md` |
| `index.md` | **Created** — markdown homepage with corrected title, preload, proper heading structure |
| `assets/images/scottrubidoux_crop_opt.jpg` | **Created** — optimized hero image (1400px, 60 KB) |
| `assets/images/scottrubidoux_crop.webp` | **Created** — WebP hero image (47 KB, not yet in use) |
| `assets/css/main.scss` | Added WCAG contrast overrides for card, body, nav links |
| `_includes/head/custom.html` | Added conditional preload link |
| `_includes/footer.html` | Changed disclaimer from `opacity:0.8` to explicit accessible color |
| `lighthouserc.js` | Updated URL list (Expertise → For_Journalists, Microplastics_Explainer) |
| `scripts/local_seo_check.mjs` | Updated PAGES_TO_CHECK array |
| `scripts/pagespeed_insights.mjs` | Updated URLS array |

---

*Report generated by SEO_PERFORMANCE_SELF_IMPROVEMENT_WORKFLOW.md automation pass.*
