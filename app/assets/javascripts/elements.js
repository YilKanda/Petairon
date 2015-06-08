
$(document).ready(function() {

	var elements;
	var k;
	var color =  {
				mass: [0,9],
				melting_point: [0,4000],
				boiling_point: [0,6000],
				radium: [20,300],
				abundance: [0,76],
				ionization_energy: [300,2400],
				electronegativity: [0,4],
				electron_affinity: [0,350]
			};; 


	$.ajax({
		type: "GET",
		url: "http://localhost:3000/properties",
		success: function(response){elements=response},
		error: function(response){alert("Success: false")},
		dataType: "json"
	});

	$(".property-button").on("click", function(){
		var $property = $(this).val();
		for(var i = 0; i < elements.length; i++ ) {
			$('#element'+ i).css('opacity', '1');
			$("#element"+ i +"-property").text(elements[i][$property]);
			if ($property != 'state') {
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
		if (!elements[i]['melting_point'] && !elements[i]['boiling_point']){
			console.log(elements[i].short_name,'Unknown');
			$('#element'+i).css('background-color', '#D8D8D8');
			$('#element'+i).css('opacity', '0.5');
		} else if (elements[i]['melting_point'] > 293 ){ //solid
			$('#element'+i).css('background-color', '#FF3366');
		} else if (elements[i]['melting_point'] < 293 && elements[i]['boiling_point'] > 293) { //liquid
			$('#element'+i).css('background-color', '#33FFFF');
		} else {
			$('#element'+i).css('background-color', '#99FF33');
		} 	
	}

	function colorVariation(index, property) {
		var init = color[property][0];
		var ending = color[property][1];
		var colors = [];
		if (property != 'mass') {
			for (var n=12; n>0; n--){
				k = n*18;
				var property_color = {
					melting_point: 'rgb(' + k + ',' + 225 + ',' + 225 + ')',
					boiling_point: 'rgb(' + 225 + ',' + 225 + ',' + k + ')',
					radium: 'rgb(' + 225 + ',' + k + ',' + 100 + ')',
					abundance: 'rgb(' + k + ',' + 100 + ',' + 225 + ')',
					ionization_energy: 'rgb(' + k + ',' + 225 + ',' + 0 + ')',
					electronegativity: 'rgb(' + 225 + ',' + 0 + ',' + k + ')',
					electron_affinity: 'rgb(' + 0 + ',' + 225 + ',' + k + ')'
				};
				var color_rgb = property_color[property];
				colors = colors.concat(color_rgb);
			}
			var length = colors.length;
			if (!elements[index][property]){
				console.log(elements[index].short_name,'Unknown');
				$("#element"+ index +"-property").text('');
				$('#element'+index).css('background-color', '#D8D8D8');
				$('#element'+index).css('opacity', '0.5');
			} else {
				for (var i=(length-1); i>=0; i--) {
					var margen1 = init + ((ending - init)/length) * (i);
					var margen2 = init + ((ending - init)/length) * (i+1);
					if (elements[index][property] >= margen1 && elements[index][property] <= margen2) {
						$('#element'+index).css('background-color', colors[i]);
					}
				}
			}
		} else {
			var i = elements[index]['category'];
			var colors = ['#99CC00','#00CCFF','#FF00FF','#FFCC00','#990099','#FF6600','#FF0066','#00CC66','#9966FF','#FFCC66'];
			$('#element'+index).css('background-color', colors[i]);
		}

	}

});
