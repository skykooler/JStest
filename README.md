# JavaScript Test

All of this is in the comments of `main.js`

This is the JavaScript test.  In this test, you will pull website
performance data from the Compete.com API and use it to display a
graph.

Your finished product will be a page where the user can enter a
domain, specify a metric from the drop down, and optionally specify
a date range or the last x months from which to gather data.  When
they click the GO button, a chart should appear.  Additionally, the
user should be able to change these inputs and load a different
chart WITHOUT refreshing the page.

This is the only file you may edit.  You are welcome to create as
many new files as you want and modify them, but it is strongly
advised that you do not modify index.html or highcharts-custom.js.
index.html is pre set up enough that you can complete the test
without changing it.  You will of course need to carefully review
index.html throughout the test as it contains the dom elements you
will need to either manipulate or read values from.  If you do end
up modifying index.html, you may not do so to add script tags for
external JavaScript libraries like jQuery.  At Idea Evolver, we try
to use jQuery as little as possible because it is large to load and
has much worse performance than raw JS.

The documentation for Compete.com is located here: https:eveloper.compete.com/documentation/

Jump to the very bottom of the documentation page.  Read the
section about JSONP carefully because that is how you will request
data from Compete.  Unfortunately, there is a small error in the
sample code for JSONP, but an ace coder fit to work at Idea Evolver
should be able to figure it out anyway :)

The API Key for Compete is 27953e450d095eb57efe7d37187f0ae8

Feel free to ask lots of questions and think aloud.
