---
title: "Repositories"
permalink: /Repositories/
layout: single
author_profile: true
classes: wide
toc: false
description: "A curated collection of open-source work and live dashboards."
render_with_liquid: true
---

I keep the work that powers my talks, dashboards, and applications on GitHub. This page mirrors the structure of the al-folio repositories page, pulling live cards directly from GitHub Readme Stats so the stars, forks, and descriptions stay up to date without extra maintenance. Update `_data/repositories.yml` whenever you want to feature a different profile or repo.

{% if site.data.repositories.github_users %}

## GitHub Profiles

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
