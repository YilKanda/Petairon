
$(document).ready(function() {

	var elements;
	var color =  {
				mass: [0,9],
				melting_point: [0,4000],
				boiling_point: [0,6000],
				radium: [20,300],
				abundance: [0,76],
				ionization_energy: [300,2400],
				electronegativity: [0,4],
				electron_affinity: [0,350]
			};


	$.ajax({
		type: "GET",
		url: "http://localhost:3000/properties",
		success: function(response){elements=response; fillLegend()},
		error: function(response){alert("Success: false")},
		dataType: "json"
	});

	// Mostrar funcionalidad de los botones del menú		
	$(".property-button").on("click", function(){
		var $property = $(this).val();
		for(var i = 0; i < elements.length; i++ ) {
			$('#element'+i).css('opacity', '1');
			$("#element"+ i +"-property").text(elements[i][$property]);
			if ($property == 'state') {
				$('#second-legend').css('visibility', 'visible');
				elementState(i, $property, 293);
				$("#element"+ i +"-property").text('');
			} else if ($property != 'state') {
				colorVariation(i, $property);
			} else {
				$("#element"+ i +"-property").text(' ');
			}
		}
	});

	// Mostrar funcionalidad del slider para el cambio de la temperatura
	$('.slider').on('mousedown', function(e){
	    	moveSlider(e);
	    	$(this).on('mousemove', function(e){
	        	moveSlider(e);
	    	});
	    });

	}).on('mouseup', function(){
	    $(this).off('mousemove');
	});

	function moveSlider(e){
	    e.preventDefault();

	    var pos = $(e.currentTarget).offset(), 
	    	posX = e.pageX - pos.left,   
	    	value = Math.round((posX)*6000/$(e.currentTarget).outerWidth());

	    	console.log(value);
	    if(posX >= 0 && posX <= $(e.currentTarget).outerWidth()){
	        $('.slider > .progress').css('width', posX+'px');
	        $('.slider > .indicator').css('left', posX+'px');
	        console.log(value);
	        $('#temperature-val').text(value);
	        for(var i = 0; i < elements.length; i++ ) {
				$('#element'+i).css('opacity', '1');
				elementState(i, 'state', value);
				$("#element"+ i +"-property").text('');
			}
	    }
	}

	function fillLegend(){
		$('.border-element').on("click", function(){
			var i = $(this).attr('id').replace('element','');
			var $property = $("#element"+i+"-property").text();
			$('#atomic-number').text(elements[i].atomic_number);
			$('#legend-property').text($property);
			$('#atomic-short').text(elements[i].short_name);
			$('#elect-configuration').text(elements[i].electron_configuration);
			$('#atomic-name').text(elements[i].long_name);
			var $color = $(this).css('background-color');
			console.log($color)
			$('#box-legend').css('background-color', $color);
		});	
	}


	function elementState(i, property, temperature) {
		$("#element"+ i +"-property").text(property);
		$('#legend-property').text(' ');
		if (!elements[i]['melting_point'] && !elements[i]['boiling_point']){
			//console.log(elements[i].short_name,'Unknown');
			$('#element'+i).css('background-color', '#D8D8D8');
			$('#element'+i).css('opacity', '0.5');
		} else if (elements[i]['melting_point'] > temperature ){ //solid
			$('#element'+i).css('background-color', '#FF3366');
		} else if (elements[i]['melting_point'] < temperature && elements[i]['boiling_point'] > 293) { //liquid
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
			colors = propertyColors(property);
			var length = colors.length;
			if (!elements[index][property]){
				//console.log(elements[index].short_name,'Unknown');
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

	function propertyColors(property) {
		var i;
		var colors = [];
		for (var n=12; n>0; n--){
			i = n*18;
			var property_color = {
				melting_point: 'rgb(' + i + ',' + 225 + ',' + 225 + ')',
				boiling_point: 'rgb(' + 225 + ',' + 225 + ',' + i + ')',
				radium: 'rgb(' + 225 + ',' + i + ',' + 100 + ')',
				abundance: 'rgb(' + i + ',' + 100 + ',' + 225 + ')',
				ionization_energy: 'rgb(' + i + ',' + 225 + ',' + 0 + ')',
				electronegativity: 'rgb(' + 225 + ',' + 0 + ',' + i + ')',
				electron_affinity: 'rgb(' + 0 + ',' + 225 + ',' + i + ')'
			};
			var color_rgb = property_color[property];
			colors = colors.concat(color_rgb);
		}
		return colors;
	}

});
