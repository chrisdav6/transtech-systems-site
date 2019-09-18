// Asynchronously Load the map API 
var script = document.createElement('script');
script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD4_58SHQlSV-JLIOT4y2yYWxM62U2kO38&callback=initMap";
document.body.appendChild(script);


function initMap() {
	var map;

	var mapOptions = {
		center: {
			lat: 35.643,
			lng: -90.910
		},
		zoom: 4,
		mapTypeId: 'roadmap',
		scrollwheel: false
	};

	var icons = {
		transtech: {
			icon: '../img/transtech-map-icon-new.png'
		}
	};

	// Display a map on the page
	map = new google.maps.Map(document.getElementById("map"), mapOptions);

	// Map Marker Locations
	var markers = [
		['Atlantic Supply, Alabama', 32.314991, -86.901855],
		['TransTech Systems, Alaska', 66.073198, -151.421268, "transtech"],
		['TransTech Systems, Arizona', 34.528727, -111.767859, "transtech"],
		['TransTech Systems, Arkansas', 34.841498, -92.285615, "transtech"],
		['Marcus McCorison, California', 36.692245, -119.620438, "transtech"],
		['TransTech Systems, Colorado', 39.158062, -105.509759, "transtech"],
		['Marcus McCorison, Connecticut', 41.654445, -73.083801, "transtech"],
		['GT Mid Atlantic, Inc., Delaware', 39.180106, -75.499366],
		['Atlantic Supply, Jacksonville Florida', 30.31466, -81.655884],
		['Atlantic Supply, Largo Florida', 27.909467, -82.787324],
		['Atlantic Supply, Orlando Florida', 28.516294, -81.367493],
		['Atlantic Supply, Riviera Beach Florida', 26.775341, -80.058097],
		['TransTech Systems, Georgia', 33.065286, -83.541289, "transtech"],
		['TransTech Systems, Hawaii', 19.610030, -155.544456, "transtech"],
		['Marcus McCorison, Idaho', 44.059733, -114.428075, "transtech"],
		['Great Lakes Equipment / Patten Tractor, Illinois', 41.095912, -89.494629],
		['Marcus McCorison, Indiana', 39.707081, -86.001824, "transtech"],
		['TransTech Systems, Iowa', 42.246724, -93.527497, "transtech"],
		['TransTech Systems, Kansas', 38.570758, -98.446819, "transtech"],
		['TransTech Systems, Kentucky', 37.630124, -84.538175, "transtech"],
		['Atlantic Supply, Louisiana', 30.489397, -91.903111],
		['Marcus McCorison, Maine', 45.413876, -69.466553, "transtech"],
		['GT Mid Atlantic, Inc., Maryland', 39.140858, -76.682258],
		['Marcus McCorison, Massachusetts', 42.5207, -71.383667, "transtech"],
		['Marcus McCorison, Michigan', 43.563136, -84.678763, "transtech"],
		['TransTech Systems, Minnesota', 46.555991, -94.274308, "transtech"],
		['Atlantic Supply, Mississippi', 32.509762, -89.428711],
		['Marcus McCorison, Missouri', 38.476882, -92.601894, "transtech"],
		['TransTech Systems, Montana', 47.257664, -109.540552, "transtech"],
		['Marcus McCorison, Nebraska', 41.648757, -99.658929, "transtech"],
		['TransTech Systems, Nevada', 40.079192, -116.892773, "transtech"],
		['Marcus McCorison, New Hampshire', 43.405047, -71.575928, "transtech"],
		['GT Mid Atlantic, Inc., New Jersey', 39.751595, -74.466530],
		['TransTech Systems, New Mexico', 34.490538, -105.928939, "transtech"],
		['TransTech Systems, New York', 42.776429, -73.866104, "transtech"],
		['Marcus McCorison, North Carolina', 35.568479, -78.856170, "transtech"],
		['TransTech Systems, North Dakota', 47.571878, -100.338895, "transtech"],
		['Marcus McCorison, Ohio', 39.954965, -82.932924, "transtech"],
		['TransTech Systems, Oklahoma', 35.737529, -97.519473, "transtech"],
		['TransTech Systems, Oregon', 44.036589, -120.375932, "transtech"],
		['Groff Tractor & Equipment , Pennsylvania', 41.302571, -77.211914],
		['Atlantic Supply, Puerto Rico', 18.245026, -66.569655],
		['Marcus McCorison , Rhode Island', 41.631867, -71.471558, "transtech"],
		['Marcus McCorison, South Carolina', 33.897999, -80.905078, "transtech"],
		['TransTech Systems, South Dakota', 44.740993, -100.336661, "transtech"],
		['TransTech Systems, Tennessee', 35.780740, -86.495376, "transtech"],
		['Marcus McCorison, Texas', 31.319622, -99.088073, "transtech"],
		['TransTech Systems, Utah', 39.393259, -111.636420, "transtech"],
		['TransTech Systems, Vermont', 43.890007, -72.737469, "transtech"],
		['TransTech Systems, Virginia', 37.598711, -78.339174, "transtech"],
		['TransTech Systems, Washington', 47.426994, -119.815286, "transtech"],
		['TransTech Systems, West Virginia', 38.70075, -80.846758, "transtech"],
		['TransTech Systems, Wisconsin', 44.878719, -89.658613, "transtech"],
		['TransTech Systems, Wyoming', 43.347377, -107.236324, "transtech"]
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
			'<p class="mt-0"><a class="link" href="https://www.atlanticsupply.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
			'</div>'
		],

		// Alaska
		[
			'<div class="map-text">' +
			'<span>TransTech Systems</span><br>' +
			'<hr>' +
			'1-800-724-6306<br>' +
			'<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
			'</div>'
		],

		// Arizona
		[
			'<div class="map-text">' +
			'<span>TransTech Systems</span><br>' +
			'<hr>' +
			'1-800-724-6306<br>' +
			'<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
			'</div>'
		],

		// Arkansas
		[
			'<div class="map-text">' +
			'<span>TransTech Systems</span><br>' +
			'<hr>' +
			'1-800-724-6306<br>' +
			'<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
			'</div>'
		],

		// California
		[
			'<div class="map-text">' +
			'<span>Marcus McCorison</span><br>' +
			'<hr>' +
			'860-883-6470<br>' +
			'<p><a class="link" href="mailto:mmccorison@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
			'</div>'
		],

		// Colorado
		[
			'<div class="map-text">' +
			'<span>TransTech Systems</span><br>' +
			'<hr>' +
			'1-800-724-6306<br>' +
			'<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
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

		// Delaware
		[
			'<div class="map-text">' +
			'<span>GT Mid Atlantic, Inc.</span><br>' +
			'<hr>' +
			'240-278-7694<br>' +
			'Attn: Jim Head<br>' +
			'<p><a class="link" href="mailto:jimhead@gtmidatlantic.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
			'<p class="mt-0"><a class="link" href="https://www.gtmidatlantic.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
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
			'<p class="mt-0"><a class="link" href="https://www.atlanticsupply.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
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
			'<p class="mt-0"><a class="link" href="https://www.atlanticsupply.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
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
			'<p class="mt-0"><a class="link" href="https://www.atlanticsupply.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
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
			'<p class="mt-0"><a class="link" href="https://www.atlanticsupply.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
			'</div>'
		],

		// Georgia
		[
			'<div class="map-text">' +
			'<span>TransTech Systems</span><br>' +
			'<hr>' +
			'1-800-724-6306<br>' +
			'<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
			'</div>'
		],

		// Hawaii
		[
			'<div class="map-text">' +
			'<span>TransTech Systems</span><br>' +
			'<hr>' +
			'1-800-724-6306<br>' +
			'<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
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
			'<p class="mt-0"><a class="link" href="https://www.greatlakesequipment.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
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

		// Iowa
		[
			'<div class="map-text">' +
			'<span>TransTech Systems</span><br>' +
			'<hr>' +
			'1-800-724-6306<br>' +
			'<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
			'</div>'
		],

		// Kansas
		[
			'<div class="map-text">' +
			'<span>TransTech Systems</span><br>' +
			'<hr>' +
			'1-800-724-6306<br>' +
			'<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
			'</div>'
		],

		// Kentucky
		[
			'<div class="map-text">' +
			'<span>TransTech Systems</span><br>' +
			'<hr>' +
			'1-800-724-6306<br>' +
			'<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
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
			'<p class="mt-0"><a class="link" href="https://www.atlanticsupply.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
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

		// Maryland
		[
			'<div class="map-text">' +
			'<span>GT Mid Atlantic, Inc.</span><br>' +
			'<hr>' +
			'240-278-7694<br>' +
			'Attn: Jim Head<br>' +
			'<p><a class="link" href="mailto:jimhead@gtmidatlantic.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
			'<p class="mt-0"><a class="link" href="https://www.gtmidatlantic.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
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

		// Minnesota
		[
			'<div class="map-text">' +
			'<span>TransTech Systems</span><br>' +
			'<hr>' +
			'1-800-724-6306<br>' +
			'<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
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
			'<p class="mt-0"><a class="link" href="https://www.atlanticsupply.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
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

		// Montana
		[
			'<div class="map-text">' +
			'<span>TransTech Systems</span><br>' +
			'<hr>' +
			'1-800-724-6306<br>' +
			'<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
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

		// Nevada
		[
			'<div class="map-text">' +
			'<span>TransTech Systems</span><br>' +
			'<hr>' +
			'1-800-724-6306<br>' +
			'<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
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

		// New Jersey
		[
			'<div class="map-text">' +
			'<span>GT Mid Atlantic, Inc.</span><br>' +
			'<hr>' +
			'610-574-6313<br>' +
			'Attn: Colin Chenet<br>' +
			'<p><a class="link" href="mailto:colinchenet@gtmidatlantic.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
			'<p class="mt-0"><a class="link" href="https://www.gtmidatlantic.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
			'</div>'
		],

		// New Mexico
		[
			'<div class="map-text">' +
			'<span>TransTech Systems</span><br>' +
			'<hr>' +
			'1-800-724-6306<br>' +
			'<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
			'</div>'
		],

		// New York
		[
			'<div class="map-text">' +
			'<span>TransTech Systems</span><br>' +
			'<hr>' +
			'1-800-724-6306<br>' +
			'<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
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

		// North Dakota
		[
			'<div class="map-text">' +
			'<span>TransTech Systems</span><br>' +
			'<hr>' +
			'1-800-724-6306<br>' +
			'<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
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

		// Oklahoma
		[
			'<div class="map-text">' +
			'<span>TransTech Systems</span><br>' +
			'<hr>' +
			'1-800-724-6306<br>' +
			'<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
			'</div>'
		],

		// Oregon
		[
			'<div class="map-text">' +
			'<span>TransTech Systems</span><br>' +
			'<hr>' +
			'1-800-724-6306<br>' +
			'<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
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
			'<p class="mt-0"><a class="link" href="http://www.grofftractor.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
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
			'<p class="mt-0"><a class="link" href="https://www.atlanticsupply.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
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

		// South Dakota
		[
			'<div class="map-text">' +
			'<span>TransTech Systems</span><br>' +
			'<hr>' +
			'1-800-724-6306<br>' +
			'<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
			'</div>'
		],

		// Tennessee
		[
			'<div class="map-text">' +
			'<span>TransTech Systems</span><br>' +
			'<hr>' +
			'1-800-724-6306<br>' +
			'<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
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
		],

		// Utah
		[
			'<div class="map-text">' +
			'<span>TransTech Systems</span><br>' +
			'<hr>' +
			'1-800-724-6306<br>' +
			'<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
			'</div>'
		],

		// Vermont
		[
			'<div class="map-text">' +
			'<span>TransTech Systems</span><br>' +
			'<hr>' +
			'1-800-724-6306<br>' +
			'<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
			'</div>'
		],

		// Virginia
		[
			'<div class="map-text">' +
			'<span>TransTech Systems</span><br>' +
			'<hr>' +
			'1-800-724-6306<br>' +
			'<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
			'</div>'
		],

		// Washington
		[
			'<div class="map-text">' +
			'<span>TransTech Systems</span><br>' +
			'<hr>' +
			'1-800-724-6306<br>' +
			'<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
			'</div>'
		],

		// West Virginia
		[
			'<div class="map-text">' +
			'<span>TransTech Systems</span><br>' +
			'<hr>' +
			'1-800-724-6306<br>' +
			'<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
			'</div>'
		],

		// Wisconsin
		[
			'<div class="map-text">' +
			'<span>TransTech Systems</span><br>' +
			'<hr>' +
			'1-800-724-6306<br>' +
			'<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
			'</div>'
		],

		// Wyoming
		[
			'<div class="map-text">' +
			'<span>TransTech Systems</span><br>' +
			'<hr>' +
			'1-800-724-6306<br>' +
			'<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
			'</div>'
		]
	];


	// Display multiple markers on a map
	var infoWindow = new google.maps.InfoWindow(), marker, i;

	// Loop through our array of markers & place each one on the map  
	for (var i = 0; i < markers.length; i++) {
		var position = new google.maps.LatLng(markers[i][1], markers[i][2]);

		if (markers[i][3] == "transtech") {
			marker = new google.maps.Marker({
				position: position,
				map: map,
				title: markers[i][0],
				icon: icons.transtech.icon
			});
		} else {
			marker = new google.maps.Marker({
				position: position,
				map: map,
				title: markers[i][0]
			});
		}



		// Allow each marker to have an info window    
		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				infoWindow.setContent(infoWindowContent[i][0]);
				infoWindow.open(map, marker);
			}
		})(marker, i));
	}

}