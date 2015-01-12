function initialize() {

    // Assign varibales and options
    var mapOptions = {
      center: {
        lat: 21.0000,
        lng: 78.0000
      },
      zoom: 5
    };
    var infowindow = new google.maps.InfoWindow();
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);


    var ds = new Miso.Dataset({
      importer: Miso.Dataset.Importers.GoogleSpreadsheet,
      parser: Miso.Dataset.Parsers.GoogleSpreadsheet,
      key: "1ucbsCdlLWjIy2gfUIiMHje5cJY7qlxHVkSsRfellqhY",
      worksheet: "1"
    });

    ds.fetch({
      success: function() {
        this.each(function(row) {
          addMarker(row);
        });
      },
      error: function() {
        console.log("Are you sure you are connected to the internet?");
      }
    });


    function addMarker(tcenter) {
      console.log(tcenter.Latitude, tcenter.Longitude);
      var myLatlng = new google.maps.LatLng(tcenter.Latitude, tcenter.Longitude);
      var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h3> Training Centre ID: '+ tcenter['Training Centre ID'] +'</h3>' +
        '<div id="bodyContent">' +
        '<p><b>'+tcenter['State']+'</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
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
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.close();
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
      });
    }




  } // initialize
var map = google.maps.event.addDomListener(window, 'load', initialize);
