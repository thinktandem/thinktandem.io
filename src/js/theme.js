//
//	Scripts for the theme,
// 	slideshow is used for Home Alt #4 (index4.html)
// 	services is used for Services (services.html)
//

var $ = require('jquery');

$(function () {
  // retina display
  if(window.devicePixelRatio >= 1.2){
    $("[data-2x]").each(function(){
      if(this.tagName == "IMG"){
        $(this).attr("src",$(this).attr("data-2x"));
      }
      else {
        $(this).css({"background-image":"url("+$(this).attr("data-2x")+")"});
      }
    });
  }

});

window.utils = {
  isFirefox: function () {
    return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  }
};
