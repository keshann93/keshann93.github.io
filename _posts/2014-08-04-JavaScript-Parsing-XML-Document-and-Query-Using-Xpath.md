---
title:  "JavaScript Parsing XML Document and Query Using Xpath"
categories:
  - JavaScript
tags:
  - XML
---
JavaScript supports some heavy XML processing but things get messy when it comes to cross browser support. As usual there is an IE way of doing thing and the rest of the browsers way of doing things. So there was a requirement to parse XML document and query specific nodes using Xpath. One easy way of XML parsing and querying is jQuery. But jQuery parsing can be slow sometimes depending on the size of the document we are parsing. After some googling below piece of code did the trick.

{% highlight javascript %}

 function getSingleXmlNode(data, xpath) {
        try {
            var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = "false";
            xmlDoc.loadXML(data);
            return xmlDoc.selectSingleNode(xpath);
        } catch (e) {
            var doc = (new DOMParser).parseFromString(data, 'text/xml');
            var it = doc.evaluate(xpath, doc, null, 5, null);
            var node = it.iterateNext();
            return { text: node.textContent };
        }
    }

{% endhighlight %}

So Happy XML parsing :)
