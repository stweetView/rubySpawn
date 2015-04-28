$(document).ready(function() {

	var map, pointarray, heatmap, locations = [] ;
	var geocoder = new google.maps.Geocoder();

	var pusher = new Pusher('5b4f1c48a82316e19ac4');
	var channel = pusher.subscribe('tweets_channel');

	channel.bind('tweet_object_event', function(data){
		geocode(data);
	})

	function geocode(address){
		geocoder.geocode({address: address}, function(results, status){
			if (status == google.maps.GeocoderStatus.OK) {
				var loc = results[0].geometry.location
				addCoordsToMap(loc.lat(),loc.lng());
			}
		})
	}

	channel.bind('tweet_event', function(data) {
		addCoordsToMap(data.coordinates[0], data.coordinates[1])
	});

	function addCoordsToMap(lat, lng){
		locations.push(new google.maps.LatLng(lat,lng));
		fillMap(locations);
	}

  initialize();

  function fillMap(locations){
  	var pointArray = new google.maps.MVCArray(locations);
  	heatmap.setData(pointArray);
  }

	function initialize() {
	  var mapOptions = {
	    zoom: 1,
	    center: new google.maps.LatLng(37.774546, -122.433523),
	    mapTypeId: google.maps.MapTypeId.SATELLITE
	  };

	  map = new google.maps.Map(document.getElementById('map-canvas'),
	      mapOptions);

	  var pointArray = new google.maps.MVCArray(locations);

	  heatmap = new google.maps.visualization.HeatmapLayer({
	    data: pointArray
	  });

	  heatmap.setMap(map);

	}
});
