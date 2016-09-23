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

You've been up all night pouring your heart and soul into the **NEXT BIG FEATURE** of that **SUPER AWESOME PROJECT EVERYONE USES**. Your mental capacity diminishes by the second but you want to stay the course. Rome might not have been built in a day but this [npm](http://npm.org) module sure as hell will be.

You're on the final stretch. The code is done. You commit to the repo. You lay on your bed and you are feeling pretty **QUOD ERAT DEMONSTRANDUM.** *"Seriously, I wrote that code like an android!"*, you think as you drift asleep.

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

The sad news is that you didn't write that code like an android and **SPOILER ALERT** you missed that pesky but kind of super critical closing bracket. Now the thousands of people relying on your project are getting fatal errors. They are not impressed. What should have been your finest hour, your finest expression of code art to the world, is instead a shameful display of n00batronix. Might as well have climbed a mountain and broadcast to the universe *"I HAVE NO IDEA WHAT I AM DOING!!!"*

*Done something like this before?* Yeah, Me too.

Luckily, there is an alternative to pretending you code like an android. It's called using the robots! By bending [Travis](http://travis-ci.org), [NodeJS](http://nodejs.org) and [Grunt](http://gruntjs.com) to your will you can make your code safe to distribute once again.

Of course there are way more reasons to set up basic automatic code quality procedures. Preventing the total nuclear meltdown of your build with this first line of robotic defense is great but do you or your team also desire any of the following?

  1. Finding dev-killing missing parentheses in seconds, not **hours**
  2. Getting rave reviews for how pro and clean your code looks
  3. Quenching Sally's rage because your **TABS** fetish wipes out her **SPACES**  on every commit
  4. Commiting diffs that are clean and unspoiled of non-essential dev drivel
  5. Developing good coding habits based on well defined standards.

Interested in going from CodeZero to CodeHero in less than 30 minutes? Yes, you say? Please read on.

So... How exactly does all this black magic work?
-------------------------------------------------

Awesome! Do you have any examples I can follow?
-----------------------------------------------

