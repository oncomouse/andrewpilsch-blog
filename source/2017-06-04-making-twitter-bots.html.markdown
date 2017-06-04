---
title: Making Twitter Bots w/ Cheap Bots Done Quick
date: 2017-06-04 15:24 UTC
tags:
---

Twitter bots, are great, right? Of course they are. People are talking about them at [#cwcon](https://twitter.com/search?q=%23cwcon%20bot&src=typd) in [Findlay this weekend](http://candwcon.org/2017/). I was talking about them with people at RSA. I run a few ([here](https://twitter.com/quintilian_bot), [here](https://twitter.com/so_many_bees), and [here](https://twitter.com/homeworkcopia)). They are a really great way to get into the world of programmable rhetoric and to play around with some simple coding.

While a lot of people use [Zach Whalen's really amazing Google Sheets approach](http://www.zachwhalen.net/posts/how-to-make-a-twitter-bot-with-google-spreadsheets-version-04/) to running Twitter bots, I want to share a tool I have been using that generates tweets in a different way. While not better than Zach's approach, it works a little differently and lets you produce some really neat content.

The platform I use for a few of my bots, especially [@so_many_bees](https://twitter.com/so_many_bees), is called [Cheap Bots Done Quick](http://cheapbotsdonequick.com/) and it is *awesome*.  The project is by [George Buckenham](http://v21.io/) and uses [Kate Compton's](http://www.galaxykate.com/) extremely cool library [Tracery](http://tracery.io/). [Tracery](http://tracery.io/) is powerful and [Cheap Bots Done Quick](http://cheapbotsdonequick.com/) makes bot hosting stupid easy. Together, I think they make a great platform for learning bot making and also teaching it to students. 

I'm going to talk a little about what [Tracery](http://tracery.io/) does before showing you how to host a bot using [Cheap Bots Done Quick](http://cheapbotsdonequick.com/).

## Tracery: Generative Grammars and You!

[Tracery](http://tracery.io/) is a tool to parse a particularly written grammar to generate text (and images!) using a simple set of rules. But what does that mean?

Think of [Tracery](http://tracery.io/) as a programmable Mad Libs. You remember Mad Libs? Where you would fill in the blanks with, say, *a noun*, *a verb* and *an adjective*, and end up with a sentence such as "My duck smoked red mayonnaise" and hilarity would ensue? [Tracery](http://tracery.io/) works like that, substituting randomly selected values from rules you define into a predefined template.

This is different from Zach's approach, which uses either a Markov chain algorithm to generate sentences based on a corpus or to choose pre-composed sentences from a list in a spreadsheet.

Let me give you an example.

### Your First Tracery Grammar

Tracery grammars are written in a file format known as [JSON](http://www.json.org/) (JavaScript Object Notation), which is a simple way to transport JavaScript data between processes (and humans) on the web. A [Tracery](http://tracery.io/) grammar is a JSON data structure known as a hash. A hash is a data structure that associates a particular key with a particular value. In a hash, if I had a value `foobar` associated with the key `a`, when I asked for `a` from the hash (`hash['a']` in JavaScript), the hash would give me `foobar` as the value.

Tracery has one specifically defined key/value pair in its grammar: the key `origin` is the start of the generation sequence. So a *very* simple [Tracery](http://tracery.io/) grammar would look like this:

~~~json
{
	"origin": "Hello world!"
}
~~~

The curly braces (`{` and `}`) at the beginning and end of the code are how you indicate a hash in JSON. The name of the key (`origin`) goes before the colon and *must be* in quotes. The value associated with the key (`Hello world!`) goes after the colon. Any text must be in quotes (there are other things you can store at hash keys, but more on that below).

When we run our grammar, it will *always* return "Hello world!". While we are generating sentences using computers (😱), this is not particularly interesting.

To make our grammar more exciting, let's have it greet you by name:

~~~json
{
	"origin": "Hello, #name#, welcome to Tracery!",
	"name": "dear reader"
}
~~~

In JSON, all entries in a data structure---such as our hash---have commas between them, so we have to put a comma after the line that contains origin.

When we run our grammar now, it will always return "Hello, dear reader, welcome to Tracery!". Anything between pound signs (`#`) in [Tracery](http://tracery.io/) is interpreted as a key in the grammar hash to substitute from. So when [Tracery](http://tracery.io/) sees `#name#` in our grammar, it looks for a key `name` (the `#`s are thrown out) in the grammar, which we have defined, and substitutes its value.

This is still not very interesting, though, is it?

In JSON, there is a data structure called an array, which is a simpler kind of hash. Instead of having keys associated with values, the values all have keys referring to the numerical order in which the pieces occur. Basically, an array is like a line you have to wait in at the DMV: you don't need to know everyone's name in front of you, you just need to know how many people there are ahead of you.

When [Tracery](http://tracery.io/) finds an array stored at a particular key, it randomly chooses one of the values from that array. This lets us use more than one value for a given key. To rewrite our grammar using an array, we could do this:

~~~json
{
	"origin": "Hello, #name#, welcome to Tracery!",
	"name": ["Jane", "Jean", "June", "Jude"]
}
~~~

Brackets around a list of strings is how we write an array in JSON.

Now, when [Tracery](http://tracery.io/) runs our grammar, it might produce "Hello, Jane, welcome to Tracery!" but it might also produce "Hello, June, welcome to [Tracery](http://tracery.io/)!". We can't know for sure, because we have introduced some randomness into our grammar.

The power of [Tracery](http://tracery.io/) lies in being able to nest rules, making more complicated sentences possible. For instance:

~~~json
{
	"origin": "Hello, #name#, welcome to Tracery!",
	"name": ["#j-name#", "#a-name#", "#c-name#"],
	"j-name": ["Jane", "Jean", "June", "Jude"],
	"a-name": ["Allison", "Abigail", "Ava", "Alyssa"],
	"c-name": ["Charlotte", "Claire", "Cassandra", "Caroline"]
}
~~~

Here we are grouping names by first letter. You could add `"#j-name"` to the array stored at `name` more than once if you wanted to increase the probability of it occurring, for instance.

Take a look at Kate Compton's [Tracery tutorial](http://www.crystalcodepalace.com/traceryTut.html) for some even more advanced features, including how to modify text (capitalize, pluralize, etc.) and how to save values and branch your grammar based on those saved values.

Also, Compton has a groovy [Tracery Editor](http://tracery.io/editor/), so you can start making grammars immediately! The key thing is that [Tracery](http://tracery.io/) is amazingly powerful but with a simple and easy to master syntax.

## Making a Bot with Tracery

Making a cool [Tracery](http://tracery.io/) grammar for your bot can take some time, but, thankfully, once you have a grammar you are happy with, getting it posting on Twitter is simple.

### 1. Create a Twitter Account

To get started with [Cheap Bots Done Quick](http://cheapbotsdonequick.com/), you will first need to create a Twitter account for your bot:

![Image of Twitter's account creation screen with the information for "Test Bot" filled in.](../../../images/bot1.png)

Next, you will need to log into the account you have created. If you use a main Twitter account in your browser, consider using privacy mode (instructions for [Safari](https://support.apple.com/kb/ph21413?locale=en_US), [Chrome](https://support.google.com/chrome/answer/95464?source=gsearch&hl=en), and [Firefox](https://support.mozilla.org/en-US/kb/private-browsing-use-firefox-without-history)).

**Before Going To Step 2:** Be sure not to log into [Cheap Bots Done Quick](http://cheapbotsdonequick.com/) with your main account, or your new bot might start tweeting as you!

### 2. Authorize the App

Now that you are logged into your new bot's Twitter account, go to [Cheap Bots Done Quick](http://cheapbotsdonequick.com/) and click "Sign In With Twitter". You will be taken to a screen like the one below:

![Image showing the screen Twitter uses to ask if you authorize the app to use your account](../../../images/bot2.png)

Click "Authorize App" to continue.

### 3. Enter / Test Your Tracery Grammar

In the [Cheap Bots Done Quick](http://cheapbotsdonequick.com/) editor, there is a textbox labelled "**Tracery JSON**". Paste your grammar there, or start editing the one the app starts you off with. The app will check your JSON syntax and inform you of any errors as you go.

Below the textbox, you can see the output of your grammar. Press the refresh button to generate a new one. If you press the blue "Tweet" button, it will post the current output to Twitter.

When you are happy with your grammar, change the pulldown that says "Never" next to the phrase "post a tweet as" to how often you would like your bot to post (I usually post hourly).

You can also set it to reply to tweets generated using your [Tracery](http://tracery.io/) grammar, either to tweets that match specific [regular expressions](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions) or to all replies. For instance, you could write a regular expression to match certain words or phrases, and respond accordingly.

There are a lot of cool things you can do with this app!

## Conclusion

That's it! You just made a Twitter bot using a generative grammar!

While [Tracery](http://tracery.io/) has a bit more of a learning curve than the tools Zach uses in his bot making tutorial, the power and sophistication of these grammars lets you produce some remarkably cool stuff, like [@infinitedeserts](https://twitter.com/infinitedeserts), [@thinkpiecebot](https://twitter.com/thinkpiecebot), and [@softlandscapes](https://twitter.com/softlandscapes) (which shows off [Tracery](http://tracery.io/)'s SVG graphics capability).

Also, as an added bonus, if you do any JavaScript coding, you can use [Tracery](http://tracery.io/) for content generation tasks beyond bot making. For instance, [I used it to generate random Tiki drink descriptions](https://github.com/oncomouse/drink-description) for a menu app I use to offer cocktails to guests.

Have fun with [Tracery](http://tracery.io/) and [Cheap Bots Done Quick](http://cheapbotsdonequick.com/), and let me know what you come up with!