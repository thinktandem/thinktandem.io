---
layout: layouts/article.html
title: "Debugging with New Relic, Blazemeter, strace & more"
tags: development
permalink: true
author: John Ouellet
private: false
mainImage: images/articles/wordpress-performance-essentials.jpg
img-src: images/articles/wordpress-performance-essentials.jpg
byline: This is a start to finish mini case study surronding a site crashing bug.  I will detail how I found the problems and then how I fixed them.
date: 2017-11-22
---

issue
--------

explain the site crashing bug.


Talk about strace and menu_rebuild
--------------------------------

Identifying the initital issue that was causing the crash after a module was pushed (we hadnt pushed up modules in a while, just quick fixes, etc).  Talk about how it worked ok on dev and staging, but not on live.  There was an issue when the site was under heavy load.  tarcking code module patch, etc.  Talk about how we moved the Redis cache for the menu to drupal.

Hint around it really wasn't it.


Blazemeter & New Relic
--------------------------

Talk about what I did and how we tested things with pics.  Talk about the caching fixes and what modules I used.


Cloudfront Issues
-----------------

Talk about how we thought everything was good, then we enabled another module on live and it went down again.  Talk about how cloudfront mobile detection kept getting stuck in its own cache, which is annoying.  Talk about how the site would get "stuck" after cloudfront would time out, etc.  Talk about how we moved it to CloudFlare and all the issues went away.


Mobile switching issue & page caching.
----------------

Talk about the long journey to figure this out, honeypot, custom code to disable page caching, the core patches, etc.  using cloudflare, etc.


cache_form
------

Talk about how the sites cache_form got huge and how I fixed it using an idea from OptimizeDB, but not the whole thing.  How to run cron with elysa_cron on platform or with easycron. etc.


Conclusion
----------

Talk again about how simple this all is and in the next step we talk about how we are designing this with the 4 modules, etc.
