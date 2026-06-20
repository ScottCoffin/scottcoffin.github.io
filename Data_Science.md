---
title: "Tools & Open Science"
description: "Open science and data tools by Scott Coffin, PhD, including Plastiverse, ToMEx, pSSD++, PFAS data tools, microplastics dashboards, and environmental health applications."
permalink: /Data_Science/
layout: splash
author_profile: true
header:
  overlay_image: /assets/images/shelterindome.jpg
  overlay_filter: 0.5
---

I build and support open tools, databases, and reproducible workflows for environmental health science. Making science accessible and reusable is a core part of how I work.

<div class="ds-stats">
  <div class="ds-stat"><div class="ds-num" data-target="10">0</div><div class="ds-label">Tools &amp; Projects</div></div>
  <div class="ds-stat"><div class="ds-num" data-target="6">0</div><div class="ds-label">Interactive Demos</div></div>
  <div class="ds-stat"><div class="ds-num" data-target="7">0</div><div class="ds-label">Years Open Science</div></div>
  <div class="ds-stat"><div class="ds-num" data-target="40">0</div><div class="ds-label">Publications</div></div>
</div>

---

<div class="filter-bar">
  <button class="filter-btn active" data-filter="all">All</button>
  <button class="filter-btn" data-filter="app">App</button>
  <button class="filter-btn" data-filter="r-package">R Package</button>
  <button class="filter-btn" data-filter="map">Map</button>
  <button class="filter-btn" data-filter="platform">Platform</button>
</div>

<div class="tool-grid">

  <div class="tool-card" data-types="platform app">
    <div class="tool-color-bar" style="--tool-color:#2a9d8f;"></div>
    <div class="tool-image">
      <img src="/assets/images/NewLogo.png" alt="Plastiverse logo">
    </div>
    <div class="tool-body">
      <div class="tool-title">Plastiverse</div>
      <div class="tool-badges">
        <span class="tbadge" style="--tool-color:#2a9d8f;">Platform</span>
        <span class="tbadge" style="background:#27ae60;">Active</span>
      </div>
      <div class="tool-desc">A live, crowd-sourced community hub for tools, databases, protocols, and knowledge exchange related to micro- and macro-plastics research. Audience: researchers, practitioners, educators, and journalists worldwide.</div>
      <div class="tool-links">
        <a href="https://www.plastiverse.org/">Project website</a>
        <a href="https://twitter.com/ThePlastiverse">Follow on X</a>
      </div>
    </div>
  </div>

  <div class="tool-card" data-types="app r-package">
    <div class="tool-color-bar" style="--tool-color:#0077b6;"></div>
    <div class="tool-image">
      <img src="/assets/images/TomexLogo.png" alt="ToMEx logo">
    </div>
    <div class="tool-body">
      <div class="tool-title">ToMEx 2.0</div>
      <div class="tool-badges">
        <span class="tbadge" style="--tool-color:#0077b6;">App</span>
        <span class="tbadge" style="--tool-color:#0077b6;">R/Shiny</span>
        <span class="tbadge" style="background:#27ae60;">Active</span>
      </div>
      <div class="tool-desc">Open-source RShiny web application with toxicity data from hundreds of peer-reviewed studies. Supports development of risk thresholds for regulatory purposes.</div>
      <div class="tool-links">
        <a href="https://microplastics.sccwrp.org/">Live app</a>
        <a href="https://github.com/SCCWRP/aq_mp_tox_shiny">Source code</a>
        <a href="https://link.springer.com/article/10.1186/s43591-025-00145-6">Paper</a>
      </div>
    </div>
  </div>

  <div class="tool-card" data-types="r-package">
    <div class="tool-color-bar" style="--tool-color:#e63946;"></div>
    <div class="tool-image">
      <img src="/assets/images/pSSD.png" alt="pSSD++ logo">
    </div>
    <div class="tool-body">
      <div class="tool-title">pSSD++</div>
      <div class="tool-badges">
        <span class="tbadge" style="--tool-color:#e63946;">R Package</span>
        <span class="tbadge" style="background:#27ae60;">Active</span>
      </div>
      <div class="tool-desc">Probabilistic ecotoxicological risk assessment framework for microplastics. Propagates uncertainty from particle diversity, laboratory variability, assessment factors, and environmental distributions.</div>
      <div class="tool-links">
        <a href="https://www.sciencedirect.com/science/article/pii/S0304389425039421">Paper</a>
        <a href="https://github.com/ScottCoffin/ToMEx2.0_EcoToxRisk/tree/main">GitHub</a>
      </div>
    </div>
  </div>

  <div class="tool-card" data-types="map">
    <div class="tool-color-bar" style="--tool-color:#457b9d;"></div>
    <div class="tool-image tool-image--photo">
      <img src="/assets/images/sfbay_riskmap.png" alt="SF Bay microplastics risk map showing sample locations and risk levels">
    </div>
    <div class="tool-body">
      <div class="tool-title">Microplastics Risk Map — SF Bay</div>
      <div class="tool-badges">
        <span class="tbadge" style="--tool-color:#457b9d;">Map</span>
        <span class="tbadge" style="--tool-color:#457b9d;">Interactive</span>
        <span class="tbadge" style="background:#27ae60;">Active</span>
      </div>
      <div class="tool-desc">Interactive map showing manta trawl sample locations and corresponding microplastic risk levels from a published risk assessment of San Francisco Bay.</div>
      <div class="tool-links">
        <a href="https://microplastics.springeropen.com/articles/10.1186/s43591-022-00037-z">Paper</a>
        <a href="https://github.com/ScottCoffin/SFBayMPRiskCharacterization/tree/Manuscript">GitHub</a>
      </div>
    </div>
  </div>

  <div class="tool-card" data-types="map">
    <div class="tool-color-bar" style="--tool-color:#264653;"></div>
    <div class="tool-image tool-image--photo">
      <img src="/assets/images/calepa_short.jpg" alt="California EPA">
    </div>
    <div class="tool-body">
      <div class="tool-title">CA Drinking Water Monitoring Map</div>
      <div class="tool-badges">
        <span class="tbadge" style="--tool-color:#264653;">Map</span>
        <span class="tbadge" style="--tool-color:#264653;">Interactive</span>
        <span class="tbadge" style="background:#27ae60;">Active</span>
      </div>
      <div class="tool-desc">Interactive map of California water systems required to monitor for microplastics — part of the world's first statewide microplastics drinking water monitoring program.</div>
      <div class="tool-links">
        <a href="https://www.waterboards.ca.gov/drinking_water/certlic/drinkingwater/docs/2022/mp-hndbk.pdf">Monitoring plan (PDF)</a>
        <a href="https://calmatters.org/environment/2022/09/california-microplastics-testing-drinking-water-sources/">CalMatters coverage</a>
      </div>
    </div>
  </div>

  <div class="tool-card" data-types="app r-package">
    <div class="tool-color-bar" style="--tool-color:#f4a261;"></div>
    <div class="tool-image tool-image--photo">
      <img src="/assets/images/PFAS.jpg" alt="PFAS datathon">
    </div>
    <div class="tool-body">
      <div class="tool-title">PFAS Datathon Tools</div>
      <div class="tool-badges">
        <span class="tbadge" style="--tool-color:#f4a261;">App</span>
        <span class="tbadge" style="--tool-color:#f4a261;">R/Shiny</span>
        <span class="tbadge" style="background:#27ae60;">Active</span>
      </div>
      <div class="tool-desc">Data tools and RShiny application for analyzing PFAS occurrence data in water — produced from a two-day datathon at the California State Water Board.</div>
      <div class="tool-links">
        <a href="https://meldataaa.shinyapps.io/PFAS_Analysis_and_Intervention/">RShiny app</a>
        <a href="https://github.com/CAWaterBoardDataCenter">GitHub</a>
        <a href="https://eartharxiv.org/repository/view/1740/">Paper</a>
      </div>
    </div>
  </div>

  <div class="tool-card" data-types="map">
    <div class="tool-color-bar" style="--tool-color:#6a4c93;"></div>
    <div class="tool-icon-panel" style="--tool-color:#6a4c93;">
      <i class="fas fa-sitemap"></i>
    </div>
    <div class="tool-body">
      <div class="tool-title">Drinking Water Treatment Visualization</div>
      <div class="tool-badges">
        <span class="tbadge" style="--tool-color:#6a4c93;">Interactive</span>
        <span class="tbadge" style="background:#27ae60;">Active</span>
      </div>
      <div class="tool-desc">Interactive collapsible tree diagram showing treatment technique hierarchies annotated with microplastics removal percentages from literature reviews.</div>
      <div class="tool-links">
        <a href="https://github.com/ScottCoffin/SamplingAndAnalysisPlan">Source code</a>
      </div>
    </div>
  </div>

  <div class="tool-card" data-types="app">
    <div class="tool-color-bar" style="--tool-color:#e76f51;"></div>
    <div class="tool-image tool-image--photo">
      <img src="/assets/images/shelterindome.jpg" alt="Shelter in Space">
    </div>
    <div class="tool-body">
      <div class="tool-title">Shelter in Space</div>
      <div class="tool-badges">
        <span class="tbadge" style="--tool-color:#e76f51;">App</span>
        <span class="tbadge" style="background:#c0392b;">&#9733; NASA Award</span>
      </div>
      <div class="tool-desc"><em>Best Mission Concept</em> at the NASA Space Apps COVID-19 Challenge (26,000+ participants, ~150 countries). A resilient community infrastructure concept built in 48 hours.</div>
      <div class="tool-links">
        <a href="https://shelterindome.com/shelter-in-space/">Project website</a>
        <a href="https://www.nasa.gov/feature/nasa-space-apps-covid-19-challenge-winners-share-stories-of-innovation">NASA interview</a>
      </div>
    </div>
  </div>

  <div class="tool-card" data-types="app">
    <div class="tool-color-bar" style="--tool-color:#e9c46a;"></div>
    <div class="tool-icon-panel" style="--tool-color:#e9c46a;">
      <i class="fas fa-robot"></i>
    </div>
    <div class="tool-body">
      <div class="tool-title">Reusable Job Scraper</div>
      <div class="tool-badges">
        <span class="tbadge" style="--tool-color:#b8860b;">Script</span>
        <span class="tbadge" style="background:#27ae60;">Active</span>
      </div>
      <div class="tool-desc">Reusable script for collecting and organizing job postings from online sources, adaptable for different search terms, roles, or scientific communities.</div>
      <div class="tool-links">
        <a href="https://github.com/ScottCoffin/Job_Scraper">GitHub</a>
      </div>
    </div>
  </div>

  <div class="tool-card" data-types="app">
    <div class="tool-color-bar" style="--tool-color:#2a9d8f;"></div>
    <div class="tool-icon-panel" style="--tool-color:#2a9d8f;">
      <i class="fas fa-chart-bar"></i>
    </div>
    <div class="tool-body">
      <div class="tool-title">COVID-19 Financial Impacts Survey</div>
      <div class="tool-badges">
        <span class="tbadge" style="--tool-color:#2a9d8f;">Analysis</span>
        <span class="tbadge" style="background:#7f8c8d;">Completed</span>
      </div>
      <div class="tool-desc">Survey design, data collection, and analysis of financial impacts of COVID-19 on California water agencies and households — statistically significant statewide sample.</div>
      <div class="tool-links">
        <a href="https://www.waterboards.ca.gov/drinking_water/programs/documents/ddwem/covid_financial_survey_report.pdf">Technical report</a>
        <a href="https://github.com/ScottCoffin/EconImpact">GitHub</a>
      </div>
    </div>
  </div>

</div>

---

## Interactive demos

<details class="demo-details">
<summary><strong>ToMEx 2.0 — App overview</strong></summary>
<div style="margin-top:1rem;">
<iframe width="560" height="315"
  src="https://www.youtube.com/embed/ymPMYkcmgDg"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
  title="ToMEx app overview video"
  loading="lazy"></iframe>
</div>
</details>

<details class="demo-details">
<summary><strong>Microplastics Risk Map — San Francisco Bay</strong></summary>
<div style="margin-top:1rem;">
<iframe src="/assets/widgets/map.html" height="500px" width="100%" style="border:none;" title="Microplastics risk map of San Francisco Bay" loading="lazy"></iframe>
</div>
</details>

<details class="demo-details">
<summary><strong>California Drinking Water Monitoring Map</strong></summary>
<div style="margin-top:1rem;">
<iframe src="/assets/widgets/map_treatment.html" height="500px" width="100%" style="border:none;" title="California drinking water treatment and microplastics monitoring map" loading="lazy"></iframe>
</div>
</details>

<details class="demo-details">
<summary><strong>Drinking Water Treatment Visualization</strong></summary>
<div style="margin-top:1rem;">
<iframe src="/assets/widgets/collapsibleTree_widget.html" height="500px" width="100%" style="border:none;" title="Drinking water treatment methods and microplastics removal rates" loading="lazy"></iframe>
</div>
</details>

<details class="demo-details">
<summary><strong>PFAS Datathon 2019 — Presentation recording</strong></summary>
<div style="margin-top:1rem;">
<iframe width="560" height="315"
  src="https://youtube.com/embed/6G0hm_US5k4?t=14455"
  frameborder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  title="PFAS Datathon 2019 presentation recording"
  loading="lazy"></iframe>
</div>
</details>

<details class="demo-details">
<summary><strong>Shelter in Space — NASA Space Apps pitch</strong></summary>
<div style="margin-top:1rem;">
<iframe width="560" height="315"
  src="https://www.youtube.com/embed/ugekHk8Jqjg"
  frameborder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  title="Shelter in Space — NASA Space Apps COVID-19 Challenge"
  allowfullscreen
  loading="lazy"></iframe>
</div>
</details>

<script>
(function () {
  function init() {
    /* Filter — delegate clicks on the container so DOM replacement can't break it */
    var filterBar = document.querySelector('.filter-bar');
    if (filterBar) {
      filterBar.addEventListener('click', function (e) {
        var btn = e.target;
        if (!btn.classList.contains('filter-btn')) return;
        var filter = btn.getAttribute('data-filter');
        filterBar.querySelectorAll('.filter-btn').forEach(function (b) {
          b.classList.toggle('active', b === btn);
        });
        document.querySelectorAll('.tool-card').forEach(function (card) {
          var types = card.getAttribute('data-types') || '';
          card.style.display = (filter === 'all' || types.indexOf(filter) !== -1) ? '' : 'none';
        });
      });
    }

    /* Animated counters */
    var counters = document.querySelectorAll('.ds-num[data-target]');
    if (!counters.length) return;
    if (!('IntersectionObserver' in window)) {
      counters.forEach(function (el) { el.textContent = el.getAttribute('data-target'); });
      return;
    }
    var animated = false;
    var observer = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting || animated) return;
      animated = true;
      observer.disconnect();
      counters.forEach(function (el) {
        var target = parseInt(el.getAttribute('data-target'), 10);
        var start = null;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / 1200, 1);
          el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target;
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.3 });
    var statsEl = document.querySelector('.ds-stats');
    if (statsEl) observer.observe(statsEl);
  }

  /* Wait until after theme JS (main.min.js) has executed */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>
