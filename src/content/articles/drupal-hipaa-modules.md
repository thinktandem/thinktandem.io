---
layout: layouts/article.html
title: "5 Essential Modules for Drupal HIPAA Compliance"
tags:
permalink: true
author: Alec Reynolds
private: false
mainImage: images/articles/dockerTNG.png
img-src: images/articles/dockerTNG.png
byline: Want to leverage Drupal's powerful framework for storing protected health information? These modules can help with your HIPAA compliance efforts.
date: 2017-11-08
---

- AES (caveat: https://drupal.stackexchange.com/questions/12797/hipaa-compliance)
- Townshend Security and/or Lockr for storage of keys
- Session Limit
Paranoia
Automated Logout
Password Policy
Secure Permissions
Permission Watchdog
Security Review

Username Enumeration Prevention
Honeypot/CAPTCHA/reCAPTCHA
Security Kit
Encrypt API

If you're a covered entity, complying with HIPAA can increase development expenditures and stress. In this climate, it's easy to succumb to fear and overpay for proprietary solutions. It's unfortunate that in 2017 many vendors are still selling products that are poorly designed for mobile devices, difficult to develop for, and hard to use.

Fortunately, open-source software provides a powerful alternative. The Drupal CMS offers the compliance features HIPAA requires with its powerful permissioning system and extensive range of plugins, while providing tools to create modern user experiences. It's an ideal choice for covered entities who need to store personally identifiable information (PII) or protected health information (PHI).

In this article, we're going to cover several essential modules for creating a HIPAA-compliant Drupal website.

## 1. Long-term Log Storage and Analysis: Elasticsearch Connector

HIPAA has several requirements for logging. On a basic level, monitoring log-ins (who accessed the system at what times) is required. Drupal (and most systems) adequately covers this in default logging, but the sheer amount of log entries stored in Drupal's SQL database can lead to performance issues.

The [Elasticsearch Connector module](https://www.drupal.org/project/elasticsearch_connector) allows

## 2. Custom Audit Logging:

once we get into audit controls that record user activity, we need extra tools to make sure our logging is granular enough. Here, we have two options. Drupal's default watchdog logging can be powerful enough for smaller applications.


## 3.



- Log-ins (see 164.308(a)(5)(ii)(C))
- General

Section 164.308(a)(5)(ii)(C): Log-in monitoring (Addressable). Procedures for monitoring log-in attempts and reporting discrepancies.
Section 164.312(b): Audit controls. Implement hardware, software, and/or procedural mechanisms that record and examine activity in information systems that contain or use electronic protected health information.
Section 164.308(a)(1)(ii)(D): Information system activity review (Required). Implement procedures to regularly review records of information system activity, such as audit logs, access reports, and security incident tracking reports.


## Permissioning

## Encrypted Storage of Data

From the "Security Rule" The Department of Health and Human Services (HHS) and the Centers for Medicare & Medicaid Services (CMS) provide guidance around the protection of sensitive data and PHI based on a security series of seven papers, each focused on a specific topic related to the Security Rule. The rule is officially titled “Security Standards for the Protection of Electronic Protected Health Information” (45 CFR Part 160 and Part 164, Subparts A and C) but is commonly known as the Security Rule.In the Security Rule standards on Technical Safeguards [164.304 as “the technology and the policy and procedures for its use that protect electronic protected health information and control access to it.”], encryption and decryption requirements regarding the transmission of health-related information are covered in sections 164.312(a)(2)(iv) and 164.312(e)(2)(ii).


"Electronic PHI has been encrypted as specified in the Security Rule by “the use of an algorithmic process to transform data into a form in which there is a low probability of assigning meaning without use of a confidential process or key” (45 CFR 164.304 definition of encryption) and such confidential process or key that might enable decryption has not been breached. To avoid a breach of the confidential process or key, these decryption tools should be stored on a device or at a location separate from the data they are used to encrypt or decrypt."

[Encrypt module](https://www.drupal.org/project/encrypt)
[Encrypt Fields module]

## Resources
- [HIPAA Briefing](https://info.townsendsecurity.com/bid/70877/Drupal-CMS-and-Changes-in-HIPAA-HITECH-Regulatory-Compliance)
- [2016 DrupalCon NOLA Security BoF](https://docs.google.com/document/d/1oYnXUblXzs4bpPqXh2FAru1i6qbPhxteSsEJAAnBp4o/edit)
- [HIPAA Checklist](https://www.hipaajournal.com/hipaa-compliance-checklist)
- [HIPAA Audit Checklist](https://www.hipaajournal.com/hipaa-audit-checklist/)
- [HIPAA Compliance Checklist](https://www.hipaajournal.com/hipaa-compliance-checklist/)
- [HIPAA Compliant Logging](http://blog.securitymetrics.com/2015/02/hipaa-compliant-system-logs.html)
- [Drupal Logging + Splunk](http://www.asmallwebfirm.net/blogs/2013/04/achieving-drupal-log-bliss-splunk) --> Helpful list of downsides of drupal default Logging
- [Splunk vs Elasticsearch](https://devops.com/splunk-elk-stack-side-side-comparison/)

## Extra Cool Shit
- [OpenControl](https://github.com/opencontrol/compliance-masonry): Helps define security requirements and dynamically generate security plan docs.



HL7 Health Level 7 to communicate with EHRs
