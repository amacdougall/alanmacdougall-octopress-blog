---
layout: post
title: "Quick Block Uncommenting"
date: 2012-05-29 15:15
comments: true
categories: 
  - Programming
---

A quick and easy way of commenting or uncommenting large blocks of code in
languages with multiline comments, such as the `/* wing comments */` found in
C-like languages:

{% codeblock lang:javascript %}
/* DEBUG: display complicated logging data
$.log("Baking.Cookies.recipe.build:",
  "recipe_id => ", recipe_id,
  "; recipe_contents => ", $.extend(true, {}, recipe), // deep clone
  "; options => ", options
);
// */
{% endcodeblock %}

Right now the whole block is commented out; but when you cap the top wing
comment, you get this:

{% codeblock lang:javascript %}
/* DEBUG: display complicated logging data */
$.log("Baking.Cookies.recipe.build:",
  "recipe_id => ", recipe_id,
  "; recipe_contents => ", $.extend(true, {}, recipe), // deep clone
  "; options => ", options
);
// */
{% endcodeblock %}

Your code editor certainly provides a way of toggling comments, but over large
code blocks this may involve making a large selection first. With this
technique, adding or removing just two bytes can toggle comments on a block of
any length.
