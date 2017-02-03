---
title:  "Control Unit Test Selection in Load Test Using Plugin"
categories:
  - C#
tags:
  - MSTest
---
If you are performing load test using Visual Studio there may be necessity where we need to override the test selection. Let’s say we have 5 different unit tests in a test mix and we want them to run in a particular order, so we want to tell the load test engine to execute particular test case at a particular time.

The solution is to create a load test plug-in and by subscribing to the TestSelected event we can change the selected unit test case.

{% highlight C# %}

public class ECAPILoadTestPlugin : ILoadTestPlugin
{
    LoadTest _mLoadTest;

    public void Initialize(LoadTest loadTest)
    {
        _mLoadTest = loadTest;

        _mLoadTest.TestSelected += MLoadTestTestSelected;
    }

    void MLoadTestTestSelected(object sender, TestSelectedEventArgs e)
    {
         //By setting the test name to an existing test in the test mix,
         //we can force a particular test to execute instead of the test which is selected by
         //the load test engine.
         e.TestName = "Name of the test";
    }
}

{% endhighlight %}

Happy Coding!!!
