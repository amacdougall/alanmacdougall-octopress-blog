---
layout: post
title: "Focusing on the Task at Hand with Git"
date: 2012-05-01 16:29
comments: true
categories: 
  - Programming
  - Git
---

Every day or so, there's a new front-page [HN](http://news.ycombinator.com)
article about Git. New GUIs, for those who find the command line ugly or
abstruse. New CLIs, for those who find Git confusing. New workflows, for those
who can't quite get Git to fit their style. New tutorials, for the long tail of
new Git users. New deep-dive technical articles, for those who can't get enough
of SHAs and refs.

[Here's where to start](http://www.hnsearch.com/search#request/submissions&q=git&sortby=points+desc),
if you've got a few hours to burn; but if you want my opinion, you don't need
any of that. I use Git to get work done, and here's how.

<!-- more -->

There's plenty of tutorial noise out there, and I won't be one to add to the
ruckus. If you've read [Pro Git](http://progit.org/book/), you're ready. If not,
read it now. I'll wait.

Now you're ready. Check out your master branch. Create a feature branch. Work on
that branch until the feature's ready. If master changes, be sure to merge it
into your feature branch to resolve conflicts before they get to be a problem.
When the feature's ready, merge it back into master and deploy.

That's it. That's the workflow. Do your work, don't burn all your brainpower on
perfecting your Git.

Got teammates? Have them each work on their own fork of a "blessed" repository.
Set up the blessed repo and all the forks as remotes. `git remote update` every
day. This gives you flexibility and control, and saves you from the central-repo
hell of stomping all over one another's history by pushing different commits to
the same branch of the same repo.

Got complex features? Want to test them together before merging them into
master? Fine, make a staging branch. Merge feature branches into it; merge it
into master when it's good.

The common theme here? You're paring your troubles down to just a few, and in
the process, you're sweeping your mental attic for cobwebs. Once you check out a
feature branch and get your coffee, it's just you, your editor, and a straight
road ahead. Like it should be.

You want to use Git right? Use it to _focus_.
