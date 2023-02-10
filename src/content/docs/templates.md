---
title: Your Saved and Public Labs
description: I am too lazy to think of a description.
author: Ashish Verma
date: 2023-02-08T09:00:00
tags: ["aks", "tooling"]
prevDoc: {
  link: server,
  display: Server
}
nextDoc: {
  link: builder,
  display: Builder
}
---

If you head over to [Templates](https://actlabs.azureedge.net/templates). You will find

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Saved Labs](#saved-labs)
- [What is a public Lab?](#what-is-a-public-lab)
- [How to use public labs?](#how-to-use-public-labs)
- [How to contribute to public labs?](#how-to-contribute-to-public-labs)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Saved Labs

When you build and save a lab, it is saved in your storage account. All your data including your saved labs is stored in a storage account in ’repro-project’ resource group of your subscription. If you delete this storage account, all data will be lost. We don’t keep a copy of your data.

You will be able to see your saved labs in [Templates](https://actlabs.azureedge.net/templates) and reuse them.

## What is a public Lab?

[Templates](https://actlabs.azureedge.net/templates) page along with your saved labs also show you public labs. Public labs are created by comunity for community. These labs cover some schenarios like

- **Frequent repros** : These are scenarios which are very common in AKS world. For example an AKS Cluster with [ingess nginx](https://github.com/kubernetes/ingress-nginx) deployment.
- **Emerging issues** : These are the issues you will coming up very frequently. For example, if there is an issue which happens because of removed API in a minor version upgrade. We see these issues very frequently when clusters are being upgraded.
- **Preview Features** : Labs which will help you get hands on exercise on an upcoming preview feature.
- **New upstream features** : Labs to do hands-on exercise on new upstream features.
- **Complex scenarios** : Other comples scenarios which would require writing an awesome extension script.

You can use public labs to build on top of or to upskill.

## How to use public labs?

Only admins are able to modify a public lab. But you can alwasy *Load to Builder" and save it as your own lab. You can modify it to create another complex scenario.

## How to contribute to public labs?

Our community will ❤️ if you contribute a public lab. Right now the only way to contirbute a lab is to get in touch with Admins. You can *export* your lab and share the file with admin and they will be able to add it to public labs.

```javascript
if (youContributeLab()) {
    weSendLove(you)
}
```
