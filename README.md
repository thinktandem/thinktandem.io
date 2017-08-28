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

# Install dependencies
lando npm install
lando bower install

# Build site
lando grunt build

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

Inspiration
-----------

[Click here](https://www.youtube.com/watch?v=gqwuYX3fZZc) for some inspiration on how to slay tasks like a pro.
