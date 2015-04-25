$(document).ready(function() {

	var bulletController = new BulletController();
	view = new View();
	var timeOfLastRequest = new Date();

	var randomVictor = function(){
		return new Victor(Math.random() - 0.5, Math.random() - 0.5);
	};

	setInterval(function(){

		$.ajax({
		  url: "/tweets",
		  method: "POST",
		  dataType: "json",
		  data: {timeOfLastRequest: timeOfLastRequest.getTime() }
		}).done(function(data) {

		  timeOfLastRequest = new Date(data.time);
		  for(var i=0; i < data.count; i++){

		  	var bigVictor = new Victor(Math.random(), Math.random());
		  	bigVictor.x *= 1000;
		  	bigVictor.y *= 1000;
			bulletController.shootBullet(bigVictor, randomVictor());
		  }
		});	

	}, 1000);

});
