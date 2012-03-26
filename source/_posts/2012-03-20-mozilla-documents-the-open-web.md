---
layout: post
title: "Mozilla Documents the Open Web"
date: 2012-03-20 10:28
comments: true
categories: 
  - Commentary
---

Documentation sucks.

The _process_ of documentation sucks, so developers resist doing it. Hacking on
a library is fun, but explaining precisely how to use the library is not.
Perhaps an early run-in with the keyhole essay imbued the coder with a lifelong
distaste for exposition; perhaps blank-page syndrome attacks the would-be
documentor the moment he loads `README.md` into Sublime Text 2; or perhaps it is
simply that instructing the computer comes more naturally than educating humans.

When there is a stab at documentation, it is often halfhearted. API docs
generated from code which has no doc comments, sparsely commented example apps
with no explanation of the underlying concepts, a one-page "quick start" with no
further elaboration: these sins are widespread, and although they may be widely
scorned, they are also widely duplicated.

But somehow, documentation for open web technologies is worse. 

<!-- more -->

## Web Language Documentation Is Terrible

Even when it is more complete, it is worse. Even when it was clearly the labor
of dozens of people over a span of years, it is worse. Even when it is
comprehensive, it is worse. Sometimes its very comprehensiveness just
accentuates the cancer at its core.

HTML documentation presents lists of tags and attributes, with browser support
annotations. Sadly, those lists often treat all tags and attributes as equals,
relegating the mighty `<div>` to the same column as the lowly `<dd>`, when they
would be better placed in different categories. Browser support information is
spotty; this is forgivable when the cutting edge of browser development is a
moving target, but it is still a pervasive source of misinformation. HTML
documentation seldom teaches actual best practices. In all, HTML documentation
is like HTML: roughly suited to its purpose, but awkward in its form, clumsy in
its implementation, full of poorly defined edge cases, and always changing just
a little too slowly to live up to the demands placed upon it.

CSS documentation is bad for most of the same reasons, but it suffers from one
additional flaw which blows all the rest out of the water: CSS itself is
unsuited for layout. This means that when documentation attempts to explain
the uses of relative, absolute, and static positioning, of the various box
models, and especially of the eternally frustrating `float` and `clear`,
it ultimately causes as much confusion as it cures. Don't believe me about CSS?
Without checking a reference or using a framework, design a layout where three
columns, with background colors, have equal height even when their contents are
unequal. There's a reason this layout was called "The Holy Grail": it was
thought to be a myth, and the quest for it was epic. If you were reading
[A List Apart](http://www.alistapart.com) in the early 2000s, you remember.

JavaScript documentation has a different problem. JavaScript is suited to its
purpose, despite its various flaws, but most documentation still teaches the
JavaScript of five to ten years ago. Good JavaScript programmers have kept with
the program: they take advantage of frameworks and libraries, they write
flexible asynchronous code with a solid understanding of scope and execution
order, they use namespacing heavily and modules as appropriate. Beginning
JavaScript programmers do not, and most JavaScript documentation does little to
show them a better way. When it does, it turns people who could have been
JavaScript programmers into jQuery programmers: overly pragmatic programmers who
can never understand or expand their system.

## Misinformation, and Who Is Fixing It

Misinformation abounds. w3schools is [an excellent example](http://w3fools.com/)
and a prize target for sniping, because its undeserved linkjuice superglues its
results to the top of every Google search for HTML, CSS, or JavaScript
documentation. However, it is by no means the only offender. Virtually every
site contains misinformation of some sort or, nearly as bad, conceptual holes
where information should be.

But the Mozilla Developer Network, long one of the best resources, is
[doing the right thing](http://hacks.mozilla.org/2012/03/helping-with-the-mdn-what-about-linking-to-us/).
They're aiming for freshness and relevancy, striving to write documentation for
all levels of programmers, and they're soliciting outside submissions. Let's
have more. With time, maybe MDN can finally beat out w3schools just as
StackOverflow did to Experts Exchange.
