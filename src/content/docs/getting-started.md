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

When you are using this tool, we want to make sure that none of the sensitive information leaves your system or subscription. To truly achieve that you have to host the server component.

<iframe src="https://microsoft-my.sharepoint.com/personal/ashisverma_microsoft_com/_layouts/15/embed.aspx?UniqueId=c9027db6-c445-4e18-aad7-2486dfe87147&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="02 - ACT Labs - Run Server and Login.mp4"></iframe>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [How to host the server component?](#how-to-host-the-server-component)
- [What all will the script do?](#what-all-will-the-script-do)
- [Host server on docker running locally in your system](#host-server-on-docker-running-locally-in-your-system)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)
- [Host in your subscription in a WebApp](#host-in-your-subscription-in-a-webapp)
  - [Prerequisites](#prerequisites-1)
  - [Steps](#steps-1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## How to host the server component?

There are two options to do that.

- Host server on docker running locally in your system
- Host in your subscription in a WebApp.

To make lives easy, we have a script which will do it all for you, doesnt matter which option your wanna choose. You must be wondering what all this script will do? or what all is needed to set it up? We've owe you the answer. Read on..

## What all will the script do?

- **Resource group :** We will create a resource group in your subscription named `repro-project`. All the resources needed for you to run this tool will be deployed in this resource group.
- **Storage account :** We will create a storage account in `repro-project` resource group, named `youralias-sa-random4chars`. This storage account will be used to store the data needed for the tool to run. Like terraform state, labs that you will save, your persistent settings etc.
- **Key vault :** We will create a key vault in `repro-project` resource group, named `youralias-kv-random4chars`. This key vault will be used to store the secrets needed for the tool to run. Like the credentials for the service principal that will be created for you to run the tool.
- **Service principal :** We will create a service principal named `youralias-actlabs`. This service principal will be used to run the tool. It will be given the contributor and user access administrator role on the subscription.
- **WebApp :** If you choose to host the server in your subscription, we will create a webapp in `repro-project` resource group, named `youralias-webapp-actlabs`. This webapp will be used to host the server component of the tool.

## Host server on docker running locally in your system

### Prerequisites

You need to have following installed on your system.

- Docker
- Azure CLI
- WSL2 (Windows only)

### Steps

Run the following command in your terminal.

```bash
curl -o actlab.sh -sLO https://aka.ms/ACTLabStart; chmod +x actlab.sh; ./actlab.sh; rm actlab.sh
```

This will start the script and will ask you to confirm the subscription in which you want to host the server. Once you confirm, it will start the process of creating the resources. Once the resources are created, you will be able to use the tool.

## Host in your subscription in a WebApp

### Prerequisites

You need to have following installed on your system.

- Azure CLI
- WSL2 (Windows only)

### Steps

Run the following command in your terminal.

```bash
curl -o actlab.sh -sLO https://aka.ms/ACTLabsWebAppDeploy; chmod +x actlab.sh; ./actlab.sh; rm actlab.sh
```

This will start the script and will ask you to confirm the subscription in which you want to host the server. Once you confirm, it will start the process of creating the resources. Once the resources are created, it will output the endpoint of your webapp, which you need to configure in tool's settings `server Endpoint`. Once you configure the endpoint, you will be able to use the tool.
