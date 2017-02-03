---
title:  "Should I Use TypeScript?"
categories:
  - Web
tags:
  - TypeScript
---

JavaScript is a one of the trending language today. As developers we are using JavaScript to write rich client applications as well as server applications. JavaScript is flexible and powerful but certainly not the most productive language. JavaScript doesn't have a type system since its a dynamic typed language. Because of this nature the language feels non productive at times.

If you are developing a large scale applications with hundreds of JavaScript files, its very easy to get lost. Since there are no types, the editors also can't help with the development experience after certain point. If you are working in a typed language, the compiler is there to guide you if you are doing something wrong. If you pass a parameter which is type of student into a method which accepts type of cake, the compiler will shout at you. In typical JavaScript environment there is no one to guide like that. You will see the error when you actually run in the browser or any other JavaScript environment such as NodeJS.

TypeScript is here to solve this specific issue and make JavaScript productive. TypeScript is an open source project from Microsoft. TypeScript is developed by [Anders Hejlsberg](https://en.wikipedia.org/wiki/Anders_Hejlsberg), the guy behind C#, Turbo Pascal and Delphi.

TypeScript provides a type system to JavaScript. It's a super set of JavaScript. It adds some additional features to the language but compiles back to plain old JavaScript using the TypeScript compiler.


### I'm writing a simple application with 2 JavaScript files. Should I use TypeScript ?
Probably Not. By adopting TypeScript you are also adopting certain work flow changes such as a build system.
Since TypeScript is a super set, you can not run TypeScript in the browser directly. Browsers know and love JavaScript. So we have to convert TypeScript files to JavaScript files first and that's why TypeScript compiler is there for. TypeScript compiler takes in the .ts files and converts them to .js files. While doing so it will check for type validity of your code as well.

So earlier you did : Write JavaScript => Refresh.
Now you have to do : Write TypeScript => Build => Refresh

So if the project is small, this might be an unnecessary overhead. But what if your project grows over time ?

### Do I have to pay for it ?
TypeScript is completely free and open source.

### I have an existing application. If I want to migrate to typescript, Do I have to rewrite ?
No. Any valid JavaScript is also valid TypeScript. Remember TypeScript is a super set. You can re-factor your code piece by piece. No need for a rewrite.

### So I have to learn a all new language again ?
Not Really! TypeScript is getting aligned very close to ES6 and ES7 syntax. So if you learn typescript syntax you are also learning ES6 and ES7. Concepts like class, contructor, arrow function and decorators are similar in ES6 and ES7.

### Is Angular 2 supports TypeScript out of the box ?
Yes. Angular 2 will be shipping with TypeScript support. TypeScript team and Angular Team are working together to improve TypeScript and that's very interesting.

### What are the editors support TS?
- Atom
- Sublime
- VS Code
- Webstrom
- Visual Studio

### I'm using an existing library which is not written in TS. Now how can I use that library ?
TS has a concept of Type Definition files. The libraries which are not written in TS can provide a Type Definition file which can be referenced in your TS code and you can continue using the non TypeScript library without worries.

Checkout [the definition file repository here](http://definitelytyped.org/tsd/).

### Looks cool. Where can I start ?

- Start with the official site [the official site.](http://www.typescriptlang.org/)
- Check out the [playground.](http://www.typescriptlang.org/Playground)
- The official [handbook.](http://www.typescriptlang.org/Handbook)
- [Deep Dive](http://basarat.gitbooks.io/typescript/content/docs/getting-started.html)
