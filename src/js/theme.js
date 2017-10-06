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

  $('.case-study').hover(function() {
    $(this).find('.case-study-front').hide();
    $(this).find('.case-study-back').show();
  }, function() {
    $(this).find('.case-study-back').hide();
    $(this).find('.case-study-front').show();
  });


  $(window).load(function() {
    resizeWork();
  });

  $(window).bind('resize', function() {
    var resizeTim = setTimeout( function() {
      resizeWork();
      clearTimeout(resizeTim);
    } , 10 );
  });


  // Apply Inner Height to outer, matchheight can't do this.
  function resizeWork() {
    var height = 0;
    var check = 0;
    $('.case-study-recent').each(function() {
      check = $(this).height();
      if (check > height) {
        height = $(this).height();
      }
    });
    // Set the height to the largest
    $('.case-study-home').css({'height':height + 'px'});
  }

});

window.utils = {
  isFirefox: function () {
    return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  }
};
