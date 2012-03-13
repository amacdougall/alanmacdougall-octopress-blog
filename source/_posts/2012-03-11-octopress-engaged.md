---
layout: post
title: "Octopress Engaged"
date: 2012-03-11 23:03
comments: true
categories: 
  - Administrivia
---

The previous version of this site was built on Django, mainly so I could try it
out. Django impressed me with its powerful templating, admin, and plugins, but I
think I tried to get too cute with it: I had a test subdomain with its own
database, I had multiple settings files for different contexts, I had custom
comment display and submission forms, and on and on, and simply put, I wasn't
_writing_.

<!-- more -->

Django wasn't getting out of my way; instead, it was occasion for
endless tweaking. I didn't have a sane deployment strategy, either, so every
update meant hitting `git status` and using that as a laundry list for sFTP. So
much friction I've still got rug burn.

Meanwhile, I've been mentoring a friend in his first steps with Python and HTML,
and one of his first serious projects is a static blog generation script written
in Python. It got me thinking, how come that little script is simple, yet so
powerful&#8212;while I've spent dozens and dozens of hours fiddling with Django
and have relatively little to show?

Enter Octopress. Jekyll was already a great idea, but the turnkey nature of
Octopress completes it. Its native Markdown orientation means that blogging
feels fast and light, especially with my little
[focus dealie](https://gist.github.com/1989803) to keep me in Zen mode. And the
builtin deployment options&#8212;I use rsync&#8212;are just what the doctor
ordered. Of course, the site now _looks_ like every other Octopress blog, but
that's hardly a bad thing, because Octopress looks beautiful right out of the
box. I'll customize it somewhat in coming days. Or weeks. Or never. Like I said,
I don't want to tweak my blog: I want to write it.

I've ported my previous posts (only five of them, but they're quality!) from the
old system, and hooked up Disqus, so if you're stumbling across this now, please
read and comment.
