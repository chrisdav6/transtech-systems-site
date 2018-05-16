$(function() {
  
  //Sales Request Form
  
  //Show Privacy statement if country is not US
  $(".privacy").hide();
  $("#confirmPrivacy").prop("checked", true);
  
  $("#country").on("input", function() {
    let countryVal = $("#country").val();
    $("#confirmPrivacy").prop("checked", false);
    
    if(countryVal !== "US") {
      $(".privacy").slideDown();
    } else {
      $(".privacy").slideUp();
      $("#confirmPrivacy").prop("checked", true);
    }
  });
  
});