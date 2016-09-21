Tandem Website
==============

All the hacked up Kalastatic magic that builds and deploys [http://www.thinktandem.io](http://www.thinktandem.io).

Getting Started
---------------

### Install

```bash
git clone https://github.com/thinktandem/tandem.git
cd tandem
npm install
```

### Serve the site

```bash
grunt
```

### Watch all the files

```bash
grunt watch
```

### Run tests

```bash
grunt test
```

Deploying
---------

It is best to bump the version and tag a commit to build an official release. This can be done in the following ways depending on your desired bump.

```bash
# Bump to a new prelease version ie 0.2.0-beta.1
grunt release --type=prerelease

# Bump to a new patch version ie 0.2.1, this is the default
grunt release

# Bump to a new minor version ie 0.3.0
grunt release --type=minor

# Bump to a new major version ie 1.0.0
grunt release --type=major
```

That said you can also deploy straight up at any time using. Great for ye olde tyme hotfix!

```bash
grunt deploy
```

It is also an **EXCELLENT** idea to test out the release cycle first

```bash
grunt release --type=minor --dry-run=true
```

Other Resources
---------------

* [Mountain climbing advice](https://www.youtube.com/watch?v=tkBVDh7my9Q)
