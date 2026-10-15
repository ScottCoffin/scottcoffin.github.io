# Repository map

This map shows the public routes, source locations, and boundaries between authored content, tooling, historical artifacts, and generated files. Update it whenever the repository gains or moves a major route, source directory, or source-of-truth file.

## Public route map

| Public route | Primary source | Purpose |
| --- | --- | --- |
| `/` | `index.md` | Homepage, positioning statement, and highlights |
| `/About_Me/` | `_pages/About_Me.md` | Biography, career timeline, working principles, and disclaimer |
| `/Research/` | `_pages/Research.md` | Research themes, selected work, and publications |
| `/Data_Science/` | `_pages/Data_Science.md` | Tools, software, dashboards, and open-science projects |
| `/Media/` | `_pages/Media.md` | Talks, interviews, podcasts, and media coverage |
| `/Blog/` | `Blog/index.html` | Jekyll Paginate landing and post listing |
| `/Photography/` | `_pages/Photography.md` | Photography landing page |
| `/Repositories/` | `_pages/Repositories.md` | Selected GitHub repositories |
| `/Microplastics_Explainer/` | `_pages/Microplastics_Explainer.md` | Topic-specific public explainer |
| `/year-archive/` | `_pages/year-archive.md` | Dated-post archive |
| `/CV.pdf` | `CV.pdf` | Downloadable curriculum vitae |
| `/Data_Science_ARCHIVE.html` | `archive/Data_Science_ARCHIVE.html` | Preserved legacy standalone page |

Navigation is controlled separately in `_data/navigation.yml`; creating, moving, or deleting a source page does not update the menu automatically. Page permalinks preserve the public URLs even though source files live under `_pages/`.

## Repository tree

```text
.
├── index.md                    # Required root homepage source
├── _pages/                     # Authored pages with stable explicit permalinks
│   ├── About_Me.md
│   ├── Data_Science.md
│   ├── Media.md
│   ├── Microplastics_Explainer.md
│   ├── Photography.md
│   ├── Repositories.md
│   ├── Research.md
│   └── year-archive.md
├── _config.yml                 # Global Jekyll, identity, URL, social, and plugin settings
├── _data/                      # Navigation, repository lists, and theme text
├── _includes/                  # Reusable Liquid/HTML fragments and structured data
├── _layouts/                   # Page templates
├── _sass/                      # Theme and custom styles
├── assets/
│   ├── css/                    # Stylesheet entry points and output
│   ├── images/                 # Profile, hero, project, and media images
│   ├── js/                     # JavaScript source and bundle
│   ├── publications/           # Public publications and presentations
│   ├── data/                   # Data and source artifacts for older features
│   └── widgets/                # Generated standalone interactive widgets
├── archive/                    # Historical public artifacts with preserved permalinks
├── Blog/index.html             # Jekyll Paginate source for the /Blog/ route
├── config/                     # Development-tool configuration
├── scripts/
│   ├── build/                  # Build helpers
│   └── *.mjs, *.ps1, *.sh     # SEO, performance, and repository checks
├── docs/
│   ├── REPOSITORY_MAP.md       # This architecture and route map
│   ├── PERSONALIZE_WITH_AI.md  # Detailed site-personalization workflow and prompt
│   └── workflows/              # Historical long-form implementation specifications
├── reports/                    # Tracked summaries; generated diagnostic exports are ignored
├── Photography/                # Legacy public photo files retained at stable URLs
├── fun/                        # Legacy standalone R examples retained at stable URLs
├── .github/workflows/          # Automated repository checks
├── AGENTS.md                   # Instructions for repository-aware coding agents
├── README.md                   # Setup, reuse, personalization, and deployment guide
├── CV.pdf                      # Stable public CV URL; replace in personalized copies
├── CNAME                       # Production custom domain; remove or replace in copies
├── manifest.json               # Browser/app manifest
├── browserconfig.xml           # Browser tile metadata
├── favicon* and app icons      # Stable web-root icon files
├── Gemfile                     # Ruby/Jekyll dependencies
├── package.json                # Node build and validation commands
└── _site/                      # Generated local site; ignored and never edited
```

## Root policy

The root is reserved for files that must or conventionally should remain there:

- repository guidance and legal files: `README.md`, `AGENTS.md`, and `LICENSE.txt`;
- package/build entry points: `Gemfile`, `package.json`, `package-lock.json`, `Rakefile`, and `_config.yml`;
- deployment files: `CNAME`, `robots.txt`, `staticman.yml`, and domain-verification files;
- browser-discovery files: `manifest.json`, `browserconfig.xml`, favicons, and app icons;
- stable public entry files: `index.md` and `CV.pdf`;
- editor/project metadata that depends on root placement, such as the `.Rproj` file.

Authored pages belong in `_pages/`, except for the required `index.md` and Jekyll Paginate's `Blog/index.html` entry point. Long documentation belongs in `docs/`, development configuration in `config/`, helpers in `scripts/`, public assets in `assets/`, and historical standalone artifacts in `archive/`.

`npm run check:guidance` rejects known misplaced legacy files if they reappear at the root.

## Edit by task

| Task | Start here | Also inspect |
| --- | --- | --- |
| Change name, biography, contact, or social profiles | `_config.yml` | `index.md`, `_pages/About_Me.md`, `_includes/person-jsonld.html`, `_includes/footer.html` |
| Change menus or remove a section | `_data/navigation.yml` | Matching file in `_pages/` and inbound links |
| Update publications | `_pages/Research.md` | `assets/publications/` and linked source metadata |
| Update projects or repositories | `_pages/Data_Science.md`, `_pages/Repositories.md` | `_data/repositories.yml`, `assets/images/` |
| Update talks or media | `_pages/Media.md` | `assets/images/`, embedded video URLs, downloadable files |
| Change profile or hero imagery | `_config.yml` and page front matter | `assets/images/`, image alt text, favicon files |
| Change colors or layout | `_sass/` | `_layouts/`, `_includes/`, `assets/css/` |
| Change canonical domain | `_config.yml`, `CNAME` | `robots.txt`, `config/lighthouserc.cjs`, `scripts/`, hard-coded links |
| Change analytics or verification | `_config.yml` | `_includes/analytics.html`, root verification files |
| Change build commands | `Gemfile`, `package.json` | `Rakefile`, `config/`, `.github/workflows/`, `scripts/` |

## Personalization hotspots

A complete repurpose requires more than changing the homepage. Search all editable source for the prior owner's name, domain, usernames, employers, location, email, analytics identifiers, and branded project names. The most easily missed areas are:

- `_includes/person-jsonld.html` and `_includes/footer.html`;
- `_data/repositories.yml` and repository cards;
- `manifest.json`, favicon/browser files, and root verification files;
- canonical-domain checks and target URLs in `scripts/` and `config/lighthouserc.cjs`;
- image alternative text and filenames;
- PDFs and other downloads under `assets/publications/`;
- historical pages and archives that remain publicly reachable.

Use [`PERSONALIZE_WITH_AI.md`](PERSONALIZE_WITH_AI.md) for the full agent-assisted audit.

## Source and generated boundaries

- Edit `index.md`, `Blog/index.html`, `_pages/`, YAML data, Liquid/HTML includes, Sass, JavaScript source, and intentional static assets.
- Do not edit `_site/`, `.jekyll-cache/`, `.sass-cache/`, `node_modules/`, or `.Rproj.user/`.
- Repository-only guidance, tooling, lockfiles, reports, and editor metadata are excluded from `_site/` in `_config.yml`.
- Treat `archive/`, old tracked reports, and `docs/workflows/` as historical unless a task explicitly targets them.
- `assets/widgets/` contains generated, vendored widget output. Replace a widget from its source workflow when possible instead of hand-editing dependency files.
- `personalization-input/` is locally ignored. It is context for an agent, not website content.
- `CV.pdf`, personal photographs, third-party logos, and publication files become public artifacts once committed; confirm rights and privacy before publishing.

## Validation flow

```text
Edit source → npm run check:guidance → local Jekyll preview
           → production Jekyll build → JSON-LD/SEO checks
           → route and asset comparison → commit → GitHub Pages
```

The domain-aware SEO scripts must be personalized before their output is valid for a copied site.
