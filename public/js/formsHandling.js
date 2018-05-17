$(function() {
  
  //Corporate Contact Form
  $("#corporateContactForm").on("submit", function(event) {
    event.preventDefault();
    
    let $nameInput = $("#name");
		let $emailInput = $("#email");
		let $messageInput = $("#message");
		let $address = $("#address"); //Honeypot field
		let $corpContactBtn = $("#corpContactBtn");

		if($address.val() !== "") {
			alert("Nice try bot!");
			return false;
		}
    
		//Hide the submit button
		$corpContactBtn.hide();
		//Show the spinner gif
		$(".fa-spinner").show();

		//Wait 2 seconds
		setTimeout(function() {
			//Hide the spinner gif
			$(".fa-spinner").hide();
			//Flash the success message
			$(".submitMessage").fadeIn("slow").delay(2000).fadeOut("fast", function() {
				//Show the submit button
				$corpContactBtn.show();
			});
			//Clear form fields
			$nameInput.val("");
			$emailInput.val("");
			$messageInput.val("");
		},2000);
		
		//Send Ajax to PHP file
  });
  
  
  
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
  
  
  
	//Download Manuals Form
	$("#currentCustomerNo").on("change", function() {
		$(".hearAbout").fadeIn();
		$("#reach").attr("required", true);
	});
				
	$("#currentCustomerYes").on("change", function() {
		$(".hearAbout").fadeOut();
		$("#reach").attr("required", false);
	});
  
});