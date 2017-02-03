---
title:  "Simple Introduction to Generics in C#"
categories:
  - C#
tags:
  - Generics
---

Generics in C# gives the ability to write type independent code rather than allowing a class or method to work with only a specific type.

Let's consider a scenario where we have to consume a REST service and Deserialize the response to a defined object. The code would be something similar to below.

{% highlight C# %}

public static MovieData GetMovieData(string URL)
{
	Uri uri = new Uri(URL);

	WebRequest webRequest = WebRequest.Create(uri);

	WebResponse response = webRequest.GetResponse();

	StreamReader streamReader = new StreamReader(response.GetResponseStream());

	String responseData = streamReader.ReadToEnd();

	return JsonConvert.DeserializeObject<MovieData>(responseData);

}

{% endhighlight %}

Above code fulfills the purpose but assume we need to consume another service method and its going to return "CastData" instead of "MovieData". So are we going to write another get "GetCastData" method? Of course we could write another method but deep down in your heart you know that there should be a better way to do this.

That's where generics comes into play. Generics is a way of telling your class or method,
> "Yo Bro, You don't worry about the Type you are going to deal with. When I call you, I'll let you know that information. Cool?".

Noticed that the above "GetMovieData" method deserializes the object as "MovieData" and returns "MovieData". We need to change those two places to be type independent using Generics.

This is how we can achieve this in C#.

{% highlight C# %}

public class ServiceConsumer<T>
{
	public static T GetData(string URL)
	{
		Uri uri = new Uri(URL);

		WebRequest webRequest = WebRequest.Create(uri);

		WebResponse response = webRequest.GetResponse();

		StreamReader streamReader = new StreamReader(response.GetResponseStream());

		String responseData = streamReader.ReadToEnd();

		return JsonConvert.DeserializeObject<T>(responseData);

	}
}

{% endhighlight %}


The "T" denotes the type. So this class will deal with the type that we specify when we create the object.


{% highlight C# %}

MovieData mData = ServiceConsumer<MovieData>.GetData("Movie URL as String"); //T => MovieData


CastData cData = ServiceConsumer<CastData>.GetData("Cast URL as String"); //T => CastData

{% endhighlight %}

The above two lines of code specifies the objects that the class is going to deal with at the point of creation. So when GetData is called its going to deserialize the data to the specified object and return the particular type object. Freaking Awesome Right?
