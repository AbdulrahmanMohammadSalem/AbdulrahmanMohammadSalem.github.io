---
# Grid cards are built in a for loop.
# They are filtered by the front matter key `top_project: true`
# and pulled from all site pages, then rendered as project cards.
title: "Top Projects"
permalink: /TopProjects/
layout: archive
classes: wide
author_profile: false
sidebar:
  nav: "side_nav"
---
---
- *Below are the projects that demonstrate solid understanding of important concepts, having somewhat great complexity, and overall, I feel proud of.*

<div class="entries-grid">
  {% assign top_projects = site.documents | where: "top_project", true %}

  {% for P in top_projects %}

    <div class="grid__item">
      <article class="archive__item" itemscope="" itemtype="https://schema.org/CreativeWork">
        <div class="archive__item-teaser">
          <img src="{{ P.header.teaser | relative_url }}" alt="">
          <span class="overlay-text">{{ P.overlay_text }}</span>
        </div>

        <h2 class="archive__item-title no_toc" itemprop="headline">
          <a href="{{ P.url | relative_url }}" rel="permalink">{{ P.title }}</a>
        </h2>

        <p class="archive__item-excerpt" itemprop="description">{{ P.excerpt }}</p>
      </article>
    </div>
  {% endfor %}
</div>
