---
title: "Auth0 SSO FTW"
logo: images/clients/outsell/outsell.png
org: Outsell Inc
byline: We helped <strong>Outsell Inc.</strong> move from a legacy SSO provider to Auth0 while reducing the complexity of their authentication logic and providing a tight Salesforce integration.
image:
  src: /images/case-studies/outsell-auth0.png
  title: Outsell Login Interface
challenge: Replace a legacy SSO provider and unify Salesforce driven auth logic from many clients into a single pipe.
solution: Move from legacy SSO provider to Auth0 and set up custom rules to handle the Salesforce auth in a single place for all clients.
impact: Cheaper and better maintained SSO solution, unified and well tested auth logic that is shared across clients old and new.
quote:
  content: "Where there is unity there is always victory."
  author: Publilius Syrus
metrics:
  - key: Users
    value: 65,000+
  - key: Clients Apps
    value: 5
  - key: Testing Coverage
    value: 100%

tech: nodejs, drupal
industries: startups, corporate
services: strategy, rescue

background: 8CC63E
layout: layouts/case-study.html
slug: outsell-auth0
dark: false
permalink: true
private: false
date: 2017-03-24
---

Outsell Inc. was looking to migrate from a costly, proprietary and hard-to-maintain single sign on solution. They also wanted to get into a position where it was much easier to both alter existing web properties and introduce new ones.

After an extensive discovery and audit of Outsell's existing web properties we were able to come up with 3 major strategic pivots to best satisfy Outsell's immediate and long term goals.

1. **Migrate to [Auth0](https://auth0.com/)** - This provided a significant reduction in cost and maintenance while also increasing the stability, performance, testability and flexibility of their auth pipeline.
2. **Consolidate authorization logic** - This reduced the overhead of maintaining Salesforce driven authorization logic on a per-client basis in favor of a single and consistent authorization pipeline that could be ingested immediately by *any* client without massive set up costs.
3. **Write test suite** - This provided the dual benefit of limiting the introduction of bugs into a *SUPER BUSINESS CRITICAL* part of Outsell's tech stack and providing a mechanism to easily diagnosis and banish any bugs that do slip through the cracks.

The benefits of this engagement were immediately obvious when we built Outsell's [Data Platform](./work/outsell-osdata) and were able to immediately hook into their authorization pipeline.
