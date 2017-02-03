---
title:  "Converting JSON Object To XML String In JavaScript"
categories:
  - JavaScript
tags:
  - JSON
---
Here is a snippet which will covert JSON objects to XML. But keep in mind attributes are not supported.

{% highlight javascript %}

function objectToXml(obj) {
        var xml = '';

        for (var prop in obj) {
            if (!obj.hasOwnProperty(prop)) {
                continue;
            }

            if (obj[prop] == undefined)
                continue;

            xml += "<" + prop + ">";
            if (typeof obj[prop] == "object")
                xml += objectToXml(new Object(obj[prop]));
            else
                xml += obj[prop];

            xml += "<!--" + prop + "-->";
        }

        return xml;
    }

{% endhighlight %}

Example Usage

{% highlight javascript %}

 var myAwesomeObject = {
     Name : {
         Text : "Mr.Awesome",
         Address : "No 0, Awesome Lane, Awesome Land"
     }
};

var xmlString = objectToXml(myAwesomeObject);

{% endhighlight %}

So that’s how our awesome XML generator works.

So Happy XML parsing :)
