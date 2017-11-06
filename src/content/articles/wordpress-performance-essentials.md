---
layout: layouts/article.html
title: "WordPress Performance Essentials"
tags: development, devops
permalink: true
author: John Ouellet
private: false
mainImage: images/articles/wordpress-performance-essentials.jpg
img-src: images/articles/wordpress-performance-essentials.jpg
byline: How to make WordPress run fast and smooth.  A few tips and tricks to make sure your visitors don;t get frustrated.
date: 2017-11-06
---

Make your WordPress Site Super Duper Fast
-----------------------------------------

Having a fast running site is a great feeling.  Your visitors will be happy, Google will be happy, and most of all you will be happy.  So much happiness all around can be achieved with just a little elbow grease and some TLC.  Let me show you some tips and tricks to get your WordPress site peforming well.


CloudFlare
----------

[CloudFlare](https://www.cloudflare.com/) is a no brainer when it comes to quick and easy performance setup.  CloudFlare is a Content Delivery Network service that also takes over the DNS of your site.  So this means you will need access to your site's registrar.  CloudFlare's free plan is more than enough to get a feel for how awesomesauce this service is.

Once you go through and [setup your site with Cloudflare](https://support.cloudflare.com/hc/en-us/articles/201720164-Step-2-Create-a-Cloudflare-account-and-add-a-website) then you are ready to unleash the fury.  *Note: There is a [CloudFlare WordPress plugin](https://wordpress.org/plugins/cloudflare/), but you don't need it if you follow this whole guide.  Most caching plugins come with a CloudFlare (or any CDN) plugin.*

Here are the settings you should have on each of the sections/apps of CloudFlare:

##### DNS

Click the orange cloud (http proxy) on all A and CNAME records.  Also, you should utilize CNAME flattening as well. To do this create a new CNAME record and put www in the name and then @ in the domain name.

##### Crypto

Dependent on your hosting providers settings, you will chose Flexible or Full in the SSL setting.  Start with Flexible, change all the settings below and then try Full.  If Full causes a 5xx error on your site, change back to Flexbile, purge the caches in the Caches app and give it a minute.

Go down to Always use HTTPS and click it to on.  Also head down to Automatic HTTPS Rewrites and click it to on. All of these settings will enable https on your site, for free!  Just go back through your site to make sure you have no assets stuck on http.  You will see the mixed content message in the console.  Usually it is one or two assets, but easy enough to fix real quick.

Nginx
-----

"Apache is like Microsoft Word, it has a million options but you only need six.  Nginx does those six things, and it does five of them 50 times faster than Apache".

There are numerous articles out there they weigh the advantages of Nginx over Apache.  We could go on and on about the two of them, but if you want performance, go with Nginx. If you are still curious, [here is an article from the Nginx Community Wiki](https://www.nginx.com/resources/wiki/community/why_use_it/) on the advtanges of Nginx.

Most hosting enivironment come with Nginx ready to go typically, like [Pantheon](https://pantheon.io/) and [Platform](https://platform.sh/).  If you are hosting through a do it yourself provider (like [Digital Ocean](https://www.digitalocean.com/)), then here are a couple tips and tricks.

##### Cache All Of Your Static Resources

Caching static assets like CSS, JS, images, etc has a huge benefit for your site.  You will deliver these assets faster to your end user while reducing the load on the server.  It is a win-win to set this up.  It is pretty simple and easy to do.

Go to /etc/nginx/sites-available folder on your server.  Edit the file which corelates to your site (usually the default file).  You can do this with the command ```sudo nano default``` or whatever CLI editor you use.  Add the following settings to the file:

```bash
server {
  // Other settings up here

  location ~ \.php$ {
    // more settings in here
  }

  location ~* .(ogg|ogv|svg|svgz|eot|otf|woff|mp4|ttf|css|rss|atom|js|jpg
                  |jpeg|gif|png|ico|zip|tgz|gz|rar|bz2|doc|xls|exe|ppt|tar|mid
                  |midi|wav|bmp|rtf)$ {
    expires max;
    log_not_found off;
    access_log off;
  }
}

```

##### Enable FastCGI

FastCGI is a caching mechanims that helps with all the behind the scenes CGI processes on the server. It only take a few seconds to set this up, but is quite powerful.  Here is the recommended method using the same conffig file from the static resource example:

```bash
fastcgi_cache_path /var/run/nginx-cache levels=1:2 keys_zone=WORDPRESS:100m inactive=60m;
fastcgi_cache_key "$scheme$request_method$host$request_uri";

server {
  // Other settings up here

  set $skip_cache 0;

  # POST requests and urls with a query string should always go to PHP
  if ($request_method = POST) {
    set $skip_cache 1;
  }
  if ($query_string != "") {
    set $skip_cache 1;
  }

  # Don't cache uris containing the following segments
  if ($request_uri ~* "/wp-admin/|/xmlrpc.php|wp-.*.php|/feed/|index.php|sitemap(_index)?.xml") {
    set $skip_cache 1;
  }

  # Don't use the cache for logged in users or recent commenters
  if ($http_cookie ~* "comment_author|wordpress_[a-f0-9]+|wp-postpass|wordpress_no_cache|wordpress_logged_in") {
    set $skip_cache 1;
  }

  location / {
    try_files $uri $uri/ /index.html;
  }

  location ~ \.php$ {
    try_files $uri =404;
    include fastcgi_params;

    fastcgi_pass unix:/var/run/php5-fpm.sock;

    fastcgi_cache_bypass $skip_cache;
    fastcgi_no_cache $skip_cache;
    fastcgi_cache WORDPRESS;
    fastcgi_cache_valid  60m;
  }

  location ~ /purge(/.*) {
    fastcgi_cache_purge WORDPRESS "$scheme$request_method$host$1";
  }

  location ~* .(ogg|ogv|svg|svgz|eot|otf|woff|mp4|ttf|css|rss|atom|js|jpg
                  |jpeg|gif|png|ico|zip|tgz|gz|rar|bz2|doc|xls|exe|ppt|tar|mid
                  |midi|wav|bmp|rtf)$ {
    expires max;
    log_not_found off;
    access_log off;
  }
}

```

Enabling Nginx, caching your static resources, and enabling FastCGI will yeild great gains in yoru site performance.  There are many other tweaks you can do to Nginx beyond this.  If you are google savvy enough, you can squeeze out even more milliseconds of performance than what I listed above.




PHP 7.x
--------


OpCache
--------


Varnish
-------


Redis
-----


WP-Rocket Plugin
----------------


Autoptimize Plugin
------------------



Conclusion
----------
