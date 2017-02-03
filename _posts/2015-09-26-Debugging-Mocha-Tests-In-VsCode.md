---
title:  "Debugging Mocha Tests in VSCode"
categories:
  - Web
tags:
  - Mocha
  - VSCode
---


VS Code proving to be a very capable editor to me. In this post I will go over the steps to debug [Mocha](https://mochajs.org/) unit tests for NodeJs in VS Code.

Let's assume you have all your tests under a folder called **_test_**.

1. Create a launch.json file and add a new task named **Run Mocha**.
2. Install Mocha globally using the command **npm install mocha -g**
3. Configure the VS Code task as below in the launch.json file.

<script src="https://gist.github.com/Raathigesh/2dd2979a358b7fc93177.js"></script>

Put a debug point and run the task.
