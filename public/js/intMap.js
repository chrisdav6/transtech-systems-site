// Asynchronously Load the map API
var script = document.createElement('script');
script.src =
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyD4_58SHQlSV-JLIOT4y2yYWxM62U2kO38&callback=initMap';
document.body.appendChild(script);

function initMap() {
  var map;

  var mapOptions = {
    center: {
      lat: 28.711,
      lng: 17.234,
    },
    zoom: 2.6,
    mapTypeId: 'roadmap',
    scrollwheel: false,
  };

  // Display a map on the page
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // Map Marker Locations
  var markers = [
    ['M/s. Taisei International, Afghanistan', 34.234306, 66.209291],
    ['Somagex, Algeria', 29.343875, 2.109375],
    ['Mertind, Argentina', -33.550655, -63.950483],
    ['BAV Group Ltd. , Armenia', 40.455307, 44.653931],
    ['Motorway Tech, Australia', -24.367114, 133.769531],
    ['TransTech Europe, Austria', 47.554287, 14.512939],
    ['BAV Group Ltd. , Azerbaijan', 40.33817, 48.054199],
    ['M/s. Taisei International, Bangladesh', 23.980712, 90.091666],
    ['BAV Corporation / Road Technologies, Belarus', 53.520717, 28.355713],
    ['ABM van Zijl B.V., Belgium', 50.840636, 4.482422],
    ['Beratest AG, Benin', 10.00131, 2.285156],
    ['Mertind, Bolivia', -17.555479, -63.395588],
    ['Solotest, Brazil', -9.795678, -49.833984],
    ['TransTech Europe (Gepasz), Bulgaria', 42.646081, 25.081787],
    ['Beratest AG, Burkina Faso', 12.415119, -1.669922],
    ['Beratest AG, Cameroun', 5.441022, 12.678223],
    ['Hoskin Scientific, British Columbia', 49.259067, -123.11245],
    ['Hoskin Scientific, Quebec', 45.520301, -73.55484],
    ['Hoskin Scientific, Ontario', 43.239599, -79.796287],
    ['Hoskin Scientific, Alberta', 51.380788, -114.974718],
    ['Equipos de Auscultacion, Chile', -26.824071, -70.224609],
    ['Earth Products China Limited, China', 34.597042, 103.974609],
    ['Atlantic Supply, Colombia', 4.315974, -73.072573],
    ['Beratest AG, Congo', -0.329588, 15.864258],
    ['Atlantic Supply, Costa Rica', 9.90391, -83.841379],
    ['Beratest AG, Côte d’Ivoire', 7.700105, -5.646973],
    ['TransTech Europe, Czech Republic', 49.894324, 15.097526],
    // ['Imporequip, Ecuador', -1.428075, -78.574219],
    ['Bincis UAB, Estonia', 58.867745, 25.559692],
    ['Grollemund Laboroutes, France', 46.754917, 2.39502],
    ['Beratest AG, Gabon', -0.659165, 11.469727],
    ['BAV Group Ltd. , Georgia', 42.067034, 43.763783],
    ['TransTech Europe, Germany', 51.220647, 10.524902],
    ['IKEYS Engineering Services, Ghana', 7.767872, -1.127134],
    ['Beratest AG, Guinée', 10.941192, -10.678711],
    ['Beratest AG, Guinée-Bissau', 12.084982, -14.902954],
    ['TransTech Europe (Wirtgen Budapest Kft.), Hungary', 47.171044, 19.215088],
    ['ABAS AS, Iceland', 64.883646, -18.549413],
    ['M/s. Taisei International, India', 22.755921, 79.40918],
    ['PT Panairsan Pratama, Indonesia', -2.054191, 120.550732],
    ['CFU International Trade & Services, Iraq', 32.850776, 42.844469],
    ['JR Technical Services, Ireland', 53.362026, -8.006287],
    ['Nishio Rent All Co., Ltd., Japan', 35.871247, 138.295898],
    ['BAV Corporation / Uneedus Group LLP, Kazakhstan', 48.224673, 66.796875],
    ['Sam Jun Scientific Co., Ltd., Korea', 36.615528, 127.902832],
    ['Burgan Equipment Co., Kuwait', 29.43018, 47.648215],
    ['BAV Corporation / Uneedus Group LLP, Kyrgyzstan', 41.533254, 74.476318],
    ['Bincis UAB, Latvia', 56.932987, 25.010376],
    ['Bincis UAB, Lithuania', 55.463285, 23.917236],
    ['MS Instruments (SEA) Sdn Bhd, Malaysia', 4.19303, 102.172852],
    ['Beratest AG, Mali', 17.874203, -1.560059],
    ['Beratest AG, Maroc', 32.444885, -6.009521],
    ['Beratest AG, Mauritanie', 20.179724, -9.689941],
    ['Atlantic Supply, Mexico', 24.44715, -102.271729],
    ['BAV Corporation / Uniprom LLC, Moldova', 47.323931, 28.674316],
    ['M/s. Taisei International, Nepal', 28.1579, 83.895047],
    ['ABM van Zijl B.V., Netherlands', 52.173932, 5.734863],
    ['Motorway Tech, New Zealand', -42.763146, 172.177734],
    ['Beratest AG, Niger', 17.497389, 9.777832],
    ['ABAS AS, Norway', 61.143235, 9.228516],
    ['M/s. Taisei International, Oman', 20.306682, 56.00759],
    ['M/s. Taisei International, Pakistan', 29.618773, 69.26533],
    ['Atlantic Supply, Panama', 8.504292, -81.456683],
    ['Siccion Marketing, Philippines', 12.533115, 123.046875],
    ['Toropol, Ltd., Poland', 52.456009, 19.02832],
    ['Proeti, S.A., Portugal', 39.740986, -8.4375],
    ['Intermodal Services Co. W.L.L., Qatar', 25.304304, 51.212769],
    ['Beratest AG, République Centrafricaine', 6.850078, 20.566406],
    ['Tecnoservice Equipment S.R.L., Romania', 45.523971, 24.740059],
    ['BAV Company Ltd., Russia', 63.074866, 93.339844],
    ['Beratest AG, Sénégal', 14.743011, -14.72168],
    ['Nishio Rent All Co., Ltd., Singapore', 1.364922, 103.815994],
    ['TransTech Europe (Celab d.o.o.), Slovenia', 46.029389, 14.655762],
    ['Proeti, S.A., Spain', 40.413496, -3.603516],
    ['M/s. Taisei International, Sri Lanka', 7.8775394, 80.7003428],
    ['Beratest AG, Switzerland', 46.991494, 8.234253],
    ['BAV Corporation / Uneedus Group LLP, Tajikistan', 38.882481, 70.817871],
    ['Beratest AG, Tchad', 14.98724, 18.896484],
    // ['Asia Testing Equipment Co., Ltd., Thailand', 15.961329, 100.722656],
    ['Beratest AG, Togo', 8.439772, 1.07666],
    ['Beratest AG, Tunisie', 34.343436, 9.349365],
    ['BAV Corporation / Uneedus Group LLP, Turkmenistan', 39.571822, 59.040527],
    ['CFU International Trade & Services, Turkey', 39.164141, 35.046387],
    ['BAV Corporation / Uniprom LLC, Ukraine', 49.009051, 31.618652],
    ['Burgan Equipment Co., United Arab Emirates', 23.616186, 54.136582],
    ['JR Technical Services, United Kindom', 54.393352, -2.06543],
    ['BAV Corporation / Uneedus Group LLP, Uzbekistan', 42.016652, 63.457031],
    ['Nishio Rent All Co., Ltd., Vietnam', 13.20786, 108.511963],
  ];

  // Info Window Content
  var infoWindowContent = [
    // Afghanistan
    [
      '<div class="map-text">' +
        '<span>M/s. Taisei International</span><br>' +
        '<hr>' +
        '91-044-26162877<br>' +
        'Attn: G. Parasuraman<br>' +
        '<p><a class="link" href="mailto:g.parasuraman@yahoo.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.taiseint.com/home" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Algeria
    [
      '<div class="map-text">' +
        '<span>Somagex</span><br>' +
        '<hr>' +
        '023-47-13-15<br>' +
        'Attn: Mohamed Yahmi<br>' +
        '<strong><i class="fas fa-tools"></i> Authorized Service Center</strong><br>' +
        '<p><a class="link" href="mailto:md_yahmi@hotmail.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Argentina
    [
      '<div class="map-text">' +
        '<span>Mertind Ltda.</span><br>' +
        '<hr>' +
        '+591-3-336-7676<br>' +
        'Attn: Mauricio Lijeron Eguez<br>' +
        '<p><a class="link" href="mailto:mauriciolijeron@mertind.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="https://www.mertind.com/bolivia" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Armenia (CIS)
    [
      '<div class="map-text">' +
        '<span>BAV Group Ltd.</span><br>' +
        '<hr>' +
        '+995 599 51 50 56<br>' +
        'Attn: Shota Mosiashvilli<br>' +
        '<p><a class="link" href="mailto:mosiashvili_shota@yahoo.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://bavcompany.ru" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Australia
    [
      '<div class="map-text">' +
        '<span>Motorway Tech</span><br>' +
        '<hr>' +
        '+61-1300-416-313<br>' +
        'Attn: Lorraine Duffy<br>' +
        '<strong><i class="fas fa-tools"></i> Authorized Service Center</strong><br>' +
        '<p><a class="link" href="mailto:lorraine@motorwaytechnologies.com.au?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="https://motorwaytechnologies.com.au" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Austria
    [
      '<div class="map-text">' +
        '<span>TransTech Europe</span><br>' +
        '<hr>' +
        '+49-441-3501227<br>' +
        'Attn: Bernd Diedrichs<br>' +
        '<p><a class="link" href="mailto:bernd.diedrichs@ewetel.net?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.transtechsys.com/europe" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Azerbaijan (CIS)
    [
      '<div class="map-text">' +
        '<span>BAV Group Ltd.</span><br>' +
        '<hr>' +
        '+995 599 51 50 56<br>' +
        'Attn: Shota Mosiashvilli<br>' +
        '<p><a class="link" href="mailto:mosiashvili_shota@yahoo.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://bavcompany.ru" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Bangladesh
    [
      '<div class="map-text">' +
        '<span>M/s. Taisei International</span><br>' +
        '<hr>' +
        '91-044-26162877<br>' +
        'Attn: G. Parasuraman<br>' +
        '<p><a class="link" href="mailto:g.parasuraman@yahoo.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.taiseint.com/home" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Belarus
    [
      '<div class="map-text">' +
        '<span>BAV Corporation / Road Technologies</span><br>' +
        '<hr>' +
        '+375 29 610 0095<br>' +
        'Attn: Kostia Minin<br>' +
        '<p><a class="link" href="mailto:info@roadtec.by?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://bavcompany.ru" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Belgium
    [
      '<div class="map-text">' +
        '<span>ABM van Zijl B.V.</span><br>' +
        '<hr>' +
        '+31(0)653-165-245<br>' +
        'Attn: Fred van Zijl<br>' +
        '<p><a class="link" href="mailto:fred@abmbv.nl?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.abmbv.nl" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Benin
    [
      '<div class="map-text">' +
        '<span>Beratest AG</span><br>' +
        '<hr>' +
        '0041 (0)78 822 21 26<br>' +
        'Attn: Max Gysin<br>' +
        '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Bolivia
    [
      '<div class="map-text">' +
        '<span>Mertind Ltda.</span><br>' +
        '<hr>' +
        '+591-3-336-7676<br>' +
        'Attn: Mauricio Lijeron Eguez<br>' +
        '<strong><i class="fas fa-tools"></i> Authorized Service Center</strong><br>' +
        '<p><a class="link" href="mailto:mauriciolijeron@mertind.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="https://www.mertind.com/bolivia" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Brazil
    [
      '<div class="map-text">' +
        '<span>Solotest</span><br>' +
        '<hr>' +
        '+5511-3289-0211<br>' +
        'Attn: Rodrigo Barella<br>' +
        '<p><a class="link" href="mailto:rodrigobarella@gmail.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.solotest.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Bulgaria
    [
      '<div class="map-text">' +
        '<span>TransTech Europe (Gepasz)</span><br>' +
        '<hr>' +
        '+49-441-3501227<br>' +
        'Attn: Bernd Diedrichs<br>' +
        '<p><a class="link" href="mailto:bernd.diedrichs@ewetel.net?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.transtechsys.com/europe" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Burkina Faso
    [
      '<div class="map-text">' +
        '<span>Beratest AG</span><br>' +
        '<hr>' +
        '0041 (0)78 822 21 26<br>' +
        'Attn: Max Gysin<br>' +
        '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Cameroun
    [
      '<div class="map-text">' +
        '<span>Beratest AG</span><br>' +
        '<hr>' +
        '0041 (0)78 822 21 26<br>' +
        'Attn: Max Gysin<br>' +
        '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Canada - British Columbia
    [
      '<div class="map-text">' +
        '<span>Hoskin Scientific</span><br>' +
        '<hr>' +
        '604-872-7894<br>' +
        'Attn: Jamie Emery<br>' +
        '<p><a class="link" href="mailto:jemery@hoskin.ca?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.hoskin.ca" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Canada - Quebec
    [
      '<div class="map-text">' +
        '<span>Hoskin Scientific</span><br>' +
        '<hr>' +
        '514-735-5267<br>' +
        'Attn: Sylvain Paquette<br>' +
        '<p><a class="link" href="mailto:spaquette@hoskin.ca?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.hoskin.ca" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Canada - Ontario
    [
      '<div class="map-text">' +
        '<span>Hoskin Scientific</span><br>' +
        '<hr>' +
        '905-333-5510<br>' +
        'Attn: Joseph Zambito-Orazio<br>' +
        '<p><a class="link" href="mailto:jzambito@hoskin.ca?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.hoskin.ca" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Canada - Alberta
    [
      '<div class="map-text">' +
        '<span>Hoskin Scientific</span><br>' +
        '<hr>' +
        '780-434-2645<br>' +
        'Attn: Jamie Emery<br>' +
        '<p><a class="link" href="mailto:jemery@hoskin.ca?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.hoskin.ca" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Chile
    [
      '<div class="map-text">' +
        '<span>Equipos de Auscultacion</span><br>' +
        '<hr>' +
        '+562 24069792<br>' +
        'Attn: Carolina Fuentes<br>' +
        '<strong><i class="fas fa-tools"></i> Authorized Service Center</strong><br>' +
        '<p><a class="link" href="mailto:carolina.fuentes@gaussindex.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.indexsa.cl" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // China
    [
      '<div class="map-text">' +
        '<span>Earth Products China Limited</span><br>' +
        '<hr>' +
        '+852-2392-8698<br>' +
        'Attn: Janet Lo<br>' +
        '<p><a class="link" href="mailto:janet@epc.com.hk?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.epc.com.hk" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // CIS - No Map Location //

    // Columbia
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

    // Congo
    [
      '<div class="map-text">' +
        '<span>Beratest AG</span><br>' +
        '<hr>' +
        '0041 (0)78 822 21 26<br>' +
        'Attn: Max Gysin<br>' +
        '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Costa Rica
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

    // Côte d’Ivoire
    [
      '<div class="map-text">' +
        '<span>Beratest AG</span><br>' +
        '<hr>' +
        '0041 (0)78 822 21 26<br>' +
        'Attn: Max Gysin<br>' +
        '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Czech Republic
    [
      '<div class="map-text">' +
        '<span>TransTech Europe</span><br>' +
        '<hr>' +
        '+49-441-3501227<br>' +
        'Attn: Bernd Diedrichs<br>' +
        '<p><a class="link" href="mailto:bernd.diedrichs@ewetel.net?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.transtechsys.com/europe" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Ecuador
    // [
    //   '<div class="map-text">' +
    //     '<span>Imporequip</span><br>' +
    //     '<hr>' +
    //     '5939-63181296<br>' +
    //     'Attn: Vladimir Rojas<br>' +
    //     '<p><a class="link" href="mailto:vladobm@gmail.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
    //     '</div>'
    // ],

    // Estonia
    [
      '<div class="map-text">' +
        '<span>Bincis UAB</span><br>' +
        '<hr>' +
        '+370-698-06311<br>' +
        'Attn: Edvinas Peleckas<br>' +
        '<p><a class="link" href="mailto:ep@bincis.lt?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.bincis.lt/lt" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // France
    [
      '<div class="map-text">' +
        '<span>Grollemund Laboroutes</span><br>' +
        '<hr>' +
        '+33-389499693<br>' +
        'Attn: Michel Grollemund<br>' +
        '<p><a class="link" href="mailto:michel@grollemund.net?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.laboroutes.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Gabon
    [
      '<div class="map-text">' +
        '<span>Beratest AG</span><br>' +
        '<hr>' +
        '0041 (0)78 822 21 26<br>' +
        'Attn: Max Gysin<br>' +
        '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Georgia
    [
      '<div class="map-text">' +
        '<span>BAV Group Ltd.</span><br>' +
        '<hr>' +
        '+995 599 51 50 56<br>' +
        'Attn: Shota Mosiashvilli<br>' +
        '<p><a class="link" href="mailto:mosiashvili_shota@yahoo.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://bavcompany.ru" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Germany
    [
      '<div class="map-text">' +
        '<span>TransTech Europe</span><br>' +
        '<hr>' +
        '+49-441-3501227<br>' +
        'Attn: Bernd Diedrichs<br>' +
        '<strong><i class="fas fa-tools"></i> Authorized Service Center</strong><br>' +
        '<p><a class="link" href="mailto:bernd.diedrichs@ewetel.net?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.transtechsys.com/europe" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Ghana
    [
      '<div class="map-text">' +
        '<span>IKEYS Engineering Services</span><br>' +
        '<hr>' +
        '+233-245-253462<br>' +
        'Attn: Isaac Acquah<br>' +
        '<p><a class="link" href="mailto:acquahike9@yahoo.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="https://ikeysengineeringservices.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Guinée
    [
      '<div class="map-text">' +
        '<span>Beratest AG</span><br>' +
        '<hr>' +
        '0041 (0)78 822 21 26<br>' +
        'Attn: Max Gysin<br>' +
        '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Guinée-Bissau
    [
      '<div class="map-text">' +
        '<span>Beratest AG</span><br>' +
        '<hr>' +
        '0041 (0)78 822 21 26<br>' +
        'Attn: Max Gysin<br>' +
        '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Hungary
    [
      '<div class="map-text">' +
        '<span>TransTech Europe (Wirtgen Budapest Kft.)</span><br>' +
        '<hr>' +
        '+49-441-3501227<br>' +
        'Attn: Bernd Diedrichs<br>' +
        '<p><a class="link" href="mailto:bernd.diedrichs@ewetel.net?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.transtechsys.com/europe" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Iceland
    [
      '<div class="map-text">' +
        '<span>ABAS AS</span><br>' +
        '<hr>' +
        '+47 32 24 35 30<br>' +
        'Attn: Geir Solberg<br>' +
        '<p><a class="link" href="mailto:gsolberg@abas-as.no?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://abas-as.simplesite.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // India
    [
      '<div class="map-text">' +
        '<span>M/s. Taisei International</span><br>' +
        '<hr>' +
        '91-044-26162877<br>' +
        'Attn: G. Parasuraman<br>' +
        '<strong><i class="fas fa-tools"></i> Authorized Service Center</strong><br>' +
        '<p><a class="link" href="mailto:g.parasuraman@yahoo.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.taiseint.com/home" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Indonesia
    [
      '<div class="map-text">' +
        '<span>PT Panairsan Pratama</span><br>' +
        '<hr>' +
        '+62-21-5807881<br>' +
        'Attn: Irsan Aditama<br>' +
        '<p><a class="link" href="mailto:irsan@panairsan-group.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.panairsan.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Iraq
    [
      '<div class="map-text">' +
        '<span>CFU Intl Trade & Services</span><br>' +
        '<hr>' +
        '+90 312-3940132<br>' +
        'Attn: Utku CIRIK<br>' +
        '<p><a class="link" href="mailto:ucirik@cfu.com.tr?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="https://www.cfu.com.tr" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Ireland
    [
      '<div class="map-text">' +
        '<span>JR Technical Services UK Ltd</span><br>' +
        '<hr>' +
        '+44-0191-461-1103<br>' +
        'Attn: Callum Brady<br>' +
        '<p><a class="link" href="mailto:callum@jrts.co.uk?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.jrts.co.uk" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Japan
    [
      '<div class="map-text">' +
        '<span>Nishio Rent All Co., Ltd</span><br>' +
        '<hr>' +
        '+816-6241-0240<br>' +
        'Attn: Yukihiro Kimura<br>' +
        '<strong><i class="fas fa-tools"></i> Authorized Service Center</strong><br>' +
        '<p><a class="link" href="mailto:yukihiro.kimura@nishio-rent.co.jp?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.nishio-rent.co.jp" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Kazakhstan (CIS)
    [
      '<div class="map-text">' +
        '<span>BAV Corporation / Uneedus Group LLP</span><br>' +
        '<hr>' +
        '+7 771 808 88 88<br>' +
        'Attn: Nadzhot Kholikov<br>' +
        '<p><a class="link" href="mailto:uneedusgroup@gmail.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://bavcompany.ru" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Korea
    [
      '<div class="map-text">' +
        '<span>Sam Jun Scientific Co., Ltd</span><br>' +
        '<hr>' +
        '+82-(0)31-889-2558<br>' +
        'Attn: Mr. Won-Yang Park<br>' +
        '<p><a class="link" href="mailto:wypark11@nate.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Kuwait
    [
      '<div class="map-text">' +
        '<span>Burgan Equipment Co.</span><br>' +
        '<hr>' +
        '+965-2243-7670<br>' +
        '+965-2242-8730<br>' +
        'Attn: Mr. Ajith Kumar<br>' +
        '<p><a class="link" href="mailto:contact@burganequip.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Kyrgyzstan (CIS)
    [
      '<div class="map-text">' +
        '<span>Bav Corporation / Uneedus Group LLP</span><br>' +
        '<hr>' +
        '+7 771 808 88 88<br>' +
        'Attn: Nadzhot Kholikov<br>' +
        '<p><a class="link" href="mailto:uneedusgroup@gmail.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://bavcompany.ru" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Latvia
    [
      '<div class="map-text">' +
        '<span>Bincis UAB</span><br>' +
        '<hr>' +
        '+370-698-06311<br>' +
        'Attn: Edvinas Peleckas<br>' +
        '<p><a class="link" href="mailto:ep@bincis.lt?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.bincis.lt/lt" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Lithuania
    [
      '<div class="map-text">' +
        '<span>Bincis UAB</span><br>' +
        '<hr>' +
        '+370-698-06311<br>' +
        'Attn: Edvinas Peleckas<br>' +
        '<p><a class="link" href="mailto:ep@bincis.lt?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.bincis.lt/lt" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Malaysia
    [
      '<div class="map-text">' +
        '<span>MS Instruments (SEA) Sdn Bhd</span><br>' +
        '<hr>' +
        '+603-802-41615<br>' +
        'Attn: H.S. Yap<br>' +
        '<p><a class="link" href="mailto:yhs@msisb.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://msisb.com/index.html" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Mali
    [
      '<div class="map-text">' +
        '<span>Beratest AG</span><br>' +
        '<hr>' +
        '0041 (0)78 822 21 26<br>' +
        'Attn: Max Gysin<br>' +
        '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Maroc
    [
      '<div class="map-text">' +
        '<span>Beratest AG</span><br>' +
        '<hr>' +
        '0041 (0)78 822 21 26<br>' +
        'Attn: Max Gysin<br>' +
        '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Mauritanie
    [
      '<div class="map-text">' +
        '<span>Beratest AG</span><br>' +
        '<hr>' +
        '0041 (0)78 822 21 26<br>' +
        'Attn: Max Gysin<br>' +
        '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Mexico
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

    // Moldova (CIS)
    [
      '<div class="map-text">' +
        '<span>BAV Corporation / Uniprom LLC</span><br>' +
        '<hr>' +
        '+380 44 501 6000<br>' +
        'Attn: Oleksandr Volyanyk<br>' +
        '<p><a class="link" href="mailto:uniprom@uniprom.com.ua?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://bavcompany.ru" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Nepal
    [
      '<div class="map-text">' +
        '<span>M/s. Taisei International</span><br>' +
        '<hr>' +
        '91-044-26162877<br>' +
        'Attn: G. Parasuraman<br>' +
        '<p><a class="link" href="mailto:g.parasuraman@yahoo.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.taiseint.com/home" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Netherlands
    [
      '<div class="map-text">' +
        '<span>ABM van Zijl B.V.</span><br>' +
        '<hr>' +
        '+31(0)653-165-245<br>' +
        'Attn: Fred van Zijl<br>' +
        '<p><a class="link" href="mailto:fred@abmbv.nl?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.abmbv.nl" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // New Zealand
    [
      '<div class="map-text">' +
        '<span>Motorway Tech</span><br>' +
        '<hr>' +
        '+61-1300-416-313<br>' +
        'Attn: Lorraine Duffy<br>' +
        '<strong><i class="fas fa-tools"></i> Authorized Service Center</strong><br>' +
        '<p><a class="link" href="mailto:lorraine@motorwaytechnologies.com.au?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="https://motorwaytechnologies.com.au" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Niger
    [
      '<div class="map-text">' +
        '<span>Beratest AG</span><br>' +
        '<hr>' +
        '0041 (0)78 822 21 26<br>' +
        'Attn: Max Gysin<br>' +
        '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Norway
    [
      '<div class="map-text">' +
        '<span>ABAS AS</span><br>' +
        '<hr>' +
        '+47 32 24 35 30<br>' +
        'Attn: Geir Solberg<br>' +
        '<strong><i class="fas fa-tools"></i> Authorized Service Center</strong><br>' +
        '<p><a class="link" href="mailto:gsolberg@abas-as.no?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://abas-as.simplesite.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Oman
    [
      '<div class="map-text">' +
        '<span>M/s. Taisei International</span><br>' +
        '<hr>' +
        '91-044-26162877<br>' +
        'Attn: G. Parasuraman<br>' +
        '<p><a class="link" href="mailto:g.parasuraman@yahoo.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.taiseint.com/home" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Pakistan
    [
      '<div class="map-text">' +
        '<span>M/s. Taisei International</span><br>' +
        '<hr>' +
        '91-044-26162877<br>' +
        'Attn: G. Parasuraman<br>' +
        '<p><a class="link" href="mailto:g.parasuraman@yahoo.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.taiseint.com/home" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Panama
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

    // Philippines
    [
      '<div class="map-text">' +
        '<span>Siccion Marketing</span><br>' +
        '<hr>' +
        '+632 8711-8416/22<br>' +
        'Attn: Victor Pulido<br>' +
        '<strong><i class="fas fa-tools"></i> Authorized Service Center</strong><br>' +
        '<p><a class="link" href="mailto:vpulido@smi-group.com.ph?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.smi-group.com.ph" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Poland
    [
      '<div class="map-text">' +
        '<span>Toropol, Ltd</span><br>' +
        '<hr>' +
        '+4822-519-4070<br>' +
        'Attn: Krzysztof; Tomasz Roszkowski<br>' +
        '<p><a class="link" href="mailto:krzysztof@toropol.pl?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://toropol.pl" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Portugal
    [
      '<div class="map-text">' +
        '<span>Proeti, S.A.</span><br>' +
        '<hr>' +
        '+4822-519-4070<br>' +
        'Attn: Carlos Blazquez<br>' +
        '<p><a class="link" href="mailto:calidad@proetisa.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://proetisa.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Qatar
    [
      '<div class="map-text">' +
        '<span>Intermodal Services Co. W.L.L.</span><br>' +
        '<hr>' +
        '+974-4462-1168<br>' +
        'Attn: N. S. Hegde / Vikram Shekhawat<br>' +
        '<strong><i class="fas fa-tools"></i> Authorized Service Center</strong><br>' +
        '<p><a class="link" href="mailto:vikram@intermodalqatar.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.intermodalqatar.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // République Centrafricaine
    [
      '<div class="map-text">' +
        '<span>Beratest AG</span><br>' +
        '<hr>' +
        '0041 (0)78 822 21 26<br>' +
        'Attn: Max Gysin<br>' +
        '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Romania
    [
      '<div class="map-text">' +
        '<span>Tecnoservice Equipment S.R.L.</span><br>' +
        '<hr>' +
        '+40-21-316-88-57<br>' +
        'Attn: George Sicoe<br>' +
        '<p><a class="link" href="mailto:gsicoe@tecnos.ro?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="https://www.tecnos.ro" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Russia
    [
      '<div class="map-text">' +
        '<span>BAV Company Ltd.</span><br>' +
        '<hr>' +
        '+7 926 203 20 02<br>' +
        'Attn: Sergey Baranov<br>' +
        '<strong><i class="fas fa-tools"></i> Authorized Service Center</strong><br>' +
        '<p><a class="link" href="mailto:info@bavcompany.ru?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://bavcompany.ru" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Sénégal
    [
      '<div class="map-text">' +
        '<span>Beratest AG</span><br>' +
        '<hr>' +
        '0041 (0)78 822 21 26<br>' +
        'Attn: Max Gysin<br>' +
        '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Singapore
    [
      '<div class="map-text">' +
        '<span>Nishio Rent All Co., Ltd</span><br>' +
        '<hr>' +
        '+816-6241-0240<br>' +
        'Attn: Yukihiro Kimura<br>' +
        '<p><a class="link" href="mailto:yukihiro.kimura@nishio-rent.co.jp?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.nishio-rent.co.jp" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Slovenia
    [
      '<div class="map-text">' +
        '<span>TransTech Europe (Celab d.o.o.)</span><br>' +
        '<hr>' +
        '+49-441-3501227<br>' +
        'Attn: Bernd Diedrichs<br>' +
        '<p><a class="link" href="mailto:bernd.diedrichs@ewetel.net?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.transtechsys.com/europe" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Spain
    [
      '<div class="map-text">' +
        '<span>Proeti, S.A.</span><br>' +
        '<hr>' +
        '+4822-519-4070<br>' +
        'Attn: Carlos Blazquez<br>' +
        '<p><a class="link" href="mailto:calidad@proetisa.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://proetisa.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Sri Lanka
    [
      '<div class="map-text">' +
        '<span>M/s. Taisei International</span><br>' +
        '<hr>' +
        '91-044-26162877<br>' +
        'Attn: G. Parasuranam<br>' +
        '<p><a class="link" href="mailto:g.parasuraman@yahoo.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.taiseint.com/home" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Switzerland
    [
      '<div class="map-text">' +
        '<span>Beratest AG</span><br>' +
        '<hr>' +
        '0041 (0)78 822 21 26<br>' +
        'Attn: Max Gysin<br>' +
        '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Tajikistan (CIS)
    [
      '<div class="map-text">' +
        '<span>BAV Corporation / Uneedus Group LLP</span><br>' +
        '<hr>' +
        '+7 771 808 88 88<br>' +
        'Attn: Nadzhot Kholikov<br>' +
        '<p><a class="link" href="mailto:uneedusgroup@gmail.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://bavcompany.ru" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Tchad
    [
      '<div class="map-text">' +
        '<span>Beratest AG</span><br>' +
        '<hr>' +
        '0041 (0)78 822 21 26<br>' +
        'Attn: Max Gysin<br>' +
        '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Thailand
    // [
    //   '<div class="map-text">' +
    //     '<span>Asia Testing Equipment Co., Ltd</span><br>' +
    //     '<hr>' +
    //     '+02-553-0809<br>' +
    //     'Attn: Mr. Nantapong Phuetphon<br>' +
    //     '<p><a class="link" href="mailto:nantapong@asiatest.co.th?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
    //     '<p class="mt-0"><a class="link" href="http://www.asiatest.co.th/ATE.html" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
    //     '</div>',
    // ],

    // Togo
    [
      '<div class="map-text">' +
        '<span>Beratest AG</span><br>' +
        '<hr>' +
        '0041 (0)78 822 21 26<br>' +
        'Attn: Max Gysin<br>' +
        '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Tunisia
    [
      '<div class="map-text">' +
        '<span>Beratest AG</span><br>' +
        '<hr>' +
        '0041 (0)78 822 21 26<br>' +
        'Attn: Max Gysin<br>' +
        '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '</div>',
    ],

    // Turkmenistan (CIS)
    [
      '<div class="map-text">' +
        '<span>BAV Corporation / Uneedus Group LLP</span><br>' +
        '<hr>' +
        '+7 771 808 88 88<br>' +
        'Attn: Nadzhot Kholikov<br>' +
        '<p><a class="link" href="mailto:uneedusgroup@gmail.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://bavcompany.ru" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Turkey
    [
      '<div class="map-text">' +
        '<span>CFU Intl Trade & Services</span><br>' +
        '<hr>' +
        '+90 312-3940132<br>' +
        'Attn: Utku CIRIK<br>' +
        '<strong><i class="fas fa-tools"></i> Authorized Service Center</strong><br>' +
        '<p><a class="link" href="mailto:ucirik@cfu.com.tr?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="https://www.cfu.com.tr" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Ukraine
    [
      '<div class="map-text">' +
        '<span>BAV Corporation / Uniprom LLC</span><br>' +
        '<hr>' +
        '+380 44 501 6000<br>' +
        'Attn: Oleksandr Volyanyk<br>' +
        '<p><a class="link" href="mailto:uniprom@uniprom.com.ua?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://bavcompany.ru" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // United Arab Emirates
    [
      '<div class="map-text">' +
        '<span>Burgan Equipment Co.</span><br>' +
        '<hr>' +
        '+971-4-2724759<br>' +
        'Attn: Ajith Kumar<br>' +
        '<p><a class="link" href="mailto:burganequipmentdubai@burganequipment.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="https://www.burganequipment.com" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // United Kingdom
    [
      '<div class="map-text">' +
        '<span>JR Technical Services UK Ltd</span><br>' +
        '<hr>' +
        '+44-0191-461-1103<br>' +
        'Attn: Callum Brady<br>' +
        '<strong><i class="fas fa-tools"></i> Authorized Service Center</strong><br>' +
        '<p><a class="link" href="mailto:callum@jrts.co.uk?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.jrts.co.uk" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Uzbekistan (CIS)
    [
      '<div class="map-text">' +
        '<span>BAV Corporation / Uneedus Group LLP</span><br>' +
        '<hr>' +
        '+7 771 808 88 88<br>' +
        'Attn: Nadzhot Kholikov<br>' +
        '<p><a class="link" href="mailto:uneedusgroup@gmail.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://bavcompany.ru" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],

    // Vietnam
    [
      '<div class="map-text">' +
        '<span>Nishio Rent All Co., Ltd</span><br>' +
        '<hr>' +
        '+816-6241-0240<br>' +
        'Attn: Yukihiro Kimura<br>' +
        '<p><a class="link" href="mailto:yukihiro.kimura@nishio-rent.co.jp?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
        '<p class="mt-0"><a class="link" href="http://www.nishio-rent.co.jp" target="_blank"><i class="fab fa-chrome"></i> Visit Website</a></p>' +
        '</div>',
    ],
  ];

  // Display multiple markers on a map
  var infoWindow = new google.maps.InfoWindow(),
    marker,
    i;

  // Loop through our array of markers & place each one on the map
  for (i = 0; i < markers.length; i++) {
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
