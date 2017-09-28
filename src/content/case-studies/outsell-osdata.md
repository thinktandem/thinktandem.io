---
title: "OSDATA"
layout: layouts/case-study.html
logo: images/clients/outsell/outsell.png
org: Outsell Inc
permalink: true
private: false
byline: We helped <strong>Outsell Inc.</strong> migrate from a legacy SSO provider to Auth0 while reducing the complexity of their authentication logic and providing tight <strong>(and well tested)</strong> Salesforce integration
slug: outsell-osdata
dark: false
background: 8CC63E
date: 2017-04-23
industries: higher education
tech: drupal, laravel
services: rescue
---

We're proud of all the projects we work on, but among all of our clients, California's Valued Trust (CVT) stands out. By developing the MyCVT enrollment portal, we helped tens of thousands of CVT subscribers (primarily teachers and school staff in K-12 education) find an easier way to enroll in their insurance.

However, while our work on the MyCVT application was vital, ultimately the most important contribution we have made at CVT is assisting in its transformation into a technology-focused organization.
Standardizing on a PHP Framework

CVT was already in the process of modernizing its technology stack and was fortunate to have a team that included programmers familiar with PHP. Although most of CVT's infrastructure to date had been written in COBOL, they were very receptive when we proposed adoption of a modern PHP framework to provide...

- a standardized data model
- an easy way to generate and consume APIs
- automated report and simple interface generation.

We selected Drupal as a way to prototype the MyCVT system. With roots as a popular CMS, Drupal could easily reproduce the data model of CVT's paper enrollment forms. The powerful suite of API and report construction tools included with Drupal allowed the construction and deployment of the initial version of MyCVT within months.

## Decoupling the Application Architecture

While Drupal was the perfect tool to quickly get MyCVT into production, we wanted to allow CVT greater flexibility in maintaining and developing the application in the future. Drupal's idiosyncratic approach to application design was difficult for CVT's existing development team to adopt and the challenge of performing a large migration from Drupal to another application framework was dauntingly expensive. Clearly MyCVT needed room to grow.

To solve this problem we introduced a decoupled architecture to MyCVT, building a front-end application in Angular for enrollment creation. This front-end interacted with Drupal via a series of APIs, but was built as a proof-of-concept for switching back-end systems at a later time.

Working with CVT, we've designed a project roadmap that increasingly takes advantage of this decoupled architecture. As CVT makes progress in upgrading their internal infrastructure, we can incrementally move MyCVT away from its reliance on Drupal and redefine it as a purely front-end application. A series of API endpoints will power MyCVT and also allow development of mobile apps and other applications.

## Creating Continuous Delivery

Once the first version of MyCVT was deployed, it became important to keep providing value via new features while handling support requests. To do this, we introduced a modern development workflow featuring Gitflow and Agile methodology, using the Pantheon hosting system as a vital piece of infrastructural support.

If you're not familiar with Gitflow, MyCVT is a perfect case study of how it can help organizations develop new features while simultaneously addressing bugs in production without creating a chaotic deployment pipeline.

Traditionally, testing and production environments share the same git repository. That means if you deploy a new feature to the testing environment for your team to review, but before they can, you need to create and deploy a vital hot fix to production, you'll need to remove your new feature from the deployment pipeline, deploy your hot fix, and then re-insert your new feature. Each step in this process introduces the possibility of error, and we've seen teams accidentally deploying new features before review because they didn't properly execute their hot fix.

Gitflow fixes this by commanding you to do all development in separate Git branches. Only once the work is fully vetted can it be put into the "production pipeline", ready for a final round of QA and deployment immediately.

With Gitflow, we were able to work on multiple features simultaneously. Reviewers can perform quality assurance on separate test environments (what Pantheon calls "multidev" environments), while the primary deployment pipeline remains clear for any hotfixes that might be necessary as bugs are reported.

## Introducing an Agile Flow

Unlike many of our projects, where we start with Agile training or are already working with an Agile-trained team, at CVT we introduced Agile concepts iteratively.

First, we started using the Kanban project management tool Trello. CVT found Trello to be an easy way to clearly see project priorities and communicate with us on project requirements. They liked it so much, that eventually our contacts in CVT's tech team introduced Trello to the rest of the organization, where it is growing in adoption.

However, better project management software can only facilitate better communication, it can't create it. Starting weekly standups with the entire CVT tech team helped improve the quality of Trello issues being created, lead to more effective problem solving, and ensured that task scoping was accurate from planning to implementation and deployment.

## The Future

Our relationship with CVT stretches over more than 5 years, and we're constantly thinking about what the next 5 years of development will lead to.

As consultants, we invest in the "teach a man to fish" strategy. A great deal of our long-term strategy with CVT is based around training and investing in technologies that CVT's growing team can manage. We're currently investigating how Docker can help modernize CVT's infrastructure, how more pieces of QA and compliance monitoring can be automated, and how CVT can get better data on all their software projects to help improve their growth into a technology-focused organization.

We're lucky to work with organizations like CVT that are helping our fellow Californians lead healthier, better lives. If you're interested in hearing more about our work with CVT and other organizations, let us know.


## Organization Snapshot

Company: California’s Value Trust
Location: Fresno, California
Number of Portal Users Served: Over 30,000
Challenge: Create secure applications without sacrificing development speed
Solution:
Impact:
Over 30K enrollments submitted
Faster updates of new features
QA environments for every update
Automated testing of code
