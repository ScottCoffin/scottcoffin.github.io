# Content and professionalism audit

*Generated: 2026-06-19. Phase 1 of WEBSITE_PROFESSIONALIZATION_WORKFLOW.md.*

---

## Pages reviewed

| Page | Source file | Live URL | Main purpose | Issues |
|---|---|---|---|---|
| Homepage | `index.html` | `https://scottcoff.in/` | Professional intro, entry point | Uses `archive` layout (shows blog posts); no selected impact, no audience pathways; no "why it matters"; hobbies appear in sidebar instead of lower on page; links to "Data Science" (not renamed yet); title is very long |
| About Me | `About_Me.md` | `https://scottcoff.in/About_Me/` | Biography and context | Good but short; no career timeline; expertise list undersells current OEHHA work and omits microplastics/PFAS/toxicokinetics; no institutional disclaimer |
| Research | `Research.md` | `https://scottcoff.in/Research/` | Publication list and research themes | Role-naming inconsistency ("Staff Toxicologist Specialist" vs "Pharmacokinetics Research Scientist"); no curated featured publications before full list; no "why it matters" per publication; two duplicate entries (Coffin 2018 papers); no audience intro sentence |
| Expertise | `Expertise.md` | `https://scottcoff.in/Expertise/` | Expertise summary | Workflow §10 says: **delete this page**; currently shows as a standalone page that largely duplicates Research themes |
| Data Science | `Data_Science.md` | `https://scottcoff.in/Data_Science/` | Tools and open science | Stale language: "scheduled to launch in Summer, 2021" for ToMEx 2.0 (now launched years ago); no structured tool cards with status/role/audience; title appends "Scott Coffin, PhD" creating malformed visible H1; "AI Art" section is low-value for professional audience |
| Media | `Media.md` | `https://scottcoff.in/Media/` | Press, talks, and podcast archive | Typos: "Califorrnia's" (line 91), "tocurb" (line 97); stale talk count: "Total = 175 as of May 25, 2022"; no featured/curated section before the chronological archive; no descriptive summaries for audio/video embeds; LAMPOON item says 2020 but is under 2020 section (date inconsistency) |
| CV | N/A (PDF) | `https://scottcoff.in/CV.pdf` | Full curriculum vitae | Not inspected in this audit; linked correctly in nav |

---

## Audience usefulness

| Audience | Can they quickly find what they need? | Missing or confusing elements |
|---|---|---|
| Researchers and collaborators | Partially — Research page has themes and publications, but no curated "featured" layer or data/code links per paper | No "featured publications" with why-it-matters; no collaboration contact path; open tools scattered in Data Science page |
| Journalists and event organizers | No — no media kit, no short bio page, no topics list, no headshot download | No `/For_Journalists/` page; Media page is a raw chronological archive with no intro; no speaker bio text |
| Community members and public-interest readers | No — jargon-heavy; no plain-language explainer for microplastics or PFAS | No explainer pages; no "why this matters" framing; audience pathways not labeled |
| Policymakers and regulators | Partially — Research has regulatory-relevant work but it's buried in lists | No "regulatory science" framing up front; no quick summary of what policies Scott has contributed to |
| Students and early-career scientists | Partially — open tools and code links exist | No "start here" guidance; career timeline absent; mentoring or collaboration signal not present |

---

## Identity consistency

| Location | Current title/role text | Issue | Recommended normalized wording |
|---|---|---|---|
| `_config.yml` author bio | "Ecotoxicologist, rock climber, DJ, surfer, yoga instructor, dancer." | Entirely personal; no professional role | Move personal hobbies to About page; set bio to: "Environmental toxicologist specializing in microplastics, PFAS, risk assessment, and open environmental data tools." |
| `index.html` (homepage) | "Staff Toxicologist (Specialist)" | Parenthetical notation inconsistent with other uses | Use: "Staff Toxicologist Specialist" |
| `About_Me.md` | "Staff Toxicologist (Specialist)" | Parenthetical notation | Same: "Staff Toxicologist Specialist" |
| `Research.md` intro | "Staff Toxicologist Specialist" | Consistent with above — OK | Keep |
| `Research.md` (second section) | "Pharmacokinetics Research Scientist" in "Previously (2024-2025)" block | Past role is clearly labeled "Previously" — OK, but dates 2024–2025 at OEHHA need context clarification | Clarify: this role was at OEHHA before current Water Toxicology role |
| `_config.yml` site description | "environmental toxicologist specializing in microplastics, PFAS, risk assessment, toxicokinetics, computational toxicology, regulatory science, and open environmental data tools." | Good | Keep |
| `index.html` title tag | "Scott Coffin, PhD \| Environmental Toxicologist & Microplastics Risk Scientist" | Slightly different framing from elsewhere | Minor; acceptable |

---

## High-priority content gaps

1. **No "For Journalists" / media kit page.** Journalists have no fast path to a bio, topic list, or headshot.
2. **No audience pathway section on homepage.** No labeled "For researchers / for journalists / for community members" routing.
3. **No "Selected impact" section.** The homepage and About page don't lead with accomplishments from the CV.
4. **No career timeline.** New visitors can't quickly understand the arc from PhD to OEHHA.
5. **No "How I work" / values section.** Open science commitment, regulatory relevance, and plain-language communication are not stated explicitly.
6. **No institutional disclaimer.** No footer or About-page text distinguishing personal views from employer positions.
7. **Sidebar bio is entirely personal hobbies** — gives no professional context to first-time visitors who see the sidebar first.
8. **ToMEx 2.0 stale launch language** in Data Science page — undermines credibility of "current" status.
9. **No plain-language explainer** for microplastics or PFAS for community-facing audience.
10. **Expertise page exists but workflow says to delete it** — it largely duplicates Research themes with no additional value.

---

## Professional/design issues

1. **Homepage uses `layout: archive`** which pulls in recent blog posts. If the blog is not actively used, this creates a cluttered or confusing homepage. Consider `layout: splash` or `layout: single`.
2. **Data Science page title** in frontmatter is "Data Science & Open Tools | Scott Coffin, PhD" — the site appends the site name, creating: "Data Science & Open Tools | Scott Coffin, PhD | Scott Coffin, PhD" or similar H1 weirdness. The visible H1 at page top is missing (no `# Tools & Open Science` heading).
3. **Media page** has no intro paragraph before jumping into archive items.
4. **Research page** has no curated "featured publications" section; jumps directly into themed lists. Non-specialist visitors have no entry point.
5. **Navigation** includes "Expertise" (to be deleted), links to "Data Science" (should eventually be renamed), and lacks "For Journalists."
6. **Long publication lists** with no contextual framing for each section — no "why does this group of papers matter."

---

## Accessibility/plain-language issues

1. **Audio elements** (KALW radio clip, ABC radio, Talking PFAS podcast, EcoJustice Radio) have no nearby text summary or transcript link.
2. **Podcast/audio embeds** (Libsyn, Castbox, SoundCloud) lack descriptive context beyond the list item title.
3. **Video iframes** in Media page often have no text summary below them.
4. **Link text** in some places is generic: "here" (not found in page scan but watch for it), "Full text" repeated without context in long publication lists.
5. **Acronyms** (PFAS, NAMs, OEHHA, SB 1147, SCCWRP) are used without definition on all pages.
6. **No "why it matters" per publication** — the Research page is not accessible to adjacent scientists or policymakers.
7. **Long walls of citations** in Research page with no visual breaks or curated entry points.

---

## Typos/stale language/malformed links

| File | Line | Issue | Fix |
|---|---|---|---|
| `Media.md` | 91 | "Califorrnia's BIG little plastic problem" | → "California's BIG little plastic problem" |
| `Media.md` | 97 | "tocurb plastic pollution" | → "to curb plastic pollution" |
| `Media.md` | 179 | "Total = 175 as of May 25, 2022" | → Update or remove stale count; the engagement data table below is the better reference |
| `Data_Science.md` | 35 | "scheduled to launch in Summer, 2021" | → Remove stale language; ToMEx 2.0 is live; update to reflect current status |
| `Research.md` | 118 | Duplicate of line 107: both cite "Coffin, S. (2018). Plastic as a Vector..." from eScholarship | → Remove one duplicate |
| `Research.md` | 155 | Duplicate of line 104: "Coffin, S., Magnuson, J. T., ...Environmental Pollution, 263, 114617" | → Remove one duplicate |
| `_config.yml` | 97 | Author bio is entirely personal hobbies; no professional context | → Update to professional bio (details above) |

*Note: "little or not toxicology testing," "ShareMicroplastics," and "https.://doi.org/" were checked — not found in current source .md files. Those may have already been fixed or were only in archived versions.*

---

## Recommended implementation order

Following workflow §21 phase structure:

### Phase 2 (next): Fix errors and credibility blockers
- Fix typos in `Media.md` (Califorrnia, tocurb)
- Remove stale "scheduled to launch in Summer, 2021" from `Data_Science.md`
- Update or remove stale talk count ("Total = 175 as of May 25, 2022") in `Media.md`
- Remove two duplicate publication entries in `Research.md`
- Update author sidebar bio in `_config.yml` to include professional context

### Phase 3: Normalize identity
- Standardize role language to "Staff Toxicologist Specialist" (remove parenthetical notation)
- Add explanatory note about civil-service vs. public-facing titles
- Update `_config.yml` author bio

### Phase 4: Homepage restructure
- Switch homepage layout to `splash`
- Add hero, selected impact, audience pathways, featured work, values section
- Move personal hobbies line lower

### Phase 5: Research page portfolio structure
- Add curated featured publications layer with "why it matters"
- Preserve full publication list below

### Phase 6: Tools & Open Science
- Update `Data_Science.md` with tool cards (status, role, audience, links)
- Fix stale language throughout
- Add clean H1

### Phase 7: Media kit
- Create `/For_Journalists/` page
- Add curated featured media section to `Media.md` before archive

### Phase 8: Plain-language resources
- Scaffold microplastics explainer page with TODOs for Scott to review

### Phase 9: Timeline and CV highlights
- Add career timeline to About page
- Add selected impact section to homepage and/or About page

### Phase 10: Accessibility and final polish
- Add text summaries near audio/video embeds
- Improve link text
- Add institutional disclaimer to footer and About page
- Add "Expertise" page deletion + nav cleanup (workflow §10, §19)

---

*End of Phase 1 audit. No page content was edited. Awaiting confirmation to proceed to Phase 2.*
