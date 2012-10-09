
function parseVenueSearch(data) {
	console.log(data);
}

//Venue Search
$('#venue_form').submit(function() {
	var data = {};
	var error =  false;

	//Precedence for venue_name over dropdown
	var venue = $("#venue_name").val();
	if(!venue) {
		venue = $("#venue_drop").val();
		if(!venue) {
			error = true;
		}
	}
	data.query = venue;

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
//	data.radius = radius;
	}

	if(!error) {
		var my_url = window.location.host;
		var crawler_url = my_url + "/search_venue";

		$.ajax({
			url : crawler_url,
			type : 'GET',
			//dataType: 'json',
			data : data,
			success: function(resp) {
				//Set up the Table
				//$(#results).html(header);
			
				console.log(resp);

				parseVenueSearch(resp);
			},
			error: function(ignore, textStatus, errorThrown) {
							 console.log(ignore);
				$('#results').html('<div class="span12">Error! ' + textStatus + '\n' + errorThrown + '</div>');
			}
		});
	}
	return false;
});
