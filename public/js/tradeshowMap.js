// Asynchronously Load the map API 
var script = document.createElement('script');
script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD4_58SHQlSV-JLIOT4y2yYWxM62U2kO38&callback=initMap";
document.body.appendChild(script);


function initMap() {
	var map;

	var mapOptions = {
		center: {
			lat: 33.415,
			lng: -22.30
		},
		zoom: 3,
		mapTypeId: 'roadmap',
		scrollwheel: false
	};

	// Display a map on the page
	map = new google.maps.Map(document.getElementById("map"), mapOptions);

	// Map Marker Locations
	var markers = [
		// ['NAPA, Atlanta, GA', 33.763244, -84.397191],
		// ['APAM, Battle Creek, MI', 42.296783, -85.076260],
		// ['CalAPA, Ontario, CA', 34.055032, -117.615421],
		['Intermat ASEAN, Bangkok, Thailand', 13.588022, 100.580894],
		['TXAPA, San Antonio, TX', 29.461083, -98.499359],
		['NEAUPG, Portland, ME', 43.682557, -70.295278],
		['SEAUPG, Baton Rouge, LA', 30.452293, -91.127889],
		['APAI, Indianapolis, IN', 40.031171, -86.939831],
		['TRB, Washington D.C.', 38.911744, -77.018697],
		['RMACES, Denver, CO', 39.771474, -104.806882],
		['ConExpo, Las Vegas, Nevada', 36.161515, -115.161274],
		['Ohio Asphalt Expo, Columbus, OH', 40.139683, -82.976837],
		['CAPA, Pinehurst, NC', 35.189523, -79.462592],
		['MAPA, Bangor, ME', 44.831204, -68.781424],
		['World of Asphalt, Atlanta, GA', 33.764130, -84.420611],
	];

	// Info Window Content
	var infoWindowContent = [

		// NAPA
		// [
		// '<div class="map-text">' +
		// '<img class="d-block mb-3" width="100" src="../img/napa-logo.png">' +
		// '<span>NAPA Conference on Stone-Matrix Asphalt</span><br>' +
		// '<hr>' +
		// 'Atlanta, GA<br>' +
		// 'November 5-7, 2018<br>' +
		// '<p><a class="link" href="http://www.asphaltpavement.org/index.php?option=com_content&view=article&id=1148&Itemid=100375" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
		// '</div>'
		// ],

		// APAM
		// [
		// 	'<div class="map-text">' +
		// 	'<img class="d-block mb-3" width="100" src="../img/apam-logo.png">' +
		// 	'<span>APAM</span><br>' +
		// 	'<hr>' +
		// 	'Battle Creek, MI<br>' +
		// 	'March 6-7, 2019<br>' +
		// 	'<p><a class="link" href="http://www.apa-mi.org/index.php" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
		// 	'</div>'
		// ],

		// CalAPA
		// [
		// 	'<div class="map-text">' +
		// 	'<img class="d-block mb-3" width="100" src="../img/calapa-logo.png">' +
		// 	'<span>CalAPA Spring Conference</span><br>' +
		// 	'<hr>' +
		// 	'Ontario, CA<br>' +
		// 	'March 20-21, 2019<br>' +
		// 	'<p><a class="link" href="http://www.calapa.net" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
		// 	'</div>'
		// ],

		//Intermat ASEAN
		[
			'<div class="map-text">' +
			'<img class="d-block mb-3" width="100" src="../img/intermat-asean-logo.png">' +
			'<span>Intermat ASEAN - Booth #B18</span><br>' +
			'<hr>' +
			'Bangkok, Thailand<br>' +
			'September 5-7, 2019<br>' +
			'<p><a class="link" href="https://asean.intermatconstruction.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
			'</div>'
		],

		//TXAPA
		[
			'<div class="map-text">' +
			'<img class="d-block mb-3" width="100" src="../img/txapa-logo.png">' +
			'<span>TXAPA</span><br>' +
			'<hr>' +
			'San Antonio, TX<br>' +
			'September 17-20, 2019<br>' +
			'<p><a class="link" href="https://www.texasasphalt.org" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
			'</div>'
		],

		// NEAUPG
		[
			'<div class="map-text">' +
			'<img class="d-block mb-3" width="100" src="../img/neaupg-logo.png">' +
			'<span>NEAUPG</span><br>' +
			'<hr>' +
			'Portland, ME<br>' +
			'October 23-24, 2019<br>' +
			'<p><a class="link" href="http://www.neaupg.uconn.edu" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
			'</div>'
		],

		// SEAUPG
		[
			'<div class="map-text">' +
			'<img class="d-block mb-3" width="100" src="../img/seaupg-logo.png">' +
			'<span>SEAUPG</span><br>' +
			'<hr>' +
			'Baton Rouge, LA<br>' +
			'November 18-21, 2019<br>' +
			'<p><a class="link" href="http://www.seaupg.org" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
			'</div>'
		],

		// APAI
		[
			'<div class="map-text">' +
			'<img class="d-block mb-3" width="100" src="../img/apai-logo.png">' +
			'<span>APAI</span><br>' +
			'<hr>' +
			'Indianapolis, IN<br>' +
			'December 11-13, 2019<br>' +
			'<p><a class="link" href="https://asphaltindiana.org" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
			'</div>'
		],

		// TRB
		[
			'<div class="map-text">' +
			'<img class="d-block mb-3" width="100" src="../img/trb-logo.png">' +
			'<span>TRB</span><br>' +
			'<hr>' +
			'Washington D.C.<br>' +
			'January 12-16, 2020<br>' +
			'<p><a class="link" href="http://www.trb.org/AnnualMeeting/AnnualMeeting.aspx" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
			'</div>'
		],

		// RMACES
		[
			'<div class="map-text">' +
			'<img class="d-block mb-3" width="100" src="../img/rmaces-logo.png">' +
			'<span>RMACES</span><br>' +
			'<hr>' +
			'Denver, CO<br>' +
			'February 19-21, 2020<br>' +
			'<p><a class="link" href="https://www.rmaces.org/index.php" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
			'</div>'
		],

		// ConExpo
		[
			'<div class="map-text">' +
			'<img class="d-block mb-3" width="100" src="../img/conexpo-logo.png">' +
			'<span>ConExpo - Booth #C30947</span><br>' +
			'<hr>' +
			'Las Vegas, NV<br>' +
			'March 10-14, 2020<br>' +
			'<p><a class="link" href="http://www.conexpoconagg.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
			'</div>'
		],

		//Ohio
		[
			'<div class="map-text">' +
			'<img class="d-block mb-3" width="100" src="../img/ohio-logo.png">' +
			'<span>Ohio Asphalt Expo</span><br>' +
			'<hr>' +
			'Columbus, OH<br>' +
			'March 24-25, 2020<br>' +
			'<p><a class="link" href="http://www.flexiblepavements.org" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
			'</div>'
		],


		// CAPA
		[
			'<div class="map-text">' +
			'<img class="d-block mb-3" width="100" src="../img/capa-logo.png">' +
			'<span>CAPA</span><br>' +
			'<hr>' +
			'Pinehurst, NC<br>' +
			'April 1-3, 2020<br>' +
			'<p><a class="link" href="http://www.carolinaasphalt.org/aws/CAPA/pt/sp/calendar" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
			'</div>'
		],

		// Maine
		[
			'<div class="map-text">' +
			'<img class="d-block mb-3" width="100" src="../img/maine-logo.png">' +
			'<span>MAPA</span><br>' +
			'<hr>' +
			'Bangor, ME<br>' +
			'April 7-8, 2020<br>' +
			'<p><a class="link" href="https://maine-apa.org/paving-seminar" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
			'</div>'
		],


		// World of Asphalt
		[
			'<div class="map-text">' +
			'<img class="d-block mb-3" width="100" src="../img/woa-logo.png">' +
			'<span>World of Asphalt 2021</span><br>' +
			'<hr>' +
			'Atlanta, GA<br>' +
			'March 9-11, 2021<br>' +
			'<p><a class="link" href="http://www.worldofasphalt.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
			'</div>'
		],

	];


	// Display multiple markers on a map
	var infoWindow = new google.maps.InfoWindow(), marker, i;

	// Loop through our array of markers & place each one on the map  
	for (var i = 0; i < markers.length; i++) {
		var position = new google.maps.LatLng(markers[i][1], markers[i][2]);

		marker = new google.maps.Marker({
			position: position,
			map: map,
			title: markers[i][0]
		});

		// Allow each marker to have an info window    
		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				infoWindow.setContent(infoWindowContent[i][0]);
				infoWindow.open(map, marker);
			}
		})(marker, i));
	}

}