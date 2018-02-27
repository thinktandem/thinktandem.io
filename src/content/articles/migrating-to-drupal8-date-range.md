---
layout: layouts/article.html
title: "Migrating to a Drupal 8 Date Range"
tags: development, drupal
permalink: true
seo:
  description: byline
  keywords: tags
author: John Ouellet
private: false
mainImage: images/articles/migrate-dates.jpg
img-src: images/articles/migrate-dates.jpg
byline: Migrating a date range to Drupal 8 is a lot easier now than it was a year ago.  Below I will show you hwo to transform the data to get the date ranges to migrate to Drupal 8 properly.
date: 2018-02-08
---

The Situation before us
---------------------

Right now we are using the [Migrate Source CSV](https://www.drupal.org/project/migrate_source_csv) module to handle the migration.  In the CSV that we used, dates were exported form the old site as Unix timestamps.  Which worked great for single date migration in Drupal 8.  Our date ranges though were showing up like this in the CSV:

```bash
1285905600 to 1317355200
```
So this would cause the migration to implode when we tried to move the date tanges over.  We needed to transform the data before it
