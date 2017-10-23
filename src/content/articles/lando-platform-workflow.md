---
layout: layouts/article.html
title: "Killer D8 Workflow Using Lando and Platform.sh"
tags: deployment, development, devops, localdev, testing
permalink: true
author: Mike Pirog
private: false
mainImage: images/articles/platformlando.png
img-src: images/articles/platformlando.png
byline: Leverage the ease of Lando, Platform.sh, GitHub and Travis to quickly spin up an ultra pro workflow
date: 2017-10-23
---

At Tandem we are super serious about designing (and using) best-practice development worklows that:

* Use build processes
* Allow many developers to easily collaborate
* Are consistent from project to project
* Spin up automated QA environments for manual testing
* Facilitate peer code review
* Deploy changes to production often
* Automate common linting, code standard, unit and functional tests
* Provide some automated mechanism for deployment to production

Good workflows that do the above almost always provide substantial time (read: $$$) savings during development. Not to mention they also produce a less frustrating collaborative experience for developers.

Of course, the downside of implementing these complex workflows is that they themselves also take a considerable amount of time to set up. *Good automation and tight integration between disparate systems ain't easy, or cheap.*

That's why we've developed a couple of easy-to-get-rolling start states to kickstart your dev workflow. Including a killer one for Drupal 8 that uses:

* [**Lando**](https://github.com/lando/lando) - For Docker/container based local development
* [**GitHub**](http://github.com) - For `git` repo management and [GitHub Flow](https://guides.github.com/introduction/flow/)
* [**Platform.sh**](http://platform.sh) - For awesome hosting and manual QA environments
* [**Travis CI**](https://travis-ci.org/) - For automated testing

You can consult the full example [over here](https://github.com/thinktandem/platformsh-example-drupal8) or read more below on how to get spin up on this awesome dev workflow.

What You'll Need
----------------

Before you kick off you'll need to make sure you have a few things:

1. [Lando installed](https://docs.devwithlando.io/installation/installing.html)
1. A GitHub account (ideally with your SSH key(s) added)
3. A Platform.sh account with your SSH key(s) added
4. A Travis CI account
5. (Optional) [Git installed](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) *
6. (Optional) [ZenHub](https://www.zenhub.com/) for Kanban style issue management in GitHub

It is also definitely worth reading about the upstream [starter kit](https://github.com/platformsh/platformsh-example-drupal8) and accompanying [documentation](https://docs.platform.sh/gettingstarted/local/lando.html) on using Lando with [Platform.sh](http://platform.sh).

* If you don't want to install `git` you can edit the tooling section of your `.lando.yml` that contains the `git` routes. If you do this you can run `git` commands via `lando git`.

Getting Started
---------------

### 1. Setup GitHub

Visit [this start state](https://github.com/thinktandem/platformsh-example-drupal8) on GitHub and fork the project to the org or account of your choosing. Then `git clone` the repo and `cd` into it.

```bash
git clone https://github.com/thinktandem/platformsh-example-drupal8.git mysite
cd mysite
```

Keep this terminal window active because you are going to need to need it for subsequent steps.

### 2. Setup Platform.sh

Login to Platform.sh and create a new project through the Platform.sh user interface. After naming your site select *"Import your existing code"*. Then follow the instructions on the next slide to import your forked repository. It should be something like this:

```bash
# Add platform's git repo as a remote
# Obviously replace PLATFORMID below with the one in your platform git clone command
git remote add platform PLATFORMID@git.us.platform.sh:PLATFORMID.git

# Push your GitHub repo to platform
git push -u platform master

# Optionally remove the platform remote so you do not accidentally deploy from local to production!
git remote remove platform
```

At this point it's probably a good idea to visit your built site on Platform.sh at this point to go through the Drupal installation process and get your DB dialed in.

### 3. Setup Local Lando and Connect Platform.sh with GitHub

#### Lando

Let's start by spinning up a local copy of our Platform.sh site with Lando.

This should spin up the services to run your app (eg `php`, `nginx`, `mariabdb`) and the tools you need to start development (eg `platform cli`, `drush`, `composer`, `drupal console`). This will install a bunch of deps the first time you run it but when it is done you should end up with some URLs you can use to visit your local site.

```bash
cd /path/to/my/repo
lando start
```

If you are interested in tweaking your setup check out the comments in your app's `.lando.yml`. Or you can augment your Lando spin up with additional services or tools by checking out the [advanced Lando docs](https://docs.devwithlando.io/tutorials/setup-additional-services.html).

#### Login to Platform

Now that you've got your Platform.sh site rolling locally with Lando let's login to Platform.sh using the `platform cli` that Lando installed for you.

```bash
# This should prompt you for a username and password
lando platform

# Verify the login
lando platform auth:info

# Get the ID for your site
# Copy this somewhere for now so you can use it when you comment
# Replace "Workflow Demo" with what you named your site in Step 2.
# Your site ID will be the string between the first set of pipes
lando platform projects | grep "Workflow Demo"
```

#### Connect to GitHub

Use the Platform.sh `PROJECT_ID` you grabbed in the step above and go through the setup [documented here](https://docs.platform.sh/administration/integrations/github.html).

```bash
lando platform integration:add \
  --type=github \
  --project=PROJECT_ID \
  --token=GITHUB-USER-TOKEN \
  --repository=USER/REPOSITORY \
  --build-pull-requests=true \
  --fetch-branches=true
```

Once you paste the `webhook url` into GitHub your Platform.sh instance will track agsinst your GitHub repo.

**THIS MEANS THAT YOUR MASTER BRANCH IS NOW DEPLOYABLE!!!**.

As a result it is an **EXTREMELY GOOD IDEA** to [enable branch protection](https://help.github.com/articles/configuring-protected-branches/) for your `master` branch so that people cannot merge to it directly unless appropriate status checks have passed.

#### Optionally Pull DB to Local

You can also import your Platform.sh DB locally.

```bash
# Use the platform.sh CLI to export your database
cd /path/to/repo/root
lando platform db:dump --gzip --file=dump.sql.gz --project=PROJECT_ID --environment=master

# Import the DB with Lando
lando db-import dump.sql.gz

# Remove the DB dump to be safe
rm -f dump.sql.gz
```

If you refresh your local site you should now see what you see on your Platform.sh instance.

### 4. Setup Travis CI

You will want to start by doing Steps 1 and 2 in the Travis [getting started docs](https://docs.travis-ci.com/user/getting-started/). We already have a pre-baked `.travis.yml` file for you so you don't need to worry about that unless you want to tweak it.

Then you will want to uncomment the following lines in your `.lando.yml` and restart your app with `lando restart`.

```yaml
PLATFORMSH_CLI_TOKEN: $PLATFORMSH_CLI_TOKEN
PLATFORMSH_PROJECT_ID: $PLATFORMSH_PROJECT_ID
```

Then you will want to visit your Platform.sh account settings page and generate an API Token. **Make sure you copy the token for the next step because you will only see it once!**

Finally, set the following environment variable [via the Travis UI](https://docs.travis-ci.com/user/environment-variables/#Defining-Variables-in-Repository-Settings).

```yaml
PLATFORMSH_CLI_TOKEN=TOKEN_YOU_GENERATED
PLATFORMSH_PROJECT_ID=PROJECT_ID (the same id you used for previous steps)
```

Trying Things Out
-----------------

Let's go through a [GitHub flow](https://guides.github.com/introduction/flow/) example!

This is a trivial example which deploys all merges into the `master` branch to the production environment. You can configure more complicated workflows (eg a `dev` and/or `test` environment) when you spin up your Platform.sh site but we think this configuration helps maximize continuous delivery.

### 1. Set up a topic branch

```bash
# Go into the repo
cd /path/to/my/github/repo

# Checkout master and get the latest and greatest
git checkout master
git pull origin master

# Spin up a well named topic branch eg ISSUE_NUMBER-DESCRIPTION
git checkout -b 1-fixes-that-thing
```

### 2. Do the dev, commit and push the codes

```bash
# Do some awesome dev

# Git commit with a message that matches the issue number
git add -A
git commit -m "#1: Describes what i did"

# Push the branch to GitHub
git push origin 1-fixes-that-thing
```

* Check out the Lando Reference section below for some tips on how to run tests before you push. This can save a lot of time and reduce the potential shame you feel for failing the automated QA

### 3. Open a PR and do manual and automated testing

Begin by [opening a pull request](https://help.github.com/articles/creating-a-pull-request/). This will trigger the spin up of a QA environment for manual testing and a Travis build for automated testing.

Here is an example PR with:

* [PR on GitHub](https://github.com/thinktandem/platformsh-example-drupal8/pull/2)
* [QA Environment on Platform.sh](http://pr-2-tcs3n7y-2a6htdqmmpchu.us.platform.sh/)
* [Travis PR Build](https://travis-ci.org/thinktandem/platformsh-example-drupal8/builds/289355899?utm_source=github_status&utm_medium=notification)

### 4. Deploy

When you are statisifed with the above, and any additional QA steps like manual code review you can [merge the pull request](https://help.github.com/articles/merging-a-pull-request/). This will deploy the feature to production.

Lando Reference
---------------

You should definitely check out the [Lando docs](https://docs.devwithlando.io) for a full sweep on its capabilities but here are some helpers for this particular config. **YOU PROBABLY WANT TO LANDO START YOUR APP BEFORE YOU DO MOST OF THESE THINGS.**

Unless otherwise indicated these should all be run from your repo root (eg the directory that contains the `.lando.yml` for your site).

### Generic Ccommands

```bash
# List all available lando commands for this app
lando

# Start my site
lando start

# Stop my site
lando stop

# Restart my site
lando restart

# Get important connection info
lando info

# Other helpful things
# Rebuild all containers and build process steps
lando rebuild
# Destroy the containers and tools for this app
lando destroy
# Get info on lando service logs
lando logs
# Get a publically accessible URL. Run lando info to get the proper localhost address
lando share -u http://localhost:32813
# "SSH" into the appserver
lando ssh

# Run help to get more info
lando ssh -- --help
```

### Development commands

```bash
# Run composer things
lando composer install
lando composer update

# Run php things
lando php -v
lando php -i

# Run drush commands
# replace web if you've moved your webroot to a difference subdirectory
cd web
lando drush status
lando drush cr

# Run drupal console commands
# replace web if you've moved your webroot to a difference subdirectory
cd web
lando drupal
```

### Testing commands

```bash
# Lint code
lando phplint

# Run phpcs commands
lando phpcs
# Check drupal code standards
lando phpcs --config-set installed_paths /app/vendor/drupal/coder/coder_sniffer
lando phpcs -n --report=full --standard=Drupal --ignore=*.tpl.php --extensions=install,module,php,inc web/modules web/themes web/profiles

# Run phpunit commands
# replace web if you've moved your webroot to a difference subdirectory
cd web
lando phpunit
# Run some phpunit tests
lando phpunit -c core --testsuite unit --exclude-group Composer

# Run behat commands
lando behat
# Run some behat tests
lando behat --config=/app/tests/behat-lando.yml
```

### Platform.sh commands

```bash
# List platform commands
lando platform list

# Login to platform
lando platform login

# Import a database from master
lando platform db:dump --gzip --file=dump.sql.gz --project=PROJECT_ID --environment=master
lando db-import dump.sql.gz
rm -f dump.sql.gz
```
