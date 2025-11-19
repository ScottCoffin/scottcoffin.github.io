---
title: "Repositories"
permalink: /Repositories/
layout: splash
author_profile: true
header:
  overlay_image: /assets/images/pinnacles.jpg
  overlay_filter: 0.5 #opacity
classes: wide
toc: false
description: "A curated collection of open-source work and live dashboards."
render_with_liquid: true
---

I strongly believe in the power of open source code and open data to reducing barriers to affecting positive change. As a vocal proponent of government transparency and efficiency, I strive to practice what I preach, and release as much code/data as is allowable for my scientific projects. This page provides links to some projects for which I am proud to be able to make public. If you would like to become more familiar with GitHub and making your code open, please check out [a training](https://www.researchgate.net/publication/397773417_GitHub_101_with_a_heavy_focus_on_R) I've put together.

{% if site.data.repositories.github_users %}

## GitHub Profiles

I am a firm believer in owning our work - including showing how we could do better. Therefore, an auto-generated report card for my GitHub profile is shown below. While I don't entirely agree with the algorithm used to generate this score, and hold myself to a high degree of excellence and accountability for my work, I appreciate the transparent nature that it provides and that it reflects some aspects of my contributions.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for user in site.data.repositories.github_users %}
    {% include repository/repo_user.liquid username=user %}
  {% endfor %}
</div>

---

{% endif %}

{% if site.data.repositories.github_repos %}

## Featured Repositories

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.repositories.github_repos %}
    {% include repository/repo.liquid repository=repo %}
  {% endfor %}
</div>

{% else %}

> Update `github_repos` inside `_data/repositories.yml` to showcase specific projects.

{% endif %}
