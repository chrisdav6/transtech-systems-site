// Asynchronously Load the map API
var script = document.createElement('script');
script.src =
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyD4_58SHQlSV-JLIOT4y2yYWxM62U2kO38&callback=initMap';
document.body.appendChild(script);

function initMap() {
  var map;

  var mapOptions = {
    center: {
      lat: 35.643,
      lng: -90.91,
    },
    zoom: 4,
    mapTypeId: 'roadmap',
    scrollwheel: false,
  };

  var icons = {
    transtech: {
      icon: '../img/transtech-map-icon-new.png',
    },
    direct: {
      icon: '../img/transtech-map-icon-direct.png',
    },
  };

  // Display a map on the page
  (function () {
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  })();

  // Map Marker Locations
  var markers = [
    ['Atlantic Supply, Alabama', 32.314991, -86.901855],
    ['TransTech Systems, Alaska', 66.073198, -151.421268, 'transtech'],
    ['TransTech Systems, Arizona', 34.528727, -111.767859, 'direct'],
    ['TransTech Systems, Arkansas', 34.841498, -92.285615, 'transtech'],
    ['TransTech Systems, California', 36.692245, -119.620438, 'direct'],
    ['TransTech Systems, Colorado', 39.158062, -105.509759, 'direct'],
    ['TransTech Systems, Connecticut', 41.654445, -73.083801, 'transtech'],
    ['TransTech Systems, Delaware', 39.180106, -75.499366, 'transtech'],
    ['Atlantic Supply, Jacksonville Florida', 30.31466, -81.655884],
    ['Atlantic Supply, Largo Florida', 27.909467, -82.787324],
    ['Atlantic Supply, Orlando Florida', 28.516294, -81.367493],
    ['Atlantic Supply, Riviera Beach Florida', 26.775341, -80.058097],
    ['QC Lab Supply, Georgia', 33.065286, -83.541289],
    ['TransTech Systems, Hawaii', 19.61003, -155.544456, 'transtech'],
    ['TransTech Systems, Idaho', 44.059733, -114.428075, 'transtech'],
    ['TransTech Systems, Illinois', 41.095912, -89.494629, 'direct'],
    ['TransTech Systems, Indiana', 39.707081, -86.001824, 'direct'],
    ['TransTech Systems, Iowa', 42.246724, -93.527497, 'direct'],
    ['TransTech Systems, Kansas', 38.570758, -98.446819, 'transtech'],
    ['TransTech Systems, Kentucky', 37.630124, -84.538175, 'direct'],
    ['Atlantic Supply, Louisiana', 30.489397, -91.903111],
    ['TransTech Systems, Maine', 45.413876, -69.466553, 'transtech'],
    ['TransTech Systems, Maryland', 39.140858, -76.682258, 'transtech'],
    ['TransTech Systems, Massachusetts', 42.5207, -71.383667, 'transtech'],
    ['TransTech Systems, Michigan', 43.563136, -84.678763, 'direct'],
    ['TransTech Systems, Minnesota', 46.555991, -94.274308, 'direct'],
    ['Atlantic Supply, Mississippi', 32.509762, -89.428711],
    ['TransTech Systems, Missouri', 38.476882, -92.601894, 'direct'],
    ['TransTech Systems, Montana', 47.257664, -109.540552, 'transtech'],
    ['TransTech Systems, Nebraska', 41.648757, -99.658929, 'transtech'],
    ['TransTech Systems, Nevada', 40.079192, -116.892773, 'transtech'],
    ['TransTech Systems, New Hampshire', 43.405047, -71.575928, 'transtech'],
    ['TransTech Systems, New Jersey', 39.751595, -74.46653, 'transtech'],
    ['TransTech Systems, New Mexico', 34.490538, -105.928939, 'direct'],
    ['TransTech Systems, New York', 42.776429, -73.866104, 'transtech'],
    ['TransTech Systems, North Carolina', 35.568479, -78.85617],
    ['TransTech Systems, North Dakota', 47.571878, -100.338895, 'transtech'],
    ['TransTech Systems, Ohio', 39.954965, -82.932924, 'direct'],
    ['TransTech Systems, Oklahoma', 35.737529, -97.519473, 'transtech'],
    ['TransTech Systems, Oregon', 44.036589, -120.375932, 'transtech'],
    ['TransTech Systems, Pennsylvania', 41.302571, -77.211914, 'direct'],
    ['Atlantic Supply, Puerto Rico', 18.245026, -66.569655],
    ['TransTech Systems , Rhode Island', 41.631867, -71.471558, 'transtech'],
    ['TransTech Systems, South Carolina', 33.897999, -80.905078],
    ['TransTech Systems, South Dakota', 44.740993, -100.336661, 'transtech'],
    ['QC Lab Supply, Tennessee', 35.78074, -86.495376],
    ['TransTech Systems, Texas', 31.319622, -99.088073, 'direct'],
    ['TransTech Systems, Utah', 39.393259, -111.63642, 'direct'],
    ['TransTech Systems, Vermont', 43.890007, -72.737469, 'transtech'],
    ['TransTech Systems, Virginia', 37.598711, -78.339174],
    ['TransTech Systems, Washington', 47.426994, -119.815286, 'transtech'],
    ['TransTech Systems, West Virginia', 38.70075, -80.846758, 'transtech'],
    ['TransTech Systems, Wisconsin', 44.878719, -89.658613, 'direct'],
    ['TransTech Systems, Wyoming', 43.347377, -107.236324, 'transtech'],
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
        '<p class="mt-0"><a class="link" href="http://seaupg.org" target="_blank"><i class="fa-solid fa-award fa-lg"></i> Visit SEAUPG</a></p>' +
        '</div>',
    ],

    // Alaska
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '1-800-724-6306<br>' +
        '<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Arizona
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '518-560-0387<br>' +
        'Attn: John Lamond<br>' +
        '<p><a class="link" href="mailto:jlamond@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Arkansas
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '1-800-724-6306<br>' +
        '<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // California
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '518-560-0387<br>' +
        'Attn: John Lamond<br>' +
        '<p><a class="link" href="mailto:jlamond@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="https://www.calapa.net" target="_blank"><i class="fa-solid fa-award fa-lg"></i> Visit CalAPA</a></p>' +
        '<p class="mt-0"><a class="link" href="https://www.calcima.org" target="_blank"><i class="fa-solid fa-award fa-lg"></i> Visit CalCIMA</a></p>' +
        '</div>',
    ],

    // Colorado
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '518-560-0387<br>' +
        'Attn: John Lamond<br>' +
        '<p><a class="link" href="mailto:jlamond@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Connecticut
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '1-800-724-6306<br>' +
        '<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Delaware
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '1-800-724-6306<br>' +
        '<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],
    // [
    //   '<div class="map-text">' +
    //     '<span>GT Mid Atlantic, Inc.</span><br>' +
    //     '<hr>' +
    //     '610-574-6313<br>' +
    //     'Attn: Colin Chenet<br>' +
    //     '<p class="mt-0"><a class="link" href="mailto:colinchenet@gtmidatlantic.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
    //     '<hr>' +
    //     '610-574-6313<br>' +
    //     'Attn: Mike Chenet<br>' +
    //     '<p class="mt-0"><a class="link" href="mailto:mikechenet@gtmidatlantic.com?subject=Inquiry%20from%20TransTech%20Systems%20Website"><i class="fas fa-envelope"></i> Email</a></p>' +
    //     '<hr>' +
    //     '<p class="mt-0"><a class="link" href="https://www.gtmidatlantic.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // Jacksonville Florida
    [
      '<div class="map-text">' +
        '<span>Atlantic Supply</span><br>' +
        '<hr>' +
        '888-260-5584<br>' +
        'Attn: James Allen<br>' +
        '<p><a class="link" href="mailto:jallen@atlanticsupply.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="https://www.atlanticsupply.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '<p class="mt-0"><a class="link" href="http://seaupg.org" target="_blank"><i class="fa-solid fa-award fa-lg"></i> Visit SEAUPG</a></p>' +
        '</div>',
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
        '<p class="mt-0"><a class="link" href="http://seaupg.org" target="_blank"><i class="fa-solid fa-award fa-lg"></i> Visit SEAUPG</a></p>' +
        '</div>',
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
        '<p class="mt-0"><a class="link" href="http://seaupg.org" target="_blank"><i class="fa-solid fa-award fa-lg"></i> Visit SEAUPG</a></p>' +
        '</div>',
    ],

    // Riviera Beach Florida
    [
      '<div class="map-text">' +
        '<span>Atlantic Supply</span><br>' +
        '<hr>' +
        '800-535-7384<br>' +
        'Attn: Ray Collette<br>' +
        '<p><a class="link" href="mailto:seflorida@atlanticsupply.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="https://www.atlanticsupply.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '<p class="mt-0"><a class="link" href="http://seaupg.org" target="_blank"><i class="fa-solid fa-award fa-lg"></i> Visit SEAUPG</a></p>' +
        '</div>',
    ],

    // Georgia
    [
      '<div class="map-text">' +
        '<span>QC Lab Supply</span><br>' +
        '<hr>' +
        '404-849-5438<br>' +
        'Attn: Ronnie Spradley<br>' +
        '<p><a class="link" href="mailto:ronnie@qclabsupply.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="https://qclabsupply.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '<p class="mt-0"><a class="link" href="http://seaupg.org" target="_blank"><i class="fa-solid fa-award fa-lg"></i> Visit SEAUPG</a></p>' +
        '</div>',
    ],

    // Hawaii
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '1-800-724-6306<br>' +
        '<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Idaho
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '1-800-724-6306<br>' +
        '<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Illinois
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '518-560-0387<br>' +
        'Attn: John Lamond<br>' +
        '<p><a class="link" href="mailto:jlamond@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="https://www.il-asphalt.org" target="_blank"><i class="fa-solid fa-award fa-lg"></i> Visit IAPA</a></p>' +
        '</div>',
    ],

    // Indiana
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '518-560-0387<br>' +
        'Attn: John Lamond<br>' +
        '<p><a class="link" href="mailto:jlamond@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="https://www.asphaltindiana.org" target="_blank"><i class="fa-solid fa-award fa-lg"></i> Visit APAI</a></p>' +
        '</div>',
    ],

    // Iowa
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '518-560-0387<br>' +
        'Attn: John Lamond<br>' +
        '<p><a class="link" href="mailto:jlamond@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Kansas
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '1-800-724-6306<br>' +
        '<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Kentucky
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '518-560-0387<br>' +
        'Attn: John Lamond<br>' +
        '<p><a class="link" href="mailto:jlamond@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="https://www.paiky.org" target="_blank"><i class="fa-solid fa-award fa-lg"></i> Visit PAIKY</a></p>' +
        '</div>',
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
        '<p class="mt-0"><a class="link" href="http://seaupg.org" target="_blank"><i class="fa-solid fa-award fa-lg"></i> Visit SEAUPG</a></p>' +
        '</div>',
    ],

    // Maine
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '1-800-724-6306<br>' +
        '<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Maryland
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '1-800-724-6306<br>' +
        '<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],
    // [
    //   '<div class="map-text">' +
    //     '<span>GT Mid Atlantic, Inc.</span><br>' +
    //     '<hr>' +
    //     '610-574-6313<br>' +
    //     'Attn: Colin Chenet<br>' +
    //     '<p class="mt-0"><a class="link" href="mailto:colinchenet@gtmidatlantic.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
    //     '<hr>' +
    //     '610-574-6313<br>' +
    //     'Attn: Mike Chenet<br>' +
    //     '<p class="mt-0"><a class="link" href="mailto:mikechenet@gtmidatlantic.com?subject=Inquiry%20from%20TransTech%20Systems%20Website"><i class="fas fa-envelope"></i> Email</a></p>' +
    //     '<hr>' +
    //     '<p class="mt-0"><a class="link" href="https://www.gtmidatlantic.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // Massachusetts
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '1-800-724-6306<br>' +
        '<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Michigan
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '518-560-0387<br>' +
        'Attn: John Lamond<br>' +
        '<p><a class="link" href="mailto:jlamond@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="https://www.apa-mi.org" target="_blank"><i class="fa-solid fa-award fa-lg"></i> Visit APAM</a></p>' +
        '</div>',
    ],

    // Minnesota
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '518-560-0387<br>' +
        'Attn: John Lamond<br>' +
        '<p><a class="link" href="mailto:jlamond@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="https://www.asphaltisbest.com" target="_blank"><i class="fa-solid fa-award fa-lg"></i> Visit MAPA</a></p>' +
        '</div>',
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
        '<p class="mt-0"><a class="link" href="http://seaupg.org" target="_blank"><i class="fa-solid fa-award fa-lg"></i> Visit SEAUPG</a></p>' +
        '</div>',
    ],

    // Missouri
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '518-560-0387<br>' +
        'Attn: John Lamond<br>' +
        '<p><a class="link" href="mailto:jlamond@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Montana
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '1-800-724-6306<br>' +
        '<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Nebraska
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '1-800-724-6306<br>' +
        '<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Nevada
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '1-800-724-6306<br>' +
        '<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // New Hampshire
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '1-800-724-6306<br>' +
        '<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // New Jersey
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '1-800-724-6306<br>' +
        '<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],
    // [
    //   '<div class="map-text">' +
    //     '<span>GT Mid Atlantic, Inc.</span><br>' +
    //     '<hr>' +
    //     '610-574-6313<br>' +
    //     'Attn: Colin Chenet<br>' +
    //     '<p class="mt-0"><a class="link" href="mailto:colinchenet@gtmidatlantic.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
    //     '<hr>' +
    //     '610-574-6313<br>' +
    //     'Attn: Mike Chenet<br>' +
    //     '<p class="mt-0"><a class="link" href="mailto:mikechenet@gtmidatlantic.com?subject=Inquiry%20from%20TransTech%20Systems%20Website"><i class="fas fa-envelope"></i> Email</a></p>' +
    //     '<hr>' +
    //     '<p class="mt-0"><a class="link" href="https://www.gtmidatlantic.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // New Mexico
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '518-560-0387<br>' +
        'Attn: John Lamond<br>' +
        '<p><a class="link" href="mailto:jlamond@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // New York
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '1-800-724-6306<br>' +
        '<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // North Carolina
    [
      '<div class="map-text">' +
        '<span>Gordon Technical Sales & Service</span><br>' +
        '<hr>' +
        '804-878-1623<br>' +
        'Attn: Mike Gordon<br>' +
        '<p><a class="link" href="mailto:mikeg@gtssi.net?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="https://www.gtssi.net" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.carolinaasphalt.org/aws/CAPA/pt/sp/home_page" target="_blank"><i class="fa-solid fa-award fa-lg"></i> Visit CAPA</a></p>' +
        '</div>',
    ],

    // North Dakota
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '1-800-724-6306<br>' +
        '<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Ohio
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '518-560-0387<br>' +
        'Attn: John Lamond<br>' +
        '<p><a class="link" href="mailto:jlamond@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="https://www.flexiblepavements.org" target="_blank"><i class="fa-solid fa-award fa-lg"></i> Visit Flexible Pavements Of Ohio</a></p>' +
        '</div>',
    ],

    // Oklahoma
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '1-800-724-6306<br>' +
        '<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Oregon
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '1-800-724-6306<br>' +
        '<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Pennsylvania
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '518-560-0387<br>' +
        'Attn: John Lamond<br>' +
        '<p><a class="link" href="mailto:jlamond@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
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
        '</div>',
    ],

    // Rhode Island
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '1-800-724-6306<br>' +
        '<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // South Carolina
    [
      '<div class="map-text">' +
        '<span>Gordon Technical Sales & Service</span><br>' +
        '<hr>' +
        '804-878-1623<br>' +
        'Attn: Mike Gordon<br>' +
        '<p><a class="link" href="mailto:mikeg@gtssi.net?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="https://www.gtssi.net" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '<p class="mt-0"><a class="link" href="http://seaupg.org" target="_blank"><i class="fa-solid fa-award fa-lg"></i> Visit SEAUPG</a></p>' +
        '</div>',
    ],

    // South Dakota
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '1-800-724-6306<br>' +
        '<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Tennessee
    [
      '<div class="map-text">' +
        '<span>QC Lab Supply</span><br>' +
        '<hr>' +
        '404-849-5438<br>' +
        'Attn: Ronnie Spradley<br>' +
        '<p><a class="link" href="mailto:ronnie@qclabsupply.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="https://qclabsupply.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '<p class="mt-0"><a class="link" href="http://seaupg.org" target="_blank"><i class="fa-solid fa-award fa-lg"></i> Visit SEAUPG</a></p>' +
        '</div>',
    ],

    // Texas
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '518-560-0387<br>' +
        'Attn: John Lamond<br>' +
        '<p><a class="link" href="mailto:jlamond@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="https://texasasphalt.org" target="_blank"><i class="fa-solid fa-award fa-lg"></i> Visit TXAPA</a></p>' +
        '</div>',
    ],

    // Utah
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '518-560-0387<br>' +
        'Attn: John Lamond<br>' +
        '<p><a class="link" href="mailto:jlamond@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Vermont
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '1-800-724-6306<br>' +
        '<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Virginia
    [
      '<div class="map-text">' +
        '<span>Gordon Technical Sales & Service</span><br>' +
        '<hr>' +
        '804-878-1623<br>' +
        'Attn: Mike Gordon<br>' +
        '<p><a class="link" href="mailto:mikeg@gtssi.net?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="https://www.gtssi.net" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Washington
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '1-800-724-6306<br>' +
        '<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // West Virginia
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '1-800-724-6306<br>' +
        '<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Wisconsin
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '518-560-0387<br>' +
        'Attn: John Lamond<br>' +
        '<p><a class="link" href="mailto:jlamond@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="https://www.wispave.org" target="_blank"><i class="fa-solid fa-award fa-lg"></i> Visit WAPA</a></p>' +
        '</div>',
    ],

    // Wyoming
    [
      '<div class="map-text">' +
        '<span>TransTech Systems</span><br>' +
        '<hr>' +
        '1-800-724-6306<br>' +
        '<p><a class="link" href="mailto:sales@transtechsys.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
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

    if (markers[i][3] == 'transtech') {
      marker = new google.maps.Marker({
        position: position,
        map: map,
        title: markers[i][0],
        icon: icons.transtech.icon,
      });
    } else if (markers[i][3] == 'direct') {
      marker = new google.maps.Marker({
        position: position,
        map: map,
        title: markers[i][0],
        icon: icons.direct.icon,
      });
    } else {
      marker = new google.maps.Marker({
        position: position,
        map: map,
        title: markers[i][0],
      });
    }

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
