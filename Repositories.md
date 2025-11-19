---
title: "Repositories"
permalink: /Repositories/
layout: single
author_profile: true
classes: wide
toc: false
description: "A curated collection of open-source work and live dashboards."
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

{% if site.repo_trophies.enabled %}
{% for user in site.data.repositories.github_users %}
{% if site.data.repositories.github_users.size > 1 %}
### {{ user }}
{% endif %}
<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% include repository/repo_trophies.liquid username=user %}
</div>

---

{% endfor %}
{% endif %}
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
