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
    // Overalapping marker Assign
    var oms = new OverlappingMarkerSpiderfier(map);

    oms.addListener('click', function(marker, event) {
      infowindow.setContent(marker.content);
      infowindow.open(map, marker);
    });

    oms.addListener('spiderfy', function(markers) {
      infowindow.close();
    });


    var ds = new Miso.Dataset({
      importer: Miso.Dataset.Importers.GoogleSpreadsheet,
      parser: Miso.Dataset.Parsers.GoogleSpreadsheet,
      key: "1ucbsCdlLWjIy2gfUIiMHje5cJY7qlxHVkSsRfellqhY",
      worksheet: "1"
    });

    ds.fetch({
      success: function() {
        this.each(function(row) {
          loadMarker(row);
        });
      },
      error: function() {
        console.log("Are you sure you are connected to the internet?");
      }
    });


    function loadMarker(tcenter) {
      var myLatlng = new google.maps.LatLng(tcenter.Latitude, tcenter.Longitude);

      function contentString() {
        var content = '';
        for (var key in tcenter) {
          content += '<dt>' + key + '</dt><dd>' + tcenter[key] + '</dd>';
        }
        return content
      }
      var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h3>' + tcenter['PIA name'] + '</h3>' +
        '<dl class="dl-horizontal">' + contentString() + '</dl>' +
        '</div>' +
        '</div>';


      // Add Markers
      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        animation: google.maps.Animation.DROP,
        content: contentString

      });
      oms.addMarker(marker);

    }




  } // initialize
var map = google.maps.event.addDomListener(window, 'load', initialize);







// jQuery(document).ready(function($) {
//   var oms;

//   var MarkerData = {
//     "lat": 0,
//     "lng": 0,
//     "data": "Overlay text here."
//   };

//   $('#selector').gmap3({
//     action: 'init',
//     options: {
//       scaleControl: false,
//       center: [52.132633, 5.291266],
//       zoom: 7,
//       mapTypeControl: false,
//       mapTypeId: google.maps.MapTypeId.ROADMAP
//     },
//     callback: function(map) {
//       oms = new OverlappingMarkerSpiderfier(map, {
//         markersWontMove: true,
//         markersWontHide: true,
//         keepSpiderfied: true,
//         nearbyDistance: 10,
//         legWeight: 5
//       });
//     }
//   }, {
//     action: 'addMarkers',
//     markers: MarkerData,
//     marker: {
//       options: {
//         icon: new google.maps.MarkerImage('http://www.example.com/icon.png')
//       }
//     },
//     callback: function(markers) {
//       $.each(markers, function(i, marker) {
//         marker.data = MarkerData[i].data;

//         oms.addMarker(marker);
//       });
//     }
//   });

//   oms.addListener('click', function(marker) {
//     $('#selector').gmap3({
//       action: 'clear',
//       name: 'overlay'
//     }, {
//       action: 'addOverlay',
//       latLng: marker.getPosition(),
//       content: '<div class="map-overlay">' + marker.data + '</div>',
//       offset: {
//         x: -30,
//         y: 0
//       }
//     }, {
//       action: 'panTo',
//       args: [marker.position]
//     });
//   });
// });
