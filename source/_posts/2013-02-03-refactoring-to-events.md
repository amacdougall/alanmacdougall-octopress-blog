---
layout: post
title: "Refactoring to Events"
date: 2013-01-04 09:44
comments: true
categories: Programming
---


Event-driven programming is a flexible weapon... like a whip. Design things
right, and a flick of the wrist can roll down the length of your architecture
and knock a cigarette out of a man's mouth with a supersonic snap. Design wrong,
and a half-hour later you're in the emergency room with a wadded up T-shirt
clamped to your forehead.

As a front-end developer, I've whipped myself in the forehead more times than I
care to count. Do that often enough, and you start to get an intuition about
things. I've got a theory about event handling: _make your decisions at the
right level of abstraction._

Maybe this is old hat. It should have been old hat to me, too, but you can't see
how old a hat is when you're wearing it. But first let's talk about kinds of
events.

<!-- more -->

## Event Types

Events come in three flavors.

### Notifications

When something happens in your application, and you want to respond to it
elsewhere, that causes another kind of event. I generally call these
"notifications." Displaying a popup when there's new mail, or updating a view
when the underlying data changes, or checking for that damned 140-character
limit; those are all notifications. You aren't reporting on the results of a
delayed process, and crucially, you aren't directly handling a user action.

### Completions

Sometimes you set a metaphorical wheel spinning, and you want to know when it
comes to rest. Downloads, uploads, API requests, background jobs of all kinds.
Maybe an actual wheel. Point is, you started it; you just don't know when it's
going to end. When it's done, you can continue with simple straight-line code. I
tend to just call these "completion" events.

### Intents

The last big kind of event, and the topic of this article, is what I call an
"intent." I borrowed the term from Android, and the new "web intents" that are
not quite sweeping the internet just yet. An event that forces a decision is an
intent. It could be user input, it could be server data that forces you down a
different code path: either way, new information just entered your system. You
might have to put an extra layer in your code to turn a plain-jane click into
something with a little more meat to it. Maybe something like this. Assume the
existence of an `Emitter` mixin which adds `on` and `emit` methods.

{% codeblock lang="javascript" %}
Intents = {
  init: function() {
    var intents = this;

    // begin listening for events which reflect an intent
    $("#photos a.select-photo").on("click", function(event) {
      event.preventDefault();
      var photoId = $(this).data("photoId");
      intents.emit("intent:select-photo", photoId);
    });
  }
};

_(Intents).extend(Emitter);
{% endcodeblock %}

Now your UI logic is held at arm's length: if you want to know that the user is
selecting a photo, you just handle the `intent:select-photo` event. Many UI
events could cause that intent to happen: a mouse click, a keyboard command, a
press of the undo button if your app has that functionality. And by the same
token, the intent could have more than one handler.

So far, we're just talking about an event dispatcher; in fact, it's not a long
step to get from here to the Command pattern, hooking the same command action up
to more than one UI component. But the real win here is conceptual: we don't
know _a priori_ what a mouse click signifies, but "select-photo" plus a photo id
is unambiguous. This pattern saves you from keeping all your domain logic in a
briar patch of jQuery callbacks; but it also gives you concrete concepts to work
with as your application evolves.

## Response and Responsibility

Sometimes, to handle an event, you need to make decisions. Should the user be
able to delete this photo? Does this link prompt a paywall? Should we display a
toast notification, and if so, what data should it contain? If the event handler
is close to the event source, this is easy: simply make the decision and move
on.

{% codeblock lang="javascript" %}
photoSelector.on("select", function(event) {
  if (event.photo.someCondition == true) {
    takeAction();
  } else {
    displayError();
  }
});
{% endcodeblock %}

Straightforward. Uncontroversial. But you know as well as I do that
"straightforward" never stays that way for very long.

### Working Too Hard _Is_ Hardly Working

Take Paperless Post. Users buy _coins_. You use coins to gussy up your cards.
Choosing a fancy card design uses coins, so when a user selects a new design, we
have to handle the _selection_ by loading up the new graphics and adjusting the
layout... but we also have to add coins to the price of the card. If the card
used to be free, that means we have to display a paywall, and if not, we display
a brief message. On the paywall, if the user clicks the _cancel_ button, we have
to undo the design change.

Hear that sound? That distant crashing, crumbling noise? Areas of concern,
smashing into each other and cracking and breaking and falling into the sea.

For a long time, we coded as if there was only one event happening here. The
user chose a new card design, and we handled it like this:

1. Change the card design.
1. Show the right UI for the price change.

But there are two events here, not one. First the user selects the design
change. We can handle that on the spot. Then the price changes. These are two
different things, no two ways about it. Instead, we should handle it like this:

1. Change the card design.
1. Set the price.

And then handle the price change somewhere else. Different component, maybe.
Heck, maybe a different architectural layer. You just have to ask yourself one
thing: "Does this decision make sense here?" If your selection handler is
displaying a paywall, you can bet your bottom dollar the answer is no.

In short, if your event handler is making too many decisions, look for a way to
spread that hard work around. If it worked for Tom Sawyer, it can work for you.

### Gratifaction

Our situation at Paperless Post was more complicated than I'm letting on. The
selection handler did not make the paywall decision... but it gathered
information for it. It looked something like this.

{% codeblock lang="javascript" %}
linerSelector.on("change", function(event) {
  var newLiner = PP.assets.findById(event.id);
  var oldCost = PP.price.calculate();
  card.liner = newLiner;
  var newCost = PP.price.calculate(); // different result now

  PP.assets.emit("assetChanged", {
    asset: newLiner,
    oldCost: oldCost,
    newCost: newCost,
    undoFunction: function() {PP.history.backtrack();}
  });
});
{% endcodeblock %}

Maybe we were too close to the barn to make out more than just some red painted
wood, but we had this in our codebase for a long time. Still do, in fact. But
now I know what's wrong. To decide whether to pop the paywall, we need to know
if the price went up. Sure. But why in heck is that code lumped in with the
liner setter? The price calculator should handle all that business by itself. It
should store its own snapshots of the past prices, and when it hears that
`assetChanged` event, it should do its own math.

## tl;dr

Rule of thumb: put your decisions close to the events that prompt them. If an
event handler is doing too much work, maybe a new event type should exist in
your system. Don't worry that you are adding too many layers of abstraction. If
you design the abstractions right up front, sure, you end up with
[SimpleBeanFactoryAwareAspectInstanceFactory](http://static.springsource.org/spring/docs/2.5.x/api/org/springframework/aop/config/SimpleBeanFactoryAwareAspectInstanceFactory.html).
But if you have a problem, and a new layer of abstraction is the solution, don't
look a git horse in the commit.
