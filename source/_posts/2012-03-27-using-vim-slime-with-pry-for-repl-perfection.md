---
layout: post
title: "Using vim-slime with Pry for REPL Perfection"
date: 2012-03-27 11:21
comments: true
categories: 
  - Programming
---

I used to use Python for my everyday scripting tasks, but since I started
working at [Paperless Post](http://www.paperlesspost.com), a Rails shop, I've
felt like investing some skill points in Ruby would be a wise investment. Ruby
is fun to write, but my workflow suffered from a severe lack of interactive
programming support. No, irb doesn't cut it, not for someone used to the mighty
[Dreampie](http://dreampie.sourceforge.net/). I was heartbroken... until I
discovered an alternative. It's not a single powerful app, like
Dreampie&thinsp;&#8212;&thinsp;instead, I had to stitch together several tools
to get the same effects. But it makes exploratory programming a breeze, and
that's more than I can say for irb.

To build this interactive-programming Frankenstein's monster, you'll need three
tools: vim, tmux, and Pry.

<!-- more -->

## The Tools

[tmux](http://tmux.sourceforge.net/) is
[GNU screen](http://www.gnu.org/software/screen/) if GNU screen beat the final
boss and started again with NewGame+. It's a powerful beast, and I've barely
begun to scratch the surface. I like its status bar and scrollback pager, and
when sshing into a remote, tmux splits are like mojitos on a hot
day&thinsp;&#8212;&thinsp;once you have them, you realize you needed them all
along.

[Pry](http://pry.github.com/) is a replacement for irb. If I've barely scratched
the surface of tmux, it's safe to say that I haven't even given Pry a belly rub.
Since my Ruby is as rusty as an old railroad bridge, I've gotten a lot of
mileage out of its `ls` and `show-doc` features. Did you know that `ls []`, for
instance, shows not only all the properties and methods of the object, but what
module those methods came from? _Exceedingly_ useful when working with a
codebase laced with mixins. You can use `pry` as your Rails console by invoking
[these incantations](https://github.com/pry/pry/wiki/Setting-up-Rails-or-Heroku-to-use-Pry).

[vim](http://www.vim.org/) needs no introduction, but you'll also need the
[vim-slime](https://github.com/jpalardy/vim-slime) plugin, which lets you send
text straight from vim into tmux. That's what ties this whole mess together and
makes it work. Install the plugin and follow the configuration steps in its
README.

## The Steps

1. Run vim.
2. Run tmux in a separate terminal.
3. Run pry in a tmux window.
4. Type some Ruby in vim and return to normal mode.
5. `C-c C-c`; you can just hold Ctrl and double-tap `c`.

Now that entire paragraph of Ruby code&thinsp;&#8212;&thinsp;the line you're on
and all adjacent lines north and south of it&thinsp;&#8212;&thinsp;gets sent to
the pry session and executed. You're in business. You can also visually select
some specific lines and hit the same sequence. Same deal.

## The Payoff

Write your Ruby program line by line, testing each line by sending it to pry.
By using pry's `cd` function, you can even go into a class and define or
redefine its methods. Try this out:

{% codeblock lang:ruby %}
class Test
  def greeting
    "hello"
  end
end

test = Test.new

cd Test

def greeting
  "what's up?"
end

cd ..

test.greeting # returns "what's up?"
{% endcodeblock %}

Since you're writing the program right there in vim, there's relatively little
cleanup necessary to get the code into a useable form; and since you're testing
it in pry all along, there's no write/run cycle to use up your keystrokes or
mental effort. Writing, experimenting, testing, and polishing are as tight as
four fingers in a fist.

Like this post? Find it useful?
[Follow me on Twitter](http://www.twitter.com/alan_macdougall) to hear when I've
got a new one. Or [get the RSS feed](http://www.alanmacdougall.com/atom.xml) if
you're on that side of the
[war on RSS](http://stage.vambenepe.com/archives/1932).
