import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const agentGuidePath = path.join(repositoryRoot, 'AGENTS.md');
const readmePath = path.join(repositoryRoot, 'README.md');
const requiredFiles = [
  'AGENTS.md',
  '_pages/About_Me.md',
  'Blog/index.html',
  '_pages/Data_Science.md',
  '_pages/Media.md',
  '_pages/Microplastics_Explainer.md',
  '_pages/Photography.md',
  '_pages/Repositories.md',
  '_pages/Research.md',
  '_pages/year-archive.md',
  'archive/Data_Science_ARCHIVE.html',
  'config/lighthouserc.cjs',
  'docs/REPOSITORY_MAP.md',
  'docs/PERSONALIZE_WITH_AI.md',
  'scripts/build/banner.js',
];
const requiredReadmeLinks = [
  'AGENTS.md',
  'docs/REPOSITORY_MAP.md',
  'docs/PERSONALIZE_WITH_AI.md',
];
const errors = [];
const allowedRootMarkdown = new Set(['AGENTS.md', 'README.md', 'index.md']);
const forbiddenLegacyPaths = [
  '.Rhistory',
  'About_Me.md',
  'Blog.md',
  'Data_Science.md',
  'Data_Science_ARCHIVE.html',
  'Media.md',
  'Microplastics_Explainer.md',
  'Photography.md',
  'Photography/index.html',
  'Repositories-no-slash.md',
  'Repositories.md',
  'Research.md',
  'SEO_PERFORMANCE_SELF_IMPROVEMENT_WORKFLOW.md',
  'WEBSITE_PROFESSIONALIZATION_WORKFLOW.md',
  'banner.js',
  'lighthouserc.js',
  'year-archive.md',
];

for (const relativePath of requiredFiles) {
  if (!fs.existsSync(path.join(repositoryRoot, relativePath))) {
    errors.push(`Missing required guidance file: ${relativePath}`);
  }
}

for (const entry of fs.readdirSync(repositoryRoot, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith('.md') && !allowedRootMarkdown.has(entry.name)) {
    errors.push(`Move root Markdown file into _pages/ or docs/: ${entry.name}`);
  }
}

for (const relativePath of forbiddenLegacyPaths) {
  if (fs.existsSync(path.join(repositoryRoot, relativePath))) {
    errors.push(`Legacy path must not reappear: ${relativePath}`);
  }
}

if (fs.existsSync(agentGuidePath)) {
  const agentGuide = fs.readFileSync(agentGuidePath, 'utf8').replace(/\r\n/g, '\n');
  const lines = agentGuide.endsWith('\n')
    ? agentGuide.slice(0, -1).split('\n')
    : agentGuide.split('\n');

  if (lines.length > 200) {
    errors.push(`AGENTS.md has ${lines.length} lines; the maximum is 200.`);
  }
}

if (fs.existsSync(readmePath)) {
  const readme = fs.readFileSync(readmePath, 'utf8');
  for (const link of requiredReadmeLinks) {
    if (!readme.includes(`](${link})`)) {
      errors.push(`README.md must link to ${link}.`);
    }
  }
}

if (errors.length > 0) {
  console.error('Repository guidance check failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Repository guidance check passed. Agent limits and root organization are valid.');
