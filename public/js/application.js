$(document).ready(function() {
	$.ajax({
	  url: "/tweets",
	  method: "POST",
	  data: {time: new Date().getTime()}
	}).done(function(data) {
	  console.log(data);
	});

});
