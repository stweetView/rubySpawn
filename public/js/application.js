$(document).ready(function() {

	var bulletController = new BulletController();
	view = new View();


	var randomVictor = function(){
		return new Victor(Math.random() - 0.5, Math.random() - 0.5);
	};

	var pusher = new Pusher('5b4f1c48a82316e19ac4');
	var channel = pusher.subscribe('ruby_channel');

	channel.bind('tweet_event', function(data) {
		var bigVictor = new Victor(Math.random(), Math.random());
		bigVictor.x *= 1000;
		bigVictor.y *= 1000;
		bulletController.shootBullet(bigVictor, randomVictor());
	});


});
