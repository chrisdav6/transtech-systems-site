// Asynchronously Load the map API
var script = document.createElement('script');
script.src =
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyD4_58SHQlSV-JLIOT4y2yYWxM62U2kO38&callback=initMap';
document.body.appendChild(script);

function initMap() {
  var map;

  var mapOptions = {
    center: {
      lat: 35,
      lng: -94.5,
    },
    zoom: 4.2,
    mapTypeId: 'roadmap',
    scrollwheel: false,
  };

  // Display a map on the page
  (function () {
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  })();

  // Map Marker Locations
  var markers = [
    //['CAPA, Pinehurst, NC', 35.189523, -79.462592],
    ['MAPA, Bangor, ME', 44.831204, -68.781424],
    ['NACE 2026, Arlington, TX', 32.72627, -97.110463],
    // ['CalAPA Fall, Sacramento, CA', 38.613259, -121.471408],
    // ['CalAPA Spring, Pomona, CA', 34.053067, -117.749428],
    // ['Tacera, College Station, TX', 30.623946, -96.319299],
    ['CalCima, Anaheim, CA', 33.832173, -117.914323],
    // ['Intermat ASEAN, Bangkok, Thailand', 13.588022, 100.580894],
    // ['AASHTO Annual Meeting, Philadelphia, PA', 39.95585, -75.164579],
    // ['NCAUPG, Indianapolis , IN', 39.778201, -86.157126],
    ['SEAUPG, Charleston, WV', 38.353411, -81.637535],
    // ['BATT Lab Open House, Richmond, KY', 37.738889, -84.291252],
    // ['IAPAs 2nd Annual Golf Outing, Morris, IL', 41.378384, -88.427807],
    ['APAI, Muncie, IN', 40.206962, -85.393312],
    // ['APAI Summer, South Bend, IN', 41.674956, -86.255116],
    ['TRB, Washington D.C.', 38.911744, -77.018697],
    ['MAPA, Columbia, MO', 38.948857, -92.334012],
    // ['RMACES, Denver, CO', 39.771474, -104.806882],
    // ['APAM, Mt. Pleasant, MI', 43.600198, -84.769425],
    // ['Utah Asphalt Conference, Sandy, UT', 40.566145, -111.841571],
    // ['IAPA Annual Conference, Springfield, IL', 39.786973, -89.652644],
    ['World of Asphalt, New Orleans, LA', 29.942845, -90.409834],
    ['NCAT Test Track Conference, Auburn, AL', 32.620384, -85.473941],
    // ['Ohio Asphalt Expo, Columbus, OH', 40.139683, -82.976837],
    // ['Ohio Asphalt Paving Conference, Columbus, OH', 40.139683, -82.976837],
    ['TXAPA, San Antonio, TX', 29.462161, -98.223925],
    // ['Highways USA Conference, Dallas, TX', 32.798137, -96.806722],
    // ['RMAUPG 30th Annual Conference, Reno, NV', 39.545669, -119.806902],
    // ['TXAPA Quarterly Membership Meeting, Buda, TX', 30.068213, -97.830459],
    // ['APAI Golf Outing, Angola, IN', 41.630486, -85.01596],
    ['NAPA Midyear Meeting, Louisville, KY', 38.233585, -85.770498],
    // ['NAPA Annual Meeting, Maui, HI', 20.788874, -156.315323],
    ['Pave/X 2026, New Orleans, LA', 29.904131, -89.928186],
    // ['Greater Iowa Asphalt Conference, Des Moines, IA', 41.590298, -93.625914],
    // ['PAIKY 2025 Winter Training, Louisville, KY', 38.203105, -84.631109],
    // ['National Pavement Expo, Tampa, FL', 27.940479, -82.455074],
    // ['TXAPA MAPS Conference, Houston, TX', 29.78009, -95.369866],
    // ['TXAPA MAPS Conference, Plano, TX', 33.052985, -96.761361],
    // ['TML Annual Conference, Fort Worth, TX', 32.736147, -97.327084],
    // ['NEAUPG, Springfield, MA', 42.104945, -72.591488],
    ['WAPA, Wisconsin Dells, WI', 43.625082, -89.775456],
    ['Minnesota Asphalt Conference, St. Cloud, MN', 45.553381, -94.164918],
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
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/maine-logo.png">' +
        '<span>MAPA</span><br>' +
        '<hr>' +
        'Bangor, ME<br>' +
        'April 7-8, 2026<br>' +
        '<p><a class="link" href="https://maine-apa.org/paving-seminar" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // NACE
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/naceLogo.png">' +
        '<span>NACE 2026 Annual Conference</span><br>' +
        '<hr>' +
        'Arlington, TX<br>' +
        'April 12-15, 2026<br>' +
        '<p><a class="link" href="https://www.countyengineers.org/future-meetings" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    //CalAPA Fall
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/calapa-logo.png">' +
    //     '<span>CalAPA Fall Conference</span><br>' +
    //     '<hr>' +
    //     'Sacramento, CA<br>' +
    //     'October 23-25, 2024<br>' +
    //     '<p><a class="link" href="https://www.calapa.net/conferences.html" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    //CalAPA Spring
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/calapa-logo.png">' +
    //     '<span>CalAPA Spring Conference</span><br>' +
    //     '<hr>' +
    //     'Pomona, CA<br>' +
    //     'February 25-26, 2025<br>' +
    //     '<p><a class="link" href="https://www.calapa.net/conferences.html" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    //Tacera Fall Conference
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/taceraLogo.png">' +
    //     '<span>TACERA Fall Conference - Booth #201</span><br>' +
    //     '<hr>' +
    //     'College Station, TX<br>' +
    //     'October 24-26, 2023<br>' +
    //     '<p><a class="link" href="https://tacera1.org" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    //CalCima Education Conference
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/calcimaLogo.png">' +
        '<span>2025 CalCima Education Conference</span><br>' +
        '<hr>' +
        'Anaheim, CA<br>' +
        'November 10-13, 2025<br>' +
        '<p><a class="link" href="https://www.calcimaconference.org" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
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

    // AASHTO Annaul Meeting
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/aashtoLogo.png">' +
    //     '<span>AASHTO Annual Meeting</span><br>' +
    //     '<hr>' +
    //     'Philadelphia, PA<br>' +
    //     'October 29-November 1, 2024<br>' +
    //     '<p><a class="link" href="https://transportation.org/meetings/meetings" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // NCAUPG
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/NCAUPGLogo.png">' +
    //     '<span>NCAUPG</span><br>' +
    //     '<hr>' +
    //     'Indianapolis , IN<br>' +
    //     'November 12-14, 2024<br>' +
    //     '<p><a class="link" href="https://engineering.purdue.edu/~ncaupg" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // SEAUPG
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/seaupg-logo.png">' +
        '<span>SEAUPG</span><br>' +
        '<hr>' +
        'Charleston, WV<br>' +
        'November 18-20, 2025<br>' +
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
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/apai-logo.png">' +
        '<span>APAI Winter Conference</span><br>' +
        '<hr>' +
        'Muncie, IN<br>' +
        'December 10-12, 2025<br>' +
        '<p><a class="link" href="https://mms.asphaltindiana.org//Calendar/moreinfo.php?org_id=APAI&eventid=167640" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

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
        '<span>TRB 105th Annual Meeting - Booth #727</span><br>' +
        '<hr>' +
        'Washington D.C.<br>' +
        'January 11-15, 2026<br>' +
        '<p><a class="link" href="http://www.trb.org/AnnualMeeting/AnnualMeeting.aspx" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // MAPA (Missouri)
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/mapa-logo.png">' +
        '<span>36th Annual MAPA Conference</span><br>' +
        '<hr>' +
        'Columbia, MO<br>' +
        'January 5-7, 2026<br>' +
        '<p><a class="link" href="https://moasphalt.org/events" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // RMACES
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/rmaces-logo.png">' +
    //     '<span>RMACES</span><br>' +
    //     '<hr>' +
    //     'Denver, CO<br>' +
    //     'February 19-20, 2025<br>' +
    //     '<p><a class="link" href="http://www.rmaces.org" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    //APAM
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/michigan-asphalt-logo.png">' +
    //     '<span>APAM 68th Annual Paving Conference</span><br>' +
    //     '<hr>' +
    //     'Mt. Pleasant, MI<br>' +
    //     'February 26-27, 2025<br>' +
    //     '<p><a class="link" href="https://www.apa-mi.org/pc_home_page.php" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    //Utah Asphalt Conference
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/utah-asphalt-logo.png">' +
    //     '<span>2024 Utah Asphalt Conference</span><br>' +
    //     '<hr>' +
    //     'Sandy, UT<br>' +
    //     'February 19-20, 2025<br>' +
    //     '<p><a class="link" href="https://utahasphalt.org/uapa-events" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // Illinois Asphalt Conference
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/illinois-asphalt-logo.png">' +
    //     '<span>2024 IAPA Annual Conference</span><br>' +
    //     '<hr>' +
    //     'Springfield, IL<br>' +
    //     'March 11-12, 2024<br>' +
    //     '<p><a class="link" href="https://www.il-asphalt.org/membership/annual-convention/details" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // World of Asphalt
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/woa-logo-2027.png">' +
        '<span>World of Asphalt 2027</span><br>' +
        '<hr>' +
        'New Orleans, LA<br>' +
        'March 15-17, 2027<br>' +
        '<p><a class="link" href="http://www.worldofasphalt.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // NCAT Test Track Conference
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/ncat-conference.png">' +
        '<span>NCAT Test Track Conference</span><br>' +
        '<hr>' +
        'Auburn, AL<br>' +
        '2027<br>' +
        '<p><a class="link" href="http://eng.auburn.edu/research/centers/ncat/testtrack/conference.html" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    //Ohio Asphalt Expo
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/ohio-logo.png">' +
    //     '<span>Ohio Asphalt Expo</span><br>' +
    //     '<hr>' +
    //     'Columbus, OH<br>' +
    //     'March 18-19, 2025<br>' +
    //     '<p><a class="link" href="https://www.flexiblepavements.org/OhioAsphaltExpo" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    //Ohio Asphalt Paving Conference
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/ohio-logo.png">' +
    //     '<span>Ohio Asphalt Paving Conference</span><br>' +
    //     '<hr>' +
    //     'Columbus, OH<br>' +
    //     'February 7, 2024<br>' +
    //     '<p><a class="link" href="https://www.flexiblepavements.org" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    //TXAPA
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/txapa-logo.png">' +
        '<span>TXAPAs 50th Annual Meeting  - Booth #17</span><br>' +
        '<hr>' +
        'San Antonio, TX<br>' +
        'September 8-11, 2025<br>' +
        '<p><a class="link" href="https://texasasphalt.swoogo.com/TXAPA-50th-annual-meeting" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    //Highways USA Conference
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/highwaysUSALogo.png">' +
    //     '<span>Highways USA Conference</span><br>' +
    //     '<hr>' +
    //     'Dallas, TX<br>' +
    //     'October 4-5, 2023<br>' +
    //     '<p><a class="link" href="https://www.terrapinn.com/exhibition/highways-usa/index.stm" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

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
        'Louisville, KY<br>' +
        'July 8-11, 2025<br>' +
        '<p><a class="link" href="https://www.asphaltpavement.org/programs/napa-events/napa-midyear-meeting" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    //NAPA Annual Meeting
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/napa-logo.png">' +
    //     '<span>NAPA 2025 Annual Meeting</span><br>' +
    //     '<hr>' +
    //     'Maui, HI<br>' +
    //     'February 2-5, 2025<br>' +
    //     '<p><a class="link" href="https://www.asphaltpavement.org/programs/napa-events/napa-annual-meeting" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    //Pave/X
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/pavex.png">' +
        '<span>Pave/X 2026 - Booth #442</span><br>' +
        '<hr>' +
        'New Orleans, LA<br>' +
        'February 10-12, 2026<br>' +
        '<p><a class="link" href="https://www.pavexshow.com/" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    //Greater Iowa Asphalt Conference
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/iowa-asphalt-logo.png">' +
    //     '<span>2024 Greater Iowa Asphalt Conference</span><br>' +
    //     '<hr>' +
    //     'Des Moines, IA<br>' +
    //     'March 6-8, 2024<br>' +
    //     '<p><a class="link" href="https://www.apai.net/events.aspx" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    //PAIKY Winter Training
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/paiky-logo.png">' +
    //     '<span>PAIKY 2025 Winter Training School</span><br>' +
    //     '<hr>' +
    //     'Louisville, KY<br>' +
    //     'March 5-7, 2025<br>' +
    //     '<p><a class="link" href="https://members.paiky.org/site_event_detail.cfm?pk_association_event=31956" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // Pavement Expo
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/pavement-expo-logo.png">' +
    //     '<span>National Pavement Expo</span><br>' +
    //     '<hr>' +
    //     'Tampa, FL<br>' +
    //     'January 15-17, 2025<br>' +
    //     '<p><a class="link" href="https://www.nationalpavementexpo.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    //TXAPA Maps - Houston
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/txapa-maps-logo.png">' +
    //     '<span>TXAPA Maps Conference</span><br>' +
    //     '<hr>' +
    //     'Houston, TX<br>' +
    //     'May 7, 2025<br>' +
    //     '<p><a class="link" href="https://texasasphalt.org/events/maps-houston" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    //TXAPA Maps - Plano
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/txapa-maps-logo.png">' +
    //     '<span>TXAPA Maps Conference</span><br>' +
    //     '<hr>' +
    //     'Plano, TX<br>' +
    //     'May 21, 2025<br>' +
    //     '<p><a class="link" href="https://texasasphalt.org/events/maps-plano" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    //Texas Municipal League
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/tml-logo.png">' +
    //     '<span>TML Annual Conference</span><br>' +
    //     '<hr>' +
    //     'Fort Worth, TX<br>' +
    //     'October 29-31, 2025<br>' +
    //     '<p><a class="link" href="https://tmlexhibits.org" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // NEAUPG
    // [
    //   '<div class="map-text">' +
    //     '<img class="d-block mb-3" width="100" src="../img/neaupg-logo.png">' +
    //     '<span>NEAUPG Fall Meeting</span><br>' +
    //     '<hr>' +
    //     'Springfield, MA<br>' +
    //     'October 16-17, 2024<br>' +
    //     '<p><a class="link" href="http://www.neaupg.uconn.edu/meetingsevents" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // WAPA
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/wisconsin-asphalt-logo.png">' +
        '<span>WAPA 66th Annual Conference</span><br>' +
        '<hr>' +
        'Wisconsin Dells, WI<br>' +
        'December 2-3, 2025<br>' +
        '<p><a class="link" href="https://www.wispave.org" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Minnesota Asphalt Conference
    [
      '<div class="map-text">' +
        '<img class="d-block mb-3" width="100" src="../img/mn-logo.png">' +
        '<span>2025 Minnesota Asphalt Conference</span><br>' +
        '<hr>' +
        'St. Cloud, MN<br>' +
        'December 9-10, 2025<br>' +
        '<p><a class="link" href="https://www.asphaltisbest.com/events/EventDetails.aspx?id=1853252&group=" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
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
