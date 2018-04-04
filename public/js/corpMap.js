// Asynchronously Load the map API 
var script = document.createElement('script');
script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDR1jfc2YdMOMcAaDG_rkMhzpv-vvW7LVg&callback=initMap";
document.body.appendChild(script);


function initMap() {
    var map;

    var mapOptions = {
      center: {
      	lat: 42.757,
      	lng: -73.816
      },
      zoom: 8,
      mapTypeId: 'roadmap'
    };
                    
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    // Map Marker Locations
    var markers = [
      ['TransTech Systems, New York', 42.757,-73.816]
    ];


    // Info Window Content
    var infoWindowContent = [
			// Corporate Office
	    [
	    '<div class="map-text">' +
	    '<span>TransTech Systems, Inc.</span><br>' +
	    '<hr>' +
	    '900 Albany Shaker Rd., Suite 2<br>' +
	    'Latham, NY 12110<br>' +
	    '518-370-5558<br>' +
	    '<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>']
    ];
        
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    
    // Loop through our array of markers & place each one on the map  
    for( i = 0; i < markers.length; i++ ) {
      var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
      
      marker = new google.maps.Marker({
          position: position,
          map: map,
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