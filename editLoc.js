// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.
var ajaxUrledit="http://nodejs123-spotlocator.rhcloud.com";

$(function(){
	
	// input2 assigned only once after the doc is ready otherwise shows null
	input2 = document.getElementById('pac-input2');
 
	
});
 
// k=lat, B=lon
var markerEditLoc;
function initialize3() {


$("#SubmitEditLoc").click(function(e){
	if(markerEditLoc)
	{

	//	e.preventDefault();
		$.mobile.loading('show');
		//alert(markerEditLoc.position.B);
		var obj = JSON.parse(localStorage.getItem("username"));
		uname=obj.uname;
		pass=obj.password;
			$.ajax({
				type: "POST",
				url:ajaxUrledit+"/editLoc",
				data: { 'uname': uname,
						'password': pass,
						lat:markerEditLoc.position.k,
						lon:markerEditLoc.position.B,
						code:valOfEdit,
						name:$("#editLocName").val(),
						description:$("#editLocDesc").val()
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
					alert("edit Location Failed ");
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
  var map = new google.maps.Map(document.getElementById('map-canvasedit'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

 var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(0, 0),
      new google.maps.LatLng(0, 0));
  map.fitBounds(defaultBounds);

// code for setting lat lon of the marker by default

	$.ajax({
				type: "POST",
				url:ajaxUrl+"/products",
				data: { 'name': valOfEdit },
				dataType: "json",
			success:function(result)
			{			
				
				if(result.status){

				//map.setCenter(new google.maps.LatLng(result.lat,result.lon));
					// set the destination marker				
				 	markerEditLoc = new google.maps.Marker({            	
	         	    animation: google.maps.Animation.DROP,	           	            	
	                position: new google.maps.LatLng(result.lat,result.lon),
	                map: map, 
	                title:result.code+" : "+result.name,
	                 draggable:true
				    });// marker DestPos set to user position
				  defaultBounds = new google.maps.LatLngBounds(
				      new google.maps.LatLng(result.lat-1,result.lon-1),
				      new google.maps.LatLng(result.lat+1,result.lon+1));
				  map.fitBounds(defaultBounds);
				    // draw route on the map
				    infoWindow2=null;
				infoWindow2 = new google.maps.InfoWindow({
               					 content: "<div>code:"+result.code+"</div><div>name:"+result.name+"</div><div>"+result.description+"</div>"
            					});
				 infoWindow2.open(map, markerEditLoc);
				
				   $("#editLocName").val(result.name);
				     $("#editLocDesc").val(result.description);
				   
				 
				 
				   					    
				   }else{
				   	 
				   	alert("failed");
				   } 
				    
			},
			
			error:function(e)
			{
					alert("error="+e.status);
			}
					 });// ajax finished







 




  // Create the search box and link it to the UI element.
 
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input2);
 
  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input2));
 
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
  if ( markerEditLoc ) {
    markerEditLoc.setPosition(location);
  } else {
    markerEditLoc = new google.maps.Marker({
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
$(document).delegate('#edit_location.ui-page', 'pageshow', function () {
    //Your code for each page load here

    initialize3();
  // remove deligate once it has initialized the map
    
});
//google.maps.event.addDomListener(window, 'load', initialize3);



