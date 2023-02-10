---
title: Labs for Learning
description: I am too lazy to think of a description.
author: Ashish Verma
date: 2023-02-08T09:00:00
tags: ["aks", "tooling"]
prevDoc: {
  link: learning,
  display: Learning
}
nextDoc: {
  link: mock-cases,
  display: Mock Cases
}
---

> This part of tool is only accessible to ACT Readiness team. If you are not able to access/view this but should be please reachout to ACT Readiness Team.

### How to create a lab exercise?

Labs for Readiness traning can be built using [Builder](builder#builder). When [saving lab](builder#saving-your-lab), select '_labexercise_' as the type of lab. One additional requirement readiniess labs has is the validation script which is part of extension-script. You can write validation code in `function validate()` section of the script and it will be run when user hits '_Validate_' button in [Learning](learning) section on the assigned lab. For any additional questions, please reachout to readiness team.

### How to assign lab exercise?

Lab can only be assigned to an engineer by a priviledged user. To assign a lab.

- Navigate to [Labs](https://actlabs.azureedge.net/labs)
- Find the lab you would want to assign.
- Enter user's alias and hit '_Assign_' button.
- You will see confirmation of assignment or Failure if any. If you get Failure, please ensure the user's alias is correct. If issue persists, please reachout to ACT readiness team.
- After assignment is done, you will be able to manage [assingments here](https://actlabs.azureedge.net/assignments)
