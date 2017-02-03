---
title:  "Atmo — UI based Server Side API Mocking Tool"
categories:
  - Tools
tags:
  - NodeJS
---

Most of the web projects are backed by a web server serving the required data through various technologies such as HTTP based Rest APIs, Socket server for real-time communication, Proxy endpoints to make cross origin communication easy, GraphQL endpoints which provides the luxury for the applications to say what data they really need and many more.

When you start building your front-end, There could be situation a where the server that supposed to provide you data is not ready yet. In such situation, a mock server which could provide you fake data would be a great advantage.


[Json-server](https://github.com/typicode/json-server) is an awesome tool to build mock REST APIs. But certain use cases requires more than just a REST API.

Introducing [Atmo](https://github.com/Raathigesh/Atmo).

<figure>
  <img src="{{ site.url }}{{ site.baseurl }}/images/Atmo/Atmo.png" alt="">
  <figcaption>Atmo mission control.</figcaption>
</figure>

I spent the last month building Atmo, a tool to make your prototyping journey better. Atmo presents you a simple UI, the Atmo mission control, where you could build your APIs as you like and get them up and running with a click of a button.

Atmo supports

- Mocking HTTP endpoints
- In-built Socket.io server
- Proxying HTTP requests
- In-built support for [Json-Server](https://github.com/typicode/json-server)
- Mocking GraphQL endpoints (Experimental)
- Static content folder
- Exporting project as Json file
- Importing an Atmo project
- Code generation through generators — [ExpressJS/ES5 Generator](https://github.com/Raathigesh/AtmoExpressES5Generator)
- Deployment via [https://zeit.co/now](https://zeit.co/now)

Take a look at the mission control UI of [Atmo](http://atmo.surge.sh/). Please keep in mind that this demo is just to showcase the UI and it is not fully functional.
To see the capabilities of Atmo, Install the atmo npm module globally and execute the command atmo to launch the tool.

```
$ npm install atmo -g
```

```
$ atmo
```
<figure style="width: 450px" class="align-right">
  <img src="{{ site.url }}{{ site.baseurl }}/images/Atmo/AtmoCmd.gif" alt="">
  <figcaption>Launch with a single command.</figcaption>
</figure>

I like building developer tools and I’m glad the way how Atmo turned out. Atmo is built with technologies such as ReactJs, Mobx and Node JS.

let me know what you think about Atmo below in the comments and share your thoughts on enhancements that would make Atmo more useful. Something not working as advertised, feel free to open an issue in the GitHub repository.