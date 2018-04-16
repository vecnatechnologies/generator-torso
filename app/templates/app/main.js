var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

// Expose some globals
window.$ = $;
window.jQuery = $;

$(window).ready(function () {
  /**
   * The application router object
   */
  require('./router').start();
});

