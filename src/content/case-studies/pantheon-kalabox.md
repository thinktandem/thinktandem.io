---
title: "Pantheon on Kalabox"
logo: images/clients/pantheon/pantheon.png
org: Pantheon Systems
byline: We built <strong>Pantheon Systems</strong> an integration for our Kalabox GUI that allows their users to easily clone their sites onto their computer.
image:
  src: /images/case-studies/kalabox.png
  title: USF Website
challenge: Provide a one-click, push button solution that gets a user developing their Pantheon site locally in a matter of minutes.
solution: Use Kalabox & Docker technology to replicate the Pantheon development environment and toolchain and Terminus to clone a site.
impact: Users can get a full Pantheon-specific dev environment running in minutes. Pantheon has a great any easy way to onboard users of all skill levels.
quote:
  content: "A common mistake that people make when trying to design something completely foolproof is to underestimate the ingenuity of complete fools."
  author: Douglas Adams
metrics:
  - key: Active Monthly Users
    value: 1500+
  - key: Spin Up Time
    value: 5 Minutes
  - key: Cross Platfrom
    value: You Bet!

tech: docker, nodejs, drupal, wordpress
industries: startups
services: development

background: EFD01B
layout: layouts/case-study.html
slug: pantheon-kalabox
dark: true
permalink: true
private: false
date: 2013-09-22
---
Pantheon was looking for a local development environment that, like Pantheon itself, was able to take a complicated problem and make it easy and accessible to a wide set of users. Our [Kalabox](http://kalabox.io) GUI and CLI product fit the bill nicely.

We were able to leverage Kalabox's pluggable [nodejs](https://nodejs.org) architecture to build a sophisticated integration that:

* Uses Pantheon's Machine Tokens for authentication
* Gives push-button *get my site* and *deploy my changes* functionality
* Uses [Docker](https://www.docker.com/) to closely mimic the [powerful](https://pantheon.io/how-it-works) Pantheon runtime and toolchain
* Packages in developer power tools like Terminus, [Drush](http://www.drush.org/), [WP-CLI](http://wp-cli.org/) and [xdebug](https://xdebug.org/)
* Ships in a cross-platform, easy-to-use, one-click installer via [nw.js](https://github.com/nwjs/nw.js/)

This allows Pantheon to easily streamline their user onboarding and agency training with a go to standard for local development, not to mention add another killer app to their product mix.
