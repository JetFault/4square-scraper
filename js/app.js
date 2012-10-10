
//Venue Fetch
venue_fetch = function() {
	$('#crawl_form').submit(function() {
		var data = {};
		$("#venue_table input:checkbox").each(function() {
			if(this.checked) {
				data.ids_string = data.ids_string ? data.ids_string + "," + this.name : this.name;
			}
		});

		var my_url = 'http://' + window.location.host + '/quantarch';
		var crawler_url = my_url + "/submit_job";

		console.log(data);

		$.ajax({
			url : crawler_url,
			type : 'POST',
			data : data,
			success: function(data) {
				$('#results').html('<div class="span12">Processing. Visit ' + my_url + '/get_jobs_status' + '</div>');
			},
			error: function(ignore, textStatus, errorThrown) {
							 $('#results').html('<div class="span12">Error! ' + textStatus + errorThrown + '</div>');
						 }
		});

		return false;
	});
};

function parseVenueSearch(data) {
	
	venue_resp = data;

	for(var i = 0; i < venue_resp.length; i++) {
		var venue = venue_resp[i];
		$('#venue_table_body').append('<tr></tr>');
		var table_row = $('#venue_table_body tr:last');
		table_row.append('<td><input class="span1" type="checkbox" name="' + venue.id + '" ></td>');
		table_row.append('<td>' + venue.name  + '</td>');
		if(!venue.categories[0]) {
			venue.categories[0] = {shortName:null};
		}
		table_row.append('<td>' + venue.categories[0].shortName  + '</td>');
		table_row.append('<td>' + venue.stats.checkinsCount  + '</td>');
		table_row.append('<td>' + venue.stats.tipCount  + '</td>');
		table_row.append('<td>' + venue.likes.count  + '</td>');
	}

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
		//Set up the table
		$('#results').load('venue_search.html');

		var my_url = 'http://' + window.location.host + '/quantarch';
		var crawler_url = my_url + "/search_venue";

		$.ajax({
			url : crawler_url,
			type : 'GET',
			dataType: 'json',
			data : data,
			success: function(json) {
				parseVenueSearch(json);
				venue_fetch();
			},
			error: function(ignore, textStatus, errorThrown) {
							 console.log(ignore);
				$('#results').html('<div class="span12">Error! ' + textStatus + '\n' + errorThrown + '</div>');
			}
		});
	}
	return false;
});
