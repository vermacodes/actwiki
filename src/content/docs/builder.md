---
title: Builder
description: I am too lazy to think of a description.
author: Ashish Verma
date: 2023-02-08T09:00:00
tags: ["aks", "tooling"]
prevDoc: {
  link: server,
  display: Server
}
nextDoc: {
  link: learning,
  display: Learning
}
---

[Builder](https://actlabs.azureedge.net/builder) is used to build a [lab](#lab). This is what makes the tool powerful. Read more about the concept of a lab, extension script and using builder.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Lab](#lab)
- [Template](#template)
- [Extension Script](#extension-script)
  - [How this works?](#how-this-works)
    - [Deploy (Extend) Mode](#deploy-extend-mode)
    - [Destroy Mode](#destroy-mode)
  - [Environment Variables](#environment-variables)
  - [Shared Functions](#shared-functions)
- [Lab Lifecycle](#lab-lifecycle)
  - [Build](#build)
    - [Plan](#plan)
    - [Plan Flow](#plan-flow)
  - [Deploy](#deploy)
    - [Deployment Fow](#deployment-fow)
  - [Destroy](#destroy)
    - [Destroy Flow](#destroy-flow)
  - [Saving your lab](#saving-your-lab)
  - [Sharing Lab](#sharing-lab)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Lab

In simplest term a Lab is a scenario that you would want to create. For example, you may want to create an AKS cluster with following specifications.

- Create a VNET
- Create an Azure Firewall
- Add all required Egress rules to Azure Firewall.
- Create a Private AKS Cluster with UDR
- Create a Jump Server in VNET with Public IP to SSH and hop to access your private cluster.

or maybe,

- Create a VNET
- Create a Private AKS Cluster with Standard LB
- Deploy Ingress Nginx controller and a dummy app on this cluster.

You can use this tool to create and deploy labs. Labs can be saved for re-use in future, exported and shared with others and imported to the tool.

To create, deploy, import or export a lab, you can use [Builder](/builder)

This is what a lab object looks like.

```json
{
 "id": "",
 "name": "",
 "description": "",
 "tags": [],
 "template": {
  "resourceGroup": {
   "location": "East US"
  },
  "virtualNetworks": [],
  "subnets": [],
  "jumpservers": [],
  "networkSecurityGroups": [],
  "kubernetesClusters": [
   {
   "kubernetesVersion": "1.24.9",
   "networkPlugin": "kubenet",
   "networkPolicy": "null",
   "networkPluginMode": "null",
   "outboundType": "loadBalancer",
   "privateClusterEnabled": "false",
   "addons": {
    "appGateway": false,
    "microsoftDefender": false
   },
   "defaultNodePool": {
    "enableAutoScaling": false,
    "minCount": 1,
    "maxCount": 1
   }
   }
  ],
  "firewalls": [],
  "containerRegistries": [],
  "appGateways": []
 },
 "extendScript": "removed for simplicity of docs",
 "message": "",
 "type": "template",
 "createdBy": "",
 "createdOn": "",
 "updatedBy": "",
 "updatedOn": ""
}
```

Lab consists of two important parts.

- [Template](#template)
- [Extension Script](#extension-script)

## Template

Template is a collection of objects and is part of lab object. For example in the object share above, following is the template.

```json
"template": {
  "resourceGroup": {
   "location": "East US"
  },
  "virtualNetworks": [],
  "subnets": [],
  "jumpservers": [],
  "networkSecurityGroups": [],
  "kubernetesClusters": [
   {
   "kubernetesVersion": "1.24.9",
   "networkPlugin": "kubenet",
   "networkPolicy": "null",
   "networkPluginMode": "null",
   "outboundType": "loadBalancer",
   "privateClusterEnabled": "false",
   "addons": {
    "appGateway": false,
    "microsoftDefender": false
   },
   "defaultNodePool": {
    "enableAutoScaling": false,
    "minCount": 1,
    "maxCount": 1
   }
   }
  ],
  "firewalls": [],
  "containerRegistries": [],
  "appGateways": []
 }
```

Go server running in docker container translates this template to TF_VAR environment variables which are then used by [Terraform](/builder) code to deploy resources the way desired. We use [builder](/builder) to modify the template which then influences what the targeted deployment would look like.

Template is already providing us greater flexibility in acheiving complex scenarios with ease. But, its not doing it all. And, probably will never be able to. To achieve more flexibility, we have [Extension Script](#extension-script).

## Extension Script

Extension script gives you the ability to go beyond what this tool can do out of the box and be really creative. You can use this to do everything that can be done using Azure CLI. Some examples use cases are:

- Pulling an image from docker hub to your ACR.
- Deploy an application to Kubernetes cluster.
- Adding additional node pools to your cluster.
- Ordering food online for free. Well, not that, but you get the idea.

### How this works?

This script runs in two primary modes.

- Deploy
- Destroy

#### Deploy (Extend) Mode

When click '**Deploy**' button, the base infra is deployed using terraform code. After that completes successfully, extension script is deployed. Both these steps happen automatically in order. Since extension script runs after terraform apply is finished. It has access to terraform output.
When running in deploy (extend) mode, 'extend' function is called.

```bash
function extend() {
 # Add your code here to be executed after apply
 ok "nothing to extend"
}
```

*See [deployment flow](#deployment-fow)*

#### Destroy Mode

When click '**Destroy**' button, first, extension script runs in destroy mode, and lets you delete the resources that were created in deploy mode. Or do any other activity that must be done gracefully before resources are destroyed.
When running in destroy mode, 'destroy' function is called.

```bash
function destroy() {
 # Add your code here to be executed before destruction
 ok "nothing to destroy"
}
```

*See [destroy flow](#destroy-flow)*

### Environment Variables

Following environment variables are available for script to use. There may be other variables that are not in this list. Any terraform output is automatically added as an even variable for extension script. For example, terraform output "resource_group" is automatically added as an env variable "RESOURCE_GROUP". You can see entire terraform output in the deployment logs.
| Variable | Description |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RESOURCE_GROUP | Name of the resource group in azure. This is where all resources will be deployed. Please note if you create additional resource groups using extension script you need to manage the deleting in destroy function. |
| ACR_NAME | Name of the ACR if deployed |
| AKS_LOGIN | Command to login to the AKS Cluster if deployed |
| CLUSTER_NAME | Name of AKS Cluster if deployed |
| CLUSTER_VERSION | Version of AKS Cluster if deployed |
| FIREWALL_PRIVATE_IP | Private IP address of the firewall. |
| NSG_NAME | Name of the NSG associated with subnet where AKS cluster is deployed, you can use this to add/remove rules using extension scripts" |
| LOCATION | This is the Azure Region where the resources are deployed. None of the resources are given region exclusively. They all inherit it from resource group. |
| VNET_NAME | Name of the virtual network. |
| CLUSTER_MSI_ID | Clusters managed identity ID. |
| KUBELET_MSI_ID | Kubelet's managed identity |

### Shared Functions

There are few things that almost all scripts will do. We are aware of these and added them as shared functions which are available to the script and are ready for use.

- Loging
    `function log()`
    Args: "string"
    Example: `log "this statement will be logged"`

```bash
log() {
  echo -e "[$(date +'%Y-%m-%dT%H:%M:%S%z')]: INFO - $*" >&1
}

log "this statement will be logged in normal font"
```

- Green (OK) Logging
    `function ok()`
    Args: "string"
    Example: `ok "this statement will be logged as INFO log in green color"`

```bash
ok() {
  echo -e "${GREEN}[$(date +'%Y-%m-%dT%H:%M:%S%z')]: INFO - $* ${NC}" >&1
}

ok "this statement will be logged in green color"
```

- Error Logging
    `function err()`
    Args: "string"
    Example: `err "this error occrured"`

```bash
err() {
  echo -e "${RED}[$(date +'%Y-%m-%dT%H:%M:%S%z')]: ERROR - $* ${NC}" >&1
}

err "this statement wil logged in red color"
```

In addition to these, we figured that there are few things that we will be doing over and over again in extension scripts. Ultimate goal is to add them as a flag (Switch Button) and make part of terraform, but as an interim solution they are provided as shared functions.

- Deploy ARO Cluster

```bash
function deployAROCluster() {

    # Set the cluster name, and network name variables
    ARO_CLUSTER_NAME="${PREFIX}-aro"

    az group show --name ${RESOURCE_GROUP} --output none > /dev/null 2>&1
    if [ $? -ne 0 ]; then
        err "Resource Group not found. Skipped creating cluster."
        return 1
    fi

    # Deploy the cluster
    log "deploying aro cluster"
    az aro create \
    --resource-group ${RESOURCE_GROUP} \
    --name ${ARO_CLUSTER_NAME} \
    --location ${LOCATION} \
    --vnet ${VNET_NAME} \
    --master-subnet AROMasterSubnet \
    --worker-subnet AROWorkerSubnet \
    --no-wait
    if [ $? -ne 0 ]; then
        err "Command to create ARO Cluster failed."
        return 1
    fi

    # Wait for the cluster to be ready
    counter=0
    ok "waiting for cluster to be created. this can take several minutes, script will wait for an hour."
    while true; do
        status=$(az aro show --resource-group ${RESOURCE_GROUP} --name ${ARO_CLUSTER_NAME} --query provisioningState -o tsv)
        
        if [[ ${status} == "Succeeded" ]]; then
            ok "cluster created."
            break
        fi
        
        if [[ ${counter} -eq 3600 ]]; then
            err "enough wait.. the cluster is no ready yet. please check from portal"
            break
        fi
        
        
        counter=$((${counter}+30))
        sleep 30

        if [[ ${status} == "Creating" ]]; then
            log "cluster state is still 'Creating'. Sleeping for 30 seconds. $((${counter}/60)) minutes passed."
        else
            log "Wait time didn't finish and cluster state isn't 'Creating' anymore. $((${counter}/60)) minutes passed."
        fi
    done

    # Get the cluster credentials
    log "cluster credentials"
    az aro list-credentials --resource-group ${RESOURCE_GROUP} --name ${ARO_CLUSTER_NAME}

    pass=$(az aro list-credentials -g ${RESOURCE_GROUP} -n ${ARO_CLUSTER_NAME} --query kubeadminPassword -o tsv)
    apiServer=$(az aro show -g ${RESOURCE_GROUP} -n ${ARO_CLUSTER_NAME} --query apiserverProfile.url -o tsv)
    apiServerIp=$(az aro show -g ${RESOURCE_GROUP} -n ${ARO_CLUSTER_NAME} --query apiserverProfile.ip -o tsv)

    ok "Login command -> oc login $apiServer -u kubeadmin -p $pass --insecure-skip-tls-verify"
}
```

- Delete ARO Cluster

```bash
function deleteAROCluster() {

    # Set the cluster name, and network name variables
    ARO_CLUSTER_NAME="${PREFIX}-aro"

    # Deploy the cluster
    log "deleting aro cluster"
    az aro delete \
    --resource-group ${RESOURCE_GROUP} \
    --name ${ARO_CLUSTER_NAME} \
    --yes \
    --no-wait
    if [ $? -ne 0 ]; then
        err "Command to delete ARO Cluster failed."
        return 1
    fi

    # Wait for the cluster to be ready
    counter=0
    ok "waiting for cluster to be deleted. this can take several minutes, script will wait for an hour."
    while true; do
        status=$(az aro show --resource-group ${RESOURCE_GROUP} --name ${ARO_CLUSTER_NAME} --query provisioningState -o tsv)
        
        if [[ ${status} != "Deleting" ]]; then
            ok "cluster deleted."
            break
        fi
        
        if [[ ${counter} -eq 3600 ]]; then
            err "enough wait.. the cluster is not deleted yet. please investigate"
            break
        fi
        
        
        counter=$((${counter}+30))
        sleep 30

        if [[ ${status} == "Deleting" ]]; then
            log "cluster state is still 'Deleting'. Sleeping for 30 seconds. $((${counter}/60)) minutes passed."
        else
            log "Wait time didn't finish and cluster state isn't 'Deleting' anymore. $((${counter}/60)) minutes passed."
        fi
    done
}
```

- Deploy Ingress Nginx Controller.

```bash
function deployIngressNginxController() {
    # Deploy Ingress Controller.
    log "Deploying Ingress Controller"
    NAMESPACE=ingress-basic

    helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
    helm repo update

    helm install ingress-nginx ingress-nginx/ingress-nginx \
    --create-namespace \
    --namespace $NAMESPACE

    # This loop is to wait for 5 minutes to ensure the external ip was allocated to the service.
    for i in {1..11}; do
        log "Checking external ip - Attemp $i"
        if [[ $i -eq 11 ]]; then
            err "Not able to secure external ip"
            exit 1
        fi
        EXTERNAL_IP=$(kubectl get svc/ingress-nginx-controller -n ingress-basic -o json | jq -r .status.loadBalancer.ingress[0].ip)
        if [[ "$EXTERNAL_IP" != "" ]]; then
            ok "External IP : $EXTERNAL_IP"
            break
        fi
        sleep 30s
    done
}
```

- Deploy Dummy App (HTTPBIN)

```bash
function deployHttpbin() {
cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: httpbin
  labels:
    app: httpbin
spec:
  replicas: 1
  selector:
    matchLabels:
      app: httpbin
      role: frontend
  template:
    metadata:
      labels:
        app: httpbin
        role: frontend
    spec:
      containers:
        - name: httpbin
          image: kennethreitz/httpbin
          resources:
            requests:
              cpu: 500m
---
apiVersion: v1
kind: Service
metadata:
  name: httpbin
  labels:
    app: httpbin
spec:
  selector:
    app: httpbin
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: azure/application-gateway
  name: httpbin-ingress-agic
  namespace: default
spec:
  rules:
  - host: httpbin-agic.evaverma.com
    http:
      paths:
        - path: /
          pathType: Prefix
          backend:
            service:
              name: httpbin
              port:
                number: 80
EOF
}
```

## Lab Lifecycle

```mermaid
sequenceDiagram
App ->> Server : Build
App ->> Storage Account : Save
Storage Account ->> App: Load To Builder
App ->> Server: Plan
App ->> Server: Deploy
App ->> Server: Destroy
```

### Build

A lab is built using [Builder](/builder). Flags in builder can be used to build a tempalte and if needed, extension script can be used to extend it even furhter. A lab is not [saved](#saving-your-lab) by default.

#### Plan

You can do a [`terraform plan`](https://developer.hashicorp.com/terraform/cli/commands/plan) using '*Plan*' button in [Builder](/builder). This will generate a terrafrom plan and you will be able to see output.

I highly recommend to run a plan before deploymnet just to be sure you dont accidently delete stuff you dont intend to.

***Note**: [Extension script](#extension-script) is not tested/executed in plan mode*

#### Plan Flow

```mermaid
sequenceDiagram
App ->> Server : Terraform Plan
Server ->> App: Success
```

### Deploy

In a nutshell this will deploy the lab. This is a two step process.

- [`terraform apply`](https://developer.hashicorp.com/terraform/cli/commands/apply) - when you hit *'Deploy'* button, first, terraform part of the lab is deployed. The lab object contains 'template' object. These are the values that server will translate to terraform variables and set them as environment variables in [server](/server). After the terraform apply is successfuly, [execention script](#extension-script) will be executed.

#### Deployment Fow

```mermaid
sequenceDiagram
App ->> Server : Deploy Request
Server ->> Azure : Terraform Apply
Azure ->> Server: Success
Server ->> App: Success
App ->> Server: Extension Script (Deploy)
Azure ->> Server: Pull Terraform Output
Server ->> Azure: Exteion Script (Deploy)
Azure ->> Server: Success
Server ->> App: Success
```

- [extension script](#extension-script) - extension script is a huge topic, its covered in its own section.

***Note:** Its important that you [Plan](#plan) before deploymnet to avoid accidently deleting stuff that you dont want to.*

### Destroy

You can destroy the resources created with this tool by using '*Destroy*' button. It executes [extension script](#destroy-mode) in destroy mode and then executes [terraform destroy](https://developer.hashicorp.com/terraform/cli/commands/destroy)

#### Destroy Flow

```mermaid
sequenceDiagram
App ->> Server : Detroy Request
Azure ->> Server : Pull Terraform Output
Server ->> Azure : Extension Script (Destroy Mode)
Azure ->> Server: Success
Server ->> App: Success
App ->> Server: Terraform Destroy
Server ->> Azure: Terraform Destroy
Azure ->> Server: Success
Server ->> App: Success
```

### Saving your lab

You should be able to recreate simple scenarios easily. But for complex scenarios especially when you end up using [Extension Script](#extension-script) then it becomes absolutely necessary to save your work. You can use '*Save*' button in [Builder](/builder) to save your work. You will be presented with a form and following information will be requested.

- **Name:**: I know it's hard to name stuff. But try your best to give one liner introduction of your lab.
- **Description**: Add as much information as humanly possible. It's important that you get the idea of what this lab does when you come back later after a month and shouldn't have to read the extension script. trust me, it's important.
- **Tags**: Plan is to add search feature later which will help you find labs based on tags, something like tags in stack overflow.
- **Template**: This is auto populated.
- **Extension Script**: This is auto populated.

- **Update**: This will update the existing lab.
- **Save as New**: This will save as a new lab. Use this to make a copy of your existing lab.

### Sharing Lab

- **Export** - You can use '*Export*' button in [Builder](/builder) to export lab to a file, which then can be shared with anyone, and they can use this to import and use.
- **Import** - You can use '*Import*' button in [Builder](/builder) to import lab from a file. You can then [Save](#saving-your-lab) it in your templates.
- **[Shared Templates](https://actlabs.azureedge.net/templates)** - There are some pre-built labs that you can use to get a head start.
- **Contributing to shared templates.** - *Coming soon*
