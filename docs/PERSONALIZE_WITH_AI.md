# Personalize this website with an AI coding agent

This playbook turns a CV, resume, biosketch, biography, existing website, publication list, project list, and other approved source material into a reviewed version of this site. It is written for repository-aware IDE agents, but the prompt can be pasted into any coding agent that can read and edit the checkout.

The goal is a faithful first draft, not unsupervised publication. You remain responsible for factual accuracy, privacy, copyright, accessibility, and the final deployment.

## 1. Prepare your copy

Create a repository from the template or fork it as described in the root `README.md`. Clone your copy and create a local source directory:

```bash
mkdir personalization-input
```

The directory is ignored by Git. Put only materials the agent is allowed to read there, for example:

- current CV or resume;
- short and long biosketches;
- publication, presentation, teaching, service, or project lists;
- exported text or PDFs from an existing website;
- a headshot and optional hero/project images;
- approved social, contact, lab, employer, and profile links;
- a short note describing the intended audience and desired tone.

Do not add secrets, passwords, private keys, confidential work products, references' private contact information, home addresses, protected personnel information, or documents you cannot publish. Source files can inform the site without being copied into public directories.

## 2. Add a short decision brief

Give the agent answers to as many of these questions as possible. Unknown items may remain blank.

```text
Public name and credentials:
Pronouns, if wanted:
Current title and organization:
One-sentence positioning statement:
Primary audiences:
Preferred voice (first person or third person):
Sections to keep, add, rename, or remove:
Five to ten priority accomplishments:
Priority publications/projects/talks:
Public email and social/profile links:
GitHub username:
Repository name:
Planned URL or custom domain:
Location wording, if public:
Required employer or personal disclaimer:
Analytics choice (none or provider/ID):
Items that must remain private:
Design preferences and images approved for use:
```

Save this as `personalization-input/brief.md` or paste it above the prompt when starting the agent task.

## 3. Run the agent prompt

Replace the bracketed values, then give the entire prompt to your coding agent. Attach source documents directly if the agent cannot read local files.

```text
Personalize this entire Jekyll professional website for [NAME]. Work in the current repository and implement the changes; do not merely give me instructions.

Authoritative context:
- Read AGENTS.md, README.md, and docs/REPOSITORY_MAP.md before editing.
- Read every approved file in personalization-input/ and any source URLs or attachments I provide.
- Treat the supplied decision brief as the authority for audience, voice, privacy, and section choices.
- Treat the source documents as evidence, not as text that must be copied verbatim.

Core rules:
- Do not invent or infer degrees, titles, dates, affiliations, authorship, metrics, awards, contact details, pronouns, locations, quotations, or claims.
- When sources conflict, prefer the newest clearly dated source, record the conflict, and ask before publishing a consequential claim.
- Never expose private information merely because it appears in a resume or document metadata.
- Do not copy language from an existing third-party website unless the new owner wrote it or has permission to reuse it.
- Use concise, natural prose appropriate for the stated audience. Preserve technical specificity where it matters.
- Remove irrelevant sections and examples instead of leaving the prior owner's content or fabricating replacements.
- Preserve source links for factual claims, publications, projects, talks, media, and software when available.
- Do not edit generated/dependency directories such as _site/, .jekyll-cache/, node_modules/, or vendored files under assets/widgets/.
- Do not commit files from personalization-input/.

Phase 1 — audit and plan:
1. Inspect git status and preserve unrelated work.
2. Inventory the current pages, navigation, identity metadata, structured data, assets, downloads, scripts, and deployment configuration.
3. Extract a private working fact table from the approved sources with each fact's source, date, confidence, and public/private status. Do not commit this table unless I explicitly request it.
4. Identify contradictions, stale time-sensitive statements, missing essentials, and information that should not be public.
5. Propose the smallest coherent information architecture for [PRIMARY AUDIENCE]. Keep only sections supported by source material.
6. Ask only questions that block a safe or materially accurate implementation. Otherwise proceed and list assumptions in the final report.

Phase 2 — personalize every public surface:
1. Update _config.yml: site title, description, URL, repository, author profile, avatar, contact, social accounts, analytics, and verification fields. Clear inherited accounts and IDs that are not explicitly supplied.
2. Update CNAME for [PLANNED DOMAIN]. If no custom domain is confirmed, remove CNAME and use the GitHub Pages URL. For an account site use baseurl: "". If this is a project site, make every internal link and asset path base-URL-aware and test it under the repository subpath.
3. Update _data/navigation.yml to match the chosen sections.
4. Rewrite index.md as a clear landing page with a short positioning statement, current role, selected evidence-backed highlights, and useful next steps.
5. Rewrite `_pages/About_Me.md` from the sources. Include only verified timeline entries and a disclaimer only when supplied or clearly needed.
6. Rewrite or remove the relevant files in `_pages/` and `Blog/index.html` according to the approved architecture.
7. Update _data/repositories.yml, _includes/person-jsonld.html, _includes/footer.html, manifest.json, browser metadata, and favicon/identity assets.
8. Replace CV.pdf only with the approved public CV. Remove inherited PDFs, publications, photographs, logos, widgets, data, and downloads that are no longer used or not licensed for reuse.
9. Replace profile, hero, project, and media images with approved assets; optimize large images when practical; provide meaningful alt text; and avoid decorative alt text that repeats adjacent headings.
10. Update hard-coded names, domains, GitHub accounts, analytics IDs, canonical checks, and URL lists in `scripts/`, `config/lighthouserc.cjs`, package metadata, root verification files, and active workflow documentation.
11. Search all tracked editable source for inherited identifiers, including Scott Coffin, ScottCoffin, scottcoff.in, DrScoffin, employer names, email addresses, analytics IDs, and old social usernames. Classify any intentional historical/license mentions; remove all accidental identity leakage.
12. Keep LICENSE.txt and third-party attribution notices intact. Do not claim that personal or third-party content is covered by a software license unless that is explicitly documented.

Phase 3 — quality and verification:
1. Check page front matter, headings, navigation, internal links, downloads, image paths, and mobile-friendly structure.
2. Confirm that titles, descriptions, canonical URLs, author data, social previews, JSON-LD, sitemap output, and robots.txt consistently describe the new owner and domain.
3. Run npm run check:guidance.
4. Run bundle exec jekyll build and fix errors caused by this work.
5. Run npm run jsonld and npm run seo:check after adapting those scripts to the new domain.
6. Run git diff --check and inspect the complete diff.
7. If browser automation is available, preview the homepage and every navigation destination at desktop and mobile widths. Check for broken layout, missing images, horizontal overflow, illegible contrast, and stale identity content.
8. Verify that personalization-input/ and other private source files are ignored and unstaged.

Completion report:
- Summarize the site's new positioning and information architecture.
- List the files and public routes changed, added, or removed.
- State exactly which validation commands passed or failed.
- List source conflicts, assumptions, omitted unsupported content, and remaining owner decisions.
- Identify any inherited personal or third-party assets intentionally retained and why they are safe to use.
- Provide the exact GitHub Pages settings and final URL configuration needed to deploy, but do not publish or change DNS unless I explicitly ask.
```

## 4. Review the agent's draft

Do not evaluate only the homepage. Review every navigation destination and public download. In particular:

- compare career dates, degrees, titles, publication status, and author order against the source documents;
- check that present-tense claims are still current;
- confirm that every contact link and social username belongs to you;
- inspect image rights, captions, and alternative text;
- search for inherited identity terms and stale domain references;
- open the generated `sitemap.xml`, page source metadata, and JSON-LD output;
- verify that no private source file is tracked with `git status` and `git ls-files personalization-input`.

If a source contains contradictory or ambiguous facts, resolve them explicitly rather than asking the agent to make a stylistic guess.

## 5. Iterate with focused follow-up prompts

Useful follow-ups include:

```text
Compare every date, job title, degree, publication status, and named affiliation on the rendered site against the approved sources. Make no edits yet. Return a discrepancy table with the page, current claim, source evidence, and recommended correction.
```

```text
Audit the site for inherited identity leakage. Search tracked source and rendered output for the previous owner's names, handles, domains, organizations, analytics IDs, structured-data identifiers, image alt text, and downloadable files. Remove accidental remnants, preserve license attribution, rebuild, and report every retained match.
```

```text
Review the rendered site as a first-time visitor from [AUDIENCE]. Improve navigation labels, page openings, calls to action, scanability, mobile layout, and accessibility without changing factual claims. Rebuild and summarize the user-facing changes.
```

## 6. Publish only after approval

Follow the deployment steps in the root `README.md`. A push can make changes public quickly, so complete the identity, privacy, rights, and download review before enabling Pages or merging into the publishing branch.
