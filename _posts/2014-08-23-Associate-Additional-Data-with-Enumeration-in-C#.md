---
title:  "Associate Additional Data with Enumeration in C#"
categories:
  - C#
tags:
  - Enum
---
I love to use enumerations because they are simple and awesome. But I came across a situation where additional data need to be associated with each item of the enumeration for validation needs. Its C# so there should be an easy and awesome way to do this right? ;) Guess what? There is a way as we expected. The solution is to use extension methods and attach any additional data according to our needs.

{% highlight C# %}
public enum Action
{
    Create = 0,
    Edit = 1,
    Update = 2
}

public static class ActionDescription
{
    public static string Description(this Action action)
    {
        switch (action)
        {
            case Action.Create:
                return "Create Item";

            case Action.Edit:
                return "Edit Item";

            case Action.Update:
                return "Update Item";

            default:
                return "";
        }
    }
}

{% endhighlight %}
