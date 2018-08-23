---
title: "MLA Talk: Security Through Transparency: Minimal Computing in the Jungle of the Real"
date: 2018-01-05 20:11 UTC
tags:
published: true
---

I couldn't make MLA 2018 this year due to a ["bomb cyclone"](https://www.popsci.com/bomb-cyclone) in NYC and multiple flight cancellations from DFW. Through the superhero efforts of presider Élika Oretga, I was able to participate virtually in my panel, [#304 "Activist Infrastructures"](https://mla.confex.com/mla/2018/meetingapp.cgi/Session/2310). Below is the screencast of my talk and slides I made and then, below that you can find the transcript.

I'm bummed I couldn't make it, as the talk outlines some of the stakes, methods, and topics present in my new book project. Still, I am glad I got to share it, even if only virtually.

## Screencast

<p class="tc"><iframe width="560" height="315" src="https://www.youtube.com/embed/FvgrOqYCZng" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe></p>

## Transcript

Reflecting on the geopolitical landscape following the September 11th
attacks on the World Trade Center and the Pentagon, Paul Virilio
suggests that the landscape of contemporary war is indistinguishable
from an industrial accident. Ruminating on the September 21st 2001
explosion at a fertilizer factory in Toulouse, which was initially
reported as an extension of Al Qaeda's attacks on New York, he concludes
that the confluence of accident and war into one risky geopolitical act
"\[promotes\] a fatal confusion between attack and accident" (Virilio
52). Virilio's always cheery reading of this set of
circumstances leads him to imagine a future

> The expectation horizons of a past three centuries old that is now
> over -- those of total revolution and total war -- have been outpaced
> by the anguished expectation of the (eco-eschatological) **Great
> Accident of which industrial accidents and terrorist attacks are only
> ever prefigurations**, symptoms of a complete reversals in the
> orientation of humanity. (Virilio 52)

In my talk today, I want to follow out this confluence of terror and
accident in the context of digital infrastructure to think about how
minimal computing is a security feature within the shadow of Virilio's
"Great Accident."

Specifically, I want to think about accidents as a side effect of
complexity and how this is entangled in the scales of big data. We have
long known, even if only on an unconscious level, that software
basically doesn't work, but now that the fragile tissue of the Internet
sustains our day-to-day lives, the growing specter of software accidents
becomes a structuring feature of contemporary anxiety. Consider the
recent Twitter meme in which network engineers offer various lists of
what actually holds the Internet together. Search on Twitter
and you find a list of things dominated by:

-   Bailing wire
-   Scotch tape
-   peanut butter
-   prayers
-   hope
-   bubble gum
-   band-aids

This morbidity is widespread in technical circles. Quinn Norton's aptly
titled "Everything is Broken" references this meme by claiming
that:

> **It’s hard to explain to regular people how much technology barely
> works**, how much the infrastructure of our lives is held together by
> the IT equivalent of baling wire. (Norton, n.p.)

She continues: "written by people with either no time or no money, most
software gets shipped the moment it works well enough to let someone go
home and see their family. What we get is mostly terrible" (Norton,
n.p.). As an example, Norton traces OTR (Off The Record), an
encryption program that can be dropped into a variety of IM clients for
truly secure conversations. OTR is great and thoroughly vetted for
errors; however, it relies on a library called libpurple that leaks
private and secure data like a sieve. The reliance on badly written
libraries was behind famous bugs such as Heartbleed, which is a serious
vulnerability in the OpenSSL library that provides encryption to,
basically, everything.

Errors like these result from project complexity: the reliance on other
libraries, the need to get maximum features on a minimal budget, and the
fundamental laziness of most programmers. Complexity is also one of the
great features of programmable computers: it gets us the map/reduce
architecture that powers Google search, Facebook's global public sphere,
and the ability to buy things using our face as authorization of
payment. However, as bugs like Heartbleed or the recent ransomware
hijackings of NHS hospitals makes clear, complexity, almost by its
nature, introduces the inevitability of bugs and, by extension,
accidents.

In a blog post for the Minimal Computing working group, Jentery Sayers
iterates possible definitions of "minimal computing", offering ten
possible meanings:

1.  Minimal Design
2.  Minimal Use
3.  Minimal Consumption
4.  Minimal Maintenance
5.  Minimal Barriers
6.  Minimal Internet
7.  Minimal Externals
8.  Minimal Automation
9.  Minimal Space
10. Minimal Technical Language (Sayers, n.p.)

I want to add to this list, "minimal complexity," which might be another
iteration to consider in the context of Virilio's Great Accident.
Minimizing complexity cuts across a couple of Sayers's definitions,
including minimal use, minimal consumption, and most importantly minimal
externals.  Considering the last of these, Sayers uses
"externals" to refer to issues of access and power in infrastructural
systems, suggesting that "attendant issues of power and
self-organization shape an array of minimal computing practices"
(Sayers, n.p.).

However, I want to differentiate complexity from Sayers's use of
externals to remind us that complex entanglements are not always so
obviously institutional. Many of the power relations that flow through
our digital scholarly infrastructure are structured at the unseen and
under-considered level of the software itself. As an example, consider a
basic LAMP-stack web application. LAMP is Linux, Apache, MySQL, and PHP,
a collection of linked tools (a "stack" in web development terms) that
stack on top of one another to describe a standard application
environment of OS (Linux), Web Server (Apache), data store (MySQL), and
programming language (PHP). If you host your professional website on
Wordpress, you are using a LAMP application (possibly without realizing
it). While your professional website may seem relatively simple (and it
probably is in comparison to a website like Facebook),
according to Rapid 7, a database of published vulnerabilities in open
source software, since 2004 there have been  413
vulnerabilities found in Wordpress,  3010 in MySQL,
3775 in PHP,  3693 in Apache, and  18281 in Ubuntu,
which is a popular Linux install. That's over 400 exploitable bugs in
the application itself but almost 30000 more in the infrastructure that
powers it.

I pick on Wordpress because I assume many of your professional sites are
not taking advantage of the dynamic features its database offers, such
as inventory management or searchable user pages, and instead have a
page for your research you update maybe once a year, another for
teaching that gets updated about the same, and maybe a blog you post on
monthly. By folding a bunch of big, complex tools (namely PHP and MySQL)
into what is essentially static HTML files, the possibility of accidents
is needlessly increased. The vast majority of academics don't need an
industrial strength database for their professional websites. This is
one of the reasons why Alex Gil, along with many people in and around
DH, make so much noise about static-site generators such as Jekyll: by
compiling a site into HTML before the site is live, the number of moving
parts exposed to the public are vastly reduced.

While fighting over Jekyll vs Wordpress might seem like a sideline to
the issue of software accidents, this trend toward minimal application
complexity in academic personal websites is part of a larger shift in
software development responding to the same concerns about accidents and
complexity, of which I want to consider, today, the shift to functional
programming in large-scale web applications as an example. The history
of programming languages can be divided into a series of paradigms
(object-oriented programming is probably the most famous of these), with
the deepest and oldest paradigm fight being between iterative and
functional programming. Most of the languages you have likely used
(BASIC, C, C++, Java, JavaScript, Python, Perl, Ruby, R) are iterative
languages. In iterative programming, the programmer issues a variety of
commands to the system that mutates a global state (the collection of
all data held in memory at a given moment). In contrast to iterative
programming is functional programming (languages such as LISP, Haskell,
Erlang, Elm, Go, ML). In functional programming, the programmer composes
the solution to a particular problem by chaining together functions with
no concern for global state.

The logic of functional programming is that individual functions can be
very small and well-tested before being chained together, a process
known as "composition." So, in FP, while the program's overall behavior
can be very complex, the individual pieces themselves are simple and
easily understood. Moreover, because the flow of data within the system
is very heavily structured, where execution is happening and how data is
being changed as the program executes is easily traced.  Here's
an example of calculating Fibonacci numbers (the sequence of numbers
starting 0, 1, 1 in which each number is the sum of the two previous) in
iterative programming and again in functional. The functional example
does not define any state variables nor does it change any variables in
the process of execution. There are performance and readability pay-offs
for either approach, but the key difference is that the iterative
program describes what the computer must do to get Fibonacci numbers,
while the functional program describes how the problem is solved.

~~~ javascript
// Iterative Fibonacci Numbers:

function fib(n) {
    if(n === 0) return 0;
    if(n === 1) return 1;

    // Create state variables:
    var n2 = 0;
    var n1 = 1;
    var result = 0;

    // Iterate a looping structure and mutate:
    for(var i = 2; i <= n; i++) {
        result = n1 + n2;
        n2 = n1;
        n1 = result;
    }
    return result
}

/* @flow */
// Functional Fibonacci numbers:

function fib(n: number): number {
    if(n === 0) {
        return 0;
    } else if(n === 1) {
        return 1;
    } else {
        // Function is defined in terms of itself:
        // No variable mutations:
        return fib(n-1) + fib(n-2);
    }
}
~~~

For a variety of reasons that trace back to the work done in
mathematical logic by Alonzo Church and Alan Turning in the 1930s, it is
more possible to prove, in the logical sense, that a functional program
is correct. For instance, in the functional example of Fibonacci here,
I've added a layer of type-checking using Facebook's Flow system,
guaranteeing that my function will only accept numbers and will only
return a number. This contractual obligation---which prevents run-time
errors due to unexpected input---is one reason why many big data
companies are switching to functional programming. OCAML is used by
Bloomberg for derivative analysis (a lot of financial companies use
OCAML); Walmart uses Clojure for supply-chain management; Twitter uses
Scala for a lot of disk-intensive work; Facebook uses a variety of FP
languages for its products.

Thinking about software in terms of complexity, error, and accident, as
I have been here signals a broader shift in how we think critically
about computation. To return to French theory (sorry), Jean Baudrillard,
who frequently cites Paul Virilio in his later work, sets the terms for
a lot of humanistic thinking about computation. For the intro-to-theory
Baudrillard of *Simulacra and Simulation*, virtuality is a space of
disembodiment, of immateriality, and a shimmering, evanescence. He
famously describes a "desert of the real" in which simulation has
withered reality and left a dusty, desiccated heap.

We might think about Facebook's famous motto,  "move fast and
break things," as an example of this desertification: get everything
online, damn the torpedoes. This is the logic of disruptive innovation.
However, less widely known, in 2014, Facebook changed this original
dictum to  "Move Fast With Stable Infra," which highlights why
minimizing complexity is such a potent site for studying security in the
shadow of The Great Accident. Moreover, the "infra" (shortened from
"infrastructure") in the new Facebook motto underscores why I think
infrastructure studies is so important to contemporary digital
humanities. Paul N. Edwards has suggested that most of what
should be studied as "technology" in public discourse "reside\[s\] in a
naturalized background, as ordinary and unremarkable to us as trees,
daylight and dirt" (Edwards 185). These background
technologies, "\[are\] *not* salient for most people, most of the time"
(Edwards 185). However, these infrastructure systems, as
Edwards argues, are co-constitutive of modernity, that "to be modern is
to live within and by means of infrastructures" (Edwards
186).

We can read Baudrillard as suggesting that simulation makes reality into
a desert, but given the sheer amount of material stuff that proliferates
out of sight to sustain a supposedly immaterial virtuality, is there a
jungle growing where the desert should be?

In conclusion, infrastructure studies provides a methodology for hacking
our way through the tangle of competing material systems that sustain
the disembodiment of code. By grasping the often dull materiality of
virtual existence, by highlighting the jungle that sprouted where we
were told we would find a desert, infrastructure studies, gives us the
best means for understanding, articulating, and acting against the
circulation of power in the present. By understanding how big data is
now working to mitigate the accidents that proliferate as an unavoidable
side-effect of complexity, we can better see how the disruptive ethos of
tech start-ups are mutating into something more careful, more
considered, and probably more dangerous. If we hope to gain a better
understanding of how anxiety and security are shaped and are shaping our
lives, following the code seems like a good place to start.

Thank You

### Works Cited

<div id="refs" class="references">
<div id="ref-edwards_infrastructure_2002">
<p>Edwards, Paul. “Infrastructure and Modernity: Scales of Force, Time, and Social Organization in the History of Sociotechnical Systems.” <em>Modernity and Technology</em>, MIT UP, 2002, pp. 185–225.</p>
</div>
<div id="ref-norton_everything_2014">
<p>Norton, Quinn. <em>Everything Is Broken. the Message</em>. 20 May 2014, <a href="https://medium.com/message/everything-is-broken-81e5f33a24e1" class="uri">https://medium.com/message/everything-is-broken-81e5f33a24e1</a>.</p>
</div>
<div id="ref-sayers_minimal_2016">
<p>Sayers, Jentery. <em>Minimal Definitions. Minimal Computing</em>. 2016, <a href="http://go-dh.github.io/mincomp/thoughts/2016/10/02/minimal-definitions/" class="uri">http://go-dh.github.io/mincomp/thoughts/2016/10/02/minimal-definitions/</a>.</p>
</div>
<div id="ref-virilio_original_2007">
<p>Virilio, Paul. <em>The Original Accident</em>. Translated by Julie Rose, 1 edition, Polity, 2007.</p>
</div>
</div>
