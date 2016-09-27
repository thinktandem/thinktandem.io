---
layout: layouts/article.html
title: "How MY AGENCY uses KALABOX to STANDARDIZE and WIN all the LOCAL"
tags: deployment, localdev, strategy, support, testing
permalink: true
author: GNZTRN5K
private: false
mainImage: images/articles/kalabox-released.png
img-src: images/articles/kalabox-released.png
teaser: Onboarding new team members to your web project can be complicated with even the most integrated DevOps team. Say hello to Kalabox.
date: 2016-09-26
---

There's a common phrase heard throughout the web development community and feared by all in our office here at [PAIRODIME](http://www.pairodime.com):

> Well...it worked on my machine.

Over the years my team and I have tried to settle on common web development tools that would allow us all to collaborate on digital products and minimize our headaches and redundant speach patterns. Local web development envirnoments were especially difficult to master. Even if we all installed MAMP, XAMP, Virtual Box, or installed native web server stacks, we could not gurantee we would were all working under the same development conditions and eventually one of us would wind up with the colloquial WSOD. Maybe it was RAM allocation, maybe it was MySQL tuning for large databases, maybe it was my version of SASS was not the same as my co-workers. Then there was the dreaded moment of truth when pushing changes to our web hosting service. Or on the flip side of that coin; we download all the website code, assets and database from our web host only to spend the next half a day trying to get our website to load in our local web browser.

After exchanging 'my.conf' and 'php.ini' files over slack (yes - that just happended), we finally find solace. No more WSOD. We can finally begin slaying code like galdiators. All shall rejoice!

Don't celebrate just yet; that was just for one team member. Everybody has their own stack preference, so be prepared to know that you will never be fully prepared to handle every computer setup that hits the sprint conference table.

## Say hello to Kalabox

[Kalabox](http://www.kalabox.io/) standardizes and optmizes local development for Drupal, WordPress, and web apps. It is easy to install, works on Mac, Windows and Linux. It is easy to use for developers who love GUI apps (looking at you [Devsigners](https://www.devsignercon.com)!), and powerful enough for even the most seasoned command line veterans. It is epsecially awesome when we pair Kalabox with the Pantheon plugin which allows us to spin up identical clones of our entire Pantheon hosting site environments (including MultiDev environments). Being a Pantheon partner agency this has become especially helpful as we now use Kalabox to create localized replication of our Redis, Varnish, MySQL, terminus CLI and Drush for each Pantheon environment that come built into our web hosting serives.

## Understanding how Kalabox works

First let me say, I do not claim to be an expert on how Kalabox works. Although Kalabox is open source, I have never forked the repo, commited a patch, or added to the [documentation](http://docs.kalabox.io/). I have however, read all the documentation (at least a couple of times), posted questions on the github issue que, posted replies in the issue queue, posted a thread or two on the Pantheon Power User Group thread, and have experimented relentlessly trying to vet Kalabox as a drop in replacement for our team's preferred localized development tool. 

Kalabox basically works like this:
- Download the Kalabox Application from [GitHub](https://github.com/kalabox/kalabox/releases)
- Install as normal
- Installer creates a virtual machine on your computer using [Virtual Box](https://www.virtualbox.org/) (which comes pre bundled with the application)
- Use Kalabox from the GUI or CLI to create a new app from scratch or pull directly from Pantheon
- If you create a new app from Pantheon, you have the option of pulling database and files as well as code
- Kalabox uses a .yml file in the newly created app to describe the virtualized machine and local computer data sharing
- The virtual machine uses [Docker](https://www.docker.com/) for awesome container stacking of things like Redis, MySQL, Drupal, [etc.](https://hub.docker.com/explore/)
- Kalabox (along side virtual Box) creates a shared folder for you to interact with the virtual machine
- On a Mac, the default shared folder is located:
<pre><code class="language-bash">
/Users/yournamehere/.kalabox/apps/
</pre></code>
- You can now edit files in your apps /code/ directory
- Kalabox utilizes [Unison](https://www.cis.upenn.edu/~bcpierce/unison/) in combination with Virtual Box shared file system to synchronize the files between the virtual machine and your local machine (at a rate of about 1 second)
- Once your changes are made to your code or files, you can use Kalabox to push your changes to your web host (for us that is Pantheon)

 



