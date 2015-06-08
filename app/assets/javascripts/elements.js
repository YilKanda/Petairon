
$(document).ready(function() {

	var elements;
	var color = {
		melting_point: [[0,4000],[]],
		boiling_point: [[0,6000],['#FFFFFF','#E6F5FA','#BFE6F2','#A6DBED','#99D6EB','#80CCE6','#59BDDE','#33ADD6','#26A8D4','#0099CC','#0066CC','#0033CC']],
		radium: [[],[]],
		abundance: [[0,76],[]],
		ionization_energy: [[300,2400],[]],
		electronegativity: [[0,4],[]],
		electron_affinity: [[0,350],[]],
	};


	$.ajax({
		type: "GET",
		url: "http://localhost:3000/properties",
		success: function(response){elements=response},
		error: function(response){alert("Success: false")},
		dataType: "json"
	});

	$(".property-button").on("click", function(){
		var $property = $(this).val()
		for(var i = 0; i < elements.length; i++ ) {
			if (elements[i][$property] && $property != 'state') {
				colorVariation(i, $property);
			} else if ($property == 'state') {
				elementState(i);
			} else {
				$("#element"+ i +"-property").text(' ');
			}
		}
	});

	function elementState(i) {
		$("#element"+ i +"-property").text(' ');
		if (elements[i]['melting_point'] == null && elements[i]['boiling_point'] == null){
			console.log(elements[i].short_name,'Unknown')
		} else if (elements[i]['melting_point'] > 293 ){ //solid
			$('#element'+i).css('background-color', '#FF3366');
		} else if (elements[i]['melting_point'] < 293 && elements[i]['boiling_point'] > 293) { //liquid
			$('#element'+i).css('background-color', '#33FFFF');
		} else {
			$('#element'+i).css('background-color', '#99FF33');
		} 	
	}

	function colorVariation(index, property) {
		$("#element"+ index +"-property").text(elements[index][property]);
		var length = color[property][1].length;
		var colors = color[property][1];
		var init = color[property][0][0];
		var ending = color[property][0][1];
		for (var i=(length-1); i>=0; i--) {
			var margen1 = init + ((ending - init)/length) * (i);
			var margen2 = init + ((ending - init)/length) * (i+1);
			if (elements[index][property] > margen1 && elements[index][property] < margen2)
				$('#element'+index).css('background-color', colors[i]);
		}

	}

});
