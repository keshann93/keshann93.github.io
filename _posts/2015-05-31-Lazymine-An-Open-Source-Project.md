---
title:  "Lazymine - An Open Source Project"
categories:
  - Tools
tags:
  - React
---

Softwares should make our lives easier. We daily rely on softwares to get various things done. Unfortunately not all the softwares provide the same user experience as we would expect.


Redmine, An open source time tracking software which provides a lot of additional functionalities too is a great platform to manage time-sheets for organizations. But unfortunately the experience one would go through to enter time daily is not that pleasant. So we wanted to change that. One of my colleague had an idea to write a client that would ease the process of entering time to Redmine.


So couple of us got together and started writing Lazymine. Lazymine is a desktop client built with user experience in mind with cutting edge web technologies.


Luckily Redmine has a REST API to work with. We decided to develop the client with React JS. React JS is still a young framework but it got very good attention and being constantly adopted by various people to build web applications. So this would be a great opportunity to learn React JS as well. Since we wanted to distribute the application as a desktop app, we used [NW.JS](http://nwjs.io/) (Also formerly known as Node-WebKit) to package as a desktop application.


We also wanted to make this project completely open-source and transparent. The project can be located [here in Github](https://github.com/Raathigesh/Lazymine). Thanks to Github pages, we also got [a web site](http://lazymine.github.io/) to support the project. The first alpha release will be soon and following the first release there will be incremental releases with more features and bug fixes. Also follow [@lazymine](https://twitter.com/lazymine) to stay updated. If you are also using Redmine and if you feel Lazymine would also benefit you, start contributing right away :)

I will post further details about the internals of the projects in another post.
