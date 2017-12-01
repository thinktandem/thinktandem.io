Tandem Website
==============

All the hacked up Kalastatic magic for [http://www.thinktandem.io](http://www.thinktandem.io). This is currently a stop-gap website to bridge the gap between the old and new brand identities.

Workflow
--------

The Tandem [dev workflow](https://docs.thinktandem.io/coding/dev-workflow.html) is dogfooded for this repository as well. No sense in repeating it here!

Development
-----------

Always good to dev locally before submitting a pull request. To do so, we recommend that you are equipped with:

1.  [SSH keys - to access this Github repo](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/)
2.  [Lando - localhost development environment](http://docs.lndo.io)

### Get This Site Running Locally

```bash
git clone https://github.com/thinktandem/thinktandem.io.git
cd thinktandem.io

# Start up the site
lando start
```

### Watching

```bash
# Watch for file changes and then rebuild
lando grunt watch
```

### Running Tests

Make sure your `*.md` files COMPLY with our standards.

```bash
lando grunt test
```

Tagging
-------

We do not free tag. Check [here](https://github.com/thinktandem/thinktandem.io/blob/master/src/config/tags.metadata) for a list of vocabularies and their tags.

`blog` content uses the `tags` vocab. Here is some example front matter:

```yaml
---
layout: layouts/article.html
title: "Devsigner 2017 Takeaways"
tags: conferences
permalink: true
author: Alec Reynolds
private: false
mainImage: images/articles/devsigner-2017.jpg
img-src: images/articles/devsigner-2017.jpg
byline: Highlights from Portland's Devsigner Conference.
date: 2017-09-22
---
```

`case-studies` content uses the `services`, `tech`, and `industries` vocabs. Here is some example front matter:

```yaml
---
title: "Case Study 1"
layout: layouts/case-study.html
logo: images/clients/client/client.png
org: Acme Inc
permalink: true
private: false
byline: We fixed the things
slug: acme-bugs
dark: false
background: 8CC63E
date: 2017-09-23
industries: higher education
tech: drupal, laravel
services: rescue, development
---
```

Other content does not currently support tagging of any kind.

Inspiration
-----------

[Click here](https://www.youtube.com/watch?v=gqwuYX3fZZc) for some inspiration on how to slay tasks like a pro.
