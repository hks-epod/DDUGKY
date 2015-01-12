function initialize() {

  var mapOptions = {
    center: {
      lat: 21.0000 ,
      lng: 78.0000
    },
    zoom: 5
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);



  var myLatlng = new google.maps.LatLng(28.6100, 77.2300);
  var data = {
    screen_name: "Ravi Suhag",
    text: "Here is the name"
  };
  var contentString = '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
    '<div id="bodyContent">' +
    '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    'sandstone rock formation in the southern part of the ' +
    'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
    'south west of the nearest large town, Alice Springs; 450&#160;km ' +
    '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
    'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
    'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
    'Aboriginal people of the area. It has many springs, waterholes, ' +
    'rock caves and ancient paintings. Uluru is listed as a World ' +
    'Heritage Site.</p>' +
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
    'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
    '(last visited June 22, 2009).</p>' +
    '</div>' +
    '</div>';

  // Add Markers
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    animation: google.maps.Animation.DROP,
    title: "Hello World!"
  });


  // Attach info window to marker

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
  });



}


var map = google.maps.event.addDomListener(window, 'load', initialize);
