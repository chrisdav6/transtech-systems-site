$(function () {

  //Holiday Banner
  $('.holidayBanner').delay(1000).fadeIn(400).delay(10000).fadeOut(400);

  //Tradeshow Season Fade In
  $('.tradeshowSeason').animate({
    opacity: 1
  }, 500);

  //Fade In Body on page Load
  // $("body").animate({
  //   opacity: 1
  // },500);

  //Smooth Scroll on #featured #about and #gaugesMap
  var scrollFeatured = new SmoothScroll('a[href="#featured"]', {
    speed: 800,
    easing: 'easeInOutQuart'
  });

  var scrollAbout = new SmoothScroll('a[href="#about"]', {
    speed: 800,
    easing: 'easeInOutQuart'
  });

  var scrollGaugesMap = new SmoothScroll('a[href="#gaugesMap"]', {
    speed: 800,
    easing: 'easeInOutQuart'
  });



  //Enable Bootstrap 4 Popovers
  $('[data-hover="popover"]').popover({
    trigger: "hover"
  });

  //Enable Bootstrap 4 ToolTips
  $('[data-toggle="tooltip"]').tooltip();



  //Scroll to top button animation
  var offsetTop = $(window).height();

  $(window).scroll(function () {
    if ($("html").scrollTop() > offsetTop && $(document).width() > 700) {
      $("#scrollBtn").fadeIn();
    } else {
      $("#scrollBtn").fadeOut();
    }
  });

  $("#scrollBtn").on("click", function () {
    $('html').animate({
      scrollTop: 0
    }, 500);
  });



  //Product Page Lightbox Options
  lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true,
    'fitImagesInViewport': true
  });



  //Load Youtube Videos on Click
  $(".youtubeEmbed").each(function () {
    // Set the BG image from the youtube ID
    $(this).css('background-image', 'url(//i.ytimg.com/vi/' + this.id + '/hqdefault.jpg)');
    // Click the video div
    $(document).delegate('#' + this.id, 'click', function () {
      // Build embed URL
      var iframe_url = "//www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
      // Grab extra parameters set on div
      if ($(this).data('params')) iframe_url += '&' + $(this).data('params');
      // Build iframe tag
      var iframe = $('<iframe/>', { 'allowfullscreen': 'allowfullscreen', 'frameborder': '0', 'src': iframe_url })
      // Replace the YouTube thumbnail with YouTube HTML5 Player
      $(this).append(iframe);
    });// /click
  }); // /each video



  //End Capital Business Beat video when modal closes on corporate news page
  $("#capitalBusiness").on('hidden.bs.modal', function (e) {
    $("#capitalBusiness iframe").attr("src", $("#capitalBusiness iframe").attr("src"));
  });

});