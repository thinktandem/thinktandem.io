---
layout: layouts/article.html
title: "Goodbye Virtualbox: Kalabox 2.1.1"
tags: localdev, strategy, support, testing
permalink: true
author: Mike Pirog
private: false
mainImage: images/articles/digital-agency-onboarding-with-kalabox/pairodime_x_kalabox.png
img-src: images/articles/digital-agency-onboarding-with-kalabox/pairodime_x_kalabox.png
teaser: With our newest version of Kalabox, we say goodbye to Virtualbox and hello to better performance and stability with Docker for Mac and Windows.
date: 2016-11-08
---

Oh Virtualbox, we knew you well.

At first you were a friend: you gave us the ability to install a standardized Linux environment on any type of machine. You made Kalabox a cross-platform solution when other local development tools stood stodigly by their OS of choice.

But at the end, things got tough. Your age was starting to show. We never could optimize your filesharing scheme satisfactorily, and the extra layer of complexity you introduced drove us mad.

It was time to say goodbye.

## What's new in Kalabox 2.1.x?

Kalabox 2.1.x marks our transition from using Virtualbox on Mac and Windows to run Docker containers (Linux Kalabox has run Docker natively for some time). This upgrade has vastly reduced the amount of system resources Kalabox requires (my computer went from 40%+ to ~5% CPU usage) and increased the filesharing performance dramatically. If you ever felt like your computer was going to take off while using Kalabox or were getting tired of refreshing your browser to see a change propagate, then you should love this new version.

## But isn't Docker for Mac/Windows REALLY slow?

Filesharing has been a HUGE problem on Docker for Mac and Windows. Despite the hype of these tools being "native" Docker solutions, both Docker for Mac and Windows are essentially wrapping Docker in a tiny virtual machine. Just search "Docker for Mac filesharing speed" on Google and you'll see many reports of developers trying to run large applications (like stock Drupal or Wordpress) with great frustration on Docker for Mac.

Fortunately, we bring more than two years of experience tackling virtual filesharing problems to the table.

On Mac, we're using Unison to receive filesharing events from Docker for Mac. This has lead to near-native filesyncing speeds.

On Windows, we're 



Before we go too far: if you use Kalabox and have no idea what Virtualbox is, good. We made Kalabox to allow you to ignore these technical details and focus on your job/passion/divine mission: making awesome websites. Just download the newest Kalabox version and follow the updating instructions.

Don't even know what Kalabox is? Checkout the [project page](http://www.kalabox.io).

## 

