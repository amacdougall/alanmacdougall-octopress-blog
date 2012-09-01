---
layout: post
title: "Fixing xorg crash in Thinkpad T520i in Ubuntu 12.04"
date: 2012-09-01 13:48
comments: true
categories: 
---

Like a lot of folks these days, I use OSX at work. There's a lot to love there.
If I can get over the sticker shock, I'll probably get a Mac myself on the next
go-round. But for now, my personal laptop is a Thinkpad T520i running Xubuntu.
If you're on the same train, you might have noticed that ever since the 12.04
update, sometimes your laptop doesn't quite sleep right. You close the lid and
that crescent moon just sits there blinking quietly, and when you open it back
up, the entire desktop has crashed, dropping you to the login screen; and when
you log back in, nothing works right. You check the error report, and it says
xorg crashed; you go deeper, and you find an error handling SIGABRT. What does
it mean? You tell me.

There's a fix, but I had to play bug-report hopscotch before I found it. I
finally fetched up on [this bug report](https://bugs.launchpad.net/debian/+source/xorg-server/+bug/956071).
Sure, this bug's title names an error I wasn't getting, and its description has
repro steps that aren't relevant, and it talks about a crash in a system that
wasn't crashing for me... but when I applied the fix from [comment 32](https://bugs.launchpad.net/debian/+source/xorg-server/+bug/956071/comments/32),
I never got that crash-to-login again. As a good friend always says, "A W is a
W."

Here's the fix, step by step:

1. Downgrade your touchpad driver from the command line: `sudo apt-get install
   xserver-xorg-input-synaptics=1.5.99.902-0ubuntu5`
2. Start the Synaptic Package Manager.
3. Type "xserver-xorg-input-synaptics" in the Quick Filter field, then click
   that package to select it.
4. From the Package menu at the top of the application, check the "Lock" option.

Done deal. That package is downgraded, and since you locked it in the package
manager, you don't have to worry about the updater undoing your hard work. This
fix worked for me, but it was a shot in the dark. Call it luck; or call it good
aim. Either way, I hope yours is as good as mine.
