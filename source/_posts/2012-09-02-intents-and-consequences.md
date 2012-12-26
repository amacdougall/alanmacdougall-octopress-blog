---
layout: post
title: "Intents and Consequences"
date: 2012-09-02 09:44
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
things. I've got a theory about event handler chains: _keep your decisions close
to the user's intent; put your consequences further out._

Maybe that was enough to put a little light bulb over your head. Fair enough. If
not...

<!-- more -->

## Event Types

Events come in three main flavors.

### Completions

Sometimes you set a metaphorical wheel spinning, and you want to know when it
comes to rest. Downloads, uploads, API requests, background jobs of all kinds.
Maybe an actual wheel. Point is, you started it; you just don't know when it's
going to end. I tend to just call these "completion" events.

### Notifications

When something happens in your application, and you want to respond to it
elsewhere, that causes another kind of event. I generally call these
"notifications." Displaying a popup when there's new mail, or updating a view
when the underlying data changes, or checking for that damned 140-character
limit; those are all notifications. You aren't reporting on the results of a
delayed process, and crucially, you aren't directly handling a user action.

### Intents

The last big kind of event, and the topic of this article, is what I call an
"intent." I borrowed the term from Android, and the new "web intents" that are
not quite sweeping the internet just yet. An event that comes straight from the
user, because the user wanted to do something, is an intent. You might have to
put an extra layer in your code to turn a plain-jane click into something with a
little more meat to it. Maybe something like this. Assume the existence of an
`Emitter` mixin which adds `on` and `emit` methods.

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

## Decisions and Consequences

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

Straightforward. Uncontroversial. 


* Notifications can cause multiple hops, and you get further away from the
  original intent
* If you make decisions based on a notification, ask if those decisions are
  appropriate to the architectural layer you're on (and if you don't have arch
  layers, decompose your shit bro)
* If your decisions aren't layer-appropriate, refactor to move them closer to
  the intent

A lot of times, you do a single concrete thing in response to an event. I call
that a "consequence." Consequences can safely live many notification hops away
from the intent.

Example refactoring? Discuss PP situation that led to this revelation?

## Conclusion

??
