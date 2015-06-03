
$(document).ready(function() {

	var elements;

	$.ajax({
		type: "GET",
		url: "http://localhost:3000/elements",
		success: function(response){elements = response},
		error: function(response){alert("Success: false")},
		dataType: "json"
	});



	$("#mass").on("click", function(){
		for(var i = 0; i < elements.length; i++ ) {
			console.log(i, elements[i].mass)
			if (elements[i].mass != null)
				$("#element"+ (i+1) +"-property").text(elements[i].mass);
			else 
				$("#element"+ (i+1) +"-property").text(' ');
		}
	});

	$("#boiling-point").on("click", function(){
		for(var i = 0; i < elements.length; i++ ) {
			console.log(i, elements[i].boiling_point)
			if (elements[i].boiling_point != null)
				$("#element"+ (i+1) +"-property").text(elements[i].boiling_point);
			else 
				$("#element"+ (i+1) +"-property").text(' ');
		}
	});

});
