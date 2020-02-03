---
layout: layouts/article.html
title: "Drupal 8 Performance Tips and Tricks for 2020"
tags: development, drupal, support
permalink: true
seo:
  description: byline
  keywords: tags
author: John Ouellet
private: false
mainImage: images/articles/drupal.jpg
img-src: images/articles/drupal.jpg
byline: Outlining some of the tried and tested Drupal 8 (will apply to Drupal 9) methods and that we have adopted over the past few years.
date: 2020-02-03
---

## Overview

I have really enjoyed how much easier is to make Drupal 8 performant compared to its predecessors.  Not all the tips and tricks I used in Drupal 7 and below can be migrated up to Drupal 8 either.  In actuality, most are not needed.  Since building my first Drupal 8 since in 2015, here are some easy performance wins for sites of all sizes to adopt to make your user's experience that much better.

## Get a better host

Before I dive into code, benchmarking, etc, the first item on your checklist should be to evaluate your hosting.  When it comes to Drupal 8 specific hosting, you should stick with the 3 major hosting options: [platform.sh](https://platform.sh/), [Pantheon](https://pantheon.io/), or [Acquia](https://www.acquia.com/).  These 3 hosting providers were created with the sole purpose of making your Drupal 8 hosting experience as easy and as performant as possible.  Here at Tandem, we mainly use platform.sh as a Drupal 8 host and Pantheon as our secondary.  

The reason why we choose platform.sh as our primary is we do more than Drupal here at Tandem.  Their [multi app](https://docs.platform.sh/configuration/app/multi-app.html) structure makes it easy to do decoupled Drupal and other non Drupal based architecture.  Another reason why we choose platform.sh over others is their build and deploy setup is catered to a composer based solution like Drupal 8.  Their configuration is almost a mirror to Lando, a well known local dev solution created and primarily maintained by Tandem.   On top of this, they have performance tools like Redis that are readily available on all subscription levels.  

If you are a Drupal only based shop that doesn't need such a robust devops flow, I highly recommend you use Pantheon.  We have been partners with Pantheon since they started.  They have a very hands off approach to the whole hosting experience.  They simplify the entire hosting experience.  As long as your site is built fairly within the Drupal best practices, this is an automatic performance win for you.  

### NGINX vs APACHE

This quote summarizes how I fell about the comparison:

> “Apache is like Microsoft Word. It has a million options but you only need six. NGINX does those six things, and it does five of them 50 times faster than Apache.” - [Chris Lea](https://chrislea.com/)

If you use Pantheon or platform.sh, they use NGINX out of the box.  No need to configure it out do anything out of the norm.  I have spoken.

### Database Choice

We suggest using MariaDB over MySQL.  MariaDB is just faster.  Instead of getting into the nitty gritty of why, here is a post by [MariaDB](https://mariadb.com/resources/blog/why-should-you-migrate-from-mysql-to-mariadb/) and [Pantheon](https://pantheon.io/blog/using-mariadb-mysql-replacement) on MariaDB advantages over MySQL.  Pantheon obviously comes with MariaDB out of the box.  With platform.sh you can [switch out the database type](https://docs.platform.sh/configuration/services/mysql.html) easily in your ```.platform.app.yml```.

## Caching

Now that you have chosen your path to a better hosting provider, it is time to get your hands dirty.  Caching is basically how your page is stored in either the browser or server to efficiently and quickly serve it to your site's visitors.  Drupal has always been very good about having numerous caching modules to use on top of its very cache friendly core code.  Here are my suggestions for easy cache wins for your Drupal 8 site:

### Core Modules

As mentioned above, Drupal 8 comes with a few caching modules in core.  These are no brainer wins to turn on and make the magic happen.

**Internal Page Cache**

If you are not serving dynamic or per session pages (like a shopping cart), then turning on this module is a must for all other sites.  This [drupal.org reference](https://www.drupal.org/docs/8/administering-a-drupal-8-site/internal-page-cache) goes into more depth on how and why to use this module.

**Internal Dynamic Page Cache**

Almost identical to the Internal Page Cache, however this module is used for authenticated (or logged in) users.  Again, here is a [drupal.org reference](https://www.drupal.org/docs/8/core/modules/dynamic-page-cache/overview) that foes into more details on the module.  

**BigPipe**

BigPipe has been in core since Drupal 8.3.  Basically it uses placeholders to store parts of your pages.  When the content is updated, only the placeholders that reflect those content changes will be streamed while the rest of the page is cached.  While I personally don't fully understand the whole technical aspect of this, [this drupal.org overview explains it much better](https://www.drupal.org/docs/8/core/modules/big-pipe/overview).  No configuration is needed, it just works out of the box.  

**Bandwidth Optimization aka CSS/JS Aggregation**

Not a core module, but 2 options that come with Drupal 8 out of the box.  Just head over to ```/admin/config/development/performance``` and turn these CSS and JS  Aggregation options on.

### Contrib Modules

There are so many contrib caching modules out there.  The following list is what I have used to win the performance game.  I am sure there are a few I have missed or just don't know they exist.  In Drupal 8, you don't need much as far as contrib modules go.  However, at every con and camp, I am always headed to the performance based talks to see if I can add to my list.  

**Sessionless BigPipe**

As the [module's page states](https://www.drupal.org/project/big_pipe_sessionless), we used this module because uses BigPipe to accelerate the first unpersonalized response.  Since we use Internal Page Cache and BigPipe, it makes the most sense to use this module with out setup and I recommend it for yours as well.

**Advanced CSS/JS Aggregation**

Depending on the build of a site, we use the [advagg module](https://www.drupal.org/project/advagg) and its submodules in different ways.  Typically on most sites I usually just enable the base module and the bundler and that is it.  This is a very robust module with years worth of documentation on how and when to use this module.  

### Other Cache Considerations

**Redis or Memcache**

Our preferred object cache has always been [Redis](https://redis.io/).  If you use Pantheon, it is theirs as well.  On platform.sh you can choose either one.  We have found (as have others) that Redis is a more performant option.  My advice is to just use Redis.  You can also read this [Medium post on the comparison between the two](https://medium.com/@Alibaba_Cloud/redis-vs-memcached-in-memory-data-storage-systems-3395279b0941) for more clarity.  

**Quicklink**

[Quicklink](https://www.drupal.org/project/quicklink) uses [Google Chrome Lab's Quicklink library](https://github.com/GoogleChromeLabs/quicklink) to make pages loading faster by prefetching certain links.  Another technology I don't have a full understanding of, but it does work and makes pages load very fast.  Check it out, another quick win with no configuration needed.  

**CDN**

It is an absolute must to use a Content Delivery Network to make your site serve users fast and efficiently.  There are many choices, but the most popular are [CloudFlare](https://www.cloudflare.com/) and [Fastly](https://www.fastly.com/).  Pantheon uses Fastly out of the gate, so there is no configuration needed.  We use CloudFlare for all out sites on platform.sh because their free plan is just straight up legit.  Here is a handy reference on [setting up your Cloudflare instance to work with your Drupal 8 site](https://support.cloudflare.com/hc/en-us/articles/115002911927-Caching-HTML-with-Drupal).

## Image Optimizations

Websites today are chalk full of images.  It is very rare to not see a site built this way.  Images can be huge and resource hogs unless you handle them correctly.  Drupal 8 core and contrib modules allow us to render images efficiently and quickly to our end users. 

**Responsive Images and Image styles**

Drupal has had image styles as part of core for quite sometime.  It is an easy way to effectively appropriate sized images throughout your site.  Now in Drupal 8, the [responsive images module is in core](https://www.drupal.org/docs/8/mobile-guide/responsive-images-in-drupal-8) which allows you to render images within the [HTML5 picture tag](https://www.w3schools.com/tags/tag_picture.asp).  To get rolling with this module, you need to [setup breakpoints in your theme](https://www.drupal.org/docs/8/theming-drupal-8/working-with-breakpoints-in-drupal-8) and then generate image styles that will be used in those breakpoints.  Here is a [handy reference from Promet Source](https://www.prometsource.com/blog/how-set-responsive-images-drupal-8) that gives you the blow by blow on how to set it all up.

Simple, only take a couple minutes per style and the performance gains are amazing.  I see a lot of sites that will have 2 image styles, one for desktop and one for mobile.  Sometimes that is all you need, but you can legit have image styles for every breakpoint.  

**Image Optimize + reSmush.it**

[Image Optimize](https://www.drupal.org/project/imageapi_optimize) is a module that allows you to link up to other image optimizations to reduce the size of your images.  [Lossy and Loosless](https://www.keycdn.com/support/lossy-vs-lossless) are the compression standards these days.  You can achieve this compression through a variety of tools out there.  Most image optimizations require the software to be installed on the server in order to work right.  This is why I recommend [reSmush.it](https://resmush.it/) as it is an external service that does this all for you.

There is a [Drupal 8 module](https://www.drupal.org/project/imageapi_optimize_resmushit) that allows you to setup an Image Optimize pipeline and use it on your image styles.  It is incredibly simple to use and the performance gains are amazing.  

**Lazy Loading**

A quick summation of lazy loading is using a very small placeholder for an image that is outside of a site's current view.  When you scroll down, the lazy loading mechanism switches that placeholder for the actual image.  This allows for a smaller initial page download size which equates to more speed.

I have been using the [Lazy module](https://www.drupal.org/project/lazy) for quite sometime.  Prior to their 3.x release, they used [Blazy](http://dinbror.dk/blazy/) for lazy loading.  Since 3.x they switched to [lazysizes](https://github.com/aFarkas/lazysizes).  Either version allows for easy site wide configuration for all media types.  You can also easily edit image templates to accommodate for the respective lazy loading library as well.  I personally prefer Blazy but one day I will check out their 3.x versions.  This is a must have module on your site.

## Other considerations

### PHP

Always use the latest version of PHP your host supports.  PHP gets faster and faster with every minor version.  Right now 7.3 is the hotness and all your Drupal 8 sites should be on it.  

Also, write efficient and good code.  When you are writing custom modules, always take into the consideration how long it takes something to process this info.  Don't just slap code together and think, well this works.  That's great, but does it work well?  Also, use [PHPStorm](https://www.jetbrains.com/phpstorm/) and get the [PHP Inspections ​(EA Extended)](https://plugins.jetbrains.com/plugin/7622-php-inspections-ea-extended-) plugin.  It will make you a better Drupal programmer in general.  

### JS

Less is more is my philosophy here.   Always question why you are adding another JS library to does XYZ on your site.  Can CSS do it, can it be done another way.  If you do use JS, try to use vanilla JS as much as you can.  JQquery is great, but it adds another 100kb or so to your page loads.  

We use bootstrap and a lot of the times, we don't even need the whole JS library.  If we aren't using anything but the menu toggle, we have a quick JS snippet for that.  It is 5 lines long.  If you need more of the Bootstrap plugins, check this [Native JS alternative](https://github.com/thednp/bootstrap.native/) out instead.  You can use this method of thinking for whatever framework you mainly use as well.

### CSS

We have been using SASS based solutions for years.  If you use Grunt, Gulp, or Webpack, make sure you are compiling and minifying your CSS as efficiently as possibly.  There are so many tools out there to do this.  Also, remove Drupal 8 libraries you don't need from your subtheme.  Most of the time you don't need half the stuff that Drupal 8 core and contrib theme's come with.  

Use this [Libraries Overrides](https://www.drupal.org/docs/8/modules/decoupled-blocks-vuejs/override-javascript-libraries) guide to strip out unused libraries by using the value of false next to their key.  Just like JS, the more efficiently you use CSS, the better.

## Conclusion

I am sure there is a thing or two I missed.  I am always looking for new ways to easily make our sites as fast as possible.  If you want a great start state that comes with a lot of the tips I suggested, checkout our [Minimis Distro](https://github.com/thinktandem/minimis).  Everything I used in some shape or form is in this distro from the get go.  

If you need an help with making your Drupal 8 site as performant as possible, fill out the form below and we can talk.
