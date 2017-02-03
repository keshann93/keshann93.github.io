---
title:  "Mocking HTTP Requests with Axios Mock Adapter"
categories:
  - JavaScript
tags:
  - Axios
  - Unit Test
---

[Axios](https://github.com/mzabriskie/axios) is a promise based HTTP client. In unit tests, sending an actual request to the server when executing the test is not a good practice.

Let's say we have a library which uses axios to make HTTP requests as follows.

```javascript
// lib.js

import http from 'axios';

export function fetchPost() {
  return http
    .get('http://awesome.com/posts')
    .then((response) => {
        return response.data;
    })
}
```

We want to unit test this method but without acually sending a request to the server. That's where [axios-mock-adapter](https://www.npmjs.com/package/axios-mock-adapter) comes to rescue.

```javascript
// lib.test.js

import { expect } from 'chai';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchPost } from './lib'

describe('Lib', () => {
  it('Should return data from response', (done) => {
    let mockAdapter = new MockAdapter(axios);

     mockAdapter.onGet('http://awesome.com/posts').reply(200, {
       data: {
         posts: ['Intro to git']
       }
     });

     let response = fetchPost();

     setTimeout(() => {
        expect(response.posts[0]).to.be.equal('Intro to git');
     }, 0)
  });
});
``` 

Hope this small write up helps you to test your components which uses axios to send HTTP requests.

Happy unit testing!