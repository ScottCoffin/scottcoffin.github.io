# Website Professionalization and Audience-Centered Content Improvement Workflow

This file is an implementation specification for an IDE coding agent working inside the repository for `https://scottcoff.in`.

The goal is **not primarily SEO**. The goal is to make the website more accurate, more useful, more professional, and more accessible to the people most likely to visit it:

1.  Researchers and collaborators
2.  Journalists and event organizers
3.  Community members and public-interest readers
4.  Policymakers, regulators, and agency staff
5.  Students and early-career scientists

The website should quickly communicate:

-   Who Scott Coffin is
-   What he knows
-   What he has done
-   Why the work matters
-   What resources are available
-   How different audiences can use the site
-   How to contact or cite him appropriately

------------------------------------------------------------------------

## 0. Core instructions for the IDE agent

### Work style

1.  Inspect before editing.
2.  Make small, reviewable changes.
3.  Preserve existing content unless explicitly instructed to move, summarize, correct, or reorganize it.
4.  Do not invent credentials, roles, affiliations, awards, publication counts, media appearances, dates, or claims.
5.  Use the CV and existing site content as source material.
6.  When uncertain, add a TODO comment or request review rather than inventing.
7.  Keep government-role boundaries clear.
8.  Prioritize clarity, credibility, accessibility, and professional presentation.
9.  Do not chase visual complexity. Use simple, maintainable Jekyll/Markdown/HTML patterns.
10. Build and inspect the site after each meaningful change.

### Content standards

The website should be:

-   Accurate
-   Plain-language where possible
-   Scannable
-   Professional but human
-   Specific rather than generic
-   Audience-oriented
-   Accessible to non-specialists
-   Useful to specialists
-   Easy to navigate
-   Easy to cite or contact

### Do not

-   Do not remove the full publication record.
-   Do not remove the personal/human elements, but do not lead with them over professional identity.
-   Do not remove open-science links.
-   Do not rewrite technical content into vague marketing language.
-   Do not create visual redesigns that depend on complex JavaScript.
-   Do not add new external dependencies unless necessary.
-   Do not change institutional affiliations without explicit evidence from the CV or existing site.

------------------------------------------------------------------------

## 1. Source material to inspect first

Before editing, inspect these site files and generated pages.

### Live/public reference URLs

Use these as references for current public content and possible issues:

``` text
https://scottcoff.in/
https://scottcoff.in/About_Me/
https://scottcoff.in/Research/
https://scottcoff.in/Expertise/
https://scottcoff.in/Data_Science/
https://scottcoff.in/Media/
https://scottcoff.in/CV.pdf
```

If any live URL returns an error, record it.

### Repository files to find

Find the source files corresponding to:

``` text
_config.yml
index.md or index.html
About page
Research page
Expertise page
Data Science page
Media page
CV page or CV PDF reference
_navigation or _data/navigation.yml
_includes/sidebar.html
_includes/author-profile.html
_includes/footer.html
_includes/head.html
_layouts/default.html
assets/images/
assets/css/ or _sass/
```

### CV extraction

Open the CV PDF and extract only stable, high-value facts for web presentation, including:

-   Current role and institution
-   Education
-   Major work history
-   Publication count
-   Presentation count, if listed
-   Key awards
-   Major regulatory/science-policy accomplishments
-   Open-science/data tools
-   Media/science communication experience

Do not manually type long CV sections into web pages. The website should interpret and summarize the CV, not duplicate it.

------------------------------------------------------------------------

## 2. Current-state audit deliverable

Before editing, create:

``` text
reports/content-professionalization-audit.md
```

If the repo has no `reports/` directory, create it.

The audit must include:

``` markdown
# Content and professionalism audit

## Pages reviewed

| Page | Source file | Live URL | Main purpose | Issues |
|---|---|---|---|---|

## Audience usefulness

| Audience | Can they quickly find what they need? | Missing or confusing elements |
|---|---|---|

## Identity consistency

| Location | Current title/role text | Recommended normalized wording |
|---|---|---|

## High-priority content gaps

## Professional/design issues

## Accessibility/plain-language issues

## Typos/stale language/malformed links

## Recommended implementation order
```

Do not edit pages until this audit is complete.

------------------------------------------------------------------------

## 3. Normalize the professional identity

### Problem to solve

The website should not present different or confusing versions of Scott’s professional role across pages.

Possible terms already present may include:

-   Staff Toxicologist Specialist
-   Staff Toxicologist (Specialist)
-   Research Scientist IV
-   Pharmacokinetics Research Scientist
-   Environmental Toxicologist
-   Microplastics Risk Scientist

These can coexist, but the site must explain them clearly.

### Recommended normalized identity

Use this as the default public-facing identity unless contradicted by the CV or user review:

``` text
Scott Coffin, PhD
Environmental Toxicologist | Microplastics Risk Assessment | PFAS & Toxicokinetics | Regulatory Science | Open Environmental Data Tools
```

### Recommended current-role language

Use this where a short current-role sentence is needed:

``` text
Scott Coffin, PhD is an environmental toxicologist at California’s Office of Environmental Health Hazard Assessment, where he works on microplastics, PFAS, toxicokinetics, computational toxicology, and risk assessment methods for emerging contaminants.
```

If the CV or current homepage clearly supports a more exact official title, use:

``` text
Current role: Research Scientist IV / Staff Toxicologist Specialist, Office of Environmental Health Hazard Assessment, CalEPA.
```

If both titles are used, explain once:

``` text
My civil-service classification is Research Scientist IV; my public-facing scientific role is Staff Toxicologist Specialist.
```

Only include that explanatory sentence if accurate. If uncertain, insert a TODO asking Scott to confirm.

### Files likely affected

``` text
index.md
About page source
Research page source
Expertise page source
_config.yml
_data/authors.yml
_includes/author-profile.html
```

### Required checks

After editing:

1.  Search generated `_site` for conflicting old role language.
2.  Ensure the old role language is either removed, historically contextualized, or clearly placed in a timeline.
3.  Do not erase prior role history.

------------------------------------------------------------------------

## 4. Redesign homepage content structure

### Goal

The homepage should answer in 10 seconds:

1.  Who is this?
2.  What does he work on?
3.  Why does it matter?
4.  Where should I click next?

### Recommended homepage structure

Implement in this order.

``` markdown
# Scott Coffin, PhD

Environmental toxicologist working on microplastics, PFAS, regulatory science, and open environmental data tools.

I develop risk assessment methods and open science tools that help governments, researchers, and communities understand emerging contaminants and make decisions under uncertainty.

[Research] [Tools & Open Science] [Media Kit] [CV]
```

Then add:

``` markdown
## Selected impact

- Helped develop California’s regulatory definition of microplastics in drinking water.
- Helped develop California’s microplastics drinking water monitoring and risk assessment frameworks.
- Developed health-based and ecological frameworks for microplastics used by California's EPA.
- Co-founded Plastiverse as a community hub for plastic pollution research.
- Built or contributed to open data tools including ToMEx, pSSD++, and PFAS data tools.
- Communicated microplastics and emerging-contaminant science through public talks, media, podcasts, and community-facing events.
```

Only use “helped develop,” “contributed to,” or similar if the exact level of leadership is not clear from the CV/site. Use stronger language only when clearly supported by the CV.

Then add:

``` markdown
## Start here

### For researchers
Find publications, methods, datasets, code, and collaboration areas.

### For journalists, event organizers, and community members
Find a short bio, areas of expertise, selected media appearances, and contact information.

###
```

Then add:

``` markdown
## Featured work

Create 3–6 cards or short sections for:
- Microplastics in drinking water
- Microplastics risk assessment
- PFAS and toxicokinetics
- Computational toxicology and NAMs
- Plastiverse / open science
- Data tools
```

Then add:

``` markdown
## Beyond work

Keep the personal line here, not at the very top:
Ecotoxicologist, rock climber, DJ, surfer, yoga instructor, dancer. 
```

Be sure the DJ link remains viable.

###  Visual implementation

Use simple Markdown/HTML cards if the theme supports them. Avoid complex CSS/JS.

A card can be:

``` html
<div class="feature__wrapper">
  <div class="feature__item">
    <h3>Microplastics risk assessment</h3>
    <p>Methods and evidence frameworks for evaluating microplastics exposure, toxicity, and risk.</p>
    <p><a href="/Research/#microplastics-risk-assessment">Explore this work</a></p>
  </div>
</div>
```

If the existing theme has Minimal Mistakes feature-row includes, use the theme-native pattern.

------------------------------------------------------------------------

## 5. Add a “How I work” / values section

### Goal

Make values explicit without sounding promotional.

### Recommended content

Add this to the homepage or About page:

``` markdown
## How I work

- **Open science where possible.** I support public access to data, tools, methods, and interpretation whenever constraints allow.
- **Regulatory relevance.** I focus on scientific work that can inform real-world environmental health decisions.
- **Transparency about uncertainty.** Emerging contaminants require decisions even when evidence is incomplete; I try to make assumptions and limitations visible.
- **Interdisciplinary collaboration.** My work connects toxicology, chemistry, exposure science, data science, policy, and public communication.
- **Plain-language communication.** Technical science should be accessible to the people affected by environmental decisions.
```

### Notes

If this appears too assertive, soften it:

``` text
My work is guided by...
```

Do not create claims about personal values beyond what the website already supports: open science, public communication, regulatory relevance, community usefulness, and collaboration.

------------------------------------------------------------------------

## 6. Create or improve audience pathway sections

### Goal

Different visitors need different routes through the site.

### Add to homepage

``` markdown
## Find what you need

### Researchers and collaborators
- Research themes
- Public talks and interviews
- Publications
- Open tools
- Code and data
- Collaboration areas

### Journalists, event organizers, community members
- Short bio
- Areas of expertise
- Headshot
- Selected media appearances
- Contact information
```

Use links to existing pages first. Create new pages only if needed.

------------------------------------------------------------------------

## 7. Create a “For Journalists” or “Media Kit” page

### Purpose

Give journalists, event organizers, and conference hosts a fast way to understand and cite Scott.

### Suggested path

``` text
/For_Journalists/
```

or

``` text
/Media_Kit/
```

Use whichever naming convention best matches the repo.

### Front matter

``` yaml
---
title: "For Journalists & Event Organizers"
description: "Short bio, areas of expertise, selected media appearances, and contact information for Scott Coffin, PhD."
permalink: /For_Journalists/
---
```

### Page content

``` markdown
# For Journalists & Event Organizers

## Short bio

Scott Coffin, PhD is an environmental toxicologist whose work focuses on microplastics, PFAS, risk assessment, toxicokinetics, computational toxicology, and open environmental data tools. He works at the intersection of regulatory science, environmental health, and public communication.

## Longer bio

Scott Coffin, PhD is an environmental toxicologist at California’s Office of Environmental Health Hazard Assessment. His work focuses on microplastics, PFAS, toxicokinetics, computational toxicology, New Approach Methodologies, and risk assessment for emerging contaminants. He previously served as a lead scientist in California’s microplastics drinking water work, including monitoring, methods, definitions, and risk frameworks. He also cofounded Plastiverse, a community hub for plastic pollution research and resources.

## Topics I can discuss

- Microplastics in drinking water
- Microplastics and human health
- Microplastics ecological risk assessment
- PFAS toxicokinetics
- Emerging contaminants
- Regulatory science and uncertainty
- Open environmental data tools
- Science-policy translation
- Plastic pollution research
- New Approach Methodologies and computational toxicology

## Selected media and talks

Link to the Media page and add 5–8 featured appearances.

## Contact

Add preferred contact method. If using email, use the same email already shown on the site.

## Disclosure

This is my personal professional website. Views expressed here are my own and do not necessarily represent the State of California, CalEPA, OEHHA, or the State Water Resources Control Board.
```

### Important

Do not expose a new email address if one is not already public on the site. Use the existing contact approach.

### Navigation

Add this page to the main nav only after it builds successfully.

------------------------------------------------------------------------

## 8. Improve the Media page

### Goal

Convert the Media page from a long archive into a useful press/talk portfolio. When it makes sense to do so, use visually-accessible cards.

### Recommended structure

``` markdown
# Media & Talks

Short intro:
I speak with journalists, students, community groups, researchers, and policymakers about microplastics, PFAS, environmental health, plastic pollution, and regulatory science.

## Featured media

Add 5–8 curated items with:
- title
- outlet/event
- date
- one-sentence relevance
- link

## Featured talks and panels

Add selected talks, panels, webinars, or keynotes.

## Full archive

Keep the existing chronological list below.
```

### Fix visible issues

Search the Media page for typos and formatting issues. Likely issues to check:

``` text
Califorrnia
tocurb
```

Fix only clear typos.

### Accessibility improvements

For audio/video embeds:

1.  Add a short descriptive summary.
2.  Link to transcript if available.
3.  If no transcript is available, add a TODO comment or “Transcript not yet available.”
4.  Ensure iframe/audio elements have accessible labels or nearby headings.

------------------------------------------------------------------------

## 9. Convert Data Science into “Tools & Open Science”

### Goal

Make the page feel like a portfolio of tools, not a text archive.

### Recommended title

``` text
Tools & Open Science
```

or

``` text
Data Science & Open Tools
```

Use a clean visible H1. Avoid visible headings like:

``` text
Data Science & Open Tools Scott Coffin, PhD
```

### Recommended structure

``` markdown
# Tools & Open Science

I build and support open tools, databases, and reproducible workflows for environmental health science, with emphasis on microplastics, PFAS, toxicology, and risk assessment.

## Featured tools

Create cards for:
- Plastiverse
- ToMEx / ToMEx 2.0
- pSSD++
- PFAS Datathon tools
- Microplastics dashboards / apps
- Other active open-source tools

Each card should include:
- one-sentence purpose
- audience
- status
- role
- links
```

### Tool card template

``` markdown
### Tool name

**Purpose:**  
One sentence.

**Audience:** Researchers, regulators, educators, community members, or data scientists.

**Status:** Active / archived / in development.

**My role:** Developer / contributor / coauthor / maintainer / organizer.

**Links:** [App](#) | [Code](#) | [Data](#) | [Paper](#)
```

### Stale language to remove

Search for time-sensitive phrases such as:

``` text
scheduled to launch
coming soon
will be available
Summer, 2021
```

Replace with current status, or add TODO if current status is uncertain.

------------------------------------------------------------------------

## 10. Delete the Expertise page

This page was made in error. delete it and remove it from the sitemap.

------------------------------------------------------------------------

## 11. Improve the Research page

### Goal

Make Research feel like a portfolio and interpretation layer, not only a bibliography.

### Recommended structure

``` markdown
# Research

My research develops tools and evidence frameworks for emerging contaminant decisions under uncertainty, with emphasis on microplastics, PFAS, toxicokinetics, computational toxicology, and open data.

## Research themes

### Microplastics health risk assessment
Plain-language summary and links.

### Ecological risk assessment and species sensitivity
Plain-language summary and links.

### PFAS and toxicokinetics
Plain-language summary and links.

### Computational toxicology and NAMs
Plain-language summary and links.

### Open data tools and evidence synthesis
Plain-language summary and links.

### Science-policy translation
Plain-language summary and links.

## Featured publications

Add 5–8 selected publications. For each:
- citation
- one-sentence “why it matters”
- link to paper
- optional code/data link

## Full publication list

Keep existing grouped bibliography below.
```

### Featured publication template

``` markdown
### Paper title

**Why it matters:**  
One sentence explaining significance to a non-specialist or adjacent scientist.

**Links:** [Paper](#) | [Code/Data](#)
```

### Known fixes to check

Search and fix:

``` text
little or not toxicology testing
```

to:

``` text
little or no toxicology testing
```

Search and fix:

``` text
ShareMicroplastics
```

to:

``` text
Share Microplastics
```

Search and fix malformed DOI strings like:

``` text
https.://doi.org/
```

to:

``` text
https://doi.org/
```

Standardize link labels:

``` text
Full text
```

instead of mixed `Full Text`, `Full text`, etc., unless style conventions differ.

------------------------------------------------------------------------

## 13. Add a career timeline

### Goal

Show the arc of Scott’s work across chemistry, environmental toxicology, microplastics, regulatory science, PFAS, data science, and public communication.

### Recommended location

About page, homepage, or a dedicated `About` section.

### Suggested timeline

Only use dates and events supported by CV/site. Ensure this looks graphically/visually appealing

``` markdown
## Career timeline

### 2009–2013: Chemistry, Spanish, and field experience
B.S. in Chemistry with a Spanish minor; national student exchange experiences and environmental science research at the University of Wyoming. Colleges attended included: Grinnell College, University of Puerto Rico (Mayaguez), Hampshire College, University of Massachusetts (Amherst), and Mt. Holyoke College.

### 2014–2018: Environmental toxicology PhD
PhD research on plastics as vectors for pollutants in estuarine and marine environments at the University of California, Riverside.

### 2019: Emerging contaminants and PFAS data work
Work on constituents of emerging concern, monitoring programs, and PFAS data science at the State Water Resources Control Board.

### 2019–2024: California microplastics drinking water work
Science and policy work on microplastics definitions, monitoring, analytical methods, and risk assessment at the State Water Resources Control Board..

### 2024–present: OEHHA risk assessment, toxicokinetics, NAMs, and microplastics health assessment
Work on microplastics, PFAS, toxicokinetics, computational toxicology, and risk assessment methods at the Office of Environmental Health Hazard Assessment (OEHHA).

### Ongoing: Open science and public communication
Plastiverse, open tools, publications, talks, media, and community-facing science communication.
```

If any date or wording is uncertain, add TODO for Scott review.

------------------------------------------------------------------------

## 14. Create a selected-impact section from the CV

### Goal

Bring the strongest CV facts onto the website without turning the website into a CV.

### Recommended section

Use on homepage and/or About page.

``` markdown
## Selected impact

- Developed or helped develop risk frameworks for microplastics in drinking water and aquatic ecosystems.
- Helped support California’s microplastics drinking water monitoring and regulatory-science work.
- Built and supported open tools for microplastics toxicity, PFAS data, and environmental health assessment.
- Published peer-reviewed research across microplastics, PFAS, ecotoxicology, toxicokinetics, and computational toxicology.
- Communicated environmental health science through conferences, public lectures, media, podcasts, and community events.
```

### Optional quantitative highlights

Only add if confirmed from the current CV:

``` markdown
- 40 peer-reviewed publications
- 11 first-author publications
- 270+ presentations
- 16 keynotes
```

If these are in the CV, they may be used. If the CV changes, update these numbers.

------------------------------------------------------------------------

## 15. Add role-boundary disclaimer

### Goal

Protect institutional boundaries while allowing a personal professional site.

### Recommended footer or About-page disclaimer

``` markdown
This is my personal professional website. Views expressed here are my own and do not necessarily represent the State of California, CalEPA, OEHHA, the State Water Resources Control Board, or any other institution with which I am affiliated.
```

### Placement

Use footer, About page, and For Journalists page.

------------------------------------------------------------------------

## 16. Visual and professionalism improvements

### Goals

Make the site feel intentional, current, and easy to scan.

### Low-risk design improvements

1.  Use clean page titles:
    -   `Research`
    -   `Expertise`
    -   `Tools & Open Science`
    -   `Media & Talks`
    -   `For Journalists`
2.  Avoid visible H1s that append “Scott Coffin, PhD” after every page title.
3.  Use cards for:
    -   selected impact
    -   featured work
    -   audience pathways
    -   tools
    -   featured publications
4.  Add short intro text to every major page.
5.  Put long lists behind curated top sections.
6.  Use consistent link labels:
    -   `Paper`
    -   `Code`
    -   `Data`
    -   `App`
    -   `Media`
    -   `CV`
7.  Avoid walls of text.
8.  Keep paragraphs under about 3–4 lines where possible.
9.  Use descriptive headings.
10. Ensure mobile readability.

### CSS guidance

If custom CSS is needed, add it in the existing site CSS/Sass structure.

Suggested card style:

``` css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.card {
  border: 1px solid #e6e6e6;
  border-radius: 0.5rem;
  padding: 1rem;
  background: #fff;
}

.card h3 {
  margin-top: 0;
}
```

Only add CSS if the theme does not already provide suitable feature/card classes.

------------------------------------------------------------------------

## 17. Accessibility and plain-language standards

### Accessibility checks

Use WCAG-informed checks:

1.  Images have meaningful `alt` text or empty `alt=""` if decorative.
2.  Links make sense out of context.
3.  Headings follow logical order.
4.  Embedded audio/video has a nearby text summary and transcript link if available.
5.  Navigation works with keyboard.
6.  Contrast remains sufficient.
7.  Do not use color alone to communicate meaning.
8.  Avoid generic link text like “here,” “click here,” or repeated “Full text” without context if possible.

### Plain-language checks

For community-facing pages:

1.  Define acronyms on first use.
2.  Use short sections.
3.  Explain “why this matters.”
4.  Separate knowns, unknowns, and open questions.
5.  Avoid overstating certainty.
6.  Provide “start here” links.

### Scientific accuracy

Do not simplify away uncertainty. Use:

``` text
What we know
What remains uncertain
What this means for decisions
```

------------------------------------------------------------------------

## 18. Typos, stale content, and consistency cleanup

### Global search targets

Search all Markdown/HTML files for:

``` text
organization.
an probabilistic
uncertanties
dathon
Ther results
Califorrnia
tocurb
little or not
ShareMicroplastics
https.://doi.org
scheduled to launch
coming soon
Summer, 2021
Full Text
Full text
click here
here
```

Fix only clear typos and stale phrasing. Do not alter publication titles unless obviously malformed in the site markup rather than the actual title.

### Link consistency

Use descriptive link text. Examples:

Bad:

``` markdown
[here](...)
[Full text](...)
```

Better:

``` markdown
[Microplastics drinking water framework paper](...)
[Full text: health-based framework for California drinking water](...)
```

For long publication lists, `Full text` is acceptable if the citation itself gives sufficient context.

------------------------------------------------------------------------

## 19. Navigation restructure

### Recommended top navigation

Use this if it fits the existing site structure:

``` text
Home
Expertise
Research
Tools & Open Science
Media
For Journalists
CV
Contact
```

If there is no Contact page, do not create one unless requested. Instead, use existing email/contact links.

### Rules

1.  Keep navigation short.
2.  Do not add pages to navigation until they build successfully.
3.  Use relative links where possible.
4.  Ensure all navigation links use `scottcoff.in` or relative paths, not `scottcoffin.github.io`.

------------------------------------------------------------------------

## 20. Build and validation after each phase

After each meaningful phase, run:

``` bash
bundle exec jekyll build
```

If the repo has `npm run diagnose`, also run:

``` bash
npm run diagnose
```

Then inspect generated `_site`:

``` bash
grep -R "scottcoffin.github.io" _site || true
grep -R "https.://doi.org" _site || true
grep -R "ShareMicroplastics" _site || true
```

Check that these pages exist:

``` text
_site/index.html
_site/Research/index.html
_site/Data_Science/index.html or equivalent renamed path
_site/Media/index.html
_site/Expertise/index.html
_site/For_Journalists/index.html
```

If a page is intentionally renamed, ensure redirects or navigation links are handled.

------------------------------------------------------------------------

## 21. Implementation phases

Implement in this order unless the audit reveals a blocking issue.

### Phase 1: Audit only

Create `reports/content-professionalization-audit.md`.

No content edits yet.

### Phase 2: Fix errors and credibility blockers

-   Broken `/Expertise/` page if present
-   `scottcoffin.github.io` internal-link leakage
-   malformed page H1s
-   obvious typos
-   malformed DOI links
-   stale tool status language

### Phase 3: Normalize identity

-   homepage
-   About
-   Research
-   Expertise
-   author sidebar
-   site config

### Phase 4: Homepage restructure

-   hero
-   selected impact
-   audience pathways
-   featured work
-   values/how-I-work
-   move personal/hobby line lower

### Phase 5: Research page portfolio structure

-   intro
-   research themes
-   featured publications
-   full publication list preserved

### Phase 6: Tools & Open Science

-   rename/reframe Data Science page if appropriate
-   tool cards
-   statuses
-   role/links

### Phase 7: Media kit

-   create For Journalists page
-   improve Media page with featured media/talks before archive

### Phase 8: Plain-language resources

-   add Microplastics Explainer
-   optionally add PFAS Toxicokinetics Explainer
-   link from homepage and Expertise

### Phase 9: Timeline and selected CV highlights

-   About page
-   homepage optional

### Phase 10: Accessibility and final polish

-   link text
-   alt text
-   headings
-   transcripts/summaries for media
-   mobile readability

------------------------------------------------------------------------

## 22. One-phase-at-a-time prompt to run after this file is added

After this file exists in the repo, the user can ask the IDE agent:

``` text
Read WEBSITE_PROFESSIONALIZATION_WORKFLOW.md. Execute Phase 1 only: inspect the repo and live/source content, then create reports/content-professionalization-audit.md. Do not edit page content yet.
```

Then:

``` text
Read reports/content-professionalization-audit.md and WEBSITE_PROFESSIONALIZATION_WORKFLOW.md. Execute Phase 2 only. Make minimal fixes for broken pages, obvious typos, malformed links, bad H1s, stale wording, and canonical/internal-link leakage. Build and report the diff.
```

Then:

``` text
Execute Phase 3 only: normalize professional identity across the site using source-supported wording. Build and report changed files.
```

Continue phase by phase.

------------------------------------------------------------------------

## 23. Final report format

After all selected phases, create:

``` text
reports/content-professionalization-final-report.md
```

Use this format:

``` markdown
# Website professionalization final report

## Files changed

| File | Purpose of change |
|---|---|

## Content improvements

## Professional identity improvements

## Audience pathway improvements

## Research/tool/media improvements

## Accessibility/plain-language improvements

## Remaining TODOs for Scott

## Build result

## Pages to review manually

- [ ] Homepage
- [ ] About
- [ ] Expertise
- [ ] Research
- [ ] Tools & Open Science
- [ ] Media
- [ ] For Journalists
- [ ] CV link
- [ ] Microplastics Explainer
- [ ] PFAS Toxicokinetics Explainer, if created
```

------------------------------------------------------------------------

## 24. Definition of done

This workflow is complete when:

1.  The homepage clearly communicates Scott’s professional identity and why the work matters.
2.  The site includes audience-specific pathways.
3.  The Research page has a curated interpretive layer before the full bibliography.
4.  The Data Science/Tools page presents tools as a portfolio with status, role, audience, and links.
5.  The Media page has featured items before the archive.
6.  A For Journalists page exists or the Media page includes an equivalent media-kit section.
7.  Community-facing explainers exist or are scaffolded with TODOs.
8.  The CV’s strongest claims are reflected accurately but not duplicated in full.
9.  All major pages have clean H1s and short intros.
10. Obvious typos and stale wording are fixed.
11. Accessibility basics are improved.
12. The site builds without errors.
13. Remaining uncertain claims are marked for Scott review rather than invented.