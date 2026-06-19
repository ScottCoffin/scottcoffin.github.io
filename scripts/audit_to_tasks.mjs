#!/usr/bin/env node
// Reads latest Lighthouse CI / PageSpeed reports and produces audit-tasks.json + audit-summary.md

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'fs';
import { join, basename } from 'path';

const REPORT_DIRS = ['reports/lhci', 'reports/lighthouse', 'reports/pagespeed'];

const SEO_PRIORITY = [
  'canonical', 'crawlable-anchors', 'is-crawlable', 'robots-txt',
  'hreflang', 'plugins', 'structured-data', 'meta-description',
  'document-title', 'link-text', 'image-alt'
];

const A11Y_PRIORITY = [
  'color-contrast', 'image-alt', 'label', 'button-name', 'link-name',
  'aria-required-attr', 'aria-valid-attr', 'aria-valid-attr-value',
  'heading-order', 'tabindex', 'frame-title', 'html-has-lang', 'html-lang-valid'
];

const PERF_PRIORITY = [
  'largest-contentful-paint', 'render-blocking-resources', 'uses-optimized-images',
  'uses-responsive-images', 'modern-image-formats', 'image-size-responsive',
  'image-explicit-width-height', 'cumulative-layout-shift', 'unused-css-rules',
  'unused-javascript', 'total-byte-weight', 'third-party-summary',
  'font-display', 'bootup-time'
];

function riskFor(auditId, category) {
  const low = [
    'canonical', 'crawlable-anchors', 'meta-description', 'document-title',
    'image-alt', 'image-explicit-width-height', 'uses-optimized-images',
    'link-text', 'heading-order'
  ];
  const high = [
    'render-blocking-resources', 'unused-css-rules', 'unused-javascript',
    'third-party-summary', 'bootup-time', 'font-display'
  ];
  if (low.includes(auditId)) return 'low';
  if (high.includes(auditId)) return 'high';
  return 'medium';
}

function findLatestLhciReports() {
  const results = [];
  for (const dir of ['reports/lhci', 'reports/lighthouse']) {
    if (!existsSync(dir)) continue;
    try {
      const files = readdirSync(dir, { recursive: true });
      for (const f of files) {
        const fStr = typeof f === 'string' ? f : f.toString();
        if (fStr.endsWith('.json') && fStr.includes('lhr')) {
          results.push(join(dir, fStr));
        }
      }
    } catch {}
  }
  return results;
}

function findLatestPsiReport() {
  if (!existsSync('reports/pagespeed/latest-summary.csv')) return null;
  return 'reports/pagespeed/latest-summary.csv';
}

function parseLhrFile(filePath) {
  try {
    return JSON.parse(readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

function extractTasksFromLhr(lhr, source) {
  const tasks = [];
  const pageUrl = lhr.finalUrl || lhr.requestedUrl || 'unknown';
  const audits = lhr.audits || {};
  const cats = lhr.categories || {};

  const scores = {
    performance: Math.round((cats.performance?.score ?? 0) * 100),
    accessibility: Math.round((cats.accessibility?.score ?? 0) * 100),
    'best-practices': Math.round((cats['best-practices']?.score ?? 0) * 100),
    seo: Math.round((cats.seo?.score ?? 0) * 100)
  };

  const metrics = {
    lcp: Math.round(audits['largest-contentful-paint']?.numericValue ?? 0),
    cls: audits['cumulative-layout-shift']?.displayValue ?? 'NA',
    tbt: Math.round(audits['total-blocking-time']?.numericValue ?? 0),
    fcp: Math.round(audits['first-contentful-paint']?.numericValue ?? 0),
    speedIndex: Math.round(audits['speed-index']?.numericValue ?? 0),
    totalByteWeight: Math.round(audits['total-byte-weight']?.numericValue ?? 0)
  };

  const processAudit = (auditId, category) => {
    const audit = audits[auditId];
    if (!audit || audit.score === 1 || audit.score === null) return;

    const affectedAssets = [];
    if (audit.details?.items) {
      for (const item of audit.details.items.slice(0, 5)) {
        const url = item.url || item.source?.url || item.node?.snippet || '';
        if (url) affectedAssets.push(url);
      }
    }

    tasks.push({
      page: pageUrl,
      source,
      category,
      auditId,
      title: audit.title || auditId,
      description: audit.description || '',
      score: audit.score !== null ? Math.round(audit.score * 100) : null,
      numericSavings: audit.details?.overallSavingsMs != null
        ? { ms: Math.round(audit.details.overallSavingsMs) }
        : audit.details?.overallSavingsBytes != null
          ? { bytes: Math.round(audit.details.overallSavingsBytes) }
          : null,
      affectedAssets,
      likelySourceFiles: guessSourceFiles(auditId),
      recommendedFix: recommendedFix(auditId),
      risk: riskFor(auditId, category),
      canAttemptAutomatically: true
    });
  };

  for (const id of SEO_PRIORITY) processAudit(id, 'seo');
  for (const id of A11Y_PRIORITY) processAudit(id, 'accessibility');
  for (const id of PERF_PRIORITY) processAudit(id, 'performance');

  // catch any other failing audits not in priority lists
  for (const [id, audit] of Object.entries(audits)) {
    if (audit.score !== null && audit.score < 0.9 && !tasks.find(t => t.auditId === id && t.page === pageUrl)) {
      const cat = Object.entries(cats).find(([, c]) =>
        c.auditRefs?.some(r => r.id === id)
      )?.[0] || 'best-practices';
      processAudit(id, cat);
    }
  }

  return { pageUrl, scores, metrics, tasks };
}

function guessSourceFiles(auditId) {
  const map = {
    'canonical': ['_config.yml', '_includes/head.html', '_layouts/default.html'],
    'meta-description': ['Research.md', 'Data_Science.md', 'Media.md', 'Expertise.md', 'index.html'],
    'document-title': ['_config.yml', 'Research.md', 'Data_Science.md'],
    'image-alt': ['_includes/author-profile.html', 'Research.md', 'index.html'],
    'image-explicit-width-height': ['_includes/author-profile.html', '_includes/sidebar.html'],
    'uses-optimized-images': ['assets/images/'],
    'render-blocking-resources': ['_includes/head.html', '_layouts/default.html'],
    'unused-css-rules': ['assets/css/main.css'],
    'unused-javascript': ['assets/js/main.min.js'],
    'link-text': ['_includes/masthead.html', '_data/navigation.yml'],
    'heading-order': ['Research.md', 'Data_Science.md'],
    'color-contrast': ['assets/css/main.css', '_sass/'],
  };
  return map[auditId] || [];
}

function recommendedFix(auditId) {
  const fixes = {
    'canonical': 'Ensure _config.yml url is https://scottcoff.in and jekyll-seo-tag outputs correct canonical.',
    'meta-description': 'Add or improve description: front matter on each page.',
    'document-title': 'Add or improve title: front matter on each page.',
    'image-alt': 'Add descriptive alt text to all <img> tags; check _includes/author-profile.html.',
    'image-explicit-width-height': 'Add width and height attributes to <img> tags to prevent CLS.',
    'uses-optimized-images': 'Compress images with cwebp or squoosh; serve from assets/images/.',
    'modern-image-formats': 'Convert key images to WebP and use <picture> fallback.',
    'render-blocking-resources': 'Add defer to non-critical JS in _includes/scripts.html.',
    'unused-css-rules': 'Audit and purge unused selectors from assets/css/main.css.',
    'unused-javascript': 'Audit assets/js/main.min.js for unused code; consider splitting.',
    'cumulative-layout-shift': 'Add explicit width/height to images and reserve space for embeds.',
    'largest-contentful-paint': 'Optimize hero image size; preload LCP image in _includes/head.html.',
    'total-byte-weight': 'Reduce image sizes; audit and minify CSS/JS.',
    'link-text': 'Replace generic link text (e.g. "here", "click here") with descriptive text.',
    'heading-order': 'Ensure headings increase logically (h1→h2→h3) without skipping levels.',
    'color-contrast': 'Adjust text/background colour pairs in _sass/ to meet WCAG AA (4.5:1).',
    'crawlable-anchors': 'Ensure all <a> tags have valid href values.',
    'is-crawlable': 'Check robots.txt and <meta name="robots"> for accidental noindex.',
    'robots-txt': 'Review robots.txt — ensure it allows crawling and points to sitemap.',
    'structured-data': 'Validate JSON-LD in _includes/person-jsonld.html and seo.html.',
    'font-display': 'Add font-display: swap or optional to @font-face declarations.',
  };
  return fixes[auditId] || `Review the "${auditId}" audit in Lighthouse and apply the recommended fix.`;
}

function parsePsiCsv(csvPath) {
  try {
    const lines = readFileSync(csvPath, 'utf8').trim().split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
      const vals = line.split(',');
      return Object.fromEntries(headers.map((h, i) => [h, vals[i] ?? 'NA']));
    });
  } catch {
    return [];
  }
}

async function main() {
  const lhrFiles = findLatestLhciReports();
  const psiCsv = findLatestPsiReport();

  if (lhrFiles.length === 0 && !psiCsv) {
    writeFileSync('reports/audit-tasks.json', JSON.stringify([], null, 2));
    writeFileSync(
      'reports/audit-summary.md',
      [
        '# Audit Task Summary',
        '',
        'No Lighthouse CI or PageSpeed Insights reports were available.',
        '',
        'Local SEO and JSON-LD reports may still be present:',
        '- reports/local-seo-check.md',
        '- reports/jsonld-validation.md',
        ''
      ].join('\n')
    );
    console.warn('No Lighthouse CI or PageSpeed Insights reports found; wrote empty audit task files.');
    process.exit(0);
  }

  const allTasks = [];
  const pageResults = [];

  for (const file of lhrFiles) {
    const lhr = parseLhrFile(file);
    if (!lhr) continue;
    const result = extractTasksFromLhr(lhr, 'lighthouse');
    allTasks.push(...result.tasks);
    pageResults.push({ file: basename(file), ...result });
  }

  // Deduplicate tasks by page+auditId (keep first/highest priority)
  const seen = new Set();
  const dedupedTasks = allTasks.filter(t => {
    const key = `${t.page}::${t.auditId}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Sort by priority
  const priorityOrder = [...SEO_PRIORITY, ...A11Y_PRIORITY, ...PERF_PRIORITY];
  dedupedTasks.sort((a, b) => {
    const pa = priorityOrder.indexOf(a.auditId);
    const pb = priorityOrder.indexOf(b.auditId);
    if (pa === -1 && pb === -1) return 0;
    if (pa === -1) return 1;
    if (pb === -1) return -1;
    return pa - pb;
  });

  writeFileSync('reports/audit-tasks.json', JSON.stringify(dedupedTasks, null, 2));

  // Build markdown summary
  const now = new Date().toISOString();
  const psiRows = psiCsv ? parsePsiCsv(psiCsv) : [];

  const md = [];
  md.push(`# Audit Summary`);
  md.push(`**Generated:** ${now}`);
  md.push('');
  md.push(`## Pages tested`);
  const pages = [...new Set(dedupedTasks.map(t => t.page))];
  pages.forEach(p => md.push(`- ${p}`));
  md.push('');

  if (pageResults.length > 0) {
    md.push('## Score summary (Lighthouse)');
    md.push('| Page | Perf | A11y | BP | SEO | LCP (ms) | CLS | TBT (ms) |');
    md.push('|---|---:|---:|---:|---:|---:|---|---:|');
    for (const r of pageResults) {
      const url = r.pageUrl.replace('http://localhost:4000', '');
      md.push(`| ${url} | ${r.scores.performance} | ${r.scores.accessibility} | ${r.scores['best-practices']} | ${r.scores.seo} | ${r.metrics.lcp} | ${r.metrics.cls} | ${r.metrics.tbt} |`);
    }
    md.push('');
  }

  if (psiRows.length > 0) {
    md.push('## Score summary (PageSpeed Insights — live)');
    md.push('| URL | Strategy | Perf | A11y | BP | SEO | LCP (ms) |');
    md.push('|---|---|---:|---:|---:|---:|---:|');
    for (const row of psiRows) {
      md.push(`| ${row.url} | ${row.strategy} | ${row.performance_score} | ${row.accessibility_score} | ${row.best_practices_score} | ${row.seo_score} | ${row.lcp_ms} |`);
    }
    md.push('');
  }

  const top10 = dedupedTasks.slice(0, 10);
  md.push('## Top 10 actionable tasks');
  top10.forEach((t, i) => {
    md.push(`### ${i + 1}. [${t.category.toUpperCase()}] ${t.title}`);
    md.push(`**Page:** ${t.page}  **Risk:** ${t.risk}  **Score:** ${t.score ?? 'N/A'}`);
    md.push(`**Fix:** ${t.recommendedFix}`);
    if (t.numericSavings) md.push(`**Savings:** ${JSON.stringify(t.numericSavings)}`);
    md.push('');
  });

  const seoIssues = dedupedTasks.filter(t => t.category === 'seo');
  if (seoIssues.length > 0) {
    md.push('## SEO/canonical warnings');
    seoIssues.forEach(t => md.push(`- **${t.auditId}** (${t.page}): ${t.recommendedFix}`));
    md.push('');
  }

  const a11yIssues = dedupedTasks.filter(t => t.category === 'accessibility');
  if (a11yIssues.length > 0) {
    md.push('## Accessibility blockers');
    a11yIssues.forEach(t => md.push(`- **${t.auditId}** (${t.page}): ${t.recommendedFix}`));
    md.push('');
  }

  const perfIssues = dedupedTasks.filter(t => t.category === 'performance');
  if (perfIssues.length > 0) {
    md.push('## Performance opportunities');
    perfIssues.forEach(t => {
      const savings = t.numericSavings ? ` (${JSON.stringify(t.numericSavings)})` : '';
      md.push(`- **${t.auditId}** (${t.page})${savings}: ${t.recommendedFix}`);
    });
    md.push('');
  }

  const nextFix = dedupedTasks.find(t => t.risk === 'low');
  if (nextFix) {
    md.push('## Recommended next single fix');
    md.push(`**${nextFix.auditId}** on ${nextFix.page}`);
    md.push(nextFix.recommendedFix);
  }

  writeFileSync('reports/audit-summary.md', md.join('\n'));

  console.log(`\nAudit complete: ${dedupedTasks.length} tasks found.`);
  console.log('  reports/audit-tasks.json');
  console.log('  reports/audit-summary.md');
}

main().catch(err => { console.error(err); process.exit(1); });
