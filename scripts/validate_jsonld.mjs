#!/usr/bin/env node
// JSON-LD syntax validator: scans _site/ HTML for <script type="application/ld+json"> blocks
// and reports parse success/failure. Does NOT claim Google rich-result eligibility.

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, statSync } from 'fs';
import { join } from 'path';

const SITE_DIR = '_site';
const JSONLD_PATTERN = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

function findHtmlFiles(dir) {
  const results = [];
  if (!existsSync(dir)) return results;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

function validateFile(filePath) {
  const html = readFileSync(filePath, 'utf8');
  const blocks = [];
  let match;
  const re = new RegExp(JSONLD_PATTERN.source, 'gi');
  while ((match = re.exec(html)) !== null) {
    const raw = match[1].trim();
    try {
      const parsed = JSON.parse(raw);
      blocks.push({
        index: blocks.length + 1,
        valid: true,
        type: parsed['@type'] || 'unknown',
        context: parsed['@context'] || 'unknown',
        error: null,
        snippet: raw.slice(0, 120)
      });
    } catch (err) {
      blocks.push({
        index: blocks.length + 1,
        valid: false,
        type: null,
        context: null,
        error: err.message,
        snippet: raw.slice(0, 120)
      });
    }
  }
  return {
    file: filePath.replace(/\\/g, '/'),
    page: filePath.replace(/\\/g, '/').replace(SITE_DIR, '').replace('/index.html', '/') || '/',
    blockCount: blocks.length,
    blocks
  };
}

function main() {
  if (!existsSync(SITE_DIR)) {
    console.error(`ERROR: ${SITE_DIR}/ not found. Run \`bundle exec jekyll build\` first.`);
    process.exit(1);
  }

  mkdirSync('reports', { recursive: true });

  const htmlFiles = findHtmlFiles(SITE_DIR);
  const results = [];
  let totalBlocks = 0;
  let totalErrors = 0;

  for (const file of htmlFiles) {
    const result = validateFile(file);
    if (result.blockCount === 0) continue;  // skip pages with no JSON-LD
    results.push(result);
    totalBlocks += result.blockCount;
    totalErrors += result.blocks.filter(b => !b.valid).length;
  }

  // stdout summary
  console.log('\n=== JSON-LD Validation ===\n');
  if (results.length === 0) {
    console.log('No JSON-LD blocks found in _site/.');
  }
  for (const r of results) {
    const status = r.blocks.some(b => !b.valid) ? 'FAIL' : 'PASS';
    console.log(`[${status}] ${r.page} — ${r.blockCount} block(s)`);
    for (const b of r.blocks) {
      if (!b.valid) {
        console.log(`  Block ${b.index}: INVALID — ${b.error}`);
        console.log(`    Snippet: ${b.snippet}`);
      } else {
        console.log(`  Block ${b.index}: OK — @type=${b.type}`);
      }
    }
  }

  console.log(`\nTotal: ${totalBlocks} JSON-LD blocks, ${totalErrors} parse error(s)`);
  console.log('NOTE: This validates JSON syntax only. Use Google Rich Results Test for eligibility.');

  // JSON report
  const jsonReport = {
    timestamp: new Date().toISOString(),
    totalBlocks,
    totalErrors,
    note: 'JSON syntax validation only. Google Rich Results Test required for rich-result eligibility.',
    files: results
  };
  writeFileSync('reports/jsonld-validation.json', JSON.stringify(jsonReport, null, 2));

  // Markdown report
  const md = [];
  md.push('# JSON-LD Validation Report');
  md.push(`**Generated:** ${new Date().toISOString()}`);
  md.push(`**Total blocks:** ${totalBlocks}  **Parse errors:** ${totalErrors}`);
  md.push('');
  md.push('> **Limitation:** This validates JSON syntax only. It does not validate Schema.org types or Google rich-result eligibility. Use [Google Rich Results Test](https://search.google.com/test/rich-results) manually for deployed pages.');
  md.push('');

  for (const r of results) {
    const status = r.blocks.some(b => !b.valid) ? '❌ FAIL' : '✅ PASS';
    md.push(`## ${r.page} ${status}`);
    for (const b of r.blocks) {
      if (b.valid) {
        md.push(`- Block ${b.index}: ✅ Valid — \`@type: ${b.type}\``);
      } else {
        md.push(`- Block ${b.index}: ❌ Invalid — ${b.error}`);
        md.push(`  \`\`\`json\n  ${b.snippet}\n  \`\`\``);
      }
    }
    md.push('');
  }

  writeFileSync('reports/jsonld-validation.md', md.join('\n'));

  console.log('\nReports written:');
  console.log('  reports/jsonld-validation.json');
  console.log('  reports/jsonld-validation.md');

  if (totalErrors > 0) {
    console.error(`\n${totalErrors} JSON-LD block(s) have invalid syntax.`);
    process.exit(1);
  }
}

main();
