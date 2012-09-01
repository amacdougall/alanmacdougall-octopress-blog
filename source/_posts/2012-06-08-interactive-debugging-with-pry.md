---
layout: post
title: "Interactive Debugging with Pry"
date: 2012-06-08 12:20
comments: true
categories: 
  - Programming
  - Tools
---

I wrote a [post about pry earlier](http://www.alanmacdougall.com/blog/2012/03/27/using-vim-slime-with-pry-for-repl-perfection/),
but at the time, I didn't realize just how much muscle Pry was packing. Install
two simple plugins and one builtin function, and you turn Pry into a stepping
debugger. It can pause at a breakpoint, step through code one line at a time,
and even shuttle up and down the call stack; and since you never lose your Pry
superpowers, you can rummage around your state to your heart's content.

<!-- more -->

## Time Stop

`binding.pry`. Two simple words with immense power. Speak them aloud, and your
program will pause in place, frozen in time, while the Pry REPL springs up
around it. Here's an example, from [the single most important project on Github](https://github.com/amacdougall/puppy-presenter),
the cutting-edge technology behind the [Puppy Presenter](/puppies/):

{% codeblock lang:ruby %}
# generate HTML from template
template = File.read config["files"]["template"]

binding.pry # ENTER THE MATRIX

engine = Haml::Engine.new template, :format => :html5;
output = engine.render Object.new, :images => images;
{% endcodeblock %}

This scrap of script crams cute puppies into a HAML template, but first,
`binding.pry` freezes reality. Loops stop looping, events stop listening, and
the world halts in an eyeblink. Except for you. You have total freedom: you can
peek at your code and tinker with its innards at will. To resume, `Ctrl-D`; your
code will roar back to life and keep going until it hits another `binding.pry`.

If you run your local Rails instance with `rails server` or `./script/server`,
you can even drop into a Pry session right in your terminal, using the same
`binding.pry` technique. Rails debug spam stops: Pry starts.

## One Step at a Time

The `pry-nav` plugin makes it easy to execute your code one step at a time. When
your code hits the brick wall of `binding.py`, you can walk it forward, line by
line, with `next` -- or if you're not feeling so talkative, [alias it to 'n'](https://github.com/nixme/pry-nav#pry-nav)
in `.pryrc`.

![frozen in time](/post_content/2012-06-08-interactive-debugging-with-pry/pry_debugging_002.png)

We're paused at `binding.pry`; now we can step forward.

![advancing one step](/post_content/2012-06-08-interactive-debugging-with-pry/pry_debugging_003.png)

Note the arrow showing us what line we're on. We can execute any code we want at
the command line; we'll get our output and then skim a little off the top.

![reading some output](/post_content/2012-06-08-interactive-debugging-with-pry/pry_debugging_004.png)

`gem install pry-nav` or add it to your `Gemfile` to acquire it; `require
'pry-nav'` to equip it.

## Elevator Action

The `pry-stack_explorer` gem lets you move up and down the call stack. Can't
debug much of anything without that. These two methods make a nice easy target.
They don't do much of anything, so there's nothing to debug, but they're simple,
so debugging is easy. Life should be more like that.

{% codeblock lang:ruby %}
require 'pry'
require 'pry-nav'
require 'pry-stack_explorer'

def outer(message, number)
  inner(message)
end

def inner(message)
  local = true
  binding.pry
end

outer("hello", 1000)
{% endcodeblock %}

Plain old Pry lets you look at your locals when `binding.pry` sets its teeth.
Try to look at something outside the current scope, though...

![only locals available](/post_content/2012-06-08-interactive-debugging-with-pry/pry_debugging_005.png)

Ruby stonewalls you, but `pry-stack_explorer` doesn't care much for walls. Just
use `up` and `down` to traverse the stack.

![going up the stack](/post_content/2012-06-08-interactive-debugging-with-pry/pry_debugging_006.png)

Your program hasn't moved... just your point of view. `show-stack` shows you the
whole call stack, with a little arrow saying _you are here_.

## Further Reading

In [this post by Pry's author](http://banisterfiend.wordpress.com/2012/02/14/the-pry-ecosystem/),
you can read more about `pry-nav`, `pry-stack_explorer`, and other plugins that
might help you out. And if you got something out of this post, why not [follow me on Twitter](https://twitter.com/alan_macdougall)
to stay on top of things? I promise not to clutter your feed with an endless
parade of Foursquare checkins and Instagrams of beer.

