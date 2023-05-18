// Asynchronously Load the map API
var script = document.createElement('script');
script.src =
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyD4_58SHQlSV-JLIOT4y2yYWxM62U2kO38&callback=initMap';
document.body.appendChild(script);

function initMap() {
  var map;

  var mapOptions = {
    center: {
      lat: 36.5,
      lng: -96.3,
    },
    zoom: 4.7,
    mapTypeId: 'roadmap',
    scrollwheel: false,
  };

  // Display a map on the page
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // Map Marker Locations
  var markers = [
    //['CAPA, Pinehurst, NC', 35.189523, -79.462592],
    // ['MAPA, Bangor, ME', 44.831204, -68.781424],
    // ['CalAPA Fall, Sacramento, CA', 38.613259, -121.471408],
    // ['CalAPA Spring, Ontario, CA', 34.039986, -117.592088],
    ['Tacera, College Station, TX', 30.623946, -96.319299],
    ['CalCima, Palm Springs, CA', 33.845971, -116.544408],
    // ['Intermat ASEAN, Bangkok, Thailand', 13.588022, 100.580894],
    ['SEAUPG, Little Rock, AR', 34.731085, -92.344018],
    // ['BATT Lab Open House, Richmond, KY', 37.738889, -84.291252],
    // ['IAPAs 2nd Annual Golf Outing, Morris, IL', 41.378384, -88.427807],
    // ['APAI, Muncie, IN', 40.206962, -85.393312],
    // ['APAI Summer, South Bend, IN', 41.674956, -86.255116],
    ['TRB, Washington D.C.', 38.911744, -77.018697],
    // ['MAPA, Columbia, MO', 38.948857, -92.334012],
    // ['RMACES, Denver, CO', 39.771474, -104.806882],
    // ['APAM, Mt Pleasant, MI', 43.595835, -84.772652],
    ['IAPA Annual Conference, Springfield, IL', 39.786973, -89.652644],
    ['World of Asphalt, Nashville, TN', 36.101958, -86.375711],
    // ['Ohio Asphalt Expo, Columbus, OH', 40.139683, -82.976837],
    ['Ohio Asphalt Paving Conference, Columbus, OH', 40.139683, -82.976837],
    ['TXAPA, San Antonio, TX', 29.461083, -98.499359],
    // ['RMAUPG 30th Annual Conference, Reno, NV', 39.545669, -119.806902],
    // ['AASHTO, Orlando, FL', 28.551161, -81.373221],
    // ['TXAPA Quarterly Membership Meeting, Buda, TX', 30.068213, -97.830459],
    // ['APAI Golf Outing, Angola, IN', 41.630486, -85.01596],
    ['NAPA Midyear Meeting, Kansas City, MO', 39.127084, -94.522848],
    ['NAPA Annual Meeting, ChampionsGate, FL', 28.262904, -81.616245],
    ['Pave/X, San Antonio, TX', 29.436334, -98.498679],
    // ['PAIKY 2023 Winter Training, Louisville, KY', 38.203105, -85.631109],
    ['National Pavement Expo, Tampa, FL', 27.940479, -82.455074],
    // ['TXAPA MAPS Conference, Waco, TX', 31.554423, -97.162525],
    // ['NEAUPG, Albany, NY', 42.728662, -73.799678],
    // ['WAPA, Wisconsin Dells, WI', 43.625082, -89.775456],
    ['Minnesota Asphalt Conference, Prior Lake, MN', 44.725722, -93.464836],
    // ['Missouri S&T Asphalt Conference, Rolla, MO', 37.947304, -91.768538],
    // [
    //   '63rd Illinois Bituminous Paving Conference, Champaign, IL',
    //   40.109752,
    //   -88.260804,
    // ],
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
    //     'October 27, 2022<br>' +
    //     '<p><a class="link" href="https://calapa.weblinkconnect.com/events/FallAsphalt%20Pavement%20Conference%20Sacramento-5029/details" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    //CalAPA Spring
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/calapa-logo.png">' +
    //     '<span>CalAPA Spring Conference</span><br>' +
    //     '<hr>' +
    //     'Ontario, CA<br>' +
    //     'March 22-24, 2023<br>' +
    //     '<p><a class="link" href="https://www.calapa.net/conferences.html" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    //Tacera Fall Conference
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/taceraLogo.png">' +
        '<span>TACERA Fall Conference</span><br>' +
        '<hr>' +
        'College Station, TX<br>' +
        'October 24-26, 2023<br>' +
        '<p><a class="link" href="https://tacera1.org" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    //CalCima Education Conference
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/calcimaLogo.png">' +
        '<span>2023 CalCima Education Conference</span><br>' +
        '<hr>' +
        'Palm Springs, CA<br>' +
        'November 6-9, 2023<br>' +
        '<p><a class="link" href="https://www.calcima.org/edconf" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
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
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/seaupg-logo.png">' +
        '<span>SEAUPG</span><br>' +
        '<hr>' +
        'Little Rock, AR<br>' +
        'November 14-16, 2023<br>' +
        '<p><a class="link" href="http://www.seaupg.org" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // BATT Lab Open House
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/BattLabLogo.png">' +
    //     '<span>BATT Lab Open House</span><br>' +
    //     '<hr>' +
    //     'Richmond, KY<br>' +
    //     'May 24, 2022<br>' +
    //     '<p><a class="link" href="https://www.blankenshipasphalttech.com/batt-lab-news" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // Illinois Asphalt Golf Outing
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/illinois-asphalt-logo.png">' +
    //     '<span>IAPAs 2nd Annual Golf Outing</span><br>' +
    //     '<hr>' +
    //     'Morris, IL<br>' +
    //     'June 7, 2022<br>' +
    //     '<p><a class="link" href="https://www.il-asphalt.org" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // APAI
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/apai-logo.png">' +
    //     '<span>APAI Winter Conference</span><br>' +
    //     '<hr>' +
    //     'Muncie, IN<br>' +
    //     'December 14-16, 2022<br>' +
    //     '<p><a class="link" href="http://mms.asphaltindiana.org/Calendar/moreinfo.php?eventid=69409" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // APAI Joint Summer Meeting
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/apai-logo.png">' +
    //     '<span>APAI/IMAA Joint Summer Meeting</span><br>' +
    //     '<hr>' +
    //     'South Bend, IN<br>' +
    //     'July 15-17, 2022<br>' +
    //     '<p><a class="link" href="https://mms.asphaltindiana.org//Calendar/moreinfo.php?eventid=69410" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // TRB
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/trb-logo.png">' +
        '<span>TRB 103rd Annual Meeting - Booth #1042</span><br>' +
        '<hr>' +
        'Washington D.C.<br>' +
        'January 7-11, 2024<br>' +
        '<p><a class="link" href="http://www.trb.org/AnnualMeeting/AnnualMeeting.aspx" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // MAPA (Missouri)
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/mapa-logo.png">' +
    //     '<span>33rd Annual MAPA Conference</span><br>' +
    //     '<hr>' +
    //     'Columbia, MO<br>' +
    //     'January 9-11, 2023<br>' +
    //     '<p><a class="link" href="https://moasphalt.org/events/https-moasphalt-org-2023-registration-form" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // RMACES
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/rmaces-logo.png">' +
    //     '<span>RMACES</span><br>' +
    //     '<hr>' +
    //     'Denver, CO<br>' +
    //     'February 7-8, 2023<br>' +
    //     '<p><a class="link" href="https://www.rmaces.org/index.php" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    //APAM
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/michigan-asphalt-logo.png">' +
    //     '<span>APAM 66th Annual Paving Conference - Booth #20</span><br>' +
    //     '<hr>' +
    //     'Mt Pleasant, MI<br>' +
    //     'February 21-22, 2023<br>' +
    //     '<p><a class="link" href="https://www.apa-mi.org/events.php" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // Illinois Asphalt Conference
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/illinois-asphalt-logo.png">' +
        '<span>2024 IAPA Annual Conference</span><br>' +
        '<hr>' +
        'Springfield, IL<br>' +
        'March 11-12, 2024<br>' +
        '<p><a class="link" href="https://www.il-asphalt.org/membership/annual-convention/details" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // World of Asphalt
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/woa-logoTemp.png">' +
        '<span>World of Asphalt - Booth #2528</span><br>' +
        '<hr>' +
        'Nashville, TN<br>' +
        'March 25-27, 2024<br>' +
        '<p><a class="link" href="http://www.worldofasphalt.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    //Ohio Asphalt Expo
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

    //Ohio Asphalt Paving Conference
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/ohio-logo.png">' +
        '<span>Ohio Asphalt Paving Conference</span><br>' +
        '<hr>' +
        'Columbus, OH<br>' +
        'February 7, 2024<br>' +
        '<p><a class="link" href="https://www.flexiblepavements.org" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    //TXAPA
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/txapa-logo.png">' +
        '<span>TXAPAs 48th Annual Meeting</span><br>' +
        '<hr>' +
        'San Antonio, TX<br>' +
        'September 18-21, 2023<br>' +
        '<p><a class="link" href="https://texasasphalt.org/events/2023-annual-meeting/" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    //Rocky Mountain Asphalt
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/colorado-asphalt-logo.png">' +
    //     '<span>RMAUPG 30th Annual Conference</span><br>' +
    //     '<hr>' +
    //     'Reno, NV<br>' +
    //     'October 12-13, 2022<br>' +
    //     '<p><a class="link" href="https://www.co-asphalt.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    //AASHTO Annual Meeting
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/aashtoLogo.png">' +
    //     '<span>2022 AASHTO Annual Meeting</span><br>' +
    //     '<hr>' +
    //     'Orlando, FL<br>' +
    //     'October 19-23, 2022<br>' +
    //     '<p><a class="link" href="https://web.cvent.com/event/117fd874-bc35-47ab-923b-a928162d55c4/websitePage:33bb36ed-69a1-42a4-85e6-6b25fb660a71" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    //TXAPA Quarterly Membership Meeting
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/txapa-logo.png">' +
    //     '<span>TXAPA Quarterly Membership Meeting</span><br>' +
    //     '<hr>' +
    //     'Buda, TX<br>' +
    //     'April 20, 2022<br>' +
    //     '<p><a class="link" href="https://www.texasasphalt.org/ev_calendar_day.asp?date=4/20/2022&eventid=284" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // APAI Golf Outing
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/apai-logo.png">' +
    //     '<span>APAI Trine University Golf Outing</span><br>' +
    //     '<hr>' +
    //     'Angola, IN<br>' +
    //     'June 17, 2022<br>' +
    //     '<p><a class="link" href="https://mms.asphaltindiana.org//Calendar/moreinfo.php?eventid=69408" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    //NAPA Midyear Meeting
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/napa-logo.png">' +
        '<span>NAPA Midyear Meeting</span><br>' +
        '<hr>' +
        'Kansas City, MO<br>' +
        'July 9-12, 2023<br>' +
        '<p><a class="link" href="https://www.asphaltpavement.org/programs/napa-events/napa-midyear-meeting" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    //NAPA Annual Meeting
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/napa-logo.png">' +
        '<span>NAPA 2024 Annual Meeting</span><br>' +
        '<hr>' +
        'ChampionsGate, FL<br>' +
        'January 28-31, 2024<br>' +
        '<p><a class="link" href="https://www.asphaltpavement.org/programs/napa-events/napa-annual-meeting" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    //Pave/X
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/pavex.png">' +
        '<span>Pave/X</span><br>' +
        '<hr>' +
        'San Antonio, TX<br>' +
        'January 30-February 1, 2024<br>' +
        '<p><a class="link" href="https://www.pavexshow.com/" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    //PAIKY Winter Training
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/paiky-logo.png">' +
    //     '<span>PAIKY 2023 Winter Training - Booth #14</span><br>' +
    //     '<hr>' +
    //     'Louisville, KY<br>' +
    //     'February 15-17, 2023<br>' +
    //     '<p><a class="link" href="https://members.paiky.org/site_event_detail.cfm?pk_association_event=25352" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // Pavement Expo
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/pavement-expo-logo.png">' +
        '<span>National Pavement Expo</span><br>' +
        '<hr>' +
        'Tampa, FL<br>' +
        'January 23-25, 2024<br>' +
        '<p><a class="link" href="https://www.nationalpavementexpo.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    //TXAPA Maps
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/txapa-logo.png">' +
    //     '<span>TXAPA Maps Conference</span><br>' +
    //     '<hr>' +
    //     'Waco, TX<br>' +
    //     'May 15-17, 2023<br>' +
    //     '<p><a class="link" href="https://www.texasasphalt.org/maps" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // NEAUPG
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/neaupg-logo.png">' +
    //     '<span>NEAUPG</span><br>' +
    //     '<hr>' +
    //     'Albany, NY<br>' +
    //     'November 2-3, 2022<br>' +
    //     '<p><a class="link" href="http://www.neaupg.uconn.edu/meetingsevents" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // WAPA
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/wisconsin-asphalt-logo.png">' +
    //     '<span>WAPA 63rd Annual Conference</span><br>' +
    //     '<hr>' +
    //     'Wisconsin Dells, WI<br>' +
    //     'November 29-30, 2022<br>' +
    //     '<p><a class="link" href="https://www.wispave.org/wapas-63rd-annual-conference-and-business-meeting-save-the-date" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // Minnesota Asphalt Conference
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/mn-logo.png">' +
        '<span>2023 Minnesota Asphalt Conference</span><br>' +
        '<hr>' +
        'Prior Lake, MN<br>' +
        'December 14-15, 2023<br>' +
        '<p><a class="link" href="https://www.asphaltisbest.com/events/EventDetails.aspx?id=1618804" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Missouri S&T Asphalt Conference
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/missourisandt.png">' +
    //     '<span>Missouri S&T Asphalt Conference</span><br>' +
    //     '<hr>' +
    //     'Rolla, MO<br>' +
    //     'December 6-7, 2022<br>' +
    //     '<p><a class="link" href="https://asphalt.mst.edu" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // Illinois Bituminous Conference
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/illinois-bituminous-logo.png">' +
    //     '<span>63rd Illinois Bituminous Paving Conference</span><br>' +
    //     '<hr>' +
    //     'Champaign, IL<br>' +
    //     'December 6-7, 2022<br>' +
    //     '<p><a class="link" href="https://ict.illinois.edu/outreach/bituminous" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // ConExpo
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/conexpo-logo.png">' +
        '<span>ConExpo</span><br>' +
        '<hr>' +
        'Las Vegas, NV<br>' +
        'March 3-7, 2026<br>' +
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
