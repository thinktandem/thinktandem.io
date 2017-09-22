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

The following are notes from the 2017 Devsigner Conference in Portland. We're updating this live as we attend sessions.

Big thanks to the organizers, sponsors, and fellow attendees for making this a fun interactive event!

## Writing Great Tickets

How do you communicate all the steps to take a task from conception through deployment? Rose Hart, currently a product manager at ThinkShout, shared some of her strategies to write complete tickets.

### Source Material for Tickets

Referencing existing resources can provide essential context for tickets without necessitating excessive detail. User stories, feature specifications, or design documentation (ranging from wireframes to complete mockups and prototypes) give the ticket reader a broad overview of _why_ this ticket is important and _how_ other people have been thinking about it.

### Who Should Write the Tickets?

Anyone! Designers can write great tickets because they have user insights. Technical architects and engineers can write great tickets, particularly if they have been embedded in the discovery process so they can combine deep technical knowledge with the big picture goals of the project. Even a junior engineer straight out of code school have valuable insights that can be translated into great tickets.

Collaborative ticket writing can help combine these perspectives to form the ideal ticket. At Tandem, we like having one lead stakeholder write the original ticket, then review with the team during standup to incorporate these other perspectives.

Clients are important in the process, but their energy should be focused towards writing user stories and feature specifications. Whether or not you give clients access to the ticketing system is a choice; Tandem promotes this as a matter of transparency, but many people in this session at Devsigner had misgivings on the subject.

### What Goes in a Ticket?

Tickets include...

- Implementation tasks for Design, Development, Theming
- Checklist defining ticket completion
- Time estimates
- Labels to show priority, whether an issue is blocked, and other statuses

### How Big Should Tickets Be?

Rose believes a maximum of 8hrs of work should be included in a ticket. Beyond that you should start creating multiple tickets. Broadly we agree at Tandem, although we emphasize that concise feature-focused tickets are ideal.

### Ticketing Tooling

I was extremely happy to hear that ThinkShout, like Tandem, is using Zenhub for managing projects. Zenhub provides a Kanban interface, estimation tools, and analytics overlays for Github's native issue management.

## Lando overview

Curious on how to get developers started, from pulling down a new project repository all the way through getting it running on their computer? Our very own Mike Pirog presented Tandem's new Local Development tool, [Lando](https://docs.lndo.io), to show the Devsigner crowd how to cut hours from developer onboarding.

Getting a project started with Lando is a simple process:

1. Clone a project repo that includes a .lando.yml file.
2. Run `lando start`
3. Lando will install all dependencies and launch your site.
4. Run `lando` to see available tooling commands.

### Defining Infrastructure with .lando.yml

Lando spins up local development environments using Docker. Mike showed what a typical .lando.yml file looks like, defining the various pieces of your local infrastructure.

A basic way of doing this is accomplished with *recipes*, which are pre-defined sets of infrastructure for common usecases, like running a Drupal application, a WordPress application, a generic LAMP stack, and many more options. A .lando.yml file using a recipe looks something like this:

<div><pre><code class="language-bash">
name: mysite
recipe: lamp
</pre></code></div>

Further customizations can be made to match the versions of services on your production environment:

<div><pre><code class="language-bash">
name: mysite
recipe: lamp
config:
	php: 5.6
	webroot: web
	database: mariadb:10.0
</pre></code></div>

There are many more options available to customize available tooling, infrastructure, and even build-steps to automate the setup of your app.

### Tools Available on Lando

Upon installing a recipe, Lando can make common tools like composer, grunt, gulp, drush, and many more available. If you run `lando` within your project directory, it'll show all the available commands.
