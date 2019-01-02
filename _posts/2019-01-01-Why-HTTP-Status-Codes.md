# Why HTTP Status Code matters?

Here I am finally!! Jan 1st 2019 with a hope of making a change in me trying to
articulate my very first blog post. I promise this is gonna be a strictly short
read.

#### Introduction

I have been developing REST API’s for past few years and this question of Why
HTTP status codes are important to be considered always strikes me. Choosing the
right status code for different context seems a hectic task, where I find some
status codes are defined unnecessarily. So the real question is why we need
status codes and how we can make sure we have chosen the right code during the
design of any REST API.

#### The real hassle

The two of the most common status codes that any developer would come across
are:

* When the page renders or the data needed is available then Great! return `200`.
* If data/page does not exist then return `404`.

The interesting part is sometimes the most common known status codes even
question you back like below:

* Whether you defining it correctly or not?
* Is your design compliant with
[Roy-fielding](https://en.wikipedia.org/wiki/Roy_Fielding)’s status codes?
* Should the API call return `200` or should it be `204 No Content` or should it
be `202 Accepted` or should it be `201 created`

Gosh!!, this would crack your brain for a while and drinking plenty of water
would make you feel better. We are kind of lost now thinking through the real
hassle that anyone would face during API design & implementation.

#### Still Why!!!

Below points can be taken into consideration for an argument favouring specific
status codes are unnecessary:

* Status codes which exist now are considered to be general for modelling a
website/ API.
* API responses need to be to be specific for an application-specific format
* Should be more specific enough and transparent to show failures and reason out
them which helps the client-side to respond in a meaningful manner.
* Then where does HTTP status codes are applicable and useful

The real reason behind the use of HTTP status codes is:

> HTTP is a layered system where HTTP library sits between client and server would
> work better if meaninful response codes are returned.

#### How to start

Below are a few places where I believed I could have saved time in debugging my
application, If I would have used the right status code:

* Not mixing up the usage of `502 Bad Gateway` `500 Internal Server Error` & `503
Service Unavailable`
* Identify the right use of `404 Not Found` and `405 Method Not Allowed`

Below is a diagram that illustrates a decision tree that could be handy in
deciding the status codes depending on the context of use.

![](https://cdn-images-1.medium.com/max/800/1*u49qmt3X4dlxtK2DGRzTKQ.png)
<span class="figcaption_hack">General decision tree diagram for choosing HTTP codes (Source: codetinkerer.com)</span>

#### Conclusion

I will be continuing in detail on interesting status codes and its applicability
in different scenarios. This will eventually explain in detail the
above-mentioned decision tree diagram

* [API](https://medium.com/tag/api?source=post)
* [Rest Api](https://medium.com/tag/rest-api?source=post)
* [Rest](https://medium.com/tag/rest?source=post)

### [Nageswaran Keshan](https://medium.com/@keshshen)
