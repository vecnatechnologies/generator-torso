var $ = require('jquery');

// Expose some globals
window.$ = $;
window.jQuery = $;

$(window).ready(function () {
  /**
   * The application router object
   */
  require('./router').start();
});

