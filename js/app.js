var crawler_url = "http://localhost:8080/search";

function parseData(data) {
	console.log(data);
}

$('#venue_form').submit(function() {
	var data = {};
	var error =  false;

	console.log("push");

	//Precedence for venue_name over dropdown
	var venue = $("#venue_name").val();
	if(!venue) {
		venue = $("#venue_drop").val();
		if(!venue) {
			error = true;
		}
	}
	data.venue = venue;

	//Precedence for near_name over lat/long
	var near = $("#near_name").val();
	var lat, lon;
	if(!near) { 
		lat = $("#lat").val();
		lon = $("#long").val();

		if(!lat || !lon) { 
			error = true;
		} else {
			data.lat = lat;
			data.lon = lon;
		}
	} else {
		data.near = near;
	}

	//Radius
	var radius = $("#radius");
	if(radius <= 0) {  
		error = true;
	} else {
		data.radius = radius;
	}

	if(!error) {

		$.ajax({
			'url' : crawler_url,
			'type' : 'GET',
			'data' : data
		}).done(function(resp) {
			parseData(resp);
		});
	}
	return false;
});
