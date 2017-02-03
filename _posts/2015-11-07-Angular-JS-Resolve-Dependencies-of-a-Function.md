---
title:  "Angular Js Resolve Dependencies Of A Function"
categories:
  - Web
tags:
  - AngularJS
---


The requirement is to invoke a function in an angular app but also wanted the depencies of the function (parameters) such as servies and factories to be injected automatically.

{% highlight javascript %}
function CustomFunction(MyAngularService) {
}
{% endhighlight %}

When the function is invoked, the service should be injected automatically and also I should be able to pass additional parameters which are not injectables.

As it turns out, its really an easy task with the $injector service.

{% highlight javascript %}
 $injector.invoke(CustomFunction);
{% endhighlight %}

Doing so will provide all the depencies required for the function and invoke it. Pretty awesome. It's also worth noting that there is an `instantiate` method as well in `$injector` service which will create a new instance out of the provided constructor function.

### Passing Custom Parameters
As I mentioned above I also wanted to pass additional parameters to the function in addition to the injectables like below.

{% highlight javascript %}
function CustomFunction(MyAngularService, name) {
}
{% endhighlight %}

`name` is a custom parameter that I should provide.

This is how its done.

{% highlight javascript %}
$injector.invoke(CustomFunction, this, { name: 'Raathi' });
{% endhighlight %}

The third paramter of the `invoke` method is an object where you can specify your custom parameters. The `$injector` will go through the third object to see if a particular parameter is present. If its not present only, it will check the angular app for such injectable.

Here is the [stackoverflow question I created](http://stackoverflow.com/questions/33216783/angular-js-resolve-dependencies-of-a-custom-function) to help with this issue.

Happy Coding People!
