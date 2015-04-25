$(document).ready(function() {

	var bulletController = new BulletController();
	view = new View();

	$.ajax({
	  url: "/tweets",
	  method: "POST",
	  data: {time: new Date().getTime()}
	}).done(function(data) {
	  console.log(data);
	});

	var randomVictor = function(){
		return new Victor(Math.random(), Math.random())
	};

	setInterval(function(){
		bulletController.shootBullet(randomVictor().multiply(1000), randomVictor())
	}, 300);

});
