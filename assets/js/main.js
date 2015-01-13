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
      console.log(tcenter);
      var myLatlng = new google.maps.LatLng(tcenter.Latitude, tcenter.Longitude);


      function contentString() {
        var content
        for (var key in tcenter) {
          content+= '<dt>' + key + '</dt><dd>' + tcenter[key] + '</dd>' ;
        }
        return content
      }


      var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h3>' + tcenter['PIA name'] + '</h3>' +
        '<dl class="dl-horizontal">' + contentString() +  '</dl>' +
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
