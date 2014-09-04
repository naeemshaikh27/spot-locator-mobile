
/* initialize #map when page page oneis initialised
*/

var ajaxUrl="http://nodejs123-spotlocator.rhcloud.com";
$(document).delegate('#pageone.ui-page', 'pageshow', function () {
    //Your code for each page load here
    initialize();
    $("#searchMap").trigger("click");	
    $(document).undelegate('#pageone.ui-page', 'pageshow');
    $(document).delegate('#pageone.ui-page', 'pageshow', function () {
   
    $("#searchMap").trigger("click");	
  
});
});



// function sends request to delete the code
function triggerdelete(thisvar){
	
	 confirmDialog("Are you sure?", function(){
       
		// make ajax call to delete the location
		var obj = JSON.parse(localStorage.getItem("username"));
		uname=obj.uname;
		pass=obj.password;
		$.ajax({
				type: "POST",
				url:ajaxUrl+"/delete",
				data: { 'uname': uname,
						'code':$(thisvar).attr("data-code")
						
						 },
				dataType: "json",
			success:function(result)
			{	
				if(result.status)
				{
					
					
						$("#MyPlaces .ui-content ul").find("li[data-code="+$(thisvar).attr("data-code")+"]").remove();
						alert("code is deleted successfully");
						// reload the page
						
							
				}
				else{
					alert("server could not complete your request");
				}
				
			},
			error:function(e)
			{
				alert("error="+e.status);
			}
	});
		
});
		
}



// function sends request to search the clicked code on the list the code
function triggersearch(thisvar){
	
	    // $(thisvar).attr("data-code")
		//$("#searchMap")
			
			$("#End").val($(thisvar).attr("data-code"));
			window.location.href="#pageone";	
			
			//$("#searchMap").trigger("click");		
}




// function sends request to edit the clicked code on the list the code
function triggeredit(thisvar){
	
	    // $(thisvar).attr("data-code")
		//$("#searchMap")
		valOfEdit=$(thisvar).attr("data-code");
			window.location.href="#edit_location";	
			
				//alert("under construction");
		
			
		

		
}




$(document).delegate('#MyPlaces.ui-page', 'pageshow', function () {
    //Your code for each page load here
   	var obj = JSON.parse(localStorage.getItem("username"));
		uname=obj.uname;
		pass=obj.password;
	
	$.ajax({
				type: "POST",
				url:ajaxUrl+"/places",
				data: { 'uname': uname,
						'password': pass
						 },
				dataType: "json",
			success:function(result)
			{	
				if(result.status)
				{
						$("#MyPlaces .ui-content ul").empty();
						  $("#MyPlaces .ui-content ul").listview("refresh");
						//$("#MyPlaces .ui-content").append('<ul data-role="listview" data-inset="true"></ul>');
							
						//alert("data got result.rows[0].name="+result.data[0].name);
						
						result.data.forEach(function(row,index)
						{
							console.log(row.name);
							$("#MyPlaces .ui-content ul").append("<li data-code="+row.code+"><a href='#'> <h2>"+row.name+" (code : "+row.code+")</h2> <p> Info : "+row.description+" </p><button data-code="+row.code+" onclick='triggeredit(this)' class='ui-btn ui-btn-inline' class='updatelink'>Edit</button><button data-code="+row.code+" onclick='triggerdelete(this)'   data-transition='fade'  class='ui-btn ui-btn-inline' class='deletelink'>Delete</button></a> <a href='#' onclick='triggersearch(this)' data-code="+row.code+">Some Text</a></li>");
							
						});
						
						
						  $("#MyPlaces .ui-content ul").listview("refresh");
						   
						
							
				}
				else{
					$("#MyPlaces .ui-content ul").empty();
					alert("No data found");
				}
				
			},
			error:function(e)
			{
				alert("error="+e.status);
			}
	});
 
});


$(function()
{
			
					
		$(window).resize(function(){
			setHeight();
		});
		
		
		
		$(".myplacesLink").click(function(){
			if(localStorage.getItem("username"))
	{
	
//	initialize2();
		window.location.href="#MyPlaces";
	}
		
	else
		window.location.href="#login_page";
		});
		
		
		$(".addLoc_link").click(checkForLoggedUser);
		
		
		
// forgot password
$("#forgot-btn").click(function(e){
		e.preventDefault();
	
	$.ajax({
				type: "POST",
				url:ajaxUrl+"/forgot",
				data: { 'uname': $("#ForgotEmail").val()
						
						 },
				dataType: "json",
			success:function(result)
			{	
				if(result.status)
				{
					
					
						
						alert("your password is sent to your registered email id");
						window.location.href="#login_page";		
				}
				else{
					alert("No Such User Exist");
				}
				
			},
			error:function(e)
			{
				alert("error="+e.status);
			}
	});
	
});


// login password validation
	$("#confirm_password").on("change",validatePassword);

/* sign in ajax call */
$("#sign_in-btn").click(function(e){
	
	e.preventDefault();
	
	$.ajax({
				type: "POST",
				url:ajaxUrl+"/signup",
				data: { 'uname': $("#email_id").val(),
						'password': $("#passwd").val(),
						'name': $("#fullname").val(),
						'mobile': $("#mob_no").val()
						 },
				dataType: "json",
			success:function(result)
			{	
				if(result.status)
				{
					alert("signup successful");
					localStorage.setItem("username",JSON.stringify(
							{
								uname:$("#email_id").val(),
								password:$("#passwd").val()
							})
							);
					
						window.location.href="#pageone";		
				}
				else{
					alert("sign up failed");
				}
				
			},
			error:function(e)
			{
				alert("error="+e.status);
			}
	});
	
	
	
});

/* login ajax call */
$("#login-btn").click(function(e){
	e.preventDefault();
	
	$.ajax({
				type: "POST",
				url:ajaxUrl+"/login",
				data: { 'uname': $("#username").val(),
						'password': $("#password").val()
						 },
				dataType: "json",
			success:function(result)
			{	
				if(result.status)
				{
					
					
						localStorage.setItem("username",JSON.stringify(
							{
								uname:$("#username").val(),
								password:$("#password").val()
							})
							);
						window.location.href="#pageone";		
				}
				else{
					alert("login failed");
				}
				
			},
			error:function(e)
			{
				alert("error="+e.status);
			}
	});
	
});
		
		
});



// password validation
function validatePassword()
{
	var passwd,con_passwd;
	passwd=$("#passwd").val();
	con_passwd=$("#confirm_password").val();
	if(passwd!=con_passwd)
	{
		document.getElementById("confirm_password").setCustomValidity("Passwords Don't Match");
	}
	else
		document.getElementById("confirm_password").setCustomValidity("");
}



// login redirect
function checkForLoggedUser() {
	
	if(localStorage.getItem("username"))
	{
	
//	initialize2();
		window.location.href="#add_location";
	}
		
	else
		window.location.href="#login_page";
		
}




function setHeight(){
	$("#map").height($(window).height()-($(".header").height()+$("#searchForm").height()+55));
	
}


function initialize(){
	setHeight();
	var lat=18.5203,lon=73.8567;
	var GeoLoccount=0;
	var watchID ;
	searchCount=0;
	search=false;
	MyPos=null;
	DestPos=null;
/*
 * 
 // functions for getting current position from device continously
 
	function onSuccess(position) {
								    var element = document.getElementById('geolocation');
								    element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
								                        'Longitude: ' + position.coords.longitude     + '<br />' +
								                        '<hr />'      + element.innerHTML;
								                        lat= position.coords.latitude;
								                        lon= position.coords.longitude;
								                        if(GeoLoccount!=0)
								                        {
								                        	 MyPos.setPosition( new google.maps.LatLng(lat,lon));
								                        	drawRoute();
								                        }
								  						
				   
				   
								}

// onError Callback receives a PositionError object
	function onError(error) {
							    alert('code: '    + error.code    + '\n' +
							          'message: ' + error.message + '\n');
							}

// Options: throw an error if no update is received every 30 seconds.
watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });
	
	
	*/
	var directionsDisplay;
	var directionsService = new google.maps.DirectionsService();
	 directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
	 var mapOptions = {
          center:new google.maps.LatLng(lat,lon),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
          
      
      
      
      /* 
       * if the travel mode is changed then redraw the map
       */
      
       $('input[name="travelMode"]').change(function(){
       	
       	if(search)
       	{
       			//$("#searchMap").trigger("click");
       			drawRoute();
       	}
       
       });
      
      /*
	 * on click of the search option make an ajax request and then show user position and the code position received from ajax
	 */
	$("#searchMap").click(function(e){
		
		
		
		if($("#End").val().length!=0)
		{
			if(searchCount>0 && MyPos && DestPos)
			{
				MyPos.setMap(null);
				DestPos.setMap(null);
				
			}
			searchCount++;
			if(watchID){
						navigator.geolocation.clearWatch(watchID);
						
						}
			
			$.ajax({
				type: "POST",
				url:ajaxUrl+"/products",
				data: { 'name': $("#End").val() },
				dataType: "json",
			success:function(result)
			{			
				
				if(result.status){
					
				 if(directionsDisplay != null) { 
  					 directionsDisplay.setMap(null);
  						 }
				
					// set the user position first
					 MyPos = new google.maps.Marker({
	         	    animation: google.maps.Animation.DROP,
	                position: new google.maps.LatLng(lat,lon),
	                draggable:true,
	                map: map, 
	                title:"My Location"
				    });// marker MyPos set to user position


					// set the destination marker				
				 	DestPos = new google.maps.Marker({            	
	         	    animation: google.maps.Animation.DROP,	           	            	
	                position: new google.maps.LatLng(result.lat,result.lon),
	                map: map, 
	                title:result.code+" : "+result.name
				    });// marker DestPos set to user position
				    
				    // draw route on the map
				    infoWindow=null;
				infoWindow = new google.maps.InfoWindow({
               					 content: "<div>code:"+result.code+"</div><div>name:"+result.name+"</div><div>"+result.description+"</div>"
            					});
				 infoWindow.open(map, DestPos);
				
				    DestLoc=result;
				  drawRoute();
				  GeoLoccount=1;
				    google.maps.event.addListener(MyPos, 'dragend', redraw);         
					search=true;					    
				   }else{
				   	 if(directionsDisplay != null) { 
					   directionsDisplay.setMap(null);
					   }
				   	alert("no matches found");
				   } 
				    
			},
			
			error:function(e)
			{
				 if(directionsDisplay != null) { 
  					 directionsDisplay.setMap(null);
  						 }
					alert("error="+e.status);
			}
					 });
			
			
			
		}
		else{
			
			alert("Please provide Code");
		}
	
		
	});
      
      
        // draw route on map
				    function drawRoute(){
				    	 travelMode = $('input[name="travelMode"]:checked').val();
				    	  directionsDisplay.setMap(map);
				    	 var request = {
						      origin: new google.maps.LatLng(lat,lon),
						      destination:new google.maps.LatLng(DestLoc.lat,DestLoc.lon),
						      // Note that Javascript allows us to access the constant
						      // using square brackets and a string value as its
						      // "property."
						       unitSystem: google.maps.UnitSystem.IMPERIAL,
  								  travelMode: google.maps.DirectionsTravelMode[travelMode]
						  };
						  directionsService.route(request, function(response, status) {
						    if (status == google.maps.DirectionsStatus.OK) {
						      directionsDisplay.setDirections(response);
						    }
						  });
				    }
				    
				    
				    
				    // function to be deleted afterwards
				    function redraw(e){
				    	
				//   alert(this.position.B);
				if(watchID){
						navigator.geolocation.clearWatch(watchID);
						
						}
				   lon=this.position.B;
				   lat=this.position.k;
				   drawRoute();
				   
				    }
       
            
}/* initialize function end */


