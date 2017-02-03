---
title:  "Connecting To Mssql With Sequelize"
categories:
  - Web
tags:
  - NodeKS
  - Sequelize
---


Sequelize is a Node Js ORM which provides an abstraction to work with various databases such as PostgreSQL, MySQL, MariaDB, SQLite and MSSQL.

This post takes a quick look at how to connect to an MSSQL instance. You can take a look at the [doc of the Sequelize on how to setup the connection.](http://docs.sequelizejs.com/en/latest/docs/getting-started/#setting-up-a-connection)

I had an issue with connecting to a named MSSQL instance and I finally managed to figure out going through the source code. Go Open Source Software! Let me save you some time by sharing the steps.

The key is an additional property called `dialectOptions` which take any additional parameters the internal driver requires. Sequelize uses [tedious](https://github.com/pekim/tedious) to talk to MSSQL database. I was able to connect to a named MSSQL instance by providing the instance name via the `instanceName` property of `dialectOptions` object as follows.

{% highlight javascript %}
return new Sequelize('SystemDB', 'sa', 'password', {
			dialect: 'mssql',
			host: 'www.example.com',
			port: 1433, // Default port
			dialectOptions: {
				instanceName: 'NameOfTheMSSQLInstance'
			}
		});
{% endhighlight %}
