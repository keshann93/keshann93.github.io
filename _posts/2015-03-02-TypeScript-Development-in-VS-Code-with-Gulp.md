---
title:  "TypeScript Developement in VS Code With Gulp"
categories:
  - Web
tags:
  - TypeScript
  - VSCode
  - Gulp
---

##Introduction##
Microsoft released VS Code, A light weight code editor for Asp.Net 5 and NodeJs development. This post is going to explore how to use VS Code for TypeScript development with Gulp watch task. First of all there is a great post covering the basic of setting up VSCode to compile TypeScript available [here](http://blogs.msdn.com/b/typescript/archive/2015/04/30/using-typescript-in-visual-studio-code.aspx). I encourage you to go through that post first before continuing.

##Installing Softwares

####VsCode and NodeJs
Download VS Code from [here](https://code.visualstudio.com/) and install it. If you don't have NodeJs installed, go ahead and install it from [here](https://nodejs.org/).

####Typescript
Now let's install TypeScript through NPM with the following command. This will install typescript globally.

    npm install -g typescript

After installing, if you open up the command prompt and type "tsc", you should see something similar to below.
![](https://raw.githubusercontent.com/Raathigesh/Raathigesh.github.io/master/images/VSCodeTypeScript/tsc_cmd.PNG)


Note that during the time of this post the latest TypeScript version was 1.5.0-beta. Make sure to install the specific or latest version.

####Gulp and GulpTsc
Create a directory some where in your disk. This is the directory our project files are going to live in. Now navigate to the newly created directory in your command prompt and start executing the following commands. It's time to install Gulp, the JavaScript task runner. Execute the following command.

    npm install gulp

Execute the following command to install TypeScript compiler for gulp.

    npm install gulp-tsc

###Setting up VSCode
Now we have all the piece in places to actually start doing something fun. Open VSCode and open your project directory.


create a new file called `tsconfig.json` and make it look like this.

![](https://raw.githubusercontent.com/Raathigesh/Raathigesh.github.io/master/images/VSCodeTypeScript/tsconfig.PNG)


Create a folder called `src` and under that create a file called `main.ts`.

#### The Gulp File
Create a file named `gulpfile.js` in the root of the folder. The gulp file is the one contains the gulp task which will build out TypeScript files every time we make a change and generate the actual JavaScript files.


Following is the content of the `gulpfile.js`

{% highlight JavaScript %}
var gulp = require('gulp');
var typescript = require('gulp-tsc');

gulp.task('compile', function(){
  gulp.src(['src/**/*.*'])
    .pipe(typescript())
    .pipe(gulp.dest('dist/'))
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.*', ['compile']);
});
{% endhighlight %}

####Creating tasks.json
If you press `Ctrl + Shift + B` you will be prompted to configure the task runner if there is no tasks.json file exists. Please do so if VSCode prompts.


Once the tasks.json is created, replace the entire content with the following.

{% highlight JavaScript %}
{
	"version": "0.1.0",
	"command": "gulp watch",
	"isShellCommand": true,
	"tasks": [
		{
			"taskName": "watch",

			"isBuildCommand": true,

			"showOutput": "silent",

			"problemMatcher": "$tsc"
		}
	]
}
{% endhighlight %}

###Running the Gulp Watch
Press `Ctrl + Shift + B` to start the watch task. This should start the watch task and output should be disabled in VSCode as below.

![](https://raw.githubusercontent.com/Raathigesh/Raathigesh.github.io/master/images/VSCodeTypeScript/output.PNG)


Now modify the `main.ts` file as following and save the file.

{% highlight JavaScript %}
class Bar {
	constructor(parameters) {

	}
}
{% endhighlight %}

Now a folder named `dist` should be created with a file named `main.js` in it. Every time you make a change, the build step will run and `main.js` will be updated accordingly.


Here is the TypeScript and generated JavaScript file side by side in VSCode. Go make a change in the TypeScript and watch the JavaScript file refreshes automatically with the changes :)

![](https://raw.githubusercontent.com/Raathigesh/Raathigesh.github.io/master/images/VSCodeTypeScript/Final.PNG)
