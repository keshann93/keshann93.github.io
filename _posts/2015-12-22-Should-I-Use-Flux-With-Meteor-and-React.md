---
title:  "Should I Use Flux With Meteor and React"
categories:
  - Web
tags:
  - React
  - Meteor
---

Since the day I started using [MeteorJS](https://www.meteor.com/) with [ReactJS](https://facebook.github.io/react/) I had this question unanswered, Should I Use Flux With Meteor and React?

### What is Flux?
[Flux](https://facebook.github.io/flux/) is a design pattern like MVC that facebook proposed to use with ReactJS applications. Flux encourages uni-directional data flow and makes the application easy to understand. There are many components in the traditional flux architecture like actions, action creator, dispatcher and store.

There are several implementations of flux architecture available now. Each implementation has their opinionated changes from the traditional flux pattern proposed by facebook.

### Redux
Out of all the flux implementations, the most popular and well-praised implementation of flux is the [redux](https://github.com/rackt/redux) library. Redux library is implemented by [Dan Abramov](https://github.com/gaearon) who currently works at facebook. Also redux is not a ReactJS dependent library but it's a general purpose JavaScript application state container. You can use Redux with React, Angular and etc. What makes redux so special is that, it's not just a flux library but it has a whole eco-system around it with developer tools and bindings to integrate with various different front-end technologies.

> If you want to learn Redux, [start here](https://egghead.io/series/getting-started-with-redux). Free video tutorials by the creator, Dan Abramov himself. Very well explained.

### Is flux doing any good in a Meteor app with React?
The confusion I had was weather to choose Flux or not with the Meteor app was, because Meteor has some special abilities like server side method calls, client side collections and reactive variables and much more than a normal traditional JavaScript application which uses a traditional REST API to communicate to the server.

### Meteor and React without Flux - Not So Good
The application I was working on was not a very simple but also not very complex. An app with a medium complexity. So I started off without flux. Components subscribe to data sources through `ReactMeteorData` mixin which keeps the components up-to-date. Components also can call meteor methods themselves. Things didn't look so good with this approach. When the application had multiple subscriptions, things felt a bit complex to understand and manage.

### The Introduction of Redux
This is the first time I started using Redux in a production app and I felt the difference right after the first refactoring. Things started looking really simple. The good part about following a pattern is you know where to look for stuff in your application.

Since Redux is also bit complicated, [this](http://marmelab.com/blog/2015/11/27/meteor-webpack-react-redux.html) post helped me vastly to integrate redux with Meteor and the accompanied repo [https://github.com/djhi/my-nutrition](https://github.com/djhi/my-nutrition) has a production grade application fully implemented. Check the repo and go through it slowly and you won't regret it.

> The final takeaway from this post is, Even though Meteor is so powerful and allows to a lot of magic. If you application is complex its very easy to get out of hand. And when you add React, a component based library to the formula, there is a higher chance of maintainability issues being introduced in the long run. So it's very recommended to use a flux library like Redux to make the life easier with Meteor.
