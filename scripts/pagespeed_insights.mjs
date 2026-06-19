#!/usr/bin/env node
// PageSpeed Insights API runner for https://scottcoff.in
// Usage: node scripts/pagespeed_insights.mjs
// Optional env: PAGESPEED_API_KEY=...

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

if (typeof fetch === 'undefined') {
  console.error('ERROR: global fetch is not available. Node 18+ is required.');
  process.exit(1);
}

const API_KEY = process.env.PAGESPEED_API_KEY || null;
const BASE_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

const URLS = [
  'https://scottcoff.in/',
  'https://scottcoff.in/Research/',
  'https://scottcoff.in/Data_Science/',
  'https://scottcoff.in/Media/',
  'https://scottcoff.in/Expertise/'
];

const STRATEGIES = ['mobile', 'desktop'];
const CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo'];

const RATE_LIMIT_MS = 2000;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function safeNum(val) {
  if (val === null || val === undefined) return 'NA';
  return typeof val === 'number' ? Math.round(val) : val;
}

function safeScore(val) {
  if (val === null || val === undefined) return 'NA';
  return Math.round(val * 100);
}

function extractMetrics(data) {
  const cats = data.lighthouseResult?.categories || {};
  const audits = data.lighthouseResult?.audits || {};
  const lhr = data.lighthouseResult || {};

  const numericValue = (id) => audits[id]?.numericValue ?? null;
  const auditScore = (id) => audits[id]?.score ?? null;

  return {
    performance_score: safeScore(cats.performance?.score),
    accessibility_score: safeScore(cats.accessibility?.score),
    best_practices_score: safeScore(cats['best-practices']?.score),
    seo_score: safeScore(cats.seo?.score),
    lcp_ms: safeNum(numericValue('largest-contentful-paint')),
    cls: audits['cumulative-layout-shift']?.displayValue ?? 'NA',
    inp_ms_or_na: safeNum(numericValue('interaction-to-next-paint') ?? numericValue('experimental-interaction-to-next-paint')),
    tbt_ms: safeNum(numericValue('total-blocking-time')),
    fcp_ms: safeNum(numericValue('first-contentful-paint')),
    speed_index_ms: safeNum(numericValue('speed-index')),
    total_byte_weight: safeNum(numericValue('total-byte-weight')),
    render_blocking_savings_ms: safeNum(numericValue('render-blocking-resources')),
    unused_css_savings_bytes: safeNum(audits['unused-css-rules']?.details?.overallSavingsBytes),
    unused_js_savings_bytes: safeNum(audits['unused-javascript']?.details?.overallSavingsBytes),
    image_savings_bytes: safeNum(audits['uses-optimized-images']?.details?.overallSavingsBytes ?? audits['modern-image-formats']?.details?.overallSavingsBytes),
    canonical_audit_score: safeScore(auditScore('canonical')),
    viewport_audit_score: safeScore(auditScore('viewport')),
    meta_description_audit_score: safeScore(auditScore('meta-description')),
    crawlable_anchors_score: safeScore(auditScore('crawlable-anchors')),
    http_status_code: safeScore(auditScore('http-status-code')),
    final_url: lhr.finalUrl ?? data.id ?? 'NA'
  };
}

async function fetchWithRetry(url, retries = 1) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url);
      if (res.status === 429 || res.status >= 500) {
        if (attempt < retries) {
          console.warn(`  HTTP ${res.status}, retrying after 5s...`);
          await sleep(5000);
          continue;
        }
        console.error(`  HTTP ${res.status} after ${retries + 1} attempts.`);
        return null;
      }
      return await res.json();
    } catch (err) {
      if (attempt < retries) {
        console.warn(`  Network error, retrying: ${err.message}`);
        await sleep(5000);
        continue;
      }
      console.error(`  Request failed: ${err.message}`);
      return null;
    }
  }
  return null;
}

async function run() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const runDir = join('reports', 'pagespeed', timestamp);
  mkdirSync(runDir, { recursive: true });
  mkdirSync(join('reports', 'pagespeed'), { recursive: true });

  const rows = [];
  const CSV_HEADERS = [
    'timestamp','url','strategy','performance_score','accessibility_score',
    'best_practices_score','seo_score','lcp_ms','cls','inp_ms_or_na','tbt_ms',
    'fcp_ms','speed_index_ms','total_byte_weight','render_blocking_savings_ms',
    'unused_css_savings_bytes','unused_js_savings_bytes','image_savings_bytes',
    'canonical_audit_score','viewport_audit_score','meta_description_audit_score',
    'crawlable_anchors_score','http_status_code','final_url'
  ];

  console.log('\n=== PageSpeed Insights ===');
  if (!API_KEY) console.log('(No API key — anonymous quota applies)\n');

  for (const url of URLS) {
    for (const strategy of STRATEGIES) {
      process.stdout.write(`Testing ${strategy.padEnd(7)} ${url} ... `);

      const params = new URLSearchParams({ url, strategy });
      for (const cat of CATEGORIES) params.append('category', cat);
      if (API_KEY) params.set('key', API_KEY);

      const apiUrl = `${BASE_URL}?${params}`;
      const data = await fetchWithRetry(apiUrl);

      if (!data) {
        console.log('FAILED');
        rows.push({ timestamp, url, strategy, ...Object.fromEntries(CSV_HEADERS.slice(3).map(k => [k, 'NA'])) });
        await sleep(RATE_LIMIT_MS);
        continue;
      }

      const safeName = url.replace(/https?:\/\//, '').replace(/\//g, '_').replace(/[^a-z0-9_-]/gi, '') || 'home';
      writeFileSync(join(runDir, `${safeName}-${strategy}.json`), JSON.stringify(data, null, 2));

      const metrics = extractMetrics(data);
      const row = { timestamp, url, strategy, ...metrics };
      rows.push(row);

      console.log(`perf=${metrics.performance_score} a11y=${metrics.accessibility_score} seo=${metrics.seo_score} lcp=${metrics.lcp_ms}ms`);
      await sleep(RATE_LIMIT_MS);
    }
  }

  // CSV
  const csvLines = [CSV_HEADERS.join(',')];
  for (const row of rows) {
    csvLines.push(CSV_HEADERS.map(h => {
      const v = String(row[h] ?? 'NA');
      return v.includes(',') ? `"${v}"` : v;
    }).join(','));
  }
  writeFileSync(join('reports', 'pagespeed', 'latest-summary.csv'), csvLines.join('\n'));

  // Markdown summary
  const mdLines = [
    `# PageSpeed Insights Summary`,
    ``,
    `**Run:** ${new Date().toISOString()}`,
    ``,
    `| URL | Strategy | Perf | A11y | BP | SEO | LCP (ms) | CLS | TBT (ms) |`,
    `|---|---|---:|---:|---:|---:|---:|---|---:|`
  ];
  for (const row of rows) {
    mdLines.push(`| ${row.url} | ${row.strategy} | ${row.performance_score} | ${row.accessibility_score} | ${row.best_practices_score} | ${row.seo_score} | ${row.lcp_ms} | ${row.cls} | ${row.tbt_ms} |`);
  }
  mdLines.push('');
  mdLines.push(`Raw JSON: \`${runDir}\``);
  writeFileSync(join('reports', 'pagespeed', 'latest-summary.md'), mdLines.join('\n'));

  console.log('\nReports written to:');
  console.log(`  reports/pagespeed/${timestamp}/`);
  console.log('  reports/pagespeed/latest-summary.csv');
  console.log('  reports/pagespeed/latest-summary.md');
}

run().catch(err => { console.error(err); process.exit(1); });
