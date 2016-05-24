---
title: "Importing Your Blog Posts Into Zotero"
date: 2016-05-24 17:26 UTC
tags:
---

I have been working with a lot of blog sources for a new academic writing project I'm working on. I'll talk more about the project on here when I get it more fleshed out, but the thing I want focus today on some interesting problems I have noticed regarding, especially, academics who use [static sites](https://davidwalsh.name/introduction-static-site-generators) to blog. Specifically, I have noticed that a lot of academic blogs do not import into Zotero as easily as they could.

So, in other words, this is a post about [metadata](https://en.wikipedia.org/wiki/Metadata).

Zotero can import a surprising number of sites through their "Embedded Metadata" import. They have some documentation about [how it works](https://www.zotero.org/support/dev/exposing_metadata), but it's not particularly helpful. Part of the problem is that figuring out how to implement the open standards they suggest seem to exceed my abilities. I couldn't make heads or tells of the [Dublin Core documentation](http://dublincore.org/documents/2008/08/04/dc-html/) (and it doesn't seem particularly conducive to blogs) and [COinS](http://ocoins.info/) is downright weird (the code I ported form a WordPress COinS plugin didn't get picked up by Zotero). There are, however, as Zotero points out, plugins for many CMS (Wordpress and Omeka[^omeka]) that will do this work for you if you use a CMS. 

However, what is a static site to do, especially if you are blogging but not really doing archival work that might need to rely on something more heavy-hitting such as Dublin Core (which is more for library archiving)?

Enter [Open Graph](http://opengraphprotocol.org/).

Developed by Facebook, the protocol is based on [RDFa](https://en.wikipedia.org/wiki/RDFa). It can be read by Zotero *and* it has the advantage of controlling how your blog posts get displayed when they are shared on Facebook. As Zotero points out on their forums, Open Graph isn't the best for archival material, but it is pretty great for standard blog posts, I've found.

Open Graph tags are HTML `<meta>` tags that go in the `<head>` of your HTML. They contain two properties, `property` and `content`. There are four required tags for any minimal Open Graph object: `og:title`, `og:type`, `og:image`, and `og:url`:
	
* `og:title` -- Set this to the title of your blog post.
* `og:type` -- There are a lot of types you can use, but for blogs, set this to `"article"`.
* `og:image` -- I set this to a [picture of me](/images/me.png) but you can set it to any image you want Facebook to display when your blog post is shared.
* `og:url` -- Set this to the link to your post. If you are also setting `<link rel="canonical">` in your `<head>`, set it to the same value.
	
In addition, I find the following values to be particularly useful to set, especially for importing into Zotero:

* `og:site_name` -- Set this to the name of your blog. This way Zotero will get both your post title *and* the name of your page.
* `article:author` -- Set this to the author's name. Zotero will grab this (I think Zotero can also grab the standard `<meta name="author">` tag but have not tested it).
* `article:published_time` -- This is the day and time that your post was published. The format is [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601), which is `"%Y-%m-%dT%H:%M:%S.%L%z"` in the format read by `strftime`. The `article:published_time` for this article is `2016-05-24T17:26:00.000+0000`.

Also, if you want to store an abstract in Zotero, it uses the `<meta name="description">` tag to read that.

So, when you're finished, your `<head>` should contain the following tags in each article:

~~~ html
<!--Required Open Graph Tags-->
<meta property="og:url" content="<url to your blog post>">
<meta proprety="og:type" content="article">
<meta property="og:title" content="Post Title">
<meta property="og:image" content="<url for your post image>">

<!--Optional Open Graph Tags -->
<meta property="og:site_name" content="Your Blog's Title">
<meta property="article:author" content="Post Author">
<meta property="article:published_time" content="<time published, minimum info is YYYY-MM-DD>">
	
<!--Non-Open Graph Info-->
<meta name="description" content="Your Posts's Description">
<meta name="author" content="Same as article:author above">
~~~

With this data, your individual blog posts will import using the "Embedded Metadata" importer straight into Zotero:

![A previous blog post whose metadata has correctly imported into Zotero](/images/zotero-import.png)

So, there you have it. Using Open Graph is a simple way to get your blog posts importing into Zotero *and* appearing correctly and professionally when readers share them on Facebook. If it will help, there's an implementation of this suggestion [on the source repository for this blog on GitHub](https://github.com/oncomouse/andrewpilsch-blog) (it's in `source/layouts/layout.haml`).

[^omeka]: EDIT: Of the sites listed on [Omeka's "Showcase" page](http://omeka.org/showcase/), only two of the ten sites will properly import into Zotero ([Cleveland Historical](http://clevelandhistorical.org/) and [Florida Memory](https://www.floridamemory.com/)). Both sites use Open Graph as I'm describing here. None of the showcase sites expose Dublin Core metadata to the browser.