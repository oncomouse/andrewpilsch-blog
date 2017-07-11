---
title: My DHSI 2018 Course Description
date: 2017-06-13 15:46 UTC
tags: 
---

I am really excited to announce that [I am on the schedule to teach at DHSI](http://dhsi.org/events.php#2018) next year in Victoria. The class still has to make, of course, but otherwise it should be a go. According to [Shawna](http://shawnaross.com), some people have been asking for the course proposal, so I thought I'd share it here.

The class will be a fairly advanced dip into contemporary JavaScript full-stack development practices, mostly focused on building the front-end of in-browser applications. Anybody planning to take the class should have some experience programming and be somewhat familiar with the command line (we'll be using [Node.js](https://nodejs.org/) a lot!).

I'm excited about the class because DH application building has been fairly server-heavy, to-date, often relying on the [LAMP stack](https://en.wikipedia.org/wiki/LAMP_(software_bundle)) or server-intensive Java applications. JavaScript [isomorphic application design](https://www.lullabot.com/articles/what-is-an-isomorphic-application) offloads a lot of processing to the client (which is increasingly powerful; even your iPhone!) and can be hosted in more minimal, distributed environments (such as [Heroku](https://www.heroku.com/) and [Amazon EC2](https://aws.amazon.com/ec2/)).

Also, JavaScript is an awesome language that has a ton of applications.

I am *very* excited to share this course with the DH community and hope you'll consider taking it! 

The class will meet during the first week (June 4-8, 2018) of DHSI. If you are interested, please get in touch (either via email or [Twitter](https://twitter.com/oncomouse)).

<hr style="width: 60%">

# The Frontend: Modern JavaScript + CSS Development

## One Paragraph Summary

This course will introduce students to modern frontend web development technologies, specifically using the programming language JavaScript. As JavaScript becomes increasingly more powerful, a variety of powerful tools---including [ES6](https://babeljs.io/), [React](https://facebook.github.io/react/), [Redux](http://redux.js.org/), [Immutable.js](https://facebook.github.io/immutable-js/), and [Webpack](https://webpack.js.org/)---are driving a paradigm shift in web development toward single-page applications. These data-driven websites do most of the work of rendering and serving web pages inside a user's browser, with a minimal backend. This class assumes students have some experience with a programming language (Python), have used a text editor, and have encountered the command line. In this class, students can expect to learn how to build these kinds of powerful, portable apps for their own data-driven projects. The course will also introduce students to [SASS](http://sass-lang.com/), the powerful, programmable CSS engine that is widely used for cutting edge projects. By the end of the class, students can expect to be familiar with current best-practices for developing cutting-edge JavaScript applications that can be deployed in minimal server environments, such as [Heroku](https://www.heroku.com/), [GitHub Pages](https://pages.github.com/), and [Amazon EC2](https://aws.amazon.com/ec2/).

## Association w/ Other DHSI Offerings

This is a hands-on course, small-workshop course (10-15 students) and will be considered programming intensive. This course requires programming and development experience, either through local experience or gained in Fundamentals of Programming/Coding for Human(s\|ists) in conjunction with Drupal for Digital Humanities Projects, XML Applications for Historical and Literary Research, and/or Creating LAMP Infrastructure for Digital Humanities Projects.

## Day-to-Day Overview (5 Days)

This schedule covers the topics that will be discussed in class on a given day. Students will also be given activities to experiment with, as we learn new technologies each day. Topics in **bold** will be the main focus of the day, while other topics will be discussed, time permitting.

1. Getting Started w/ JavaScript
	* What is JavaScript?
	* How Can We Build a basic JavaScript App?
	* Installing Node & NPM
1. Introduction to Package Management w/ NPM & Webpack; Getting outside data
	* **NPM for package management**
	* NPM Build Scripts / Gulp
	* Configuring Webpack and Building Module-driven Applications
	* Using Promises for asynchronous programming
	* **Using AJAX & fetch to get external data**
1. Manipulating Data / Documents
	* **Data-driven view components w/ React**
	* ES6 Class & Template Syntax
	* How to build sustainable stylesheets w/ SASS
1. Building Sustainable Applications
	* **Feed-forward application infrastructure w/ Redux**
	* ES6 Functional Syntax
	* Lodash / Ramda for functional programming
1. Advanced Topics / Future Directions
	* Managing application state w/ Immutable Data
	* Advanced Redux (thunk, sagas, persistence)
	* Modularized CSS Development
	* PostCSS and the future of style