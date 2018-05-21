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
	
	//Get dataId from passed to modal
	$('#manualDownload').on('show.bs.modal', function (e) {
    let dataId = $(e.relatedTarget).attr('data-id');
    console.log(dataId);
    
		//Download Manuals Form Submit
	  $("#manualForm").on("submit", function(event) {
	    event.preventDefault();
	    
	    let $nameInput = $("#name");
	    let $compnayInput = $("#company");
			let $emailInput = $("#email");
			let $currentCustomerYes = $("#currentCustomerYes");
			let $currentCustomerNo = $("#currentCustomerNo");
			let $reach = $("#reach");
			let $address = $("#address"); //HoneyPot
			let $manualDownloadBtn = $("#manualDownloadBtn");
	
			if($address.val() !== "") {
				alert("Nice try bot!");
				return false;
			}
	    
			//Hide the submit button
			$manualDownloadBtn.hide();
			//Show the spinner gif
			$(".fa-spinner").css("display", "block");
			$(".fa-spinner").show();
	
			//Wait 2 seconds
			setTimeout(function() {
				//Hide the spinner gif
				$(".fa-spinner").hide();
				//Flash the success message
				$(".submitMessage").fadeIn("slow");
				//Show Download Link
				$("#manualDownloadLink").css("display", "block");
				//Update Link href
				switch (dataId) {
					case '380manual':
						$("#manualDownloadLink").attr("href", "http://www.transtechsys.com/pdf/PQI380Manual.pdf");
						break;
					case '380quick':
						$("#manualDownloadLink").attr("href", "http://www.transtechsys.com/pdf/PQI 380 quickstart guide.pdf");
						break;
					case '380offset':
						$("#manualDownloadLink").attr("href", "http://www.transtechsys.com/pdf/PQI 380 Offset Cheat Sheet.pdf");
						break;
					case '200manual':
						$("#manualDownloadLink").attr("href", "http://www.transtechsys.com/pdf/SDG200Manual.pdf");
						break;
					case '200quick':
						$("#manualDownloadLink").attr("href", "http://www.transtechsys.com/pdf/SDG 200 quickstart guide.pdf");
						break;
					case '200startUp':
						$("#manualDownloadLink").attr("href", "http://www.transtechsys.com/pdf/SDG 200 Start Up Cheat Sheet.pdf");
						break;
					case 'nwjmmanual':
						$("#manualDownloadLink").attr("href", "http://www.transtechsys.com/pdf/nwjm original manual.pdf");
						break;
					case 'nwjmThinmanual':
						$("#manualDownloadLink").attr("href", "http://www.transtechsys.com/pdf/nwjm-TL manual.pdf");
						break;
					case 'swmmanual':
						$("#manualDownloadLink").attr("href", "http://www.transtechsys.com/pdf/SWM manual.pdf");
						break;
					case 'ptsmanual':
						$("#manualDownloadLink").attr("href", "http://www.transtechsys.com/pdf/PTS 3000 manual.pdf");
						break;
					case '301manual':
						$("#manualDownloadLink").attr("href", "http://www.transtechsys.com/pdf/PQI 301 manual.pdf");
						break;
					case '301offset':
						$("#manualDownloadLink").attr("href", "http://www.transtechsys.com/pdf/PQI 301 Offset Cheat Sheet.pdf");
						break;
				}
				//Clear form fields
				$nameInput.val("");
				$compnayInput.val("");
				$emailInput.val("");
			},2000);
			
			//Send Ajax to PHP file
	  });
	});
	
  
  
  //Close the modal when download link is clicked
  $("#manualDownloadLink").on("click", function() {
  	$(".submitMessage").hide();
  	$("#manualDownloadLink").hide();
  	$("#manualDownloadBtn").show();
  	$('#manualDownload').modal('hide');
  });
  
});