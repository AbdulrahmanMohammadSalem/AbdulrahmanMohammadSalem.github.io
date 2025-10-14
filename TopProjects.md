---
# Grid cards are built in a for loop.
# They are filtered by the front matter key `top_project: true`
# and pulled from all site pages, then rendered as project cards with their special CSS properties inline.
title: "Top Projects"
permalink: /TopProjects/
layout: archive
---
---
- *Below are the projects that demonstrate solid understanding of important concepts, have somewhat great complexity, and overall, I feel proud of.*

{% assign arrTopProjects = site.documents | where: "top_project", true %}

<div class="entries-grid">
  {% for P in arrTopProjects %}
    <div class="grid__item">
      <article class="archive__item" itemscope="" itemtype="https://schema.org/CreativeWork">
        <div class="archive__item-teaser">
          <img src="{{ P.header.teaser | relative_url }}" style="border: {{P.css_properties.border}}; border-radius: {{P.css_properties.border_radius}};">
          <span class="overlay-text" style="color: {{P.css_properties.overlay_text_color}}; top: {{P.css_properties.top}}; left: {{P.css_properties.left}};">{{ P.overlay_text }}</span>
        </div>
        <h2 class="archive__item-title no_toc" itemprop="headline">
          <a href="{{ P.url | relative_url }}" rel="permalink">{{ P.title }}</a>
        </h2>
        <p class="archive__item-excerpt" itemprop="description">{{ P.excerpt }}</p>
        {%- if P.badge-%}
          {%- if P.badge == "OOP" -%}
            <p class="badge badge-OOP" aria-label="Object-Oriented Programming">OOP</p>
          {%- elsif P.badge == "FP" -%}
            <p class="badge badge-FP" aria-label="Functional Programming">FP</p>
          {%- endif -%}
        {%- endif -%}
      </article>
    </div>
  {% endfor %}
</div>
