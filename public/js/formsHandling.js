$(function () {

	//When Available - Show Privacy statement on forms if country is not US
	$(".privacy").hide();
	$("#confirmPrivacy").prop("checked", true);

	$("#country").on("input", function () {
		let countryVal = $("#country").val();
		$("#confirmPrivacy").prop("checked", false);

		if (countryVal !== "United States") {
			$(".privacy").slideDown();
			$('#state option:contains("Not Available")').prop('selected', true);
		} else {
			$(".privacy").slideUp();
			$("#confirmPrivacy").prop("checked", true);
			$('#state option:contains("Alabama")').prop('selected', true);
		}
	});



	//Hide honeypot field
	let $businessAddress = $(".business-address");
	$businessAddress.hide();

	//Corporate Contact Form Submit
	$("#corporateContactForm").on("submit", function (event) {

		//Select submit button
		let $corpContactBtn = $("#corpContactBtn");

		//Hide the submit button
		$corpContactBtn.hide();
		//Show the spinner gif
		$(".fa-spinner").show();

		//Wait 2 seconds
		setTimeout(function () {
			//Hide the spinner gif
			$(".fa-spinner").hide();
			//Flash the success message
			$(".submitMessage").fadeIn("slow").delay(2000).fadeOut("fast", function () {
				//Show the submit button
				$corpContactBtn.show();
			});
		}, 2000);

	});

	//Sales Request form does not need spinner gif

	//Repair Request Form does not need spinner gif


	//Product Repair Form remove required serial # if PTS3000 or Other is selected
	$("#repairRequestForm").on("change", function (event) {

		let $repairSerial = $("#repairSerial");
		let $pts3000 = $("#repair4");
		let $other = $("#repair5");

		if ($pts3000.is(':checked') || $other.is(':checked')) {
			$repairSerial.prop("required", false);
		} else {
			$repairSerial.prop("required", true);
		}

	});


	//Product Registration Form does not need spinner gif


	//Product Registration Form remove required serial # if PTS3000 is selected
	$("#productRegistrationForm").on("change", function (event) {

		let $serial = $("#serial");
		let $pts3000 = $("#register3");

		if ($pts3000.is(':checked')) {
			$serial.prop("required", false);
		} else {
			$serial.prop("required", true);
		}

	});


	//Download Manuals Form Product Pages
	$("#currentCustomerNo").on("change", function () {
		$(".hearAbout").fadeIn();
		$("#reach").attr("required", true);
	});

	$("#currentCustomerYes").on("change", function () {
		$(".hearAbout").fadeOut();
		$("#reach").attr("required", false);
	});

	//Get dataId from passed to modal
	$('#manualDownload').on('show.bs.modal', function (e) {
		let dataId = $(e.relatedTarget).attr('data-id');
		console.log(dataId);

		//Download Manuals Form Submit
		$("#manualForm").on("submit", function (event) {

			let $nameInput = $("#name");
			let $compnayInput = $("#company");
			let $emailInput = $("#email");
			let $manualName = $("#manualName");
			let $manualDownloadBtn = $("#manualDownloadBtn");

			//Send ManualName on form when email is sent
			$manualName.val(dataId);

			//Hide the submit button
			$manualDownloadBtn.hide();
			//Show the spinner gif
			$(".fa-spinner").css({
				"display": "block"
			});
			$(".fa-spinner").show();

			//Wait 2 seconds
			setTimeout(function () {
				//Hide the spinner gif
				$(".fa-spinner").hide();
				//Flash the success message
				$(".submitMessage").fadeIn("slow");
				//Show Download Link
				$("#manualDownloadLink").css("display", "block");
				//Update Link href
				switch (dataId) {
					case 'PQI 380 Manual':
						$("#manualDownloadLink").attr("href", "/pdf/PQI380Manual.pdf");
						break;
					case 'PQI 380 QuickStart Guide':
						$("#manualDownloadLink").attr("href", "/pdf/PQI380QuickstartGuide.pdf");
						break;
					case 'PQI 380 Offset Cheat Sheet':
						$("#manualDownloadLink").attr("href", "/pdf/PQI380OffsetCheatSheet.pdf");
						break;
					case 'SDG 200 Manual':
						$("#manualDownloadLink").attr("href", "/pdf/SDG200Manual.pdf");
						break;
					case 'SDG 200 QuickStart Guide':
						$("#manualDownloadLink").attr("href", "/pdf/SDG200QuickstartGuide.pdf");
						break;
					case 'SDG 200 StartUp Cheat Sheet':
						$("#manualDownloadLink").attr("href", "/pdf/SDG200StartUpCheatSheet.pdf");
						break;
					case 'NWJM Manual':
						$("#manualDownloadLink").attr("href", "/pdf/NWJMOriginalManual.pdf");
						break;
					case 'NWJM Thin Lift Manual':
						$("#manualDownloadLink").attr("href", "/pdf/NWJMTLManual.pdf");
						break;
					case 'SWM Manual':
						$("#manualDownloadLink").attr("href", "/pdf/SWMManual.pdf");
						break;
					case 'PTS 3000 Manual':
						$("#manualDownloadLink").attr("href", "/pdf/PTS3000Manual.pdf");
						break;
					case 'PQI 301 Manual':
						$("#manualDownloadLink").attr("href", "/pdf/PQI301Manual.pdf");
						break;
					case 'PQI 301 Offset Cheat Sheet':
						$("#manualDownloadLink").attr("href", "/pdf/PQI301OffsetCheatSheet.pdf");
						break;
				}
				//Clear form fields
				$nameInput.val("");
				$compnayInput.val("");
				$emailInput.val("");
			}, 2000);
		});
	});



	//Close the modal when download link is clicked
	$("#manualDownloadLink").on("click", function () {
		$(".submitMessage").hide();
		$("#manualDownloadLink").hide();
		$("#manualDownloadBtn").show();
		$('#manualDownload').modal('hide');
		//Redirect back to original window from modal after pdf downloads- otherwise there is not enought time
		setTimeout(function () {
			let currentLocation = window.location.href;
			window.location.href = currentLocation;
		}, 1000);

	});

});