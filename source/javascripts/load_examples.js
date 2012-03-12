jQuery(document).ready(function() {
  /* Whenever a div.blogExample appears, bind its link to load inline. */
  jQuery("div.blogExample>a").live("click", function(event) {
    event.preventDefault();
    jQuery(this).parent().load($(this).attr("href"));
  });
});
