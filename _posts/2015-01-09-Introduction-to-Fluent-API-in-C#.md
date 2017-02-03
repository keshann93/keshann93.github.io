---
title:  "Introduction to Fluent API in C#"
categories:
  - C#
---
In object orientation programming, fluent APIs are just like any other APIs but they provide a more human redable code. Consider a scenario where we want to build an object called Car and assign some properties to it.

{% highlight C# %}
Var Car = new Car();
Car.Name = "Tesla Model S";
Car.Type = "Electric";
Car.Color = "Blue";
{% endhighlight %}

Arguablly the above code is still readable. If we are to translate the above code to plain english, it would be, "Create a car with the name Tesla Model S, which is type of electric with blue color".

The fluent APIs will provide the ability to write code which looks some what close to the translated englist phrase.

So the code would look like the following if this car is created with a fluent API.

{% highlight C# %}
var Car = new Car()
        .WithName("Tesla Model S")
        .WithType("Electric")
        .WithColor("Blue");
{% endhighlight %}

Isn't that a more clear way to build the car object. Isn't that Neat?

So let's see the implementaion of the fluent car builder which will build cars for us.

{% highlight C# %}
public class Car{
	public string Name {get; set;}
	public string Type {get; set;}
	public string Color {get; set;}

	public Car WithName(string Name){
	  	this.Name = Name;
	  	return this;
	}

	public Car WithType(string Type){
	  	this.Type = Type;
	  	return this;
	}

	public Car WithColor(string Color){
		this.Color = Color;
		return this;
	}
}
{% endhighlight %}

The key thing to notice here is that we are returning 'this' in all the methods. This allows us to chain the method calls one after the other making the code redable and fun to write.

Another imporant advantage of fluent style API is, they are self discoverable. Meaning that they are easy to learn than normal APIs.

Even C# team realized the convenience of fluent style API's and used them to implemented API like LINQ. Consider the following example.

{% highlight C# %}
var Results = items.Where(e => e.Approved)
    .OrderBy(e => e.ProductionDate)
    .Select(e => e.Name)
    .FirstOrDefault();
{% endhighlight %}

Even though fluent APIs are neat, they wont be appicable for all the situations. As programmers we have a tendency to apply the new thing we learn in all the places. Honestly I tried to apply fluent API in several situations when I got to know about them. But in some instances they just dont work. But there are best fit certain scenarios where fluent APIs excel as well. So use them wisely!
