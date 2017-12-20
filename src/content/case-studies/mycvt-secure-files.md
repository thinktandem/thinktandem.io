---
title: "Secure File Store"
logo: images/clients/cvt/cvt.png
org: California's Valued Trust
byline: We helped <strong>California's Valued Trust</strong> create a secure store of files in the <strong>Drupal</strong> content management system for <strong>HIPAA</strong> compliance.
image:
  src: /images/case-studies/mycvt1.png
  title: MyCVT Enrollment Page Screenshot
seo:
  description: byline
challenge: Allow thousands of users to upload documents and allow administrators to review them, while keeping all assets encrypted and secure.
solution: Extend Drupal's file system with AES encryption with tight permissioning around access.
impact: More than 60K documents uploaded, stored, and reviewed.
quote:
  content: All I want is to have some peace of mind.
  author: Boston
metrics:
  - key: Documents Uploaded
    value: 60K+
  - key: Technology Used
    value: Drupal
  - key: Encryption Standard
    value: AES

tech: drupal
industries: health
services: strategy, development

background: BD587A
layout: layouts/case-study.html
slug: cvt-secure-files
dark: false
permalink: true
private: false
date: 2017-03-23
---

California's Valued Trust (CVT) needed a way for their thousands of subscribers to submit documents as part of their insurance enrollment. These documents would include birth certificates, marriage certificates, and other pieces of personally identifiable information (PII). As a covered entity with HIPAA compliance requirements, CVT needed to know this sensitive PII would be safe.

While Drupal, the content management system powering MyCVT, didn't provide an out-of-the-box encrypted file solution, Tandem had a plan. Using AES encryption, we wrote a Drupal module extending Drupal's file system to encrypt all private documentation in MyCVT. Even if the file system were compromised, attackers would need to decrypt the documents in order to gain access to them.

Security didn't come at the price of usability. Tandem was able to create an easy interface for uploading the documents, as well as a system for administrative users to review and approve the documents. Audit records allow support staff to understand who uploaded and reviewed the documents.

With the new file store, CVT was able to process insurance enrollment applications much more efficiently, replacing the onerous system of receiving paper copies of documents and physically filing them. Using open-source technologies, Tandem was able to improve CVT's usability while also bolstering security and HIPAA compliance.
