---
title:  "Using FakeItEasy To Fake Objects"
categories:
  - DotNet
tags:
  - FakeItEasy
---

##Introduction##
Fake objects allows to unit test components individually by faking the behavior of dependent components. [Fake it easy](http://fakeiteasy.github.io/) is a framework which allows to create fake objects effectively and the API of the framework is very easy to understand. This post takes a look into some handy techniques to make unit testing easy with fake it easy.

We have a Car and an Engine as follows.

{% highlight C# %}

public interface IEngine
{
   string ModelNo { get; set; }

   bool IsRunning();

   void Start();
}

public class Engine : IEngine
{
    public string ModelNo { get; set; }

    public bool IsRunning()
    {
        throw new System.NotImplementedException();
    }

    public void Start()
    {
        throw new System.NotImplementedException();
    }
}

public class Car : ICar
{
   private readonly IEngine engine;

   public Car(IEngine engine)
   {
       this.engine = engine;
   }

   public void Start()
   {
       if (!engine.IsRunning())
       {
           engine.Start();
       }
   }

}
{% endhighlight %}

The engine is injected into the car through the constructor. Intention of the unit test is to ensure than when some body calls Car.Start(), Engine.Start() should be called when the engine is not running.

Since we are testing the implementation details of the Car, we don't need to worry about the Engine here, so we could simple create a fake engine and use it in our test.

##Testing With Fake Engine##

{% highlight C# %}
[Fact]
 public void Engine_Sould_Be_Started()
 {
     var fakeEngine = A.Fake<IEngine>();
     A.CallTo(() => fakeEngine.IsRunning()).Returns(false);

     var car = new Car(fakeEngine);
     car.Start();

     A.CallTo(() => fakeEngine.Start()).MustHaveHappened(Repeated.Exactly.Once);
 }
 {% endhighlight %}

 Let's go through the above code line by line.

 1. Creating a fake engine by providing the interface to Fake it easy.
 2. Saying to fake it easy, "If someone invokes IsRunning() return false always."
 3. Creating a Car object with the fake engine.
 4. Starting the Car.
 5. Asserting to check weather Start() method is invoked in the fake engine.

 We have isolated the engine from our test case and tested the logic of our car class successfully.

##Fake It Easy Quick Reference##

Creating a fake object using an interface.

{% highlight C# %}
var fakeDog = A .Fake<IDog>();
{% endhighlight %}

Returning when a method is invoked on the fake object.

{% highlight C# %}
A.CallTo(() => fakeDog.IsAlive()).Returns(true);
{% endhighlight %}

Assigning Ref and Out Parameters. The result variable will be assigned with "success".

{% highlight C# %}
A.CallTo(() => fakeObject.AwesomeMethod(out result))
              .AssignsOutAndRefParameters("success");

{% endhighlight %}

Asserting weather a method was invoked.

{% highlight C# %}
A.CallTo(() =>fakeDog.Bark()).MustHaveHappened();
{% endhighlight %}

Asserting weather a method was invoked exactly once.

{% highlight C# %}
A.CallTo(() =>fakeDog.Bark()).MustHaveHappened(Repeated.Exactly.Once);
{% endhighlight %}

Asserting weather a method was invoked with particular parameter where the parameter is a complex object.

{% highlight C# %}
A.CallTo(() => fakeStudent.Update(A<Details>.That.Matches(p =>
               p.Name == "Sam" &&
               p.Age == 10 ))).MustHaveHappened();
{% endhighlight %}
