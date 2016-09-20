---
layout: layouts/article.html
title: "From Kalabox, With Love"
tags: deployment, docker, hosting, localdev, misc, scaling, strategy, support, training, testing
permalink: true
author: Alec Reynolds
private: false
mainImage: images/articles/kalabox-released.png
img-src: images/articles/kalabox-released.png
teaser: The short story of Kalabox and a thank-you to all the people who have helped us create a great open-source solution for Drupal and WordPress developers.
date: 2016-09-20
---

The Kalabox project has been more than two years in the making, and there are more than a few people who have stuck with us through the entire lifecycle. Whether you remember the Vagrant-powered Kalabox 1.0 or were excited to try out a new Docker-powered solution when you first heard about Kalabox 2.0, this article is a thank-you for your support and help in getting us to a formal 2.0 release of Kalabox.

Aside: if you've never heard of Kalabox, I suggest checking out our [blog post](blog/2016/09/20/rejoice-kalabox-2-0-released) detailing our release of Kalabox 2.0.

## Early Days

Back in 2012, Mike Pirog, the lead of the Kalabox project, started working on a Vagrant-powered stack to help onboard new developers. Having just founded the digital agency [Kalamuna](http://www.kalamuna.com), Mike and his business partners were excited to have an innovative solution to this issue.

Kalabox was introduced to the world at the 2013 Bay Area Drupal Camp (BADCamp). Kalamuna co-founder Andrew Mallis had crafted artful bamboo keychain that bore the new Kalabox logo (which we still use today) and a code to download the new product.

I remember people being excited about the new product: could there really be a better way to develop PHP sites than using MAMP, baking a Vagrant environment, or downloading some Homebrew solution that broke in two months? We started amassing a small group of followers.

## Issues with Kalabox 1.0

Unfortunately, the architecture of 1.0 was fragile. The Virtual Machine environment which all of the Kalabox sites ran within was too open-ended. Users often made customizations which might break integration with the Kalabox GUI. In addition, there were steep challenges to introducing the product on Windows and Linux platforms.

It was clear that Kalabox needed to be re-thought.

## Kickstarter and Kalabox 2.0

Around this time in 2014 Docker technology was rapidly maturing. Its ability to standardize application infrastructure made creating and destroying site environments trivial: perfect for a local development environment.

To fund the project, Kalamuna executed a Kickstarter project. The entire team did a great job and thanks to the support of hundreds of organizations and individuals, Kalabox had some "seed money" to start developing with.

## Chasing Docker + Technical Challenges

Bolstered by the support of the community, development on Kalabox 2.0 began apace.

In retrospect, perhaps our enthusiasm was misplaced. The Docker technology we were developing with was maturing so rapidly that we would finish a Kalabox feature, only to find that a similar feature would be included with Docker's core technology in their next release. Eventually such features as a complex orchestration layer and app description system would be replaced by core Docker technologies like Docker Compose.

As we encountered technical problems, project cost began to mount. We hired an additional developer to help with difficult features, but with the increase in scope and burnrate, the Kickstarter funds were quickly exaughsted. When Kalamuna was forced to foot the bill, it was clear that this promising open source project was starting to hamper the growth of a digital agency that had grown from 3 like-minded friends to a payroll of 15 web professionals. Faced with the prospect of delaying deserved raises and hiring new team members, Kalamuna made the hard choice to separate Kalabox into its own company.

## Kalabox Inc.

Fortunately, the nascent Kalabox organization (yes, there is a Kalabox, Inc!) found two willing pilots: Mike continued his role as Kalabox's lead developer, and I joined him to find a sustainable funding strategy for the project.

We quickly rejected a few "quick money" schemes for Kalabox: we wouldn't change the licensing to "closed source", nor would we charge for features that we felt were promised to our original backers. Kalabox would remain open-source, and all of its vital functionality would be freely available in an easily accessible package.

A few other ideas bore some fruit. Hosting companies and agencies expressed interest in hiring us to customize and train on Kalabox, and an advertised "Professional" version of Kalabox garnered email signups. However, to support even a small development team Kalabox would need tens of thousands (if not more) of users. Clearly these business models were slow-growth strategies: possible in the future, but not enough to support development.

## Enter Tandem: Software Delivery Strategy Consulting

While working on Kalabox, we had amassed a huge arsenal of skills using modern DevOps tools and methodologies. We had been running PHP applications on containers before most people had even heard of Docker. The build system required to compile Kalabox for use on three different operating systems cemented our already strong knowledge of CI services like TravisCI and build tools like Grunt and Gulp. And after more than a year of development, we were battle-hardened NodeJS and Angular experts.

We formed Tandem to use these skills and help companies modernize their approach to developing web applications. I don't want to toot our Tandem horn here; you can read more about what we're doing on the other pages of our site. We're simply excited to find a way to work with great clients and find time to keep making great projects like Kalabox.

## Thank You

Kalabox has been our attempt at making a small dent in a very big problem. It's our biggest hope that it's already made your life a little more fun (or at least less boring), letting you focus on interesting and invigorating problems.

We're hugely indebted to all of you. Whether you picked up a Kalabox keychain years ago, donated to our Kickstarter (still got your mug?), contributed to our Github repo, or just said a nice thing here and there, you've been a part of the Kalabox story. We're looking forward to writing the next chapter together!


If you're reading this Everyday we work in front of computers, doing mentally stimulating and rewarding tasks. Sadly, setting up a local development environment has never been one. We hope that the [new stable release of Kalabox](blog/2016/09/20/rejoice-kalabox-2-0-released) helps fix that problem and make life more productive and fun for developers everywhere.