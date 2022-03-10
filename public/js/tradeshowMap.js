// Asynchronously Load the map API
var script = document.createElement('script');
script.src =
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyD4_58SHQlSV-JLIOT4y2yYWxM62U2kO38&callback=initMap';
document.body.appendChild(script);

function initMap() {
  var map;

  var mapOptions = {
    center: {
      lat: 37,
      lng: -96.3,
    },
    zoom: 4.6,
    mapTypeId: 'roadmap',
    scrollwheel: false,
  };

  // Display a map on the page
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // Map Marker Locations
  var markers = [
    //['CAPA, Pinehurst, NC', 35.189523, -79.462592],
    // ['MAPA, Bangor, ME', 44.831204, -68.781424],
    // ['CalAPA Fall, Ontario, CA', 34.038544, -117.60651],
    ['CalAPA Spring, Brea, CA', 33.928047, -117.883404],
    // ['Intermat ASEAN, Bangkok, Thailand', 13.588022, 100.580894],
    // ['SEAUPG, Knoxville, TN', 35.952985, -83.935225],
    // ['APAI, Indianapolis, IN', 40.031171, -86.939831],
    ['TRB, Washington D.C.', 38.911744, -77.018697],
    // ['MAPA, Columbia, MO', 38.948857, -92.334012],
    // ['RMACES, Denver, CO', 39.771474, -104.806882],
    // ['APAM, Mt Pleasant, MI', 43.595835, -84.772652],
    ['IAPA Annual Conference, Springfield, IL', 39.786973, -89.652644],
    ['World of Asphalt, Nashville, TN', 36.101958, -86.375711],
    // ['Ohio Asphalt Expo, Columbus, OH', 40.139683, -82.976837],
    ['TXAPA, San Antonio, TX', 29.461083, -98.499359],
    ['National Pavement Expo, Charlotte, NC', 35.216826, -80.851489],
    // ['MAPS Conference, Waco, TX', 31.554423, -97.162525],
    ['NEAUPG, Albany, NY', 42.728662, -73.799678],
    // ['WAPA, Wisconsin Dells, WI', 43.625082, -89.775456],
    // ['Minnesota Asphalt Conference, Minneapolis, MN', 44.968247, -93.264742],
    [
      '63rd Illinois Bituminous Paving Conference, Champaign, IL',
      40.109752,
      -88.260804,
    ],
    ['ConExpo, Las Vegas, Nevada', 36.161515, -115.161274],
  ];

  // Info Window Content
  var infoWindowContent = [
    // CAPA
    // [
    // 	'<div class="map-text">' +
    // 	'<img class="d-block mb-3" width="100" src="../img/capa-logo.png">' +
    // 	'<span>CAPA</span><br>' +
    // 	'<hr>' +
    // 	'Pinehurst, NC<br>' +
    // 	'April 1-3, 2020<br>' +
    // 	'<p><a class="link" href="http://www.carolinaasphalt.org/aws/CAPA/pt/sp/calendar" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    // 	'</div>'
    // ],

    // MAPA (Maine)
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/maine-logo.png">' +
    //     '<span>MAPA</span><br>' +
    //     '<hr>' +
    //     'Bangor, ME<br>' +
    //     'April 7-8, 2020<br>' +
    //     '<p><a class="link" href="https://maine-apa.org/paving-seminar" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>'
    // ],

    //CalAPA Fall
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/calapa-logo.png">' +
    //     '<span>CalAPA Fall Conference</span><br>' +
    //     '<hr>' +
    //     'Sacramento, CA<br>' +
    //     'October 13, 2021<br>' +
    //     '<p><a class="link" href="https://www.calapa.net/conference.html" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    //CalAPA Spring
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/calapa-logo.png">' +
        '<span>CalAPA Spring Conference - Tech Tuneup</span><br>' +
        '<hr>' +
        'Brea, CA<br>' +
        'April 5-6, 2022<br>' +
        '<p><a class="link" href="https://calapa.weblinkconnect.com/events/CalAPASpring%20Conference%20Tech%20Tuneup%20%20Orange%20County-5025/details" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    //Intermat ASEAN
    // [
    // 	'<div class="map-text">' +
    // 	'<img class="d-block mb-3" width="100" src="../img/intermat-asean-logo.png">' +
    // 	'<span>Intermat ASEAN</span><br>' +
    // 	'<hr>' +
    // 	'Bangkok, Thailand<br>' +
    // 	'September 9-11, 2020<br>' +
    // 	'<p><a class="link" href="https://asean.intermatconstruction.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    // 	'</div>'
    // ],

    // SEAUPG
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/seaupg-logo.png">' +
    //     '<span>SEAUPG</span><br>' +
    //     '<hr>' +
    //     'Knoxville, TN<br>' +
    //     'November 16-18, 2021<br>' +
    //     '<p><a class="link" href="http://www.seaupg.org" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // APAI
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/apai-logo.png">' +
    //     '<span>APAI</span><br>' +
    //     '<hr>' +
    //     'Indianapolis, IN<br>' +
    //     'December 15-17, 2021<br>' +
    //     '<p><a class="link" href="https://asphaltindiana.org" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // TRB
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/trb-logo.png">' +
        '<span>TRB 102nd Annual Meeting - Booth #1044</span><br>' +
        '<hr>' +
        'Washington D.C.<br>' +
        'January 8-12, 2023<br>' +
        '<p><a class="link" href="http://www.trb.org/AnnualMeeting/AnnualMeeting.aspx" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // MAPA (Missouri)
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/mapa-logo.png">' +
    //     '<span>32nd Annual MAPA Conference</span><br>' +
    //     '<hr>' +
    //     'Columbia, MO<br>' +
    //     'January 10-12, 2022<br>' +
    //     '<p><a class="link" href="https://moasphalt.org/events/annual-conference" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // RMACES
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/rmaces-logo.png">' +
    //     '<span>RMACES - Booth #1458</span><br>' +
    //     '<hr>' +
    //     'Denver, CO<br>' +
    //     'February 22-24, 2022<br>' +
    //     '<p><a class="link" href="https://www.rmaces.org/index.php" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    //APAM
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/michigan-asphalt-logo.png">' +
    //     '<span>APAM</span><br>' +
    //     '<hr>' +
    //     'Mt Pleasant, MI<br>' +
    //     'February 22-23, 2022<br>' +
    //     '<p><a class="link" href="https://www.apa-mi.org" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // Illinois Asphalt Conference
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/illinois-asphalt-logo.png">' +
        '<span>IAPA Annual Conference</span><br>' +
        '<hr>' +
        'Springfield, IL<br>' +
        'March 14 - 15, 2022<br>' +
        '<p><a class="link" href="https://www.il-asphalt.org/membership/annual-convention/details" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // World of Asphalt
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/woa-logo.png">' +
        '<span>World of Asphalt - Booth #3232</span><br>' +
        '<hr>' +
        'Nashville, TN<br>' +
        'March 29-31, 2022<br>' +
        '<p><a class="link" href="http://www.worldofasphalt.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    //Ohio
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/ohio-logo.png">' +
    //     '<span>Ohio Asphalt Expo</span><br>' +
    //     '<hr>' +
    //     'Columbus, OH<br>' +
    //     'March 8-9, 2022<br>' +
    //     '<p><a class="link" href="http://www.flexiblepavements.org" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    //TXAPA
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/txapa-logo.png">' +
        '<span>TXAPA</span><br>' +
        '<hr>' +
        'San Antonio, TX<br>' +
        'September 20-23, 2022<br>' +
        '<p><a class="link" href="https://www.texasasphalt.org" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Pavement Expo
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/pavement-expo-logo.png">' +
        '<span>National Pavement Expo</span><br>' +
        '<hr>' +
        'Charlotte, NC<br>' +
        'January 25-27, 2023<br>' +
        '<p><a class="link" href="https://www.nationalpavementexpo.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    //TXAPA Maps
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/txapa-logo.png">' +
    //     '<span>Maps Conference - Booth #14</span><br>' +
    //     '<hr>' +
    //     'Waco, TX<br>' +
    //     'March 8-9, 2022<br>' +
    //     '<p><a class="link" href="https://www.texasasphalt.org/maps" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // NEAUPG
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/neaupg-logo.png">' +
        '<span>NEAUPG</span><br>' +
        '<hr>' +
        'Albany, NY<br>' +
        'November 2-3, 2022<br>' +
        '<p><a class="link" href="http://www.neaupg.uconn.edu/meetingsevents" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // WAPA
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/wisconsin-asphalt-logo.png">' +
    //     '<span>WAPA Annual Conference</span><br>' +
    //     '<hr>' +
    //     'Wisconsin Dells, WI<br>' +
    //     'November 30-December 1, 2021<br>' +
    //     '<p><a class="link" href="https://www.wispave.org/wapas-62nd-annual-conference-and-business-meeting" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // Minnesota Asphalt Conference
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/mn-logo.png">' +
    //     '<span>Minnesota Asphalt Conference</span><br>' +
    //     '<hr>' +
    //     'Minneapolis, MN<br>' +
    //     'December 2, 2021<br>' +
    //     '<p><a class="link" href="https://www.asphaltisbest.com/events/EventDetails.aspx?id=1552651" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // Illinois Bituminous Conference
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/illinois-bituminous-logo.png">' +
        '<span>63rd Illinois Bituminous Paving Conference</span><br>' +
        '<hr>' +
        'Champaign, IL<br>' +
        'December 6-7, 2022<br>' +
        '<p><a class="link" href="https://ict.illinois.edu/outreach/bituminous" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // ConExpo
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/conexpo-logo.png">' +
        '<span>ConExpo - Booth #C-30867</span><br>' +
        '<hr>' +
        'Las Vegas, NV<br>' +
        'March 14-18, 2023<br>' +
        '<p><a class="link" href="http://www.conexpoconagg.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],
  ];

  // Display multiple markers on a map
  var infoWindow = new google.maps.InfoWindow(),
    marker,
    i;

  // Loop through our array of markers & place each one on the map
  for (var i = 0; i < markers.length; i++) {
    var position = new google.maps.LatLng(markers[i][1], markers[i][2]);

    marker = new google.maps.Marker({
      position: position,
      map: map,
      title: markers[i][0],
    });

    // Allow each marker to have an info window
    google.maps.event.addListener(
      marker,
      'click',
      (function (marker, i) {
        return function () {
          infoWindow.setContent(infoWindowContent[i][0]);
          infoWindow.open(map, marker);
        };
      })(marker, i)
    );
  }
}
