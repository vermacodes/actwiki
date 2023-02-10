---
title: Get Started
description: I am too lazy to think of a description.
author: Ashish Verma
date: 2023-02-08T09:00:00
tags: ["aks", "tooling"]
prevDoc: {
  link: introduction,
  display: Introduction
}
nextDoc: {
  link: server,
  display: Server
}
---

To get started, headover to [ACT Labs Start](https://actlabs.azureedge.net/start) page and follow the simple setup wizard.

This setup wizard will help you with following.

- Running server on your computer.
- Select your Azure Subscription.
- Authenticate Azure CLI
- Create Storage Account
  - Storage Account will get a random generated name.
  - You can see this storage account name in settings.
  - This storage account will be created in a resource group named 'repro-project' in your selected subscription.
  - You will see that two containers are created in this storage account.
    - **tfstate**: terraform state files will be stored in this container.
    - **labs**: the labs that you will save will be stored in this container.

Important points to note

- All your data is stored in a storage account in '_repro-project_' resource group of your subscription. If you delete this storage account, all data will be lost. We don't keep a copy of your data.
- Make sure there is exactly one storage account in '_repro-project_' resource group. If you create additional storage accounts in this resource-group, you will see unexpected behaviors.

> If this is the first time you are setting up. It will take sometime to download the image. After its cached it should be faster every othertime.
