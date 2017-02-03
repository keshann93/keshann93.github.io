---
title:  "TypeScript 'For-of' loop"
categories:
  - Web
tags:
  - TypeScript
---

TypeScript is implementing ES6 and ES7 features more and more with every new release. Now we have the awesome For-of loop in TypeScript 1.5.

If we want to iterate through an array of items in ES5 (The current version of JavaScript), we could use for loop as below and get things done.

{% highlight javascript %}
var Items = ["Key", "Phone", "Car"];

for (var x = 0; x < Items.length; x++) {
	console.log(Items[x]);
}
{% endhighlight %}

I think you would agree that this code is not very readable.

## For-In Loop
JavaScript (ES5) also has a For-In loop which we could use to iterate over an array as below but IT DOESN'T WORK AS EXPECTED.

{% highlight javascript %}
var Items = ["Key", "Phone", "Car"];

for (var x in Items) {
	console.log(x);
}
{% endhighlight %}

Instead of printing out the items in the array to the console, the above code prints out the index of the array as follows.

{% highlight javascript %}
> 0
> 1
> 2
{% endhighlight %}

Well that sucks.

> UPDATE: As [Sabry](https://twitter.com/sabry1991) pointed out in the comment, For-In should be used to iterate over the properties of an object and should not be used with arrays. [The MDN documentation discusses this further.](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/for...in)

## TypeScript / ES6 Is To Rescue
We can use the For-of loop of ES6 in TypeScript today if you are using the very latest version of TypeScript.

### The For-of Loop Of TypeScript
Due to this limitation of the For-in loop, ECMASCRIPT 6 introduces For-of loop.

For-of loop looks like this.

{% highlight javascript %}
var Items = ["Key", "Phone", "Car"];

for (var x of Items) {
	console.log(x);
}
{% endhighlight %}

This code prints out the elements in the array as we would expect.

{% highlight javascript %}
> Key
> Phone
> Car
{% endhighlight %}

For-of loop is available in TypeScript 1.5. If you are compiling to ECMASCRIPT 5 in TypeScript, under the hood TypeScript is translating this into good old for loop as below.

{% highlight javascript %}
var Items = ["Key", "Phone", "Car"];
for (var _i = 0; _i < Items.length; _i++) {
    var x = Items[_i];
    console.log(x);
}
{% endhighlight %}

Take a look at the [live demo here.](http://www.typescriptlang.org/Playground#src=var%20Items%20%3D%20%5B%22Key%22%2C%20%22Phone%22%2C%20%22Car%22%5D%3B%0D%0A%0D%0Afor%20(var%20x%20of%20Items)%20%7B%0D%0A%09console.log(x)%3B%0D%0A%7D)

The advantage of this is, our code looks sexy and readable and I personally think that is awesome.
