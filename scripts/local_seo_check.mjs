#!/usr/bin/env node
// Local SEO/HTML validation: checks built _site/ for canonical domain leakage, metadata, and link issues.
// Run after `bundle exec jekyll build`.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const CANONICAL_DOMAIN = 'https://scottcoff.in';
const GITHUB_PAGES_HOST = 'scottcoffin.github.io';

const PAGES_TO_CHECK = [
  '_site/index.html',
  '_site/Research/index.html',
  '_site/Data_Science/index.html',
  '_site/Media/index.html',
  '_site/For_Journalists/index.html',
  '_site/Microplastics_Explainer/index.html'
];

const OPTIONAL_PAGES = [
  '_site/About_Me/index.html',
  '_site/Blog/index.html'
];

function extractTag(html, pattern) {
  const m = html.match(pattern);
  return m ? m[1] || m[0] : null;
}

function countMatches(html, pattern) {
  return (html.match(pattern) || []).length;
}

function checkPage(filePath) {
  const issues = { errors: [], warnings: [], info: [] };
  const page = filePath.replace('_site/', '/').replace('/index.html', '/') || '/';

  if (!existsSync(filePath)) {
    issues.errors.push(`File not found: ${filePath}`);
    return { page, filePath, issues, exists: false };
  }

  const html = readFileSync(filePath, 'utf8');

  // 1. Title
  const title = extractTag(html, /<title[^>]*>([^<]+)<\/title>/i);
  if (!title) {
    issues.errors.push('Missing <title> tag');
  } else {
    issues.info.push(`Title: "${title}"`);
  }

  // 2. Meta description
  const desc = extractTag(html, /<meta\s+name=["']description["'][^>]*content=["']([^"']+)["']/i)
    || extractTag(html, /<meta\s+content=["']([^"']+)["'][^>]*name=["']description["']/i);
  if (!desc) {
    issues.errors.push('Missing <meta name="description">');
  } else {
    issues.info.push(`Description: "${desc.slice(0, 80)}..."`);
  }

  // 3. Canonical tag
  const canonical = extractTag(html, /<link\s+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
    || extractTag(html, /<link\s+href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  if (!canonical) {
    issues.errors.push('Missing <link rel="canonical">');
  } else {
    issues.info.push(`Canonical: ${canonical}`);
    if (!canonical.startsWith(CANONICAL_DOMAIN)) {
      issues.errors.push(`Canonical does not start with ${CANONICAL_DOMAIN}: ${canonical}`);
    }
    if (canonical.includes(GITHUB_PAGES_HOST)) {
      issues.errors.push(`CRITICAL: Canonical contains ${GITHUB_PAGES_HOST}: ${canonical}`);
    }
  }

  // 4. Internal links pointing to github pages host
  const githubLinks = (html.match(new RegExp(`href=["'][^"']*${GITHUB_PAGES_HOST}[^"']*["']`, 'gi')) || [])
    .filter(l => !l.includes('github.com/'));  // allow github.com links, flag github.io
  if (githubLinks.length > 0) {
    githubLinks.forEach(l => {
      issues.warnings.push(`Internal link to ${GITHUB_PAGES_HOST}: ${l}`);
    });
  }

  // 5. H1 count
  const h1Count = countMatches(html, /<h1[\s>]/gi);
  if (h1Count === 0) {
    issues.warnings.push('No <h1> found on page');
  } else if (h1Count > 1) {
    issues.warnings.push(`Multiple <h1> tags found: ${h1Count}`);
  } else {
    issues.info.push('H1: present (1)');
  }

  // 6. Images without alt
  const imgsTotal = countMatches(html, /<img[\s]/gi);
  const imgsWithAlt = countMatches(html, /<img[^>]+alt=["'][^"']*["']/gi);
  if (imgsTotal > 0 && imgsWithAlt < imgsTotal) {
    issues.warnings.push(`${imgsTotal - imgsWithAlt} of ${imgsTotal} images missing alt attribute`);
  }

  // 7. Images without width/height
  const imgsWithDims = countMatches(html, /<img[^>]+width=/gi);
  if (imgsTotal > 0 && imgsWithDims < imgsTotal) {
    issues.warnings.push(`${imgsTotal - imgsWithDims} of ${imgsTotal} images missing width/height (CLS risk)`);
  }

  // 8. Sitemap link in canonical domain
  const sitemapRef = html.includes('/sitemap.xml');
  // (informational only for individual pages)

  return { page, filePath, issues, exists: true };
}

function checkRobots() {
  const issues = { errors: [], warnings: [], info: [] };
  if (!existsSync('_site/robots.txt')) {
    issues.errors.push('robots.txt not found in _site/');
  } else {
    const txt = readFileSync('_site/robots.txt', 'utf8');
    if (!txt.toLowerCase().includes('sitemap')) {
      issues.warnings.push('robots.txt does not reference sitemap');
    }
    if (txt.includes(GITHUB_PAGES_HOST)) {
      issues.warnings.push(`robots.txt references ${GITHUB_PAGES_HOST}`);
    } else {
      issues.info.push('robots.txt: OK');
    }
  }
  return issues;
}

function checkSitemap() {
  const issues = { errors: [], warnings: [], info: [] };
  if (!existsSync('_site/sitemap.xml')) {
    issues.errors.push('sitemap.xml not found in _site/');
  } else {
    const xml = readFileSync('_site/sitemap.xml', 'utf8');
    if (xml.includes(GITHUB_PAGES_HOST)) {
      issues.errors.push(`CRITICAL: sitemap.xml contains ${GITHUB_PAGES_HOST} URLs`);
    }
    if (!xml.includes(CANONICAL_DOMAIN)) {
      issues.warnings.push(`sitemap.xml does not contain ${CANONICAL_DOMAIN} — check _config.yml url:`);
    } else {
      issues.info.push('sitemap.xml: uses correct domain');
    }
    const urlCount = countMatches(xml, /<loc>/gi);
    issues.info.push(`sitemap.xml: ${urlCount} URLs`);
  }
  return issues;
}

function main() {
  if (!existsSync('_site')) {
    console.error('ERROR: _site/ not found. Run `bundle exec jekyll build` first.');
    process.exit(1);
  }

  mkdirSync('reports', { recursive: true });

  const results = [];
  let totalErrors = 0;
  let totalWarnings = 0;

  for (const pagePath of [...PAGES_TO_CHECK, ...OPTIONAL_PAGES]) {
    const result = checkPage(pagePath);
    results.push(result);
    totalErrors += result.issues.errors.length;
    totalWarnings += result.issues.warnings.length;
  }

  const robotsIssues = checkRobots();
  const sitemapIssues = checkSitemap();
  totalErrors += robotsIssues.errors.length + sitemapIssues.errors.length;
  totalWarnings += robotsIssues.warnings.length + sitemapIssues.warnings.length;

  // Print to stdout
  console.log('\n=== Local SEO Check ===\n');
  for (const r of results) {
    if (!r.exists) {
      console.log(`[SKIP] ${r.page} — file not found`);
      continue;
    }
    const status = r.issues.errors.length > 0 ? 'FAIL' : r.issues.warnings.length > 0 ? 'WARN' : 'PASS';
    console.log(`[${status}] ${r.page}`);
    r.issues.errors.forEach(e => console.log(`  ERROR: ${e}`));
    r.issues.warnings.forEach(w => console.log(`  WARN:  ${w}`));
  }

  console.log('\n[robots.txt]');
  robotsIssues.errors.forEach(e => console.log(`  ERROR: ${e}`));
  robotsIssues.warnings.forEach(w => console.log(`  WARN:  ${w}`));
  robotsIssues.info.forEach(i => console.log(`  INFO:  ${i}`));

  console.log('\n[sitemap.xml]');
  sitemapIssues.errors.forEach(e => console.log(`  ERROR: ${e}`));
  sitemapIssues.warnings.forEach(w => console.log(`  WARN:  ${w}`));
  sitemapIssues.info.forEach(i => console.log(`  INFO:  ${i}`));

  console.log(`\nTotal: ${totalErrors} errors, ${totalWarnings} warnings`);

  // Write JSON report
  const jsonReport = {
    timestamp: new Date().toISOString(),
    totalErrors,
    totalWarnings,
    pages: results,
    robots: robotsIssues,
    sitemap: sitemapIssues
  };
  writeFileSync('reports/local-seo-check.json', JSON.stringify(jsonReport, null, 2));

  // Write Markdown report
  const md = [];
  md.push('# Local SEO Check Report');
  md.push(`**Generated:** ${new Date().toISOString()}`);
  md.push(`**Summary:** ${totalErrors} errors, ${totalWarnings} warnings`);
  md.push('');

  for (const r of results) {
    if (!r.exists) {
      md.push(`## ${r.page} — SKIPPED (not built)`);
      md.push('');
      continue;
    }
    const status = r.issues.errors.length > 0 ? '❌ FAIL' : r.issues.warnings.length > 0 ? '⚠️ WARN' : '✅ PASS';
    md.push(`## ${r.page} ${status}`);
    if (r.issues.errors.length > 0) {
      md.push('**Errors:**');
      r.issues.errors.forEach(e => md.push(`- ${e}`));
    }
    if (r.issues.warnings.length > 0) {
      md.push('**Warnings:**');
      r.issues.warnings.forEach(w => md.push(`- ${w}`));
    }
    if (r.issues.info.length > 0) {
      r.issues.info.forEach(i => md.push(`- ${i}`));
    }
    md.push('');
  }

  md.push('## robots.txt');
  robotsIssues.errors.forEach(e => md.push(`- ❌ ${e}`));
  robotsIssues.warnings.forEach(w => md.push(`- ⚠️ ${w}`));
  robotsIssues.info.forEach(i => md.push(`- ✅ ${i}`));
  md.push('');

  md.push('## sitemap.xml');
  sitemapIssues.errors.forEach(e => md.push(`- ❌ ${e}`));
  sitemapIssues.warnings.forEach(w => md.push(`- ⚠️ ${w}`));
  sitemapIssues.info.forEach(i => md.push(`- ✅ ${i}`));
  md.push('');

  writeFileSync('reports/local-seo-check.md', md.join('\n'));

  console.log('\nReports written:');
  console.log('  reports/local-seo-check.json');
  console.log('  reports/local-seo-check.md');

  // Exit nonzero if critical canonical leakage found
  const criticalErrors = results.some(r => r.issues.errors.some(e => e.includes('CRITICAL')))
    || sitemapIssues.errors.some(e => e.includes('CRITICAL'));
  if (criticalErrors) {
    console.error('\nCRITICAL: Canonical domain leakage detected. Fix before deploying.');
    process.exit(1);
  }
}

main();
