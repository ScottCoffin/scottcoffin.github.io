# AGENTS.md

## Scope

These instructions apply to the entire repository. More specific `AGENTS.md` files may add or override guidance within their own directories.

This repository is a Jekyll/Minimal Mistakes personal professional website published with GitHub Pages. Keep changes focused, evidence-based, accessible, and easy for future owners and coding agents to maintain.

## Start Here

1. Read `README.md` for setup and deployment.
2. Read `docs/REPOSITORY_MAP.md` for source boundaries and route ownership.
3. For a site-wide repurpose, follow `docs/PERSONALIZE_WITH_AI.md`.
4. Inspect `git status --short` before editing and preserve unrelated work.
5. Read the complete file and nearby style before changing it.

## Sources of Truth

- `_config.yml`: site identity, production URL, author profile, social links, analytics, plugins, and defaults.
- `_data/navigation.yml`: primary navigation.
- `index.md`, `_pages/`, and `Blog/index.html`: public page content and front matter.
- `_includes/`: shared markup, footer content, analytics, SEO, and structured data.
- `_layouts/`: page composition.
- `_sass/`: visual styling; `assets/css/` is the stylesheet entry/output area.
- `assets/images/` and `assets/publications/`: public media and downloads.
- `scripts/`, `config/`, `package.json`, and `Gemfile`: checks and build dependencies.
- `docs/REPOSITORY_MAP.md`: current architecture map; update it after structural changes.

## Never Hand-Edit

- `_site/`
- `.jekyll-cache/`
- `.sass-cache/`
- `node_modules/`
- `.Rproj.user/`
- generated dependency files under `assets/widgets/`, unless the task explicitly targets them and no source workflow exists

Treat `archive/`, tracked audit reports, and `docs/workflows/` as historical unless a task explicitly targets them.

## Content Rules

- Do not invent biographical facts, credentials, affiliations, dates, metrics, publication status, contact details, quotes, or scientific claims.
- Resolve facts from the newest authoritative source supplied by the owner; flag consequential conflicts.
- Preserve exact publication metadata and working links. Verify a citation separately from verifying that it supports surrounding claims.
- Keep voice and person consistent within each page.
- Use descriptive headings, link text, and image alt text.
- Remove unsupported or irrelevant sections instead of leaving template-owner content.
- Keep employer/personal disclaimers faithful to owner-approved wording.
- Do not expose private information from resumes, file metadata, commit history, or `personalization-input/`.
- Confirm reuse rights before adding photographs, logos, PDFs, publications, fonts, or third-party text.
- Preserve `LICENSE.txt` and third-party attribution notices.

## Identity and Domain Changes

A site-wide identity change must inspect all of these:

- `_config.yml`, `CNAME`, `manifest.json`, favicon/browser files, and root verification files
- `index.md`, `Blog/index.html`, and all biography, research, project, media, photography, and repository pages in `_pages/`
- `_data/navigation.yml` and `_data/repositories.yml`
- `_includes/person-jsonld.html`, `_includes/footer.html`, analytics, and SEO includes
- `CV.pdf`, `assets/images/`, `assets/publications/`, and other downloads
- `scripts/`, `config/lighthouserc.cjs`, package metadata, and active workflow documentation
- hard-coded names, domains, usernames, employers, emails, analytics IDs, and absolute internal links

Never leave an inherited custom domain or analytics ID active in a fork. Root-relative links currently assume an account site or custom domain with `baseurl: ""`; project-site deployment requires a complete base-URL audit.

## Editing Conventions

- Keep YAML indentation and existing front-matter conventions valid.
- Keep authored pages in `_pages/`; `index.md` and the Jekyll Paginate entry at `Blog/index.html` are the documented exceptions.
- Keep long-form project documentation in `docs/` and tool configuration in `config/`.
- Do not move required web-root files without preserving their public URLs.
- Prefer Markdown and data files over generated HTML.
- Prefer relative or Jekyll-aware internal links over hard-coded production URLs.
- Keep page permalinks stable unless redirects and inbound links are addressed.
- Reuse existing layout classes and component patterns before adding new ones.
- Keep JavaScript dependency-free when practical and preserve progressive enhancement.
- Avoid broad formatting rewrites and unrelated cleanup.
- Use narrow patches around publication lists or accented text and inspect neighboring entries afterward.
- Update `docs/REPOSITORY_MAP.md` when adding, moving, or deleting major routes or source directories.
- Keep this file at 200 lines or fewer.

## Local Commands

```bash
bundle install
bundle exec jekyll serve --livereload
npm ci
npm run check:guidance
```

The local preview is at `http://127.0.0.1:4000/`. Do not commit `_site/`.

## Validation

Run checks proportional to the change. Before final handoff, prefer:

```bash
npm run check:guidance
bundle exec jekyll build
npm run jsonld
npm run seo:check
git diff --check
```

Domain-aware SEO scripts contain production assumptions. Update them during a repurpose before trusting their results.

For content changes, also:

- inspect the full diff and `git status --short`;
- verify edited routes, links, images, downloads, and neighboring content;
- search for stale identity/domain terms when scope is site-wide;
- review desktop and mobile rendering when layout changes;
- state which checks ran, passed, failed, or were unavailable.

Do not claim the site was deployed, committed, pushed, or visually tested unless that action actually occurred.

## Git and Privacy

- Preserve unrelated user changes in a dirty worktree.
- Do not use destructive Git commands or rewrite history unless explicitly requested.
- Do not commit secrets, API keys, private source documents, report exports, caches, or generated site output.
- `personalization-input/` is intentionally ignored. Confirm it remains untracked before handoff.
- A GitHub Pages site may be public even when repository visibility differs by plan; treat committed content as publishable.

## Completion Standard

A change is complete when source files are coherent, relevant checks pass, rendered behavior has been reviewed when needed, documentation reflects structural changes, and remaining assumptions or owner decisions are explicit.
