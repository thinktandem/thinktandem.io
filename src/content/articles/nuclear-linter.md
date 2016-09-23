---
layout: layouts/article.html
title: "Save Prod & Peers: Linting and Styles for Node on Travis"
tags: deployment, localdev, strategy, support, testing
permalink: true
author: Mike Pirog
private: false
mainImage: images/articles/kalabox-released.png
img-src: images/articles/kalabox-released.png
teaser: Don't be the person that breaks production because of a typo or searches endlessly for that missing closing bracket. Level up with Travis, grunt and node.
date: 2016-09-13
---

A Variation on a Theme
----------------------

You've been up all night pouring your heart and soul into the **NEXT BIG FEATURE** of that **SUPER AWESOME PROJECT EVERYONE USES**. Your mental capacity diminishes by the second but you must stay the course. Rome might not have been built in a day but this [npm](http://npm.org) module sure as hell will.

You're on the final stretch. The code is done. You commit to the repo. You lay on your bed and you are feeling pretty **QUOD ERAT DEMONSTRANDUM.** *"Seriously, I wrote that code like some sort of 24th century android!"*, you think as you drift to sleep.

<div class="row">
  <div class="col-md-4">
    ![data-winning](http://gifrific.com/wp-content/uploads/2012/08/Data-Star-Trek-Fist-Pump.gif)
  </div>
  <div class="col-md-4">
    ![data-winning](http://gifrific.com/wp-content/uploads/2012/08/Data-Star-Trek-Fist-Pump.gif)
  </div>
  <div class="col-md-4">
    ![data-winning](http://gifrific.com/wp-content/uploads/2012/08/Data-Star-Trek-Fist-Pump.gif)
  </div>
</div>

> YES! TOTAL CODE VICTORY!

The sad news is that you didn't write that code like an android and **SPOILER ALERT** you missed that pesky but kind of super critical closing bracket. Now the thousands of people relying on your project are getting fatal errors. They are not impressed. What should have been your finest hour, your finest expression of code art to the world is instead a shameful display of what the code elders call *n00batronix*. Might as well have climbed to the top of a big ole mountain and declared *"I HAVE NO IDEA WHAT I AM DOING!!!"* Certainly looks like you don't.

**Done something like this before?** Yeah, Me too.

Luckily, there is an alternative to pretending you code like an android. It's called using the robots. By bending [Travis](http://travis-ci.org), [NodeJS](http://nodejs.org) and [Grunt](http://gruntjs.com) to your will you can make your code safe to distribute once again.

Of course this is not the only reason to set up basic automatic code quality procedures. Preventing the total nuclear meltdown of your build is great but do you or your team also desire any of the following?

  1. Finding dev-killing missing parentheses in seconds, not **hours**
  2. Getting rave reviews for how pro and clean your code looks
  3. Quenching Sally's rage because your **TABS** fetish wipes out her **SPACES**  on every commit
  4. Commiting diffs that are clean and unspoiled of non-essential dev drivel
  5. Developing good coding habits based on well defined standards.

Interested in going from CodeZero to CodeHero in less than 30 minutes? Yes, you say? Then please read on.

Is it possible to learn this power!?!?
--------------------------------------

Yes! Now that we are in 2016 it's relatively easy and straightforward to set up basic automated testing both to cover code-based nuclear meltdowns and to ensure your entire team is writing high quality code. If you are familiar with the basics of [Github](http://github.com), [Travis](http://travis-ci.org), [NodeJS](http://nodejs.org) and [Grunt](http://gruntjs.com) you can probably skip ahead [to the next section](#next-section). If not here are the essentials you need to get started:

  1. An open source NodeJS project on GitHub [like this](https://github.com/thinktandem/metalsmith-swig-helpers)
  2. A linked project on Travis CI [like this](https://travis-ci.org/thinktandem/metalsmith-swig-helpers)

Generally, you will want to follow the [GitHub flow](https://guides.github.com/introduction/flow/) development pattern. However, there is one major difference. When you commit code to your feature branch/pull request Travis will make sure your code is both neccesary and proper. If neither of the two aforementioned conditions are met you will get a visually obvious indication of this.

> IMAGE OF FAILED GITHUB PR

Travis will report what changes you need to make to your code. Fix those mistakes, push your code again, wait for the build to complete successfully and profit from having great code quality.

OK! Now that I'm a believer give me an example.
-----------------------------------------------

We want to set up some basic checks on our new [metalsmith-swig-helpers](https://github.com/thinktandem/metalsmith-swig-helpers) project to make sure the project does not have any fatal syntax errors and it conforms with some NodeJS code standards.

**Let's begin!!!**

#### 1. Get the project
<pre><code class="language-bash">
git clone git@github.com:thinktandem/metalsmith-swig-helpers.git
cd metalsmith-swig-helpers
npm install
</pre></code>

#### 2. Install Grunt and the needed code linting and styling tasks

<pre><code class="language-bash">
\# Install the grunt-cli globally if you haven't already
npm install -g grunt-cli
\# Install the grunt tasks we need
npm install grunt --save-dev
npm install grunt-contrib-jshint --save-dev
npm install grunt-jscs --save-dev
\# Get some prettier output for linting
npm install jshint-stylish --save-dev
\# This helps us load grunt tasks
npm install matchdep --save-dev
</pre></code>

**NOTE:** Make sure you are setup to [install node modules globally without sudo](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

#### 3. Create a Gruntfile.js in your projects root directory

If you are unfamiliar with setting up the **Gruntfile** please check out [the documentation](http://gruntjs.com/getting-started#the-gruntfile).

Here is a basic **Gruntfile.js** that does not do anything.

<pre><code class="language-javascript">
module.exports = function(grunt) {
  // Load all grunt plugins
  require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);
  // Create the Grunt configuration
  var config = {
    // Load data from package.json
    pkg: grunt.file.readJSON('package.json'),
  };
  // Initialize the configuration.
  grunt.initConfig(config);
  // Register tasks
  grunt.registerTask('default', []);
};
</pre></code>

Here is a **Gruntfile.js** task that checks your code for syntax errors. Please refer to the documentation on the [**grunt-contrib-jshint**](https://github.com/gruntjs/grunt-contrib-jshint) plugin. Notice that we are delegating our linting rules to the **.jshintrc** file. You can read more about the rules of this file [here](http://jshint.com/docs/options/).

<pre><code class="language-yaml">
jshint: {
  options: {
    // Use a config file for our linting rules
    jshintrc: '.jshintrc',
    // Use a custom reporter so we get pretty output for lint reports
    reporter: require('jshint-stylish')
  },
  // This uses normal GLOB syntax. In this case scanning all JS files in ./ and lib/
  files: [
    '\*.js',
    'lib/\*.js'
  ]
}
</pre></code>

Here is a **Gruntfile.js** task that makes sure we are following NodeJS coding standards. Please refer to the documentation on the [**grunt-jscs**](https://github.com/jscs-dev/grunt-jscs) plugin. Notice that we are delegating our linting rules to the **.jscsrc** file. You can read more about the rules of this file [here](http://jscs.info/overview).

<pre><code class="language-yaml">
jscs: {
  // Use a config file for our code standards config
  options: {
    config: '.jscsrc'
  },
  // This uses normal GLOB syntax. In this case scanning all JS files in ./ and lib/
  files: [
    '\*.js',
    'lib/\*.js'
  ]
}
</pre></code>

Here is a complete **Gruntfile.js** that defines checks for basic syntax errors and adherence to code standards laid out in **.jscsrc** (Google standards in this case). We also register a task called **grunt test** that will check these things.

<pre><code class="language-javascript">
module.exports = function(grunt) {
  // Load all grunt plugins
  require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);
  // Create the Grunt configuration
  var config = {
    // Load data from package.json
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      files: [
        '*.js',
        'lib/*.js'
      ]
    },
    jscs: {
      options: {
        config: '.jscsrc'
      },
      files: [
        '*.js',
        'lib/*.js'
      ]
    },
  };
  // Initialize the configuration.
  grunt.initConfig(config);
  // Register tasks
  grunt.registerTask('default', []);
  grunt.registerTask('test', ['jshint', 'jscs']);
};
</pre></code>

#### Run the grunt task locally

<pre><code class="language-bash">
grunt test
</pre></code>

#### Set up a `travis.yml` file.

<pre><code class="language-yaml">
language: node_js
node_js:
  \- '4'
addons:
  apt:
    sources:
      \- ubuntu-toolchain-r-test
    packages:
      \- g++-4.8
sudo: false
after_success:
  \- echo -e "Host *\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config
  \- git config --global user.name $GIT_NAME
  \- git config --global user.email $GIT_EMAIL
  \- if [[ $TRAVIS_PULL_REQUEST == 'false' ]] && [ ! -z "$TRAVIS_TAG" ] && [ $TRAVIS_REPO_SLUG == $GH_REPO ]; then grunt deploy; fi
cache:
  directories:
    \- node_modules
    \- assets/vendor
notifications:
  email: false
env:
  global:
    \- GIT_NAME: Dot Tandematrix
    \- GIT_EMAIL: herald@thinktandem.io
    \- GH_REPO: thinktandem/tandem
    \- CXX: g++-4.8
before_install:
  \- openssl aes-256-cbc -K $encrypted_af5914b1ceab_key -iv $encrypted_af5914b1ceab_iv -in dot.id_rsa.enc -out ~/.ssh/id_rsa -d
  \- chmod 600 ~/.ssh/id_rsa
</pre></code>

#### Push your code and watch the magic

#### Caveats

  * If you have a private GitHub repo you will want to set up your Travis repo as their paid-for service [travis-ci.com](http://travis-ci.com)</small>
  * [Here](https://github.com/mbonaci/mbo-storm/wiki/Integrate-Travis-CI-with-your-GitHub-repo) are some instructions on settings up Travis.
  * Most of the above also works using [Gulp](http://gulpjs.com)


