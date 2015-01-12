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


        console.log(ds.columnNames());
        addMarker();






      },
      error: function() {
        console.log("Are you sure you are connected to the internet?");
      }
    });


    function addMarker() {
      var myLatlng = new google.maps.LatLng(28.6100 + i / 1, 77.2300);
      var contentString = 'Hello';
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
