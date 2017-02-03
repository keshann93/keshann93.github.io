---
published: true
date: '2017-01-14'
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
---
Assume you have a requirement to develop a code editor and you have to provide renaming feature which would rename all the occurrence of a variable to something else. We could just do a simple string replacement but as you can imagine, things would get tricky real soon when the code we are trying to manipulate gets complex. We can't trust string replacement approach to be accurate in this scenario. We could go one step further and write some complex regular expression to get this done. But again, regular expressions are just hard, tricky and simply not fun.

### Meet abstract syntax tree (aka AST)
Abstract syntax trees are here to save the day. According to Wikipedia, Abstract syntax tree is a tree representation of the abstract syntactic structure of source code written in a programming language.

Well, if I word it according to my understanding, Abstract syntax tree (AST) helps to represent a piece of code in a form of a tree. This allows us to traverse the tree and examine the code or manipulate the tree nodes as we want.

Our job in hand is to change the name of the variable `x` in the below code to 'y'. So we have to convert this piece of code into an AST first.

```javascript
var x = 5;
```

### Converting code to AST
Transforming a piece of code into an AST is not a simple task. A source code parser will have to do this job for us. There are quite a few JavaScript parsers available. But [Esprima](http://esprima.org/) is one of the very stable and actively maintained parser.

But instead of using Esprima, I'm going to use another tool called [`recast`](https://github.com/benjamn/recast). Recast uses Esprima internally to construct AST. You might ask why not use Esprima directly rather than using another library which uses Esprima internally. Well, `recast` have some additional functionality we will require later.

```javascript
import recast from 'recast';

// this is the code we have to modify
var code = 'var x = 5;';

// parse the code and get the AST. Yes! It's that simple with recast or esprima.
var ast = recast.parse(code);
```

### Modifying the AST and re-generating code
So we have an AST, so we could change the nodes in the tree as we want. Let's change the variable name from `x` to `y` with the following line of code.

```javascript
// modify the AST as you want.
ast.program.body[0].declarations[0].id.name = "y";
```

In the above example, I accessed a node directly and changed the name property. But how do I know the node that is holding the variable name?

Meet [AST Explorer](https://astexplorer.net/), a tool which will generate the AST of a code snippet in the browser. Examine how the AST of our code snippet looks like [here](https://astexplorer.net/#/TEMnzHmo3M).

But eventually, we have to turn the AST back to code for it be useful. Again we need someone to help with this as well. Thankfully `recast` got this covered. Recast has a print method which takes in an AST and generates the code.

```javascript
var updatedCode = recast.print(ast).code;
```

Take a look at the complete [example here](http://www.webpackbin.com/4ygV02xUM).

Yep! It's that simple and so much fun to play around with AST and code manipulation. I got into code manipulation [because of a side project I'm working on](https://github.com/Raathigesh/react-slate). Go ahead and build your-self a cool tool with the new trick you just learned.

### Traversing an Abstract Syntax Tree
In the above example we accessed the node directly and changed it. But if you want to examine a complicated tree, you often want to traverse the tree node by node. An AST is a complex structure and if you try to traverse on your own, it could be bit complicated. But not to worry, [`estraverse`](https://github.com/estools/estraverse) makes traversing JavaScript ASTs a breeze.

### Conclusion
Manipulating code directly using string manipulation or regular expressions is not much fun. Once you convert the code into an Abstract syntax tree (AST) using a parser such as Esprima, traversing and manipulating it becomes straight forward. Once you manipulate the tree, you can convert it back into code.

I hope this would give you a very brief idea of how to get started with code manipulation using AST. Even though we used JavaScript libraries to manipulate JavaScript code, AST could be used to manipulate code written in any language. You just have to use a parser which understands that particular language.
