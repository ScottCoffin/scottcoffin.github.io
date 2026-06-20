# Website professionalization final report

*Completed: 2026-06-19. All phases of WEBSITE_PROFESSIONALIZATION_WORKFLOW.md executed.*

---

## Files changed

| File | Purpose of change |
|---|---|
| `index.html` | Full homepage restructure: splash layout, hero intro, selected impact, audience pathway cards, featured work cards, how-I-work values, personal line moved to bottom |
| `About_Me.md` | Added career timeline, selected impact section, how-I-work values, institutional disclaimer; normalized role title; expanded professional context |
| `Research.md` | Added curated featured publications layer with "why it matters" before full list; improved section headings; removed 3 duplicate publication entries; normalized link label capitalization |
| `Data_Science.md` | Complete rewrite as "Tools & Open Science" with structured tool cards (purpose, audience, status, role, links) for all tools; removed stale "scheduled to launch Summer 2021" language; added H1 |
| `Media.md` | Added featured media cards section and featured talks section before archive; added intro paragraph; fixed two typos (Califorrnia, tocurb); removed stale talk count; updated all iframe `title` attributes to be descriptive; added text summaries for audio embeds |
| `For_Journalists.md` | Created new page with short bio, long bio, topics list, selected media, contact, and disclosure |
| `Microplastics_Explainer.md` | Created new plain-language explainer with what/where/health effects/policy sections; structured as known/uncertain/decisions |
| `_config.yml` | Updated author sidebar bio from entirely personal hobbies to professional + personal brief |
| `_data/navigation.yml` | Removed Expertise; renamed "Data Science" to "Tools & Open Science"; added "For Journalists"; kept CV |
| `Expertise.md` | Deleted (per workflow §10) |
| `_includes/footer.html` | Added institutional disclaimer |
| `assets/css/main.scss` | Added card-grid and timeline CSS classes |
| `reports/content-professionalization-audit.md` | Phase 1 audit (previously created) |

---

## Content improvements

- Homepage now answers "who, what, why, where next" within the first screen
- Selected impact section on homepage and About page surfaces the strongest CV accomplishments
- "How I work" values section is present on homepage and About page
- Featured publications on Research page provide a curated entry point with plain-language "why it matters" for each
- Tool cards on Data Science page provide structure: purpose, audience, status, role, links
- Media page has curated featured media and featured talks before the archive
- Microplastics Explainer provides a plain-language resource for community-facing audiences
- Career timeline on About page shows the arc from undergrad chemistry through current OEHHA work

---

## Professional identity improvements

- Sidebar bio now leads with professional role, not personal hobbies
- Role title standardized to "Staff Toxicologist Specialist" throughout (removed parenthetical "(Specialist)")
- OEHHA is now consistently spelled out as "Office of Environmental Health Hazard Assessment (OEHHA)" on first use
- CalEPA named explicitly on About page
- "Pharmacokinetics Research Scientist" role is clearly labeled as "Previously (2024–2025)" on Research and About pages

---

## Audience pathway improvements

- Homepage has explicit audience pathway cards: researchers, journalists, community, policymakers
- Navigation now includes "For Journalists" as a top-level link
- "Tools & Open Science" replaces "Data Science" in nav (more audience-legible)
- `/For_Journalists/` page gives journalists a fast path to bio, topics, contact, selected media, and disclosure
- `/Microplastics_Explainer/` gives community members a plain-language starting point
- About page now links to all key sections

---

## Research/tool/media improvements

- Research page: featured publications with plain-language context; full list preserved and cleaned up
- Tools page: every tool has status, audience, role, and links
- Media page: 6 featured media items in card grid; 2 featured embedded talks; full archive intact
- Duplicate publication entries removed (Coffin 2018 dissertation, Coffin 2020 Env Pollution, Huang UV/H2O2 papers)
- "Additional Publications" section deduplicated and cleaned up

---

## Accessibility/plain-language improvements

- All iframes now have descriptive `title` attributes (was "YouTube video player" or missing)
- Audio embeds now have nearby text summaries and language noting when transcripts are unavailable
- Institutional disclaimer added to site footer (visible on every page) and About/For Journalists pages
- Acronyms defined on first use on Explainer and For Journalists pages (PFAS, OEHHA, CalEPA, SB 1147, SB 1422)
- Plain-language Microplastics Explainer created with structured known/uncertain/decisions sections

---

## Remaining TODOs for Scott

1. **Microplastics Explainer review** — [Microplastics_Explainer.md](Microplastics_Explainer.md) contains a `TODO: Scott, please review and confirm this framing reflects your current assessment.` in the health effects section. Please review the "what we know / what remains uncertain / what this means" framing before linking prominently.

2. **About page career timeline dates** — The timeline entry for 2025–present as "Staff Toxicologist Specialist, OEHHA Water Toxicology Section" should be confirmed (date of role transition from New Toxicology Evaluations Section to Water Toxicology Section).

3. **University of Wyoming graduation** — The career timeline says "graduated from the University of Wyoming." Confirm this is accurate for the B.S. credential and that no other institution should be listed for degree conferral.

4. **CV quantitative highlights** — The workflow suggests adding publication and presentation counts (40 peer-reviewed publications, 11 first-author publications, 270+ presentations, 16 keynotes) if confirmed from the CV. These have NOT been added because the CV PDF was not reviewed. Scott should confirm these numbers and add them to the About or homepage if desired.

5. **Headshot download** — The For Journalists page does not include a downloadable headshot. If a public-facing headshot image exists, add a link to it on `/For_Journalists/`.

6. **DJ/Mixcloud link** — The Mixcloud link (`https://www.mixcloud.com/scoffincheyenne/`) is preserved throughout. Confirm it is still active.

7. **PFAS Toxicokinetics Explainer** — Workflow §8 suggests optionally creating this. Scaffolded as a potential future page; not created in this pass.

8. **"Expertise" nav removal** — The nav no longer includes an "Expertise" link. If you had shared that URL externally, set up a redirect from `/Expertise/` to `/Research/` in the hosting config.

9. **Repositories page** — The navigation has a commented-out "Repositories" link. This page exists but was left out of nav; no changes made to Repositories content.

---

## Build result

Jekyll build succeeded without errors. Build warnings are all pre-existing:
- Sass deprecation warnings from the Minimal Mistakes theme vendor libraries (not introduced by these changes)
- Blog.md / Blog/index.html destination conflict (pre-existing)
- Photography.md / Photography/index.html destination conflict (pre-existing)
- `year-archive.md` layout 'posts' missing (pre-existing)

No new warnings introduced.

---

## Pages to review manually

- [x] Homepage (`/`)
- [x] About Me (`/About_Me/`)
- [x] Research (`/Research/`)
- [x] Tools & Open Science (`/Data_Science/`)
- [x] Media (`/Media/`)
- [x] For Journalists (`/For_Journalists/`) — new page
- [x] Microplastics Explainer (`/Microplastics_Explainer/`) — new page
- [ ] CV link (`/CV.pdf`) — PDF not modified; confirm link still resolves
- [ ] Expertise (`/Expertise/`) — deleted; confirm no broken inbound links you care about
- [ ] PFAS Toxicokinetics Explainer — not created in this pass (optional per workflow)
