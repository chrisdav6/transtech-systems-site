// Asynchronously Load the map API 
var script = document.createElement('script');
script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDR1jfc2YdMOMcAaDG_rkMhzpv-vvW7LVg&callback=initMap";
document.body.appendChild(script);


function initMap() {
  var map;

  var mapOptions = {
    center: {
    	lat: 39.385,
    	lng: -95.381
    },
    zoom: 5,
    mapTypeId: 'roadmap'
  };
                  
  // Display a map on the page
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  
  // Map Marker Locations
  var markers = [
    ['Atlantic Supply, Alabama', 32.314991,-86.901855],
		['Marcus McCorison, Conneticut', 41.654445,-73.083801],
		['Atlantic Supply, Jacksonville Florida', 30.31466,-81.655884],
		['Atlantic Supply, Largo Florida', 27.909467,-82.787324],
		['Atlantic Supply, Orlando Florida', 28.516294,-81.367493],
		['Atlantic Supply, Riviera Beach Florida', 26.775341,-80.058097],
		['Marcus McCorison, Idaho', 44.059733,-114.428075],
		['Great Lakes Equipment / Patten Tractor, Illinois', 41.095912,-89.494629],
		['Marcus McCorison, Indiana', 39.707081,-86.001824],
		['Atlantic Supply, Louisiana', 30.489397,-91.903111],
		['Marcus McCorison, Maine', 45.413876,-69.466553],
		['Marcus McCorison, Massachusetts', 42.5207,-71.383667],
		['Marcus McCorison, Michigan', 43.563136, -84.678763],
		['Atlantic Supply, Mississippi', 32.509762,-89.428711],
		['Marcus McCorison, Missouri', 38.476882,-92.601894],
		['Marcus McCorison, Nebraska', 41.648757,-99.658929],
		['Marcus McCorison, New Hampshire', 43.405047,-71.575928],
		['Marcus McCorison, North Carolina', 35.568479, -78.856170],
		['Marcus McCorison, Ohio', 39.954965,-82.932924],
		['Groff Tractor & Equipment , Pennsylvania', 41.302571,-77.211914],
		['Atlantic Supply, Puerto Rico', 18.245026,-66.569655],
		['Marcus McCorison , Rhode Island', 41.631867,-71.471558],
		['Marcus McCorison, South Carolina', 33.897999, -80.905078],
		['Marcus McCorison, Texas', 31.319622,-99.088073],
  ];


  // Info Window Content
  var infoWindowContent = [
		// Alabama
    [
	    '<div class="map-text">' +
	    '<span>Atlantic Supply</span><br>' +
	    '<hr>' +
	    '866-917-3447<br>' +
	    'Attn: Paul Eikenberry<br>' +
	    '<p><a class="link" href="mailto:peikenberry@atlanticsupply.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
		
		// Connecticut
	   [
	    '<div class="map-text">' +
	    '<span>Marcus McCorison</span><br>' +
	    '<hr>' +
	    '860-883-6470<br>' +
	    '<p><a class="link" href="mailto:mmccorison@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
		
		// Jacksonville Florida 
    [
	    '<div class="map-text">' +
	    '<span>Atlantic Supply</span><br>' +
	    '<hr>' +
	    '888-260-5584<br>' +
	    'Attn: Scot Hall<br>' +
	    '<p><a class="link" href="mailto:scothall@atlanticsupply.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
		
		// Largo Florida
    [
	    '<div class="map-text">' +
	    '<span>Atlantic Supply</span><br>' +
	    '<hr>' +
	    '800-752-9416<br>' +
	    'Attn: Stephanie Miller<br>' +
	    '<p><a class="link" href="mailto:stephanie@atlanticsupply.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
		
		// Orlando Florida
    [
	    '<div class="map-text">' +
	    '<span>Atlantic Supply</span><br>' +
	    '<hr>' +
	    '800-569-8950<br>' +
	    'Attn: Sam Goodson<br>' +
	    '<p><a class="link" href="mailto:sgoodson@atlanticsupply.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
		
		// Riviera Beach Florida
    [
	    '<div class="map-text">' +
	    '<span>Atlantic Supply</span><br>' +
	    '<hr>' +
	    '800-535-7384<br>' +
	    'Attn: Lou Lemenze<br>' +
	    '<p><a class="link" href="mailto:seflorida@atlanticsupply.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
		
		// Idaho
	   [
	    '<div class="map-text">' +
	    '<span>Marcus McCorison</span><br>' +
	    '<hr>' +
	    '860-883-6470<br>' +
	    '<p><a class="link" href="mailto:mmccorison@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
		
		// Illinois
	   [
	    '<div class="map-text">' +
	    '<span>Great Lakes Equipment / Patten Tractor</span><br>' +
	    '<hr>' +
	    '815-220-7709<br>' +
	    'Attn: Steve Hoscheid<br>' +
	    '<p><a class="link" href="mailto:hoscheids@greatlakeseq.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
		
		// Indiana
	   [
	    '<div class="map-text">' +
	    '<span>Marcus McCorison</span><br>' +
	    '<hr>' +
	    '860-883-6470<br>' +
	    '<p><a class="link" href="mailto:mmccorison@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
		
		// Louisiana
	   [
	    '<div class="map-text">' +
	    '<span>Atlantic Supply</span><br>' +
	    '<hr>' +
	    '866-917-3447<br>' +
	    'Attn: Paul Eikenberry<br>' +
	    '<p><a class="link" href="mailto:peikenberry@atlanticsupply.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
		
		// Maine
	   [
	    '<div class="map-text">' +
	    '<span>Marcus McCorison</span><br>' +
	    '<hr>' +
	    '860-883-6470<br>' +
	    '<p><a class="link" href="mailto:mmccorison@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
		
		// Massachusetts
	   [
	    '<div class="map-text">' +
	    '<span>Marcus McCorison</span><br>' +
	    '<hr>' +
	    '860-883-6470<br>' +
	    '<p><a class="link" href="mailto:mmccorison@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],

		// Michigan
	   [
	    '<div class="map-text">' +
	    '<span>Marcus McCorison</span><br>' +
	    '<hr>' +
	    '860-883-6470<br>' +
	    '<p><a class="link" href="mailto:mmccorison@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
		
		// Mississippi
	   [
	    '<div class="map-text">' +
	    '<span>Atlantic Supply</span><br>' +
	    '<hr>' +
	    '866-917-3447<br>' +
	    'Attn: Paul Eikenberry<br>' +
	    '<p><a class="link" href="mailto:peikenberry@atlanticsupply.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
		
		// Missouri
	   [
	    '<div class="map-text">' +
	    '<span>Marcus McCorison</span><br>' +
	    '<hr>' +
	    '860-883-6470<br>' +
	    '<p><a class="link" href="mailto:mmccorison@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
		
		// Nebraska
	   [
	    '<div class="map-text">' +
	    '<span>Marcus McCorison</span><br>' +
	    '<hr>' +
	    '860-883-6470<br>' +
	    '<p><a class="link" href="mailto:mmccorison@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
		
		// New Hampshire
	   [
	    '<div class="map-text">' +
	    '<span>Marcus McCorison</span><br>' +
	    '<hr>' +
	    '860-883-6470<br>' +
	    '<p><a class="link" href="mailto:mmccorison@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],

		// North Carolina
	   [
	    '<div class="map-text">' +
	    '<span>Marcus McCorison</span><br>' +
	    '<hr>' +
	    '860-883-6470<br>' +
	    '<p><a class="link" href="mailto:mmccorison@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
		
		// Ohio
	   [
	    '<div class="map-text">' +
	    '<span>Marcus McCorison</span><br>' +
	    '<hr>' +
	    '860-883-6470<br>' +
	    '<p><a class="link" href="mailto:mmccorison@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
		
		// Pennsylvania
	   [
	    '<div class="map-text">' +
	    '<span>Groff Tractor & Equipment</span><br>' +
	    '<hr>' +
	    '717-766-7671<br>' +
	    'Attn: Matt Wilson<br>' +
	    '<p><a class="link" href="mailto:mattwilson@grofftractor.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
		
		// Puerto Rico
	   [
	    '<div class="map-text">' +
	    '<span>Atlantic Supply</span><br>' +
	    '<hr>' +
	    '727-530-9581<br>' +
	    'Attn: Carlos Licona<br>' +
	    '<p><a class="link" href="mailto:clicona@atlanticsupply.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
		
		// Rhode Island
	   [
	    '<div class="map-text">' +
	    '<span>Marcus McCorison</span><br>' +
	    '<hr>' +
	    '860-883-6470<br>' +
	    '<p><a class="link" href="mailto:mmccorison@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],

		// South Carolina
	   [
	    '<div class="map-text">' +
	    '<span>Marcus McCorison</span><br>' +
	    '<hr>' +
	    '860-883-6470<br>' +
	    '<p><a class="link" href="mailto:mmccorison@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
		
		// Texas
	   [
	    '<div class="map-text">' +
	    '<span>Marcus McCorison</span><br>' +
	    '<hr>' +
	    '860-883-6470<br>' +
	    '<p><a class="link" href="mailto:mmccorison@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
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
      title: markers[i][0],
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