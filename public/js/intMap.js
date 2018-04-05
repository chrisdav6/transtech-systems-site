// Asynchronously Load the map API 
var script = document.createElement('script');
script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDR1jfc2YdMOMcAaDG_rkMhzpv-vvW7LVg&callback=initMap";
document.body.appendChild(script);


function initMap() {
  var map;

  var mapOptions = {
    center: {
    	lat: 28.711,
    	lng: 17.234
    },
    zoom: 3,
    mapTypeId: 'roadmap'
  };
                  
  // Display a map on the page
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  
  // Map Marker Locations
  var markers = [
    ['M/s. Taisei International , Afghanistan', 34.234306,66.209291],
    ['Beratest AG , Algeria', 29.343875,2.109375],
		['Perta , Angola', -12.554564,17.182617],
		['Mertind , Argentina', -33.550655,-63.950483],
		['Bav Corporation, Inc. , Armenia', 40.455307,44.653931],
		['Motorway Technologies , Australia', -24.367114,133.769531],
		['TransTech Europe , Austria', 47.554287,14.512939],
		['Bav Corporation, Inc. , Azerbaijan', 40.33817,48.054199],
		['M/s. Taisei International , Bangladesh', 23.980712,90.091666],
		['Bav Corporation, Inc. , Belarus', 53.520717,28.355713],
		['ASINTRA , Belgium', 50.840636,4.482422],
		['Beratest AG , Benin', 10.00131,2.285156],
		['Mertind , Bolivia', -17.555479,-63.395588],
		['Solotest , Brazil', -9.795678,-49.833984],
		['TransTech Europe (Gepasz) , Bulgaria', 42.646081,25.081787],
		['Beratest AG , Burkina Faso', 12.415119,-1.669922],
		['Beratest AG , Cameroun', 5.441022,12.678223],
		['Hoskin Scientific , British Columbia', 49.259067,-123.11245],
		['Hoskin Scientific , Quebec', 45.520301,-73.55484],
		['Hoskin Scientific , Ontario', 43.239599,-79.796287],
		['Hoskin Scientific , Alberta', 51.380788,-114.974718],
		['Equipos de Auscultacion , Chile', -26.824071,-70.224609],
		['Earth Products China Limited  , China', 34.597042,103.974609],
		['Beratest AG , Congo', -0.329588,15.864258],
		['Atlantic Supply , Costa Rica', 9.903910,-83.841379],
		['Beratest AG , Côte d’Ivoire', 7.700105,-5.646973],
		['TransTech Europe , Czech Republic', 49.894324,15.097526],
		['ABAS AS , Denmark', 55.507024,9.698619],
		['Imporequip , Ecuador', -1.428075,-78.574219],
		['Bincis UAB , Estonia', 58.867745,25.559692],
		['ABAS , Finland', 63.312683,26.894531],
		['Grollemund Laboroutes , France', 46.754917,2.39502],
		['Beratest AG , Gabon', -0.659165,11.469727],
		['TransTech Europe , Germany', 51.220647,10.524902],
		['Beratest AG , Guinée', 10.941192,-10.678711],
		['Beratest AG , Guinée-Bissau', 12.084982,-14.902954],
		['TransTech Europe (Wirtgen Budapest Kft.) , Hungary', 47.171044,19.215088],
		['ABAS AS , Iceland', 64.883646,-18.549413],
		['M/s. Taisei International , India', 22.755921,79.40918],
		['PT Panairsan Pratama , Indonesia', -4.367027,121.966030],
		['CFU International Trade & Services , Iraq', 32.850776,42.844469],
		['JR Technical Services , Ireland', 53.362026,-8.006287],
		['Nishio Rent All Co., Ltd. , Japan', 35.871247,138.295898],
		['Bav Corporation, Inc. , Kazakhstan', 48.224673,66.796875],
		['Sam Jun Scientific Co., Ltd. , Korea', 36.615528,127.902832],
		['Bav Corporation, Inc. , Kyrgyzstan', 41.533254,74.476318],
		['Bincis UAB , Latvia', 56.932987,25.010376],
		['Bincis UAB , Lithuania', 55.463285,23.917236],
		['MS Instruments (SEA) Sdn Bhd , Malaysia', 4.19303,102.172852],
		['Beratest AG , Mali', 17.874203,-1.560059],
		['Beratest AG , Maroc', 32.444885,-6.009521],
		['Beratest AG , Mauritanie', 20.179724,-9.689941],
		['Atlantic Supply , Mexico', 24.44715,-102.271729],
		['Bav Corporation, Inc. , Moldova', 47.323931,28.674316],
		['M/s. Taisei International , Nepal', 28.157900,83.895047],
		['Asintra , Netherlands', 52.173932,5.734863],
		['Motorway Technologies , New Zealand', -42.763146,172.177734],
		['Beratest AG , Niger', 17.497389,9.777832],
		['ABAS AS , Norway', 61.143235,9.228516],
		['M/s. Taisei International , Oman', 20.306682,56.007590],
		['M/s. Taisei International , Pakistan', 29.618773,69.265330],
		['Atlantic Supply , Panama', 8.504292,-81.456683],
		['Siccion Marketing , Philippines', 12.533115,123.046875],
		['Toropol, Ltd. , Poland', 52.456009,19.02832],
		['Proeti, S.A. , Portugal', 39.740986,-8.4375],
		['Intermodal Services Co. W.L.L. , Qatar', 25.304304,51.212769],
		['Beratest AG  , République Centrafricaine', 6.850078,20.566406],
		['Bav Corporation, Inc.  , Russia', 63.074866,93.339844],
		['Beratest AG  , Sénégal', 14.743011,-14.72168],
		['Nishio Rent All Co., Ltd.  , Singapore', 1.364922,103.815994],
		['TransTech Europe (Celab d.o.o.)  , Slovenia', 46.029389,14.655762],
		['Proeti, S.A.  , Spain', 40.413496,-3.603516],
		['M/s. Taisei International , Sri Lanka', 7.8775394,80.7003428],
		['ABAS  , Sweden', 64.052978,16.875],
		['Beratest AG , Switzerland', 46.991494,8.234253],
		['Bav Corporation, Inc. , Tajikistan', 38.882481,70.817871],
		['Beratest AG , Tchad', 14.98724,18.896484],
		['Asia Testing Equipment Co., Ltd. , Thailand', 15.961329,100.722656],
		['PT Panairsan Pratama , Timor Leste', -8.762791,125.898373],
		['Beratest AG , Togo', 8.439772,1.07666],
		['Beratest AG , Tunisie', 34.343436,9.349365],
		['Bav Corporation, Inc. , Turkmenistan', 39.571822,59.040527],
		['CFU International Trade & Services , Turkey', 39.164141,35.046387],
		['Bav Corporation, Inc. , Ukraine', 49.009051,31.618652],
		['JR Technical Services , United Kindom', 54.393352,-2.06543],
		['Bav Corporation, Inc. , Uzbekistan', 42.016652,63.457031],
		['Nishio Rent All Co., Ltd. , Vietnam', 13.20786,108.511963]
  ];


  // Info Window Content
  var infoWindowContent = [
		// Afghanistan
    [
	    '<div class="map-text">' +
	    '<span>M/s. Taisei International</span><br>' +
	    '<hr>' +
	    'H - 84, PLOT: 1421<br>' +
	    '13th Main Road<br>' +
	    'ANNANAGAR, CHENNAI - 40<br>' +
	    '91-044-26162877<br>' +
	    'Attn: G. Parasuranam<br>' +
	    '<p><a class="link" href="mailto:g.parasuraman@yahoo.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Algeria
    [
	    '<div class="map-text">' +
	    '<span>Beratest AG</span><br>' +
	    '<hr>' +
	    'Finkenweg 7<br>' +
	    'CH-5036 Oberentfelden, Switzerland<br>' +
	    '+41-62-723-42-23<br>' +
	    'Attn: Max Gysin<br>' +
	    '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Angola
    [
	    '<div class="map-text">' +
	    '<span>Perta</span><br>' +
	    '<hr>' +
	    'Rua Jaime Lopes Dias, n° 3 A/B<br>' +
	    '1750-124 Lisbon Portugal<br>' +
	    '+351-21-752-05-60<br>' +
	    'Attn: Paulo Frias Costa<br>' +
	    '<p><a class="link" href="mailto:pfcosta@perta.pt?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Argentina
    [
	    '<div class="map-text">' +
	    '<span>Mertind Ltda.</span><br>' +
	    '<hr>' +
	    '#410 Santa Cruz de la Sierra, Bolivia<br>' +
	    '+591-3-336-7676<br>' +
	    'Attn: Mauricio Lijeron Eguez<br>' +
	    '<p><a class="link" href="mailto:mauriciolijeron@mertind.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Armenia (CIS)
    [
	    '<div class="map-text">' +
	    '<span>Bav Corporation, Inc.</span><br>' +
	    '<hr>' +
	    '1600 Providence Highway, Suite 142<br>' +
	    'Walpole, MA 02081 USA<br>' +
	    '781-784-3095<br>' +
	    'Attn: Alexander Baranov<br>' +
	    '<p><a class="link" href="mailto:info@bavcorporation.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Australia
    [
	    '<div class="map-text">' +
	    '<span>Motorway Technologies</span><br>' +
	    '<hr>' +
	    '10 Beechwood Court<br>' +
	    'PO Box 75<br>' +
	    'Mernda Vic. 3754<br>' +
	    '+61-418-235-048<br>' +
	    'Attn: Adrian Rogers<br>' +
	    '<p><a class="link" href="mailto:bear.adrianrogers@gmail.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Austria
    [
	    '<div class="map-text">' +
	    '<span>TransTech Europe</span><br>' +
	    '<hr>' +
	    'Osterdiek 11<br>' +
	    'Oldenburg D-26125, Germany<br>' +
	    '+49-441-3501227<br>' +
	    'Attn: Bernd Diedrichs<br>' +
	    '<p><a class="link" href="mailto:bernd.diedrichs@ewetel.net?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Azerbaijan (CIS)
    [
	    '<div class="map-text">' +
	    '<span>Bav Corporation, Inc.</span><br>' +
	    '<hr>' +
	    '1600 Providence Highway, Suite 142<br>' +
	    'Walpole, MA 02081 USA<br>' +
	    '781-784-3095<br>' +
	    'Attn: Alexander Baranov<br>' +
	    '<p><a class="link" href="mailto:info@bavcorporation.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Bangladesh
    [
	    '<div class="map-text">' +
	    '<span>M/s. Taisei International</span><br>' +
	    '<hr>' +
	    'H - 84, PLOT: 1421<br>' +
	    '13th Main Road<br>' +
	    'ANNANAGAR, CHENNAI - 40<br>' +
	    '91-044-26162877<br>' +
	    'Attn: G. Parasuranam<br>' +
	    '<p><a class="link" href="mailto:g.parasuraman@yahoo.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Belarus
    [
	    '<div class="map-text">' +
	    '<span>Bav Corporation, Inc.</span><br>' +
	    '<hr>' +
	    '1600 Providence Highway, Suite 142<br>' +
	    'Walpole, MA 02081 USA<br>' +
	    '781-784-3095<br>' +
	    'Attn: Alexander Baranov<br>' +
	    '<p><a class="link" href="mailto:info@bavcorporation.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Belgium
    [
	    '<div class="map-text">' +
	    '<span>Asintra</span><br>' +
	    '<hr>' +
	    'Postbus 2059<br>' +
	    '7301 DB Apeldoorn<br>' +
	    'Nederland<br>' +
	    '+31-(0)620248145<br>' +
	    'Attn: Joop Mennink<br>' +
	    '<p><a class="link" href="mailto:info@asintra.eu?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Benin
    [
	    '<div class="map-text">' +
	    '<span>Beratest AG</span><br>' +
	    '<hr>' +
	    'Finkenweg 7<br>' +
	    'CH-5036 Oberentfelden, Switzerland<br>' +
	    '+41-62-723-42-23<br>' +
	    'Attn: Max Gysin<br>' +
	    '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Bolivia
    [
	    '<div class="map-text">' +
	    '<span>Mertind Ltda.</span><br>' +
	    '<hr>' +
	    '#410 Santa Cruz de la Sierra, Bolivia<br>' +
	    '+591-3-336-7676<br>' +
	    'Attn: Mauricio Lijeron Eguez<br>' +
	    '<p><a class="link" href="mailto:mauriciolijeron@mertind.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Brazil
    [
	    '<div class="map-text">' +
	    '<span>Solotest</span><br>' +
	    '<hr>' +
	    'Mecânica do Solo Ltda,<br>' +
	    'Rua Conselheiro Carrão, 275<br>' +
	    'Bela Vista. CEP 01328-000<br>' +
	    'São Paulo – SP Brazil<br>' +
	    '+5511-3289-0211<br>' +
	    'Attn: Rodrigo Barella<br>' +
	    '<p><a class="link" href="mailto:rodrigobarella@gmail.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Bulgaria
    [
	    '<div class="map-text">' +
	    '<span>TransTech Europe (Gepasz)</span><br>' +
	    '<hr>' +
	    'Osterdiek 11<br>' +
	    'Oldenburg D-26125, Germany<br>' +
	    '+49-441-3501227<br>' +
	    'Attn: Bernd Diedrichs<br>' +
	    '<p><a class="link" href="mailto:bernd.diedrichs@ewetel.net?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Burkina Faso
    [
	    '<div class="map-text">' +
	    '<span>Beratest AG</span><br>' +
	    '<hr>' +
	    'Finkenweg 7<br>' +
	    'CH-5036 Oberentfelden, Switzerland<br>' +
	    '+41-62-723-42-23<br>' +
	    'Attn: Max Gysin<br>' +
	    '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Cameroun
    [
	    '<div class="map-text">' +
	    '<span>Beratest AG</span><br>' +
	    '<hr>' +
	    'Finkenweg 7<br>' +
	    'CH-5036 Oberentfelden, Switzerland<br>' +
	    '+41-62-723-42-23<br>' +
	    'Attn: Max Gysin<br>' +
	    '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Canada - British Columbia
    [
	    '<div class="map-text">' +
	    '<span>Hoskin Scientific</span><br>' +
	    '<hr>' +
	    '3735 Myrtle Street<br>' +
	    'Burnaby, BC V5C 4E7<br>' +
	    '604-872-7894<br>' +
	    'Attn: Jamie Emery<br>' +
	    '<p><a class="link" href="mailto:jemery@hoskin.ca?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Canada - Quebec
    [
	    '<div class="map-text">' +
	    '<span>Hoskin Scientific</span><br>' +
	    '<hr>' +
	    '300 Rue Stinson<br>' +
	    'Saint-Laurent, QC H4N 2E7<br>' +
	    '514-735-5267<br>' +
	    'Attn: Sylvain Paquette<br>' +
	    '<p><a class="link" href="mailto:spaquette@hoskin.ca?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Canada - Ontario
    [
	    '<div class="map-text">' +
	    '<span>Hoskin Scientific</span><br>' +
	    '<hr>' +
	    '4210 Morris Drive<br>' +
	    'Burlington, ON L7L 5L6<br>' +
	    '905-333-5510<br>' +
	    'Attn: Melanie Crossman<br>' +
	    '<p><a class="link" href="mailto:mcrossman@hoskin.ca?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Canada - Alberta
    [
	    '<div class="map-text">' +
	    '<span>Hoskin Scientific</span><br>' +
	    '<hr>' +
	    'Unit 100, 18138 105th Avenue<br>' +
	    'Edmonton, AB T5S 2T4<br>' +
	    '780-434-2645<br>' +
	    'Attn: Jamie Emery<br>' +
	    '<p><a class="link" href="mailto:jemery@hoskin.ca?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Chile
    [
	    '<div class="map-text">' +
	    '<span>Equipos de Auscultacion</span><br>' +
	    '<hr>' +
	    'Rey Alberto 4370, San Miguel<br>' +
	    'Santiago-8910299- Chile<br>' +
	    '+562-297-0720<br>' +
	    'Attn: Claudio Fuentes Lopez<br>' +
	    '<p><a class="link" href="mailto:claudio.fuentes.lopez@gmail.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// China
    [
	    '<div class="map-text">' +
	    '<span>Earth Products China Limited</span><br>' +
	    '<hr>' +
	    'Room 1205-06 Seapower Center<br>' +
	    '73-77 Lei Muk Road<br>' +
	    'Kwai Chung, Hong Kong<br>' +
	    '+852-2392-8698<br>' +
	    'Attn: Janet Lo<br>' +
	    '<p><a class="link" href="mailto:janet@epc.com.hk?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
    // CIS - No Map Location //
    
    // Congo
    [
	    '<div class="map-text">' +
	    '<span>Beratest AG</span><br>' +
	    '<hr>' +
	    'Finkenweg 7<br>' +
	    'CH-5036 Oberentfelden, Switzerland<br>' +
	    '+41-62-723-42-23<br>' +
	    'Attn: Max Gysin<br>' +
	    '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
    // Costa Rica
    [
	    '<div class="map-text">' +
	    '<span>Atlantic Supply</span><br>' +
	    '<hr>' +
	    '6462 125th. Ave. North<br>' +
	    'Largo, FL 33773-3601<br>' +
	    '727-530-9581<br>' +
	    'Attn: Carlos Licona<br>' +
	    '<p><a class="link" href="mailto:clicona@atlanticsupply.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
    // Côte d’Ivoire
    [
	    '<div class="map-text">' +
	    '<span>Beratest AG</span><br>' +
	    '<hr>' +
	    'Finkenweg 7<br>' +
	    'CH-5036 Oberentfelden, Switzerland<br>' +
	    '+41-62-723-42-23<br>' +
	    'Attn: Max Gysin<br>' +
	    '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Czech Republic
    [
	    '<div class="map-text">' +
	    '<span>TransTech Europe</span><br>' +
	    '<hr>' +
	    'Osterdiek 11<br>' +
	    'Oldenburg D-26125, Germany<br>' +
	    '+49-441-3501227<br>' +
	    'Attn: Bernd Diedrichs<br>' +
	    '<p><a class="link" href="mailto:bernd.diedrichs@ewetel.net?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Denmark
    [
	    '<div class="map-text">' +
	    '<span>ABAS AS</span><br>' +
	    '<hr>' +
	    'Postboks 51<br>' +
	    'N-3421 Lierskogen, Norway<br>' +
	    '+47 32 24 35 30<br>' +
	    'Attn: Geir Solberg<br>' +
	    '<p><a class="link" href="mailto:gsolberg@abas-as.no?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Ecuador
    [
	    '<div class="map-text">' +
	    '<span>Imporequip</span><br>' +
	    '<hr>' +
	    'De Los Madronos Y Lizarzaburo<br>' +
	    'Quito, Ecuador N47-305<br>' +
	    '+08-715-4550<br>' +
	    'Attn: Vladimir Rojas<br>' +
	    '<p><a class="link" href="mailto:ventas@imporequip.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Estonia
    [
	    '<div class="map-text">' +
	    '<span>Bincis UAB</span><br>' +
	    '<hr>' +
	    'Jonava LT-55200 Lietuva/Lithuania<br>' +
	    '+370-3497-8021<br>' +
	    'Attn: Edvinas Peleckas<br>' +
	    '<p><a class="link" href="mailto:bincis@bincis.lt?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Finland
    [
	    '<div class="map-text">' +
	    '<span>ABAS AS</span><br>' +
	    '<hr>' +
	    'Postboks 51<br>' +
	    'N-3421 Lierskogen, Norway<br>' +
	    '+47 32 24 35 30<br>' +
	    'Attn: Geir Solberg<br>' +
	    '<p><a class="link" href="mailto:gsolberg@abas-as.no?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// France
    [
	    '<div class="map-text">' +
	    '<span>Grollemund Laboroutes</span><br>' +
	    '<hr>' +
	    '16, cours A. Schoen<br>' +
	    '68 124 Logelbach France<br>' +
	    'N-3421 Lierskogen, Norway<br>' +
	    '+333-8927-1644<br>' +
	    'Attn: Michel Grollemund<br>' +
	    '<p><a class="link" href="mailto:michel@grollemund.net?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
    // Gabon
    [
	    '<div class="map-text">' +
	    '<span>Beratest AG</span><br>' +
	    '<hr>' +
	    'Finkenweg 7<br>' +
	    'CH-5036 Oberentfelden, Switzerland<br>' +
	    '+41-62-723-42-23<br>' +
	    'Attn: Max Gysin<br>' +
	    '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Germany
    [
	    '<div class="map-text">' +
	    '<span>TransTech Europe</span><br>' +
	    '<hr>' +
	    'Osterdiek 11<br>' +
	    'Oldenburg D-26125, Germany<br>' +
	    '+49-441-3501227<br>' +
	    'Attn: Bernd Diedrichs<br>' +
	    '<p><a class="link" href="mailto:bernd.diedrichs@ewetel.net?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
    // Guinée
    [
	    '<div class="map-text">' +
	    '<span>Beratest AG</span><br>' +
	    '<hr>' +
	    'Finkenweg 7<br>' +
	    'CH-5036 Oberentfelden, Switzerland<br>' +
	    '+41-62-723-42-23<br>' +
	    'Attn: Max Gysin<br>' +
	    '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
    // Guinée-Bissau
    [
	    '<div class="map-text">' +
	    '<span>Beratest AG</span><br>' +
	    '<hr>' +
	    'Finkenweg 7<br>' +
	    'CH-5036 Oberentfelden, Switzerland<br>' +
	    '+41-62-723-42-23<br>' +
	    'Attn: Max Gysin<br>' +
	    '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Hungary
    [
	    '<div class="map-text">' +
	    '<span>TransTech Europe (Wirtgen Budapest Kft.)</span><br>' +
	    '<hr>' +
	    'Osterdiek 11<br>' +
	    'Oldenburg D-26125, Germany<br>' +
	    '+49-441-3501227<br>' +
	    'Attn: Bernd Diedrichs<br>' +
	    '<p><a class="link" href="mailto:bernd.diedrichs@ewetel.net?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Iceland
    [
	    '<div class="map-text">' +
	    '<span>ABAS AS</span><br>' +
	    '<hr>' +
	    'Postboks 51<br>' +
	    'N-3421 Lierskogen, Norway<br>' +
	    '+47 32 24 35 30<br>' +
	    'Attn: Geir Solberg<br>' +
	    '<p><a class="link" href="mailto:gsolberg@abas-as.no?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// India
    [
	    '<div class="map-text">' +
	    '<span>M/s. Taisei International</span><br>' +
	    '<hr>' +
	    'H - 84, PLOT: 1421<br>' +
	    '13th Main Road<br>' +
	    'ANNANAGAR, CHENNAI - 40<br>' +
	    '91-044-26162877<br>' +
	    'Attn: G. Parasuranam<br>' +
	    '<p><a class="link" href="mailto:g.parasuraman@yahoo.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Indonesia
    [
	    '<div class="map-text">' +
	    '<span>PT Panairsan Pratama</span><br>' +
	    '<hr>' +
	    'Kedoya Elok Plaza Blok DB No. 23<br>' +
	    'Jl. Panjang, Kebon Jeruk Jakarta,<br>' +
	    'Barat 11520 Indonesia<br>' +
	    '+62-21-580-7881<br>' +
	    'Attn: Irsan Aditama<br>' +
	    '<p><a class="link" href="mailto:irsan@panairsan.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Iraq
    [
	    '<div class="map-text">' +
	    '<span>CFU Intl Trade & Services</span><br>' +
	    '<hr>' +
	    '100 Meters Road<br>' +
	    'Iraq, Kurdistan Region, Erbil<br>' +
	    '+964-750-464-9002<br>' +
	    'Attn: Ahmed Hamad<br>' +
	    '<p><a class="link" href="mailto:ahamad@cfu.com.tr?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Ireland
    [
	    '<div class="map-text">' +
	    '<span>JR Technical Services UK Ltd</span><br>' +
	    '<hr>' +
	    '9 Longniddry Court<br>' +
	    'Gateshead,<br>' +
	    'Tyne & Wear, NE9 6JX<br>' +
	    '+44-191-461-1103<br>' +
	    'Attn: Callum Brady<br>' +
	    '<p><a class="link" href="mailto:info@jrts.co.uk?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Japan
    [
	    '<div class="map-text">' +
	    '<span>Nishio Rent All Co., Ltd</span><br>' +
	    '<hr>' +
	    'No. 1-11-17, Higashi-shinsaibashi<br>' +
	    'Chuo-ku, Osaka 542-0083 Japan<br>' +
	    '+816-6241-0240<br>' +
	    'Attn: Yukihiro Kimura<br>' +
	    '<p><a class="link" href="mailto:yukihiro.kimura@nishio-rent.co.jp?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Kazakhstan (CIS)
    [
	    '<div class="map-text">' +
	    '<span>Bav Corporation, Inc.</span><br>' +
	    '<hr>' +
	    '1600 Providence Highway, Suite 142<br>' +
	    'Walpole, MA 02081 USA<br>' +
	    '781-784-3095<br>' +
	    'Attn: Alexander Baranov<br>' +
	    '<p><a class="link" href="mailto:info@bavcorporation.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Korea
    [
	    '<div class="map-text">' +
	    '<span>Sam Jun Scientific Co., Ltd</span><br>' +
	    '<hr>' +
	    'Room No. 237, LG Twin House, #192,<br>' +
	    'Gumi-Dong, Bundang-Gu<br>' +
	    'Seongnam-Si, Gyeonggi-Do 463-709 Korea<br>' +
	    '+82-(0)31-714-2555 ~ 6<br>' +
	    'Attn: Mr. Won-Yang Park<br>' +
	    '<p><a class="link" href="mailto:wypark@lycos.co.kr?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Kyrgyzstan (CIS)
    [
	    '<div class="map-text">' +
	    '<span>Bav Corporation, Inc.</span><br>' +
	    '<hr>' +
	    '1600 Providence Highway, Suite 142<br>' +
	    'Walpole, MA 02081 USA<br>' +
	    '781-784-3095<br>' +
	    'Attn: Alexander Baranov<br>' +
	    '<p><a class="link" href="mailto:info@bavcorporation.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Latvia
    [
	    '<div class="map-text">' +
	    '<span>Bincis UAB</span><br>' +
	    '<hr>' +
	    'Jonava LT-55200 Lietuva/Lithuania<br>' +
	    '+370-3497-8021<br>' +
	    'Attn: Edvinas Peleckas<br>' +
	    '<p><a class="link" href="mailto:bincis@bincis.lt?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Lithuania
    [
	    '<div class="map-text">' +
	    '<span>Bincis UAB</span><br>' +
	    '<hr>' +
	    'Jonava LT-55200 Lietuva/Lithuania<br>' +
	    '+370-3497-8021<br>' +
	    'Attn: Edvinas Peleckas<br>' +
	    '<p><a class="link" href="mailto:bincis@bincis.lt?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Malaysia
    [
	    '<div class="map-text">' +
	    '<span>MS Instruments (SEA) Sdn Bhd</span><br>' +
	    '<hr>' +
	    '52 Jalan USJ 9/5P, 47620 UEP Subang Jaya<br>' +
	    'Selangor, Malaysia<br>' +
	    '+603-802-41615<br>' +
	    'Attn: H.S. Yap<br>' +
	    '<p><a class="link" href="mailto:yhs@msisb.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
    // Mali
    [
	    '<div class="map-text">' +
	    '<span>Beratest AG</span><br>' +
	    '<hr>' +
	    'Finkenweg 7<br>' +
	    'CH-5036 Oberentfelden, Switzerland<br>' +
	    '+41-62-723-42-23<br>' +
	    'Attn: Max Gysin<br>' +
	    '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
    // Maroc
    [
	    '<div class="map-text">' +
	    '<span>Beratest AG</span><br>' +
	    '<hr>' +
	    'Finkenweg 7<br>' +
	    'CH-5036 Oberentfelden, Switzerland<br>' +
	    '+41-62-723-42-23<br>' +
	    'Attn: Max Gysin<br>' +
	    '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
    // Mauritanie
    [
	    '<div class="map-text">' +
	    '<span>Beratest AG</span><br>' +
	    '<hr>' +
	    'Finkenweg 7<br>' +
	    'CH-5036 Oberentfelden, Switzerland<br>' +
	    '+41-62-723-42-23<br>' +
	    'Attn: Max Gysin<br>' +
	    '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
    // Mexico
    [
	    '<div class="map-text">' +
	    '<span>Atlantic Supply</span><br>' +
	    '<hr>' +
	    '6462 125th. Ave. North<br>' +
	    'Largo, FL 33773-3601<br>' +
	    '727-530-9581<br>' +
	    'Attn: Carlos Licona<br>' +
	    '<p><a class="link" href="mailto:clicona@atlanticsupply.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Moldova (CIS)
    [
	    '<div class="map-text">' +
	    '<span>Bav Corporation, Inc.</span><br>' +
	    '<hr>' +
	    '1600 Providence Highway, Suite 142<br>' +
	    'Walpole, MA 02081 USA<br>' +
	    '781-784-3095<br>' +
	    'Attn: Alexander Baranov<br>' +
	    '<p><a class="link" href="mailto:info@bavcorporation.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Nepal
    [
	    '<div class="map-text">' +
	    '<span>M/s. Taisei International</span><br>' +
	    '<hr>' +
	    'H - 84, PLOT: 1421<br>' +
	    '13th Main Road<br>' +
	    'ANNANAGAR, CHENNAI - 40<br>' +
	    '91-044-26162877<br>' +
	    'Attn: G. Parasuranam<br>' +
	    '<p><a class="link" href="mailto:g.parasuraman@yahoo.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Netherlands
    [
	    '<div class="map-text">' +
	    '<span>Asintra</span><br>' +
	    '<hr>' +
	    'Postbus 2059<br>' +
	    '7301 DB Apeldoorn<br>' +
	    'Nederland<br>' +
	    '+31-(0)620248145<br>' +
	    'Attn: Joop Mennink<br>' +
	    '<p><a class="link" href="mailto:info@asintra.eu?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// New Zealand
    [
	    '<div class="map-text">' +
	    '<span>Motorway Technologies</span><br>' +
	    '<hr>' +
	    '10 Beechwood Court<br>' +
	    'PO Box 75<br>' +
	    'Mernda Vic. 3754<br>' +
	    '+61-418-235-048<br>' +
	    'Attn: Adrian Rogers<br>' +
	    '<p><a class="link" href="mailto:bear.adrianrogers@gmail.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
    // Niger
    [
	    '<div class="map-text">' +
	    '<span>Beratest AG</span><br>' +
	    '<hr>' +
	    'Finkenweg 7<br>' +
	    'CH-5036 Oberentfelden, Switzerland<br>' +
	    '+41-62-723-42-23<br>' +
	    'Attn: Max Gysin<br>' +
	    '<p><a class="link" href="mailto:info@beratest.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Norway
    [
	    '<div class="map-text">' +
	    '<span>ABAS AS</span><br>' +
	    '<hr>' +
	    'Postboks 51<br>' +
	    'N-3421 Lierskogen, Norway<br>' +
	    '+47 32 24 35 30<br>' +
	    'Attn: Geir Solberg<br>' +
	    '<p><a class="link" href="mailto:gsolberg@abas-as.no?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Oman
    [
	    '<div class="map-text">' +
	    '<span>M/s. Taisei International</span><br>' +
	    '<hr>' +
	    'H - 84, PLOT: 1421<br>' +
	    '13th Main Road<br>' +
	    'ANNANAGAR, CHENNAI - 40<br>' +
	    '91-044-26162877<br>' +
	    'Attn: G. Parasuranam<br>' +
	    '<p><a class="link" href="mailto:g.parasuraman@yahoo.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
		// Pakistan
    [
	    '<div class="map-text">' +
	    '<span>M/s. Taisei International</span><br>' +
	    '<hr>' +
	    'H - 84, PLOT: 1421<br>' +
	    '13th Main Road<br>' +
	    'ANNANAGAR, CHENNAI - 40<br>' +
	    '91-044-26162877<br>' +
	    'Attn: G. Parasuranam<br>' +
	    '<p><a class="link" href="mailto:g.parasuraman@yahoo.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
    
    // Panama
    [
	    '<div class="map-text">' +
	    '<span>Atlantic Supply</span><br>' +
	    '<hr>' +
	    '6462 125th. Ave. North<br>' +
	    'Largo, FL 33773-3601<br>' +
	    '727-530-9581<br>' +
	    'Attn: Carlos Licona<br>' +
	    '<p><a class="link" href="mailto:clicona@atlanticsupply.com?subject=Inquiry from TransTech Systems Website"><i class="fas fa-envelope"></i> Email</a></p>' +
	    '</div>'
    ],
  ];
        
 // Display multiple markers on a map
  var infoWindow = new google.maps.InfoWindow(), marker, i;
  
  // Loop through our array of markers & place each one on the map  
  for( i = 0; i < markers.length; i++ ) {
  	
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