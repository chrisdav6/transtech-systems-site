// Asynchronously Load the map API 
var script = document.createElement('script');
script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD4_58SHQlSV-JLIOT4y2yYWxM62U2kO38&callback=initMap";
document.body.appendChild(script);


function initMap() {
	var map;

	var mapOptions = {
		center: {
			lat: 28.711,
			lng: 17.234
		},
		zoom: 3,
		mapTypeId: google.maps.MapTypeId.HYBRID,
		scrollwheel: false,
		disableDefaultUI: true
	};


	// Display a map on the page
	map = new google.maps.Map(document.getElementById("indexMap"), mapOptions);

	// Map Marker Locations
	var markers = [
		['Afghanistan', 34.234306, 66.209291],
		['Algeria', 29.343875, 2.109375],
		['Angola', -12.554564, 17.182617],
		['Argentina', -33.550655, -63.950483],
		['Armenia', 40.455307, 44.653931],
		['Australia', -24.367114, 133.769531],
		['Austria', 47.554287, 14.512939],
		['Azerbaijan', 40.33817, 48.054199],
		['Bangladesh', 23.980712, 90.091666],
		['Belarus', 53.520717, 28.355713],
		['Belgium', 50.840636, 4.482422],
		['Benin', 10.00131, 2.285156],
		['Bolivia', -17.555479, -63.395588],
		['Brazil', -9.795678, -49.833984],
		['Bulgaria', 42.646081, 25.081787],
		['Burkina Faso', 12.415119, -1.669922],
		['Cameroun', 5.441022, 12.678223],
		['British Columbia', 49.259067, -123.11245],
		['Quebec', 45.520301, -73.55484],
		['Ontario', 43.239599, -79.796287],
		['Alberta', 51.380788, -114.974718],
		['Chile', -26.824071, -70.224609],
		['China', 34.597042, 103.974609],
		['Congo', -0.329588, 15.864258],
		['Costa Rica', 9.903910, -83.841379],
		['Côte d’Ivoire', 7.700105, -5.646973],
		['Czech Republic', 49.894324, 15.097526],
		['Denmark', 55.507024, 9.698619],
		['Ecuador', -1.428075, -78.574219],
		['Estonia', 58.867745, 25.559692],
		['Finland', 63.312683, 26.894531],
		['France', 46.754917, 2.39502],
		['Gabon', -0.659165, 11.469727],
		['Germany', 51.220647, 10.524902],
		['Guinée', 10.941192, -10.678711],
		['Guinée-Bissau', 12.084982, -14.902954],
		['Hungary', 47.171044, 19.215088],
		['Iceland', 64.883646, -18.549413],
		['India', 22.755921, 79.40918],
		['Iraq', 32.850776, 42.844469],
		['Ireland', 53.362026, -8.006287],
		['Japan', 35.871247, 138.295898],
		['Kazakhstan', 48.224673, 66.796875],
		['Korea', 36.615528, 127.902832],
		['Kyrgyzstan', 41.533254, 74.476318],
		['Latvia', 56.932987, 25.010376],
		['Lithuania', 55.463285, 23.917236],
		['Malaysia', 4.19303, 102.172852],
		['Mali', 17.874203, -1.560059],
		['Maroc', 32.444885, -6.009521],
		['Mauritanie', 20.179724, -9.689941],
		['Mexico', 24.44715, -102.271729],
		['Moldova', 47.323931, 28.674316],
		['Nepal', 28.157900, 83.895047],
		['Netherlands', 52.173932, 5.734863],
		['New Zealand', -42.763146, 172.177734],
		['Niger', 17.497389, 9.777832],
		['Norway', 61.143235, 9.228516],
		['Oman', 20.306682, 56.007590],
		['Pakistan', 29.618773, 69.265330],
		['Panama', 8.504292, -81.456683],
		['Philippines', 12.533115, 123.046875],
		['Poland', 52.456009, 19.02832],
		['Portugal', 39.740986, -8.4375],
		['Qatar', 25.304304, 51.212769],
		['République Centrafricaine', 6.850078, 20.566406],
		['Russia', 63.074866, 93.339844],
		['Sénégal', 14.743011, -14.72168],
		['Singapore', 1.364922, 103.815994],
		['Slovenia', 46.029389, 14.655762],
		['Spain', 40.413496, -3.603516],
		['Sri Lanka', 7.8775394, 80.7003428],
		['Sweden', 64.052978, 16.875],
		['Switzerland', 46.991494, 8.234253],
		['Tajikistan', 38.882481, 70.817871],
		['Tchad', 14.98724, 18.896484],
		['Thailand', 15.961329, 100.722656],
		['Togo', 8.439772, 1.07666],
		['Tunisie', 34.343436, 9.349365],
		['Turkmenistan', 39.571822, 59.040527],
		['Turkey', 39.164141, 35.046387],
		['Ukraine', 49.009051, 31.618652],
		['United Kindom', 54.393352, -2.06543],
		['United States', 39.060638, -99.552672],
		['Uzbekistan', 42.016652, 63.457031],
		['Vietnam', 13.20786, 108.511963]
	];


	
	// Display multiple markers on a map
	var infoWindow = new google.maps.InfoWindow(), marker, i;

	// Loop through our array of markers & place each one on the map  
	for (i = 0; i < markers.length; i++) {

		var position = new google.maps.LatLng(markers[i][1], markers[i][2]);

		marker = new google.maps.Marker({
			position: position,
			map: map,
			title: markers[i][0],
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