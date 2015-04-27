$(document).ready(function() {

	var pusher = new Pusher('5b4f1c48a82316e19ac4');
	var channel = pusher.subscribe('tweets_channel');

	channel.bind('tweet_event', function(data) {
		console.log(data);
	});

});
