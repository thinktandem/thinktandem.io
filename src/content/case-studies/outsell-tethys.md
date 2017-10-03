---
title: "Legacy Tech Rescue"
layout: layouts/case-study.html
logo: images/clients/outsell/outsell.png
org: Outsell Inc
permalink: true
private: false
byline: We helped <strong>Outsell Inc.</strong> eliminate dependency on a third-party vendor by creating a new <strong>Laravel</strong>-powered API to feed an ecosystem of <strong>Drupal</strong> sites.
slug: outsell-legacy-rescue
dark: false
background: 8CC63E
date: 2016-09-23

image:
  src: /images/case-studies/osdata.png
  title: OSData Page Screenshot
challenge: Remove Outsell's dependency on a costly and limiting third-party API.
solution: Use the Laravel-powered DreamFactory API with custom Drupal modules to distribute data.
impact: Eliminate a costly ongoing contract and allow Outsell to pursue new development directions with in-house resources.
quote:
  content: Tandem helped us take back control of our Intelligence Platform, opening up new ways to better serve our clients.
  author: Ben Sampson, Head of Product
metrics:
  - key: Plug-and-play API
    value: DreamFactory
  - key: Content Migrated
    value: 30K+ articles
  - key: Powered Content Management
    value: Drupal

tech: drupal, laravel
industries: startups, corporate
services: rescue, strategy, development, devops
---

Ben Sampson had a problem. As Head of Product, Ben is in charge of Outsell’s Intelligence Platform, where clients can browse the treasure trove of Outsell’s research data. However, while functional, the Intelligence Platform relied upon a proprietary platform from a 3rd party vendor, which made it hard to add new features and troubleshoot issues.

With mere months until the vendor’s contract expired, the clock was ticking: should Outsell renew the contract, or investigate other options?

Fortunately, Tandem had a plan. In our analysis, we found that Outsell relied upon their external vendor for two primary services: a Salesforce integration that helped them authenticate users and an API that provided access to Outsell's powerful research database. After replacing the convoluted Salesforce-tied login with [Auth0](./outsell-auth0.md), we chose to expose Outsell’s primary PostgresDB via a DreamFactory API. Working in concert with Outsell's development team, we refactored the Intelligence Platform to pull data from this new API.

With time for rigorous QA, we were well-prepared when D-Day came and the old 3rd-party vendor turned off its Outsell-related services. Outsell was now running on its own software that was maintainable by its in-house software team. More importantly, Ben was free to start driving Outsell’s digital growth with a free hand.