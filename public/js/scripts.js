$(function() {
  
  // $(window).on("scroll", function() {
  //   $(".navbar").css("background", "rgba(21, 34, 53, .95)");
  // });
  
  //Smooth Scroll on featured and about only
  var scrollFeatured = new SmoothScroll('a[href="#featured"]', {
    speed: 800,
    easing: 'easeInOutQuart'
  });
  
  var scrollAbout = new SmoothScroll('a[href="#about"]', {
    speed: 800,
    easing: 'easeInOutQuart'
  });
  
});