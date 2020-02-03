---
layout: layouts/article.html
title: "Drupal 8 Performance Tips and Tricks for 2020"
tags: development, drupal
permalink: true
seo:
  description: byline
  keywords: tags
author: John Ouellet
private: false
mainImage: images/articles/d7-d8.jpg
img-src: images/articles/d7-d8.jpg
byline: Outlining some of the tried and tested Drupal 8 (will apply to Drupal 9) methods and that we have adopted over the past few years.
date: 2020-02-03
---

## Overview

I have really enjoyed how much easier Drupal 8 is to make it performant compared to its predeccors.  Not all the tips and tricks I used in Drupal 7 and below can be migrated up to Drupal 8 either.  In actuality, most are not needed.  Since building my first Drupal 8 since in 2015, here are some easy performance wins for sites of all sizes to adpot and make your user experience that much better.

## Get a better host

Before I dive into code, benchmarking, etc, the first item on your checklist should be to evaluate your hosting.  When it comes to Drupal 8 specific hosting, you should stick with the 3 major hosting options: platform.sh, Pantheon, or Acquia.  These 3 hosting providers were created with the sole purpose of making your Drupal hosting experience as easy and as performant as possible.  Here at Tandem, we mainly use platform.sh as a Drupal 8 host and Pantheon as our secondary.  

The reason why we choose platform.sh as our primary is we do more than Drupal here at Tandem.  Their multi app structure makes it easy to do decoupled Drupal and other non Drupal based architecture.  Another reason why we choose platform.sh over others is their build and deploy setup is catered to a composer based solution like Drupal 8.  Their setup is almost a mirror to Lando, a well known local dev solution created and primarily maintained by Tandem.   On top of this, they have performance tools like Redis that are readily available on all subscription levels.  

If you are a Drupal only based shop without such a robust devops flow, I highly recommend you use Pantheon.  We have been partners with Pantheon since they started.  They have a very hands off approcah to the whole hosting experience.  They simplify the entire hosting experience.  As long as your site is built fairly within the Drupal best practices, this is an automatic performacne win for you.  

### NGINX vs APACHE

This quote summazises how I fell about the comparision:

> “Apache is like Microsoft Word. It has a million options but you only need six. NGINX does those six things, and it does five of them 50 times faster than Apache.” - [Chris Lea](https://chrislea.com/)

If you use Pantheon or platform.sh, they use NGINX out of the box.  No need to configure it out do anything out of the norm.  I have spoken.

### Database Choice

We suggest using MariaDB vs MySQL.  MariaDB is just faster.  Instead of getting into the nitty gritty of why, here is a post by [MariaDB](https://mariadb.com/resources/blog/why-should-you-migrate-from-mysql-to-mariadb/) and [Pantheon](https://pantheon.io/blog/using-mariadb-mysql-replacement) on their advantages over MySQL.  Pantheon obviously comes with MariaDB out of the box.  With platform.sh you can [switch out the database type](https://docs.platform.sh/configuration/services/mysql.html) easily in your .platform.app.yml.