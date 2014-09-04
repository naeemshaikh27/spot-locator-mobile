// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.
var ajaxUrlAdd="http://nodejs123-spotlocator.rhcloud.com";
// k=lat, B=lon
var markerAddLoc;
function initialize2() {


$("#SubmitLoc").click(function(e){
	if(markerAddLoc)
	{

	//	e.preventDefault();
		$.mobile.loading('show');
		//alert(markerAddLoc.position.B);
		var obj = JSON.parse(localStorage.getItem("username"));
		uname=obj.uname;
		pass=obj.password;
			$.ajax({
				type: "POST",
				url:ajaxUrlAdd+"/addLoc",
				data: { 'uname': uname,
						'password': pass,
						lat:markerAddLoc.position.k,
						lon:markerAddLoc.position.B,
						name:$("#AddLocName").val(),
						description:$("#AddLocDesc").val()
						 },
				dataType: "json",
			success:function(result)
			{	
					$.mobile.loading('hide');
				if(result.status)
				{
					
						alert("code : "+result.code);
				}
				else{
					alert("Add Location Failed ");
				}
				
			},
			error:function(e)
			{
					$.mobile.loading('hide');
				alert("error="+e.status);
			}
		});
		
		
		
	}else
	{
		alert('please add marker on the desired location');
	}
	
});
  var markers = [];
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-33.8902, 151.1759),
      new google.maps.LatLng(-33.8474, 151.2631));
  map.fitBounds(defaultBounds);

  // Create the search box and link it to the UI element.
  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  });

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });
  
  
  

function placeMarker(location) {
  if ( markerAddLoc ) {
    markerAddLoc.setPosition(location);
  } else {
    markerAddLoc = new google.maps.Marker({
      position: location,
      map: map,
      draggable:true
    });
  }
}

google.maps.event.addListener(map, 'click', function(event) {
 placeMarker(event.latLng);
 
});
  
}

/* initialize canvas when page add location is initialised
*/
$(document).delegate('#add_location.ui-page', 'pageshow', function () {
    //Your code for each page load here

    initialize2();
  // remove deligate once it has initialized the map
    $(document).undelegate('#add_location.ui-page', 'pageshow');
});
//google.maps.event.addDomListener(window, 'load', initialize2);



