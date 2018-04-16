// Asynchronously Load the map API 
var script = document.createElement('script');
script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDR1jfc2YdMOMcAaDG_rkMhzpv-vvW7LVg&callback=initMap";
document.body.appendChild(script);


function initMap() {
  var map;

  var mapOptions = {
    center: {
    	lat: 33.415,
    	lng: -22.30
    },
    zoom: 3,
    mapTypeId: 'roadmap'
  };
                  
  // Display a map on the page
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  
  // Map Marker Locations
  var markers = [
    ['Intermat ASEAN, Bangkok, Thailand', 13.588022, 100.580894],
    ['NEAUPG, Atlantic City, NJ', 39.363485, -74.423107],
    ['SEAUPG, Raleigh, NC', 35.778769, -78.638633],
    ['APAI, Indianapolis, IN', 40.031171, -86.939831],
    ['TRB, Washington D.C.', 38.911744, -77.018697],
    ['World of Asphalt, Indianapolis, IN', 39.761228, -85.553272],
    ['RMACES, Denver, CO', 39.771474, -104.806882],
    ['ConExpo, Las Vegas, Nevada', 36.161515, -115.161274],
  ];


  // Info Window Content
  var infoWindowContent = [
    
		// Intermat ASEAN
    [
	    '<div class="map-text">' +
	    '<img class="d-block mb-3" src="../img/intermat-asean-logo.png">' +
	    '<span>Intermat ASEAN</span><br>' +
	    '<hr>' +
	    'Bangkok, Thailand<br>' +
	    'September 6-8 2018<br>' +
	    '<p><a class="link" href="https://asean.intermatconstruction.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
	    '</div>'
    ],
    
		// NEAUPG
    [
	    '<div class="map-text">' +
	    '<img class="d-block mb-3" src="../img/neaupg-logo.png">' +
	    '<span>NEAUPG</span><br>' +
	    '<hr>' +
	    'Atlantic City, NJ<br>' +
	    'October 16-17 2018<br>' +
	    '<p><a class="link" href="http://www.neaupg.uconn.edu" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
	    '</div>'
    ],
    
		// SEAUPG
    [
	    '<div class="map-text">' +
	    '<img class="d-block mb-3" src="../img/seaupg-logo.png">' +
	    '<span>SEAUPG</span><br>' +
	    '<hr>' +
	    'Raleigh, NC<br>' +
	    'November 12-15 2018<br>' +
	    '<p><a class="link" href="http://www.seaupg.org" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
	    '</div>'
    ],
    
		// APAI
    [
	    '<div class="map-text">' +
	    '<img class="d-block mb-3" src="../img/apai-logo.png">' +
	    '<span>APAI</span><br>' +
	    '<hr>' +
	    'Indianapolis, IN<br>' +
	    'December 19-21 2018<br>' +
	    '<p><a class="link" href="https://asphaltindiana.org" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
	    '</div>'
    ],
    
		// TRB
    [
	    '<div class="map-text">' +
	    '<img class="d-block mb-3" src="../img/trb-logo.png">' +
	    '<span>TRB</span><br>' +
	    '<hr>' +
	    'Washington D.C.<br>' +
	    'January 13-17 2019<br>' +
	    '<p><a class="link" href="http://www.trb.org/AnnualMeeting/AnnualMeeting.aspx" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
	    '</div>'
    ],
    
		// World of Asphalt
    [
	    '<div class="map-text">' +
	    '<img class="d-block mb-3" src="../img/woa-logo.png">' +
	    '<span>World of Asphalt</span><br>' +
	    '<hr>' +
	    'Indianapolis, IN<br>' +
	    'Booth# 26127<br>' +
	    'February 12-14 2019<br>' +
	    '<p><a class="link" href="http://www.worldofasphalt.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
	    '</div>'
    ],
    
		// RMACES
    [
	    '<div class="map-text">' +
	    '<img class="d-block mb-3" src="../img/rmaces-logo.png">' +
	    '<span>RMACES</span><br>' +
	    '<hr>' +
	    'Denver, CO<br>' +
	    'February 27-March 1 2019<br>' +
	    '<p><a class="link" href="https://www.rmaces.org/index.php" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
	    '</div>'
    ],
    
		// ConExpo
    [
	    '<div class="map-text">' +
	    '<img class="d-block mb-3" src="../img/conexpo-logo.png">' +
	    '<span>ConExpo</span><br>' +
	    '<hr>' +
	    'Las Vegas, Nevada<br>' +
	    'March 10-14 2020<br>' +
	    '<p><a class="link" href="http://www.conexpoconagg.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
	    '</div>'
    ]
  ];
  
  
  // Display multiple markers on a map
  var infoWindow = new google.maps.InfoWindow(), marker, i;
  
  // Loop through our array of markers & place each one on the map  
  for(var i = 0; i < markers.length; i++) {
    var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
		
			marker = new google.maps.Marker({
	      position: position,
	      map: map,
	      animation: google.maps.Animation.DROP,
	      title: markers[i][0]
			});

    // Allow each marker to have an info window    
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infoWindow.setContent(infoWindowContent[i][0]);
        infoWindow.open(map, marker);
      }
    })(marker, i));
	}

}