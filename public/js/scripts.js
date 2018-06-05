$(function() {
  
  //Fade In Body on page Load
  $("body").animate({
    opacity: 1
  },500);
  
  //Smooth Scroll on #featured and #about only
  var scrollFeatured = new SmoothScroll('a[href="#featured"]', {
    speed: 800,
    easing: 'easeInOutQuart'
  });
  
  var scrollAbout = new SmoothScroll('a[href="#about"]', {
    speed: 800,
    easing: 'easeInOutQuart'
  });
  
  
  
  //Enable Bootstrap 4 Popovers
  $('[data-hover="popover"]').popover({
    trigger: "hover"
  });
  
  
  
  //Scroll to top button animation
  var offsetTop = $(window).height();
  
  $(window).scroll(function() {
    if($("html").scrollTop() > offsetTop && $(document).width() > 700) {
      $("#scrollBtn").fadeIn();
    }else {
      $("#scrollBtn").fadeOut();
    }
  });
  
  $("#scrollBtn").on("click", function() {
    $('html').animate({
      scrollTop: 0
    },500);
  });
  
  
});