# Personal professional website template

This repository powers [scottcoff.in](https://scottcoff.in) and can be repurposed as a professional, academic, research, or portfolio website. It uses [Jekyll](https://jekyllrb.com/), [GitHub Pages](https://docs.github.com/pages), and the [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) theme.

The fastest path is to create an independent repository from this one, give an AI coding agent your source documents, review the personalized site locally, and publish it with GitHub Pages.

## Start here

1. Create your copy.
   - **Available now:** Select **Fork**. A fork keeps this repository's history and makes upstream updates easier to compare.
   - **Preferred for an independent site:** If GitHub shows **Use this template**, select it. A template copy starts with a clean history and is intended to become a separate project.
2. For the easiest free URL, name the new repository exactly `YOUR-USERNAME.github.io`.
3. Clone your new repository:

   ```bash
   git clone https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
   cd YOUR-USERNAME.github.io
   ```

4. Delete or replace `CNAME` immediately. Never publish a copy that still claims `scottcoff.in`.
5. Put your CV, resume, biosketch, biography, publication list, and other reference files in a local `personalization-input/` directory. This directory is ignored by Git so source documents containing private information are not committed accidentally.
6. Give your IDE agent the prompt in [`docs/PERSONALIZE_WITH_AI.md`](docs/PERSONALIZE_WITH_AI.md), or follow the manual checklist below.
7. Preview and validate the site locally.
8. Push the reviewed changes and enable GitHub Pages.

Before editing, see the [`repository map`](docs/REPOSITORY_MAP.md). Coding agents should also read [`AGENTS.md`](AGENTS.md).

## How the repository is organized

- `_pages/` contains authored website pages other than the required root `index.md` and Jekyll Paginate's `Blog/index.html` entry point.
- `assets/` contains public images, publications, data, JavaScript, CSS, and widgets.
- `_data/`, `_includes/`, `_layouts/`, and `_sass/` contain Jekyll theme data and components.
- `scripts/` and `config/` contain development, validation, and performance tooling.
- `docs/` contains contributor, personalization, and archived workflow documentation.
- `archive/` contains historical public artifacts that retain stable permalinks.

The repository root is intentionally reserved for files that GitHub Pages, Jekyll, browsers, package managers, or common development tools expect there, plus stable public files such as `index.md`, `CV.pdf`, and the favicon/manifest set.

## Choose a site address

This site's existing pages and images use root-relative links, so these two options require the least work:

| Goal | Repository name | `_config.yml` `url` | `_config.yml` `baseurl` |
| --- | --- | --- | --- |
| Free account site | `YOUR-USERNAME.github.io` | `https://YOUR-USERNAME.github.io` | `""` |
| Custom domain | Any repository name | `https://www.example.com` | `""` |

A project site such as `https://YOUR-USERNAME.github.io/portfolio/` needs `baseurl: "/portfolio"` **and** a systematic conversion of root-relative links such as `/assets/...` and `/Research/` to base-URL-aware Liquid links. Ask your coding agent to complete and verify that refactor before choosing this option.

## Personalize with an AI coding agent

The detailed workflow in [`docs/PERSONALIZE_WITH_AI.md`](docs/PERSONALIZE_WITH_AI.md) is designed for Codex, Claude Code, GitHub Copilot coding agent, Cursor, Windsurf, or a similar repository-aware agent. It tells the agent to:

- extract only supportable facts from your supplied materials;
- identify conflicts, stale dates, missing facts, and private information;
- replace identity, biography, projects, publications, media, images, metadata, structured data, and domain-specific scripts;
- remove unsupported sections instead of inventing content;
- build the site and report unresolved questions before deployment.

Keep source documents in `personalization-input/`, attach them directly to the agent, or provide links the agent is permitted to read. Do not commit private resumes, addresses, phone numbers, references, or unpublished materials merely to give an agent context.

## Personalize manually

Work through these files in order:

1. **Identity and URL:** `_config.yml`, `CNAME`, `manifest.json`, and `browserconfig.xml`.
2. **Navigation:** `_data/navigation.yml`.
3. **Primary pages:** `index.md`, `_pages/About_Me.md`, `_pages/Research.md`, `_pages/Data_Science.md`, and `_pages/Media.md`.
4. **Optional pages:** the remaining files in `_pages/` plus `Blog/index.html`. Delete unwanted pages and remove their navigation links.
5. **Profile and structured data:** `_includes/footer.html`, `_includes/person-jsonld.html`, and `_data/repositories.yml`.
6. **Media:** replace `CV.pdf`, profile/hero images in `assets/images/`, publication files in `assets/publications/`, and favicons at the repository root.
7. **Diagnostics:** update the domain and page lists in `scripts/`, `config/lighthouserc.cjs`, and the optional documents under `docs/workflows/`.
8. **Final identity search:** search for the prior owner's name, usernames, domain, employers, analytics ID, and social accounts.

Treat the existing biography, CV, photographs, publication PDFs, logos, and other personal or third-party material as example content to replace, not as reusable assets unless their individual licenses permit reuse.

## Preview locally

Install [Ruby](https://www.ruby-lang.org/en/documentation/installation/) and Bundler, then run:

```bash
gem install bundler
bundle install
bundle exec jekyll serve --livereload
```

Open <http://127.0.0.1:4000/>. Jekyll rebuilds when source files change. Stop the server with `Ctrl+C`.

Node.js 18 or newer is optional and is used for repository checks and SEO diagnostics:

```bash
npm ci
npm run check:guidance
```

Do not edit `_site/`; Jekyll regenerates it.

## Validate before publishing

Run the narrow checks first, followed by a production build:

```bash
npm run check:guidance
bundle exec jekyll build
npm run jsonld
npm run seo:check
git diff --check
```

The SEO scripts currently contain site-specific domain expectations. Personalize those scripts before treating their results as meaningful for a fork.

Also review the rendered site at desktop and mobile widths and confirm:

- every navigation item and internal link works;
- page titles, descriptions, social links, canonical URLs, and structured data name the new owner;
- the CV and downloadable files are intentional and safe to publish;
- images have useful alternative text and acceptable file sizes;
- no source documents from `personalization-input/` are staged;
- `git status` contains only intended files.

## Deploy with GitHub Pages

1. Push your personalized site to GitHub.
2. Open **Settings → Pages** in your repository.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select your default branch and the `/(root)` folder, then save.
5. Watch the repository's **Actions** tab for the Pages build.
6. Open the published URL shown in **Settings → Pages** and recheck navigation, images, metadata, and downloads.

For a custom domain, first remove the inherited `CNAME`, then configure the new domain in **Settings → Pages** and follow GitHub's [custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). Verify the domain before changing DNS when possible.

GitHub's current documentation also covers [creating a repository from a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template), [configuring a Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), and [testing Jekyll locally](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll).

## Keep your copy maintainable

- Keep site-wide identity and URL settings centralized in `_config.yml` where the theme supports them.
- Prefer Markdown pages and data files over copying generated HTML.
- Preserve meaningful source links for publications, projects, talks, and media claims.
- Update [`docs/REPOSITORY_MAP.md`](docs/REPOSITORY_MAP.md) when adding a new major directory, workflow, or source-of-truth file.
- Keep [`AGENTS.md`](AGENTS.md) at 200 lines or fewer; `npm run check:guidance` and the guidance-guard workflow enforce the limit.
- If you forked, optionally add this repository as `upstream` and selectively merge useful theme or documentation updates. If you used the template, your site is intentionally independent.

## For the repository owner

The public repository currently offers the fork path but is not marked as a template. If GitHub makes **Settings → General → Template repository** available, enable it. If the setting is unavailable because this repository belongs to an upstream fork network, create a standalone template copy of this codebase and link it prominently here. Keep the default branch deployable from the repository root and retain the automated guidance guard.

## License and attribution

The inherited Minimal Mistakes code and bundled dependencies retain the notices in [`LICENSE.txt`](LICENSE.txt). Review the licenses and rights for all photographs, logos, PDFs, publications, fonts, and other content before reusing or redistributing them. Replace personal content with your own.
