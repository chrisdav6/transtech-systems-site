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
		mapTypeId: 'terrain',
		zoom: 3,
		scrollwheel: false,
		styles: [
			{ elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
			{ elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
			{ elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
			{
				featureType: 'administrative.locality',
				elementType: 'labels.text.fill',
				stylers: [{ color: '#d59563' }]
			},
			{
				featureType: 'poi',
				elementType: 'labels.text.fill',
				stylers: [{ color: '#d59563' }]
			},
			{
				featureType: 'poi.park',
				elementType: 'geometry',
				stylers: [{ color: '#263c3f' }]
			},
			{
				featureType: 'poi.park',
				elementType: 'labels.text.fill',
				stylers: [{ color: '#6b9a76' }]
			},
			{
				featureType: 'road',
				elementType: 'geometry',
				stylers: [{ color: '#38414e' }]
			},
			{
				featureType: 'road',
				elementType: 'geometry.stroke',
				stylers: [{ color: '#212a37' }]
			},
			{
				featureType: 'road',
				elementType: 'labels.text.fill',
				stylers: [{ color: '#9ca5b3' }]
			},
			{
				featureType: 'road.highway',
				elementType: 'geometry',
				stylers: [{ color: '#746855' }]
			},
			{
				featureType: 'road.highway',
				elementType: 'geometry.stroke',
				stylers: [{ color: '#1f2835' }]
			},
			{
				featureType: 'road.highway',
				elementType: 'labels.text.fill',
				stylers: [{ color: '#f3d19c' }]
			},
			{
				featureType: 'transit',
				elementType: 'geometry',
				stylers: [{ color: '#2f3948' }]
			},
			{
				featureType: 'transit.station',
				elementType: 'labels.text.fill',
				stylers: [{ color: '#d59563' }]
			},
			{
				featureType: 'water',
				elementType: 'geometry',
				stylers: [{ color: '#17263c' }]
			},
			{
				featureType: 'water',
				elementType: 'labels.text.fill',
				stylers: [{ color: '#515c6d' }]
			},
			{
				featureType: 'water',
				elementType: 'labels.text.stroke',
				stylers: [{ color: '#17263c' }]
			}
		]
		
	};


	// Display a map on the page
	map = new google.maps.Map(document.getElementById("indexMap"), mapOptions);

	// Map Marker Locations
	var markers = [
		['Alabama',	32.806671, -86.791130],
		['Arizona',	33.729759, -111.431221],
		['Arkansas',	34.969704, -92.373123],
		['California',	36.116203, -119.681564],
		['Colorado',	39.059811, -105.311104],
		['Connecticut',	41.597782, -72.755371],
		['Delaware',	39.318523, -75.507141],
		['District of Columbia',	38.897438, -77.026817],
		['Florida',	27.766279, -81.686783],
		['Georgia',	33.040619, -83.643074],
		['Guam', 13.423685, 144.745567],
		['Hawaii',	21.094318, -157.498337],
		['Idaho',	44.240459, -114.478828],
		['Illinois',	40.349457, -88.986137],
		['Indiana',	39.849426, -86.258278],
		['Iowa',	42.011539, -93.210526],
		['Kansas',	38.526600, -96.726486],
		['Kentucky',	37.668140, -84.670067],
		['Louisiana',	31.169546, -91.867805],
		['Maine',	44.693947, -69.381927],
		['Maryland',	39.063946, -76.802101],
		['Massachusetts',	42.230171, -71.530106],
		['Michigan',	43.326618, -84.536095],
		['Minnesota',	45.694454, -93.900192],
		['Mississippi',	32.741646, -89.678696],
		['Missouri',	38.456085, -92.288368],
		['Montana',	46.921925, -110.454353],
		['Nebraska',	41.125370, -98.268082],
		['Nevada',	38.313515, -117.055374],
		['New Hampshire',	43.452492, -71.563896],
		['New Jersey',	40.298904, -74.521011],
		['New Mexico',	34.840515, -106.248482],
		['New York',	42.165726, -74.948051],
		['North Carolina',	35.630066, -79.806419],
		['North Dakota',	47.528912, -99.784012],
		['Ohio',	40.388783, -82.764915],
		['Oklahoma',	35.565342, -96.928917],
		['Oregon',	44.572021, -122.070938],
		['Pennsylvania',	40.590752, -77.209755],
		['Rhode Island',	41.680893, -71.511780],
		['South Carolina',	33.856892, -80.945007],
		['South Dakota',	44.299782, -99.438828],
		['Tennessee',	35.747845, -86.692345],
		['Texas',	31.054487, -97.563461],
		['Utah',	40.150032, -111.862434],
		['Vermont',	44.045876, -72.710686],
		['Virginia',	37.769337, -78.169968],
		['Washington',	47.400902, -121.490494],
		['West Virginia',	38.491226, -80.954453],
		['Wisconsin',	44.268543, -89.616508],
		['Wyoming',	42.755966, -107.302490],
		['Afghanistan', 34.234306, 66.209291],
		['Alaska', 58.243872, -156.079493],
		['Alberta', 55.025249, -115.289692],
		['Algeria', 29.343875, 2.109375],
		['American Samoa', -14.312428, -170.763790],
		['Angola', -12.554564, 17.182617],
		['Argentina', -33.550655, -63.950483],
		['Armenia', 40.455307, 44.653931],
		['Aruba', 12.505601, -69.969352],
		['Australia', -24.367114, 133.769531],
		['Austria', 47.554287, 14.512939],
		['Azerbaijan', 40.33817, 48.054199],
		['Bangladesh', 23.980712, 90.091666],
		['Belarus', 53.520717, 28.355713],
		['Belgium', 50.840636, 4.482422],
		['Benin', 10.00131, 2.285156],
		['Bolivia', -17.555479, -63.395588],
		['Bosnia-Herzegovina', 44.414813, 17.821594],
		['Brazil', -9.795678, -49.833984],
		['British Columbia', 49.259067, -123.11245],
		['Bulgaria', 42.646081, 25.081787],
		['Burkina Faso', 12.415119, -1.669922],
		['Cameroun', 5.441022, 12.678223],
		['Chile', -26.824071, -70.224609],
		['China', 34.597042, 103.974609],
		['Columbia', 4.170781, -72.575184],
		['Congo', -0.329588, 15.864258],
		['Costa Rica', 9.903910, -83.841379],
		['Côte d’Ivoire', 7.700105, -5.646973],
		['Croatia', 44.899775, 15.072659],
		['Cyprus', 34.987112, 33.289632],
		['Czech Republic', 49.894324, 15.097526],
		['Denmark', 55.507024, 9.698619],
		['Ecuador', -1.428075, -78.574219],
		['Estonia', 58.867745, 25.559692],
		['Finland', 63.312683, 26.894531],
		['France', 46.754917, 2.39502],
		['Gabon', -0.659165, 11.469727],
		['Germany', 51.220647, 10.524902],
		['Greece', 39.265521, 21.891304],
		['Guatemala', 14.871967, -90.534885],
		['Guinée', 10.941192, -10.678711],
		['Guinée-Bissau', 12.084982, -14.902954],
		['Honduras', 15.230362, -86.578924],
		['Hong Kong', 22.438872, 114.114917],
		['Hungary', 47.171044, 19.215088],
		['Iceland', 64.883646, -18.549413],
		['India', 22.755921, 79.40918],
		['Indonesia', -3.023903, 121.430842],
		['Iraq', 32.850776, 42.844469],
		['Ireland', 53.362026, -8.006287],
		['Israel', 30.929140, 34.862959],
		['Italy', 44.036648, 11.363922],
		['Japan', 35.871247, 138.295898],
		['Jordan', 31.189329, 36.747911],
		['Kazakhstan', 48.224673, 66.796875],
		['Kuwait', 29.306843, 47.629034],
		['Korea', 36.615528, 127.902832],
		['Kyrgyzstan', 41.533254, 74.476318],
		['Laos', 20.198592, 102.024954],
		['Latvia', 56.932987, 25.010376],
		['Libya', 27.928633, 17.625209],
		['Lithuania', 55.463285, 23.917236],
		['Madagascar', -19.996605, 46.546700],
		['Malaysia', 4.19303, 102.172852],
		['Mali', 17.874203, -1.560059],
		['Manitoba', 55.709642, -96.839918],
		['Maroc', 32.444885, -6.009521],
		['Mauritanie', 20.179724, -9.689941],
		['Mexico', 24.44715, -102.271729],
		['Moldova', 47.323931, 28.674316],
		['Mongolia', 46.414185, 103.085902],
		['Mozambique', -17.946054, 35.790769],
		['Nepal', 28.157900, 83.895047],
		['Netherlands', 52.173932, 5.734863],
		['New Zealand', -42.763146, 172.177734],
		['Nicaragua', 13.180991, -84.805679],
		['Niger', 17.497389, 9.777832],
		['Norway', 61.143235, 9.228516],
		['Oman', 20.306682, 56.007590],
		['Ontario', 51.810095, -85.342018],
		['Pakistan', 29.618773, 69.265330],
		['Panama', 8.504292, -81.456683],
		['Papua New Guinea', -5.645336, 142.389850],
		['Paraguay', -22.637923, -58.614679],
		['Peru', -8.556575, -76.538839],
		['Philippines', 12.533115, 123.046875],
		['Poland', 52.456009, 19.02832],
		['Portugal', 39.740986, -8.4375],
		['Puerto Rico', 18.297223, -66.484182],
		['Qatar', 25.304304, 51.212769],
		['Quebec', 50.923962, -73.293745],
		['République Centrafricaine', 6.850078, 20.566406],
		['Romania', 46.119580, 24.889469],
		['Russia', 63.074866, 93.339844],
		['Saskatchewan', 54.587785, -106.011977],
		['Saudi Arabia', 23.282594, 45.144510],
		['Sénégal', 14.743011, -14.72168],
		['Singapore', 1.364922, 103.815994],
		['Slovakia', 48.819900, 19.380824],
		['Slovenia', 46.029389, 14.655762],
		['South Africa', -30.152753, 23.977219],
		['Spain', 40.413496, -3.603516],
		['Sri Lanka', 7.8775394, 80.7003428],
		['Sudan', 16.026334, 30.549936],
		['Sweden', 64.052978, 16.875],
		['Switzerland', 46.991494, 8.234253],
		['Taiwan', 23.535436, 120.733776],
		['Tajikistan', 38.882481, 70.817871],
		['Tchad', 14.98724, 18.896484],
		['Thailand', 15.961329, 100.722656],
		['Togo', 8.439772, 1.07666],
		['Tunisie', 34.343436, 9.349365],
		['Turkmenistan', 39.571822, 59.040527],
		['Turkey', 39.164141, 35.046387],
		['Ukraine', 49.009051, 31.618652],
		['United Arab Emirates', 23.573753, 54.080148],
		['United Kindom', 54.393352, -2.06543],
		['Uzbekistan', 42.016652, 63.457031],
		['Venezuela', 6.301583, -65.752968],
		['Vietnam', 13.20786, 108.511963]
	];

	// Loop through our array of markers & place each one on the map  
	for (i = 0; i < markers.length; i++) {

		var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
		// var icon = "http://maps.google.com/mapfiles/kml/pal3/icon49.png";
		var yellowT = {
			path: 'M303.49,409.76v-14.74h-5.23v-4.88h15.93v4.88h-5.23v14.62l11.81-11.8c0.51-0.52,0.51-1.35,0-1.87l-13.67-13.66 c-0.51-0.51-1.35-0.51-1.86,0l-13.66,13.66c-0.52,0.52-0.52,1.35,0,1.87L303.49,409.76z',
			fillColor: '#FFDD00',
			fillOpacity: 0.8,
			scale: 1,
			strokeColor: 'black',
			strokeWeight: 1,
			anchor: new google.maps.Point(310,400) // Used to correct offset when using custom svg icon, delete if using standard icon
		};

		marker = new google.maps.Marker({
			position: position,
			icon: yellowT,
			map: map,
			title: markers[i][0]
		});
		
	}

}