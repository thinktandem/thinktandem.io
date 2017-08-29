/**
 * KalaStatic
 *
 * TODO: Get Metalsmith/Browserify to minify the output.
 */

// Dependencies
var $ = require('jquery');
var bootstrap = require('bootstrap');

/**
 * Document Ready
 */
$(function() {

  // Initiate all pages
  require("./pages/contact")();

  // Activate all the tooltipz
  $('[data-toggle="tooltip"]').tooltip();

});
