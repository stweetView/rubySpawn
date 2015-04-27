$(document).ready(function() {

	var bulletController = new BulletController();
	view = new View();


	var randomVictor = function(){
		return new Victor(Math.random() - 0.5, Math.random() - 0.5);
	};

	var randomRuby = function(){
		var bigVictor = new Victor(Math.random(), Math.random());
		bigVictor.x *= 1000;
		bigVictor.y *= 1000;
		bulletController.shootBullet(bigVictor, randomVictor());
	};

	var randomDeathStar = function(){
		var bigVictor = new Victor(Math.random(), Math.random());
		bigVictor.x *= 1000;
		bigVictor.y *= 1000;
		bulletController.shootBullet(bigVictor, randomVictor());
	};

	var pusher = new Pusher('5b4f1c48a82316e19ac4');
	var channel = pusher.subscribe('rubySpawn_channel');

	channel.bind('ruby_event', function(data) {
		randomRuby();
	});

	channel.bind('deathstar_event', function(data) {
		randomDeathStar();
	});


});
