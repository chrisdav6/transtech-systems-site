$(function() {
  
  // $(window).on("scroll", function() {
  //   $(".navbar").css("background", "rgba(21, 34, 53, .95)");
  // });
  
  //Smooth Scroll on featured only
  var scroll = new SmoothScroll('a[href="#featured"]', {
    speed: 800,
    easing: 'easeInOutQuart'
  });
  
});