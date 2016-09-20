---
layout: layouts/article.html
title: "Node Microservices on Docker Cloud"
tags: docker, scaling, strategy, hosting
permalink: true
author: Alec Reynolds
private: true
mainImage: images/articles/creating-mycvt-health-insurance-portal.jpg
img-src: images/articles/creating-mycvt-health-insurance-portal.jpg
teaser: How to run small NodeJS in an efficient, inexpensive, and scalable manner using Docker Cloud.
date: 2016-09-10
---

Let's repeat a mantra together: "change" is the essence of web application development. No sooner have we developed a "complete" web project than does our API datasource change, our business needs grow, or (the best possible problem) our userbase grows beyond the capacity of our system.


> If change is our only constant, we must work with tools that embrace it.

## Why Docker Cloud and Microservices?

There are many ways to embrace change, but after many years, I'm convinced that creating small, specialized apps in a standardized manner is the best way to accomodate the realities of software development.

"Microservices" are simply very small applications that do one or two things very well. They communicate with one another via well-defined APIs, which allows easy refactoring and extension of the application as a whole: if one feature becomes outdated, simply refactor or replace the resposible microservice(s). Since the microservices program to an API, significant data migration and unexpected data model tusseling can be avoided.

However, with multiple microservices in our application, it's essential that we have automated tools for deployment and scaling. This is where Docker and the Docker Cloud service come in. Docker allows us to package our microservices into isolated "containers," tiny virtual environments that can be created and destroyed much more quickly than traditional virtual machines (VMs). Docker Cloud gives even novice programmers a simple interface to host Docker-powered applications. Tasks that were formerly complex, like connecting networks of microservices together properly or scaling services, are made trivial by Docker Cloud.

So, how do we start? The following is a quick tutorial on how you can easily create your first NodeJS-powered microservice, then deploy it to Docker Cloud.

## 1. Setup

In 2016, setting up your local computer to create apps with NodeJS and Docker is easier than ever before. Simply...

- [Install Docker](https://www.docker.com/products/docker)
- [Install NodeJS](https://nodejs.org)
- [Create a Docker ID on Docker Hub](https://hub.docker.com)

## 2. Create Your Microservice

For demonstration purposes, our first Microservice will just be a tiny NodeJS app

## 3. Add a Dockerfile

## 4. Deploy to Docker Hub

## 5. Deploy to Docker Cloud

## 6. Basic Scaling on Docker Cloud
