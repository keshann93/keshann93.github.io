---
title:  "Writing Unit Testable Code in C# with Dependency Injection"
categories:
  - DotNet
tags:
  - UnitTesting
---

##Hello Test Driven Development##

The idea of test driven development is to drive the development through unit tests. When ever we attempt to write a unit of code or a method we follow the following steps.

- First write a unit test case for the method. This test case is going to fail at first because we don't have our actual method implemented yet. Can't even compile the code sometimes.
- Write the actual method with the minimum code required to make the test case pass.
- Refactor the method while keeping the test passing.

Test driven development also helps improve the productivity because while writing a particular method, you can isolate and test a particular method, rather than debugging the entire application. If it's a web application, the time to activate the entire application and debug a particular part of code is waste of time.

##Problem with Dependencies While Unit Testing##

Another important nature of unit test is, they should execute fast and no matter how many time they execute, should produce the exact same results. Assume a method is performing an database update operation and every time you run the unit test case, its going to update the database. That's not an acceptable behaviour of a unit test. The moment your method makes a call to an external database while running, the unit test actually becomes an integration test. The outcome of the test is going to change every time depending on the values persisted in the database which is again violates the rules of unit testing.

So how do we make sure to eliminate external dependencies such as database from unit testing. That's the tricky part. In-order to do test driven development, the code also should have a TDD complying design. Otherwise its very hard to follow TDD.

Let's explore by example. Let say we have an order class as follows and we want to unit test this class.

{% highlight C# %}
public class Order{
    public int OrderId {get; set;}
    public Type OrderType {get; set;}

    private DbConnection con;

    public Order(){
      con = new DbConnection();
    }

    public bool SaveOrder(){
         bool result;
        if(OrderType == Type.Rush)
        {
            result = con.SaveRushOrder(OrderId);
        }
        else
        {
            result = con.SaveOrder(OrderId);
        }

        return result;
    }
}
{% endhighlight %}

We can write a test like following but is this truly a unit test. Every time we execute this test, its going to update a record in the database because the "Order" class is creating a "DbConnection" and invoking save operations on them, which is not what we want.

{% highlight C# %}
public void OrderTest(){
    Order testOrder = new Order();
    testOrder.OrderType = Type.Rush;

    var result= testOrder.SaveOrder();

    Assert.Equal(true, result);
}
{% endhighlight %}

##Injecting Dependencies (Dependency Injection)##

So how we do prevent this. The problem with our Order class is that it's tightly coupled with DbConnection class. DbConnection is a dependency of Order class but its not allowing us to control that dependency rather its creating its dependencies inside the class. Which is a very bad practice in object oriented programming.

Let do some change here to make the "Order" class more testable.

{% highlight C# %}
public Interface IPersistanceConnection{
    void SaveRushOrder(int OrderId);
    void SaveOrder(int OrderId);
}

public Class DbConnection : IPersistanceConnection{
    public void SaveRushOrder(int OrderId){
        //Actual persistance implementation goes here
    }

    public void SaveOrder(int OrderId){
        //Actual persistance implementation goes here
    }
}

public class Order{
    public int OrderId {get; set;}
    public Type OrderType {get; set;}

    private IPersistanceConnection con;

    public Order(IPersistanceConnection connection){
      con = connection;
    }

    public bool SaveOrder(){
         bool result;
        if(OrderType == Type.Rush)
        {
            result = con.SaveRushOrder(OrderId);
        }
        else
        {
            result = con.SaveOrder(OrderId);
        }

        return result;
    }
}
{% endhighlight %}

We created an interface called "IPersistanceConnection" and created a DbConnection class which implements "IPersistanceConnection" interface. Additionally we modified the "Order" class to accept an implementation of "IPersistanceConnection" interface. Now the "Order" class does not care about any concrete implementation. All it does know is that it can call two methods with some parameters and that's it. Now we have the control to pass what ever implementation into the "Order" class as we want. This is called Dependency Injection. The "DbConnection" was a dependency of the "OrderClass", but we extracted that dependency out of the class and injecting it through the constructor.

Let's modify the unit test case to make use of the new implementation.

It's time to create a mock implementation of the connection class called "FakeConnection" so that we can pass it to the "Order" class while unit testing.

{% highlight C# %}
public Class FakeConnection : IPersistanceConnection{
    public void SaveRushOrder(int OrderId){
        //Fake implementation goes here
    }

    public void SaveOrder(int OrderId){
        //Fake implementation goes here
    }
}

public void OrderTest(){
    var fakeConnection = new FakeConnection();

    Order testOrder = new Order(fakeConnection);
    testOrder.OrderType = Type.Rush;

    var result= testOrder.SaveOrder();

    Assert.Equal(true, result);
}
{% endhighlight %}

Now when ever we execute the unit test, the "Order" class will call the fake connection's Save methods which is not going to do any persistence operation and that's what we wanted. But you might think do I need to create a fake or mock implementation every-time when I need to test the method? Well technically we need to create them, but the good news is there are tools to make them easy and hassle free. Will discuss them in the next post.
