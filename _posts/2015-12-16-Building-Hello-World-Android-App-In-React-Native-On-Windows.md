---
title:  "Building Hello World Android App In React Native"
categories:
  - Mobile
tags:
  - ReactNative
---



I managed to get a React Native (RN) hello world android app running from a windows machine and this post is going to describe some issues I faced and how to resolve them. So are you ready to get your hands dirty with some React Native (RN)?

- Download [Android SDK for Windows](http://developer.android.com/sdk/index.html#Other) and install it.

- Create a system variable called `ANDROID_HOME` and set the value to the SDK installation path. E.g: `C:\Users\UserName\AppData\Local\Android\android-sdk`.
Make sure to select the required components when installing the SDK as indicated in [this](https://facebook.github.io/react-native/docs/android-setup.html) link. Also make sure to create a new virtual device in your emulator with the configuration mentioned in the above mentioned link.

>Rapid Environemnt Editor makes handling environment variables a breeze in windows. Check out [Rapid Environment Editor](http://www.rapidee.com/en/about).

- Once you have things in place, install the RN cli globally
{% highlight javascript %}
npm install -g react-native-cli
{% endhighlight %}

- Create a new application by performing an Init as below
{% highlight javascript %}
react-native init HelloRN
{% endhighlight %}

- Make sure to keep your emulator running or the phone connected. (Enable USB debugging in the phone as well)

- Execute the following command from the application folder. This will try to build the project by fetching the dependencies. So be patient.
{% highlight javascript %}
react-native run-android
{% endhighlight %}

- In windows the packager won't start automatically. So we have to start manually. Open another command prompt and navigate to your application directory and execute the following command.
{% highlight javascript %}
react-native start
{% endhighlight %}

 - If you come accorss an error saying `ERROR Watcher took too long to load` when executing `react-native start`, open **\node_modules\react-native\packager\react-packager\src\FileWatcher\index.js** in your application and increase the wait time to 50000 as `const MAX_WAIT_TIME = 50000;`

- If things goes well you should see your application in the emulator or the device.

### Fixing 'Unable to download JS bundle' error
When you open your app in the phone, you might see an error saying `Unable to download JS bundle`. This error means the emulator/phone can't communicate to the packager to download the content.

The steps I followed to resolve this issues.

- Connect the phone to same WIFI network that your computer is connected to
- Get the IP of the machine using `ipconfig`
- Shake the phone to bring the menu
- Select `Dev Settings`
- Select `Debug server host for device`
- Provide the address as `<YourIp>:8081`
- Select `ReloadJS`


> executing the command `adb reverse tcp:8081 tcp:8081` is another option people were suggesting. You could try this as well. You can locate the `adb` exe under `<SDKInstallationDirectory>\Android\android-sdk\platform-tools`.

That should reload the content and your app should work.

If you are still having the issue, try to navigate to `localhost:8081/index.android.js` in your computer and see weather you get any results back. If this call fails, check weather port 8081 is used by some other application. You could use [TCPView](https://technet.microsoft.com/en-us/sysinternals/tcpview.aspx) to investigate the ports.

If you keep getting the error message as below even though your packager is running as expected, Try to open the url `http://localhost:8081/index.android.bundle?platform=android&dev=true` in your browser and see weather you are getting any error in the response. If you do, try fixing it and then reload your app.

![ReactNativeError.png](https://raw.githubusercontent.com/Raathigesh/Raathigesh.github.io/master/_posts/ReactNativeError.png)
