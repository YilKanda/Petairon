
$(document).ready(function() {
	var elements;
	var valencies;
	var random_elements;
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
	var elements_length;

	$.ajax({
		type: "GET",
		url: "http://localhost:3000/properties",
		success: function(response){elements=response; elements_length = elements.length; fillLegend},
		error: function(response){alert("Success: Elements error")},
		dataType: "json"
	});


	$.ajax({
		type: "GET",
		url: "http://localhost:3000/valencies",
		success: function(response){valencies=response},
		error: function(response){alert("Success: Valencies error")},
		dataType: "json"
	});
	
	$.ajax({
		type: "GET",
		url: "http://localhost:3000/game",
		success: function(response){random_elements=response; random_elements_length=random_elements.length},
		error: function(response){alert("Success: Random Elements error")},
		dataType: "json"
	});

	// Mostrar vista de cada boton

	var url = window.location.href;
	if (url=='http://localhost:3000/elements'){
		console.log($('#elements-properties').next('ul').attr('class'));
		$('#elements-properties').next('ul').removeClass("none-display");
		$('#elements-properties').next('ul').addClass("on-display");
		$('.caret-down > i').addClass('fa-caret-up');
	}
	
	$('.caret-down > i').on('click', function(){
		$('#elements-properties').next('ul').fadeToggle();
		$(this).toggleClass('fa-caret-up');
		$(this).toggleClass('fa-caret-down');
	})

	// Mostrar funcionalidad de los botones del menú		
	$(".property-button").on("click", function(){
		var $property = $(this).val();
		$('#categories-legend').css('visibility', 'hidden');		
		$('#mass-molecule').css('visibility', 'hidden');
		for(var i = 0; i < elements_length; i++ ) {
			$('#element'+i).css('opacity', '1');
			$("#element"+ i +"-property").text(elements[i][$property]);
			if ($property == 'state') {
				elementState(i, $property, 293);
			} else if ($property == 'valencies'){
				fillInitLegend($(this));
				elementValencies(i, $property);
			} else if ($property) {
				fillInitLegend($(this));
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
	}).on('mouseup', function(){
	    $(this).off('mousemove');
	});


	function moveSlider(e){
	    e.preventDefault();

	    var pos = $(e.currentTarget).offset(), 
	    	posX = e.pageX - pos.left,   
	    	value = Math.round((posX-0.12493896484375)*6019/$(e.currentTarget).outerWidth());
	    if(posX >= 0 && posX <= $(e.currentTarget).outerWidth()){
	    	console.log(posX)
	        $('.slider > .progress').css('width', posX+'px');
	        $('.slider > .indicator').css('left', posX+'px');
	        $('#temperature-val').text(value);
	        for(var i = 0; i < elements_length; i++ ) {
				$('#element'+i).css('opacity', '1');
				elementState(i, 'state', value);
			}
	  }
	}

	//choose elements by category 

	$(".button-category").on("click", function(){
		var $category = $(this).attr('data-category'),
				metalsOrNot = [],
				$generalCategory = $(this).attr('data-metal-category'),
				lengthCategories = $('td[data-metal-category="'+$generalCategory+'"]').length;

		for (var i=0; i<lengthCategories; i++) {
			metalsOrNot = metalsOrNot.concat($('td[data-metal-category="'+$generalCategory+'"]').eq(i).attr('data-category'));	
		}
		var length = metalsOrNot.length;

		for(var k = 0; k < elements_length; k++ ) {
			$('#element'+k).css('opacity', '0.3');
			$('.button-category').css('opacity', '0.3');
			if ($(this).attr('data-general')){
				$('td[data-metal-category="'+$generalCategory+'"]').css('opacity', '1');
				console.log($('td[data-metal-category="'+$generalCategory+'"]').css('opacity', '1'));
				for (var j=0; j<length; j++){
					checkCategory(k, metalsOrNot[j],$generalCategory);
				}
			} else {
				$('td[data-category="'+$category+'"]').css('opacity', '1');
				checkCategory(k,$category);
			}
		}
	})

	$(".button-category").on("mouseleave", function(){
		$('.border-element').css('opacity', '1');
		$('.button-category').css('opacity', '1');
		$('.elementoids').css('opacity', '0.6');
	});

	function checkCategory(k,category,generalCategory){
		if (category == elements[k]['category']){
			$('#element'+k).css('opacity', '1');
			$('.elementoids').css('opacity', '0.3');
		}	
	}

	//grupos y periodos

	$('.border-element').on('mouseover', function(){
			$('.group').css('background', '#F0F0F0');
			$('.group').css('border-bottom', '8px solid #F0F0F0');
			$('.period').css('border-right', '8px solid #F0F0F0');
			var i = $(this).attr('id').replace('element','');
			var group = elements[i].group; 
			var period = elements[i].period; 
			if ((i >= 56 && i <= 70) || (i >= 88 && i <= 102)){
				period += 2;
			} 
			$('#group'+group).css('border-bottom', '8px solid green');
			$('#period'+period).css('border-right', '8px solid green');
			$(this).css('-webkit-box-shadow', 'inset 0px 0px 7px 7px rgba(0,0,0,0.3)');
			$(this).css('-moz-box-shadow', 'inset 0px 0px 7px 7px rgba(0,0,0,0.3)');
			$(this).css('box-shadow', 'inset 0px 0px 7px 7px rgba(0,0,0,0.3)');		
	})

	$('.border-element').on('mouseleave', function(){
		$('.group').css('border-bottom', '8px solid #F0F0F0');
		$('.group').css('background', '#F0F0F0');
		$('.period').css('border-right', '8px solid #F0F0F0');
		$(this).css('box-shadow', 'none');
	})	

//pulsar un periodo entero
	$('.period').on("mouseover", function(){
		$('.period').css('border-right', '8px solid #F0F0F0');
		$('.elementoids').css('opacity', '0.3');
		var $period = $(this).attr('data-period');
		$('[data-period="'+$period+'"]').css('border-right', '8px solid green');
		$('.elementoids').css('border-right', 'none');
		console.log($period);
		for (var i=0; i < elements_length; i++) {
			if (elements[i].period == $period){
				$('#element'+i).css('opacity', '1');
				$('#elementoids'+$period).css('opacity', '1');
			} else {
				$('#element'+i).css('opacity', '0.3');
			}
		}
	})

	$('.period').on('mouseleave', function(){
		$('.border-element').css('opacity', '1');
		$('.period').css('border-right', '8px solid #F0F0F0');
		$('.elementoids').css('opacity', '0.6');
		propertyEmpty();
	})

//pulsar un grupo entero
	$('.group').on("mouseover", function(){
		$('.elementoids').css('opacity', '0.3');
		$('.group').css('background', '#F0F0F0');
		$('.group').css('border-bottom', '8px solid #F0F0F0');
		$(this).css('border-bottom', '8px solid green');
		var $group= $(this).text();
		for (var i=0; i < elements_length; i++) {
			if (elements[i].group == $group){
				$('#element'+i).css('opacity', '1');
			} else {
				$('#element'+i).css('opacity', '0.3');
			}
		}
	})

	$('.group').on('mouseleave', function(){
		$('.border-element').css('opacity', '1');		
		$('.group').css('background', '#F0F0F0');
		$('.group').css('border-bottom', '8px solid #F0F0F0');
		$('.elementoids').css('opacity', '0.6');
		propertyEmpty();
	})

	function propertyEmpty(){
		for (var i=0; i<elements_length; i++){
			if ($('#element'+i+'-property').text()==''){
				$('#element'+i).css('opacity', '0.6');
			}
		}
	}

//rellenar el cuadro del atomo en la leyenda
	function fillLegend(){
		$('.border-element').on("click", function(){
			var i = $(this).attr('id').replace('element','');
			var $property = $("#element"+i+"-property").text();
			$('#atomic-number').text(elements[i].atomic_number);
			$('#legend-property').text($property);
			$('#atomic-short').text(elements[i].short_name);
			$('#elect-configuration').html(element_configuration(elements[i].electron_configuration));
			$('#atomic-name').text(elements[i].long_name);
			var $color = $(this).css('background-color');
			$('#box-legend').css('background-color', $color);
		});
	}

	function fillInitLegend(button){
		$('#second-legend').css('visibility', 'hidden');
		$('#first-state-legend').css('visibility', 'hidden');
		$('#box-legend').css('visibility', 'visible');
		var $property = $(button).attr('subname');
		$('#atomic-number').text("Z");
		$('#legend-property').text($property);
		$('#atomic-short').text('Symbol');
		$('#elect-configuration').text('Configuration');
		$('#atomic-name').text('Name');
		$('#box-legend').css('background-color', '#D8D8D8');
	}

	//Función para las valencias
	function elementValencies(i, property){
		$('#second-legend').css('visibility', 'hidden');
		$('#first-state-legend').css('visibility', 'hidden');
		$('#box-legend').css('visibility', 'visible');
		$('#element'+i).css('opacity', '1');
		$("#element"+ i +"-property").text(valencies[i]);
		$('#element'+i).css('background-color', '#FFCC00');
		if (valencies[i] == ""){
			$('#element'+i).css('opacity', '0.6');
		}
	}

	//Función para detectar el estado de agregación de los elementos
	function elementState(i, property, temperature) {
		$('#second-legend').css('visibility', 'visible');
		$('#first-state-legend').css('visibility', 'visible');
		$('#box-legend').css('visibility', 'hidden');
		$("#element"+ i +"-property").text('');
		$('#legend-property').text(' ');
		if (!elements[i]['melting_point'] && !elements[i]['boiling_point']){ //unknown
			//console.log(elements[i].short_name,'Unknown');
			$('#element'+i).css('background-color', '#D8D8D8');
			$('#element'+i).css('opacity', '0.6');
		} else if (elements[i]['melting_point'] > temperature ){ //solid
			$('#element'+i).css('background-color', '#FF3366');
			$('#element'+i+'-property').text('Solid');
		} else if (elements[i]['melting_point'] < temperature && elements[i]['boiling_point'] > temperature) { //liquid
			$('#element'+i).css('background-color', '#33FFFF');
			$('#element'+i+'-property').text('Liquid');
		} else if (elements[i]['boiling_point'] > temperature) { //liquid
			$('#element'+i).css('background-color', '#33FFFF');
			$('#element'+i+'-property').text('Liquid');
		} else {
			$('#element'+i).css('background-color', '#99FF33');//gas
			$('#element'+i+'-property').text('Gas');
		} 	
	}

	// Variation of color depends of the property
	function colorVariation(index, property) {
		var init = color[property][0];
		var ending = color[property][1];
		var colors = [];
		if (property != 'mass') {
			colors = propertyColors(property);
			var length = colors.length;
			if (elements[index][property] || elements[index][property]==0){
				for (var i=(length-1); i>=0; i--) {
					var margen1 = init + ((ending - init)/length) * (i);
					var margen2 = init + ((ending - init)/length) * (i+1);
					if (elements[index][property] >= margen1 && elements[index][property] <= margen2) {
						$('#element'+index).css('background-color', colors[i]);
					}
				}
			} else {
				//console.log(elements[index].short_name,'Unknown');
				$("#element"+ index +"-property").text('');
				$('#element'+index).css('background-color', '#D8D8D8');
				$('#element'+index).css('opacity', '0.6');
			}
		} else {
			var i = elements[index]['category'];
			var colors;
			for (var k=0; k<10; k++){
				colors =  colors.concat($('td[data-category="'+k+'"]').css('background-color')) 
			}
			$('#element'+index).css('background-color', colors[i]);
			$('#categories-legend').css('visibility', 'visible');
		}
	}

	// Colors used to the different properties
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


	//funcion para escribir la configuracion electronica		
	function element_configuration(element_electron_configuration){
		
	  if (element_electron_configuration) {
	    var elec_config_element = element_electron_configuration,
	    		length = elec_config_element.length-1,
	    		new_conf = elec_config_element.split(''),
	    		if_need_sup = false,
	    		new_conf_pos = 0;

	    for (var k=0; k < length; k++) {
	      
	      if ( (elec_config_element[k] == 's' || elec_config_element[k] == 'p') && parseInt(elec_config_element[k+1]) < 10 ) {
	        new_conf[new_conf_pos+1] = '<sup>'+elec_config_element[k+1]+'</sup>';

	      } else if (elec_config_element[k] == 'd' && parseInt(elec_config_element[k+1]) < 10 && elec_config_element[k+2] == '0' ) {
	        new_conf[new_conf_pos+1] = '<sup>'+ elec_config_element[k+1];
	        new_conf[new_conf_pos+2] = elec_config_element[k+2] +'</sup>';

	      } else if (elec_config_element[k] == 'd' && parseInt(elec_config_element[k+1]) < 10) {
	        new_conf[new_conf_pos+1] = '<sup>'+elec_config_element[k+1] +'</sup>';

	      } else if (elec_config_element[k] == 'f' && parseInt(elec_config_element[k+1]) < 10 && parseInt(elec_config_element[k+2]) < 5) {
	        new_conf[new_conf_pos+1] = '<sup>'+elec_config_element[k+1];
	        new_conf[new_conf_pos+2] = elec_config_element[k+2] +'</sup>';
	     
	      } else if (elec_config_element[k] == 'f' && parseInt(elec_config_element[k+1]) < 10) {
	        new_conf[new_conf_pos+1] = '<sup>'+elec_config_element[k+1] +'</sup>';

	      } else {
	        '';
	      } 
	      new_conf_pos += 1;
	    }
	    return new_conf.join('');	  		
	  }	else {
	  	return '';
	  }
	}

});
