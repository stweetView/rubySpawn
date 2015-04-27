$(document).ready(function() {

	var map, pointarray, heatmap, locations = [] ;

	var pusher = new Pusher('5b4f1c48a82316e19ac4');
	var channel = pusher.subscribe('tweets_channel');

	channel.bind('tweet_event', function(data) {
		locations.push(new google.maps.LatLng(data.coordinates[0],data.coordinates[1]));
		fillMap(locations)
		console.log(data);
	});

  // $(document).click(initialize);
  initialize();

  function fillMap(locations){
  	var pointArray = new google.maps.MVCArray(locations);
  	heatmap.setData(pointArray);
  }

	function initialize() {
		console.log("in init");
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
	  console.log(heatmap);
	}
});
