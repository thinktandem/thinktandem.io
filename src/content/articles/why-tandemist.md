---
layout: layouts/article.html
title: On evading death
tags: deployment, docker, hosting, localdev, misc, scaling, strategy, support, training, testing
permalink: true
author: Alec Reynolds
private: false
mainImage: holder.js/1000x200/#222:#aaa/text:{{title|slug}}
img-src: holder.js/200x200/#222:#aaa/text:{{title|slug}}
teaser: An introduction to Tandem, who we are, what we do, and why you, a human being with places to go and people to see, should spend some time with us.
date: 2016-08-03
---

Tandem: A bicycle. Also a creative way to die.

At 21, careening through the alleys of Berkeley behind my brother on a sport tandem bike, each curve challenged both my balance and confidence in our ability to make it home alive. In retrospect, perhaps this was my first lesson in software consulting.

A consulting relationship relies on trust. A *healthy* consulting relationship relies on trust that is founded in transparency and mutual purpose. Blind trust is never required; instead, each partner is able to communicate and move the project forward seemlessly.

When Mike Pirog and I decided to form a new software consultancy...

<pre><code class="language-css">p { color: red }</code></pre>

<pre><code class="language-php">

/**
 * @file
 * PHP Router. Handles 404 pages gracefully.
 */

// Check if the request is to the homepage.
if (!isset($_SERVER['REQUEST_URI']) || $_SERVER['REQUEST_URI'] == '/') {
  $content = file_get_contents(__DIR__ . '/index.html');
  echo $content;
}
else {
  // Since the page was not found, output the 404 page.
  header("HTTP/1.0 404 Not Found");
  $content = file_get_contents(__DIR__ . '/404.html');
  echo $content;
}

</code></pre>


wefwef
