---
title:  "Using Fiddler to Fake Response For A URL"
categories:
  - Tools
tags:
  - Fiddler
---

Fiddler is a must have tool for web developers. The Auto Responder feature of fiddler allows to fake response for a particular request.


Open up fiddler and switch to AutoResponder tab.
<figure>
	<a href="http://raathigesh.com/images/2014-10-10-Using%20Fiddler%20to%20Fake%20Response%20For%20A%20URL/1%20-%20Auto%20Responder%20Tab.png"><img src="http://raathigesh.com/images/2014-10-10-Using%20Fiddler%20to%20Fake%20Response%20For%20A%20URL/1%20-%20Auto%20Responder%20Tab.png"></a>
</figure>


1. Click on "Add Rule" button.
2. In the bottom of the window, there is a Rule editor which expects a URL and the Type of response you want to return.
3. We will say "http://Facebook.com" and from the drop-down select "404_plain.dat".
4. Click "Save"
5. Go to file menu and click "Capture Traffic".
6. Try visiting http://Facebook.com and you should see a 404.

<figure>
	<a href="http://raathigesh.com/images/2014-10-10-Using%20Fiddler%20to%20Fake%20Response%20For%20A%20URL/2%20-%20Steps.png"><img src="http://raathigesh.com/images/2014-10-10-Using%20Fiddler%20to%20Fake%20Response%20For%20A%20URL/2%20-%20Steps.png"></a>
</figure>

You can switch off the automatic responder by un-checking "Enable automatic responses" check box at any moment.

This is not rocket science but will come in handy for several development testing scenarios.
