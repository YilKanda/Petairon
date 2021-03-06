
$(document).ready(function() {
	var elements,
			valencies,
			randomElements,
			elementsLength,
			randomElementsLength,
			color =  {
				mass: [0,9],
				melting_point: [0,4000],
				boiling_point: [0,6000],
				radium: [20,300],
				abundance: [0,76],
				ionization_energy: [300,2400],
				electronegativity: [0,4],
				electron_affinity: [0,350]
			},
			properties = ['mass', 'state', 'melting_point', 'boiling_point', 
										'radium', 'abundance', 'ionization_energy', 'electronegativity',
										'electron_affinity', 'valencies'];

	$.fx.speeds['very-slow'] = 1000;

	$.ajax({
		type: "GET",
		url: "http://localhost:3000/properties",
		success: function(response){elements=response; elementsLength = elements.length },
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
	
	
	$('#successMessage').hide();
  $('#successMessage').css( {
    left: '580px',
    top: '250px',
    width: 0,
    height: 0
  } );

  //menu
  var url = window.location.href,
  		data = url.replace('http://localhost:3000/', '');
  if (url==('http://localhost:3000/'+data) ){
  	showSubmenu(url, data);
  }

  $('.home-button').on('click', function() {
  	var dataMenu = $(this).data('menu'),
  			valueMenu = $(this).data('value');
  			$('.message').hide();
  	if (url!=('http://localhost:3000/'+dataMenu)&& dataMenu!='user' ){
			window.location.href = ("http://localhost:3000/"+dataMenu);
		}
		if (url=='http://localhost:3000/game'){
			$('#successMessageLogin').show();
		} 
		showSubmenu(url, dataMenu, valueMenu);
  })

  $('.mode-button').on('click', function() {
  	var dataMenu = $(this).data('menu'),
  			valueMenu = $(this).data('value');
		showSubmenu(url, dataMenu, valueMenu);
  })


  function showSubmenu(url, data, value) {
		if (url == ('http://localhost:3000/'+data)) {
			$('#submenu-game'+value).toggle();
			$('#submenu-game'+value).siblings('ul').hide();
			if (value=="-mode"){
				$('#caret-down-'+data).toggleClass('fa-caret-up').toggleClass('fa-caret-down');
			}	
		} else if (data=='user'){
			$('#submenu-'+data).toggle();		
		}	
  }

	// game

		var correctElements = 0,
	  		failedElements = 0,
				puntuation=0,
				elementsDropped = [],
				level,
				gameMode;
  var currentSeconds,
  		currentMinutes,
  		secs,
  		checkTimer = false,
  		checkChronometer = false;

  //  game mode normal

	$('.game-level').on('click', function(){
		level = $(this).data('level');
		gameMode = 'Normal mode';
		checkChronometer = true;
		checkTimer = false;
		secs = 0;
		startTimer();
	})

		// game mode timer

	$('.start-game').on('click', function(){
		level = $(this).data('level'),
				mins = timeByLevel();
		gameMode = 'Timer mode';
		secs = mins*60;
		checkTimer = true;
		checkChronometer = false;
		startTimer();
	})


	function startTimer(){
		hideGameMenu();
		newGame();
		play();
		if (checkTimer){
			timer();
		} else if (checkChronometer) {
			chronometer();
		}
		//$('#successMessageTimer').show();
	}

	$('#finish-game').on('click', function(){
		gameOver();
	})

	function hideGameMenu(){
		$('.submenu-level').fadeOut('very-slow');
		$('.message').hide();
		$('.submenu').fadeOut('slow');
		$('#caret-down-game').toggleClass('fa-caret-up').toggleClass('fa-caret-down');
	}

	function chronometer(){
		currentMinutes = Math.floor(secs / 60);
    currentSeconds = secs % 60;
    currentSeconds = secondsLessThanTen();
		$('.timer').text(currentMinutes + ":" + currentSeconds); //Set the element id you need the time put into.
    secs+=1;
    if(checkChronometer) {
    	setTimeout(chronometer, 1000);
    } else {
			gameOver();
			addScore();
			$('#successMessageChronometer').show();
    }
	}

	function timer() {
    currentMinutes = Math.floor(secs / 60);
    currentSeconds = secs % 60;
    currentSeconds = secondsLessThanTen();
		$('.timer').text(currentMinutes + ":" + currentSeconds); //Set the element id you need the time put into.
    secs-=1;
    if(secs != -1 && checkTimer) {
    	setTimeout(timer, 1000);
    } else {
			gameOver();
			addScore();
			$('#successMessageTimer').show();
    }
	};

	function secondsLessThanTen(){
		if(currentSeconds <= 9) {
    	currentSeconds = "0" + currentSeconds;
    }
    return currentSeconds;
	}

		function gameOver(){
			checkChronometer = false;
			checkTimer = false;
			$('.border-element-options').draggable('disable');
			$('.border-element-game').droppable( 'disable' );
		}

 		function timeByLevel(){
 			var time;
 			if (level == 'easy') {
				time = 8;
			} else if (level == 'medium'){
				time = 6;
			} else if (level == 'hard'){
				time = 4;
			} else {
				time = 2;
			}
			return time;
 		}

 		function newGame(){	
		randomElements = elements.sort(function() {return Math.random() - 0.5});
		randomElementsLength = randomElements.length;
		resetGame();
	};

	  // Reset the game
	function resetGame(){
	  correctElements = 0,
		failedElements = 0,
		puntuation=0,
		elementsDropped = [];
		showElementsOptions(elementsDropped);
		$('.border-element-game').children().hide();
		$('#score').text(puntuation);
		$('.border-element-options').draggable('enable');
		$('.border-element-game').droppable( 'enable' );
	}
	
	function play(){
		dragAndDrop(level);

		function dragAndDrop(){
		  // Create the draggable box	 	
		  
	    $('.border-element-options').draggable( {
				cursor: 'move',
				containment: '#limits',
				snap: '#limits',
		    revert: true
	    } );
		  // Create the droppable box	 	

		  for (var i=0; i<randomElementsLength; i++){
		    $( "#element-game"+i ).droppable( {
		      accept: '.border-element-options',
		      hoverClass: 'hovered',
		      drop: handleElementDrop
		    } );	  	
		  }


		  function handleElementDrop( event, ui ){
			  var elementSymbolBox = $(this).data( 'symbol' ),
			  		elementSymbolElement = ui.draggable.data( 'symbol' );

		  // If the element was dropped to the correct box, change the card colour, 
		  // position it directly on top of the slot, and prevent it being dragged
		  // again
		 
			  if ( elementSymbolElement == elementSymbolBox ) {
			  	var idElement = $(this).attr('id');
			  	elementsDropped = elementsDropped.concat($('#'+idElement).data('symbol'));
			    $(this).droppable( 'disable' );
			    $(this).children().show();
			    showElementsOptions(elementsDropped);
			    puntuation = guessAnswer(puntuation);
			    correctElements++;
			  } else {
			  	puntuation = failAnswer(puntuation);
			  	failedElements++;
			  }
			  $('#score').text(puntuation);

		   
		  // If all the cards have been placed correctly then display a message
		  // and reset the cards for another go
		 
			  if ( correctElements == elementsLength ) {
			    $('#successMessage').css('visibility','visible');
			    $('#successMessage').animate({
			      left: '380px',
			      top: '200px',
			      width: '400px',
			      height: '100px',
			      opacity: 1
			    });
			    gameOver();
			  }
			}
		}
	}

		function showElementsOptions(elementsDropped){
			var showedElements = 12;
		  for ( var index=0; index<showedElements; index++ ) {
	  		var symbolElementToDrop = randomElements[index].short_name;
		  	if ( elementDroppedIsDifferentToNewElement( symbolElementToDrop, elementsDropped ) ){
					randomElements.splice(index,1);
		  	} 

		  	if (elementsDropped) {
			  	$('#random-element'+index).data('symbol', randomElements[index].short_name);
			    $('#random-atomic-short'+index).text(randomElements[index].short_name);
			    $('#random-atomic-name'+index).text(randomElements[index].long_name) ;		  		
		  	} else {
		  		$('#random-element'+index).data('');
			    $('#random-atomic-short'+index).text('');
			    $('#random-atomic-name'+index).text('');	
		  	}
		  }
		}

		function elementDroppedIsDifferentToNewElement( symbolElementToDrop, elementsDropped){

			var $position = $.inArray(symbolElementToDrop, elementsDropped);
			return $position > -1;
		}

		function failAnswer(puntuation){
			puntuation -= 1;
			return puntuation;
		}

		function guessAnswer(puntuation){
			if (level == 'easy') {
				puntuation += 12;
			} else if (level == 'medium'){
				puntuation += 8;
			} else if (level == 'hard'){
				puntuation += 4;
			} else {
				puntuation += 1;
			}
			return puntuation;
		}

	function addScore(){

		var $time,
				$puntuation = parseInt($("#score").text()),
				$levelgame = level,
				$newScore; 
				if (gameMode=='Timer mode') {
					leftSecs = currentMinutes * 60 + currentSeconds
					mins = timeByLevel();
					secs = mins * 60;
					totalSecs = secs - leftSecs;
					currentMinutes = Math.floor(totalSecs / 60);
					currentSeconds = totalSecs % 60;
				} 
				$mins = currentMinutes;
				$secs = currentSeconds;
		$newScore = {puntuation: $puntuation, mins: $mins, secs: $secs, mode: gameMode, levelgame: $levelgame};
		$.ajax({
			type: "POST",
			url: "http://localhost:3000/scores",
			data: $newScore,
			success: function(response){console.log("Success: true", $newScore)},
			error: function(response){console.log("Success: false")},
			dataType: "json"
		});
	};

	// Mostrar funcionalidad de los botones del menú		
	$(".property-button").on("click", function(){
		var $property = $(this).val();
		$('.property-value').text('');
		$('.elementoids').css('background-color', '#D8D8D8');
		$('.home-button').css('background-color', '#181a1e');
		$('.submenu').fadeOut('very-slow');
	
		for(var i = 0; i < elementsLength; i++ ) {
			$('#element'+i).css('opacity', '1');
			$("#element"+ i +"-property").text(elements[i][$property]);
			hideAndShowLeyends($property);
			fillInitLegend($(this));
			if ($property == 'state') {
				var temperature = $('#kelvin').text();
				fillTemperatureValues(temperature);
				elementState(i, $property, temperature);
			} else if ($property == 'valencies'){
				$('.elementoids').css('background-color', '#FFCC00');
				elementValencies(i, $property);
			} else if ($property) {
				colorVariation(i, $property);
			} else {
				$("#element"+ i +"-property").text('');
			}
		}
	});

	// Mostrar funcionalidad del slider para el cambio de la temperatura
	$('.slider').on('click', function(e){
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
    		value = Math.round((posX-0.5)*6021/($(e.currentTarget).outerWidth())-0.5);

    if(posX >= 0 && posX <= $(e.currentTarget).outerWidth()){

      $('.slider > .progress').css('width', posX+'px');
      $('.slider > .indicator').css('left', posX+'px');
      fillTemperatureValues(value);
      
      for (var i = 0; i < elementsLength; i++ ) {
				$('#element'+i).css('opacity', '1');
				elementState(i, 'state', value);
			}
	  }
	}

	function fillTemperatureValues(temperature){
      $('.kelvin').text(temperature);
      $('#centigrades').text(temperature-273);
      $('#fahrenheit').text(Math.round((temperature-273)*1.8+32));

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

		for(var k = 0; k < elementsLength; k++ ) {
			$('#element'+k).css('opacity', '0.3');
			$('.button-category').css('opacity', '0.3');

			if ($(this).attr('data-general')){
				$('td[data-metal-category="'+$generalCategory+'"]').css('opacity', '1');
				
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
			$('.group').css('background', '#F0F0F0').css('border-bottom', '8px solid #F0F0F0');
			$('.period').css('border-right', '8px solid #F0F0F0');
			var i = $(this).attr('id').replace('element',''),
					group = elements[i].group,
					period = elements[i].period; 
			if ((i >= 56 && i <= 70) || (i >= 88 && i <= 102)){
				period += 2;
			} 
			$('#group'+group).css('border-bottom', '8px solid #FFCC00');
			$('#period'+period).css('border-right', '8px solid #FFCC00');
			$(this).css('z-index', '10').css('-webkit-box-shadow', '0px 0px 2px 7px rgba(0,0,0,0.7)'
				).css('-moz-box-shadow', '0px 0px 2px 7px rgba(0,0,0,0.7)'
				).css('box-shadow', '0px 0px 2px 7px rgba(0,0,0,0.7)');	
	})

	$('.border-element').on('mouseleave', function(){
		$('.group').css('border-bottom', '8px solid #F0F0F0').css('background', '#F0F0F0');
		$('.period').css('border-right', '8px solid #F0F0F0');
		$(this).css('box-shadow', 'none').css('z-index', '0');	
	})	

//pulsar un periodo entero
	$('.period').on("mouseover", function(){
		$('.period').css('border-right', '8px solid #F0F0F0');
		$('.elementoids').css('opacity', '0.3');
		var $period = $(this).attr('data-period');
		$('[data-period="'+$period+'"]').css('border-right', '8px solid #FFCC00');
		$('.elementoids').css('border-right', 'none');
		for (var i=0; i < elementsLength; i++) {
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
		$('.group').css('background', '#F0F0F0').css('border-bottom', '8px solid #F0F0F0');
		$(this).css('border-bottom', '8px solid #FFCC00');
		var $group= $(this).text();
		for (var i=0; i < elementsLength; i++) {
			if (elements[i].group == $group){
				$('#element'+i).css('opacity', '1');
			} else {
				$('#element'+i).css('opacity', '0.3');
			}
		}
	})

	$('.group').on('mouseleave', function(){
		$('.border-element').css('opacity', '1');		
		$('.group').css('background', '#F0F0F0').css('border-bottom', '8px solid #F0F0F0');
		$('.elementoids').css('opacity', '0.6');
		propertyEmpty();
	})

	function propertyEmpty(){
		for (var i=0; i<elementsLength; i++){
			if ($('#element'+i+'-property').text()==''){
				$('#element'+i).css('opacity', '0.6');
			}
		}
	}

//rellenar el cuadro del atomo en la leyenda

	$('.border-element').on("click", function(){
		var i = $(this).attr('id').replace('element',''),
				$property = $("#element"+i+"-property").text(),
				$color = $(this).css('background-color');
				
		$('#atomic-number').text(elements[i].atomic_number);
		$('#legend-property').text($property);
		$('#atomic-short').text(elements[i].short_name);
		$('#elect-configuration').html(elementConfiguration(elements[i].electron_configuration));
		$('#atomic-name').text(elements[i].long_name);
		$('#box-legend').css('background-color', $color);
		
		for (var j=0; j<properties.length; j++){
			var property = properties[j];
			if (property == 'valencies'){
				if (!valencies[i]){
					emptyValue(property, i);
				} else {
					$('span[value="'+property+'"]').text(': '+valencies[i]);
				}
			} else if (property == 'state'){
				if (!elementStateWord(i, property, 293)){
					emptyValue(property, i);
				} else {
					$('span[value="'+property+'"]').text(': '+elementStateWord(i, property, 293));
				}
			} else if (elements[i][property]){
				if (property == 'mass'){
					$('span[value="'+property+'"]').text(': '+elements[i][property].toFixed(4));
				} else {
					$('span[value="'+property+'"]').text(': '+elements[i][property]);
				}
			} else {
				emptyValue(property, i);
			}
		}
	});

	function emptyValue(property, i){
			$('span[value="'+property+'"]').text(': Unknown');
	}

	function fillInitLegend(button){

		var $property = $(button).attr('subname');
		$('#atomic-number').text("Z");
		$('#legend-property').text($property);
		$('#atomic-short').text('Symbol');
		$('#elect-configuration').text('Configuration');
		$('#atomic-name').text('Name');
		$('#box-legend').css('background', '#FFCC00');
	}

	//Función para las valencias
	function elementValencies(i, property){

		$('#element'+i).css('opacity', '1').css('background-color', '#FFCC00');
		$("#element"+ i +"-property").text(valencies[i]);
		if (valencies[i] == ""){
			$('#element'+i).css('opacity', '0.6');
		}
	}

	//return to general properties

	$('.button-general-properties').on('click', function(){
		//$('input[type="radio"]').css('background-color', 'white');
		hideAndShowLeyends('general');
	})

	// hide and show leyend

	function hideAndShowLeyends(property){
		$('#categories-legend').hide();
		if (property != 'state'){
			$('.temperature-slider').hide();
			$('#second-legend').hide();
			$('#first-state-legend').hide();
			$('#properties-menu-legend').show();
			if (property == 'mass') {
				$('#properties-menu-legend').hide();
				$('#categories-legend').show();
				$('#second-legend').show();
			}
		}else {
			$('.temperature-slider').show();
			$('#second-legend').show();
			$('#first-state-legend').show();
			$('#properties-menu-legend').hide();
		}
	}

	//Función para detectar el estado de agregación de los elementos
	function elementState(i, property, temperature) {
		$("#element"+ i +"-property").text('');
		$('#legend-property').text(' ');
		var colorState = {Solid: '#FF3366', Liquid:'#33FFFF', Gas: '#99FF33'}
		if (!elements[i]['melting_point'] && !elements[i]['boiling_point']){ //unknown
			unknownElements(i);
		} else if (elements[i]['melting_point'] > temperature ){ //solid
			$('#element'+i).css('background-color', colorState['Solid']);
			$('#element'+i+'-property').text('Solid');
			return 'Solid'
		} else if ((elements[i]['melting_point'] < temperature && elements[i]['boiling_point'] > temperature) || elements[i]['boiling_point'] > temperature) { //liquid
			$('#element'+i).css('background-color', colorState['Liquid']);
			$('#element'+i+'-property').text('Liquid');
			return 'Liquid'
		} else {
			$('#element'+i).css('background-color', colorState['Gas']);//gas
			$('#element'+i+'-property').text('Gas');
			return 'Gas'
		} 	
	}

	function elementStateWord(i, property, temperature) {
		if (!elements[i]['melting_point'] && !elements[i]['boiling_point']){ 
			return ''
		} else if (elements[i]['melting_point'] > temperature ){ 
			return 'Solid'
		} else if ((elements[i]['melting_point'] < temperature && elements[i]['boiling_point'] > temperature) || elements[i]['boiling_point'] > temperature) { //liquid
			return 'Liquid'
		} else {
			return 'Gas'
		} 	
	}

	// Variation of color depends of the property
	function colorVariation(index, property) {
		var init = color[property][0],
				ending = color[property][1],
				colors = [];
		
		if (property != 'mass') {
			colors = propertyColors(property);
			var length = colors.length;
			if (elements[index][property] || elements[index][property]==0){
				for (var i=(length-1); i>=0; i--) {
					var margen1 = init + ((ending - init)/length) * (i),
							margen2 = init + ((ending - init)/length) * (i+1);
					if (elements[index][property] >= margen1 && elements[index][property] <= margen2) {
						$('#element'+index).css('background-color', colors[i]);
					}
				}
			} else {
				//console.log(elements[index].short_name,'Unknown');
				$("#element"+ index +"-property").text('');
				$('#element'+index).css('background-color', '#D8D8D8').css('opacity', '0.6');
			}
		} else {
			var i = elements[index]['category'];
			var colors;
			for (var k=0; k<10; k++){
				colors =  colors.concat($('td[data-category="'+k+'"]').css('background-color')) 
			}
			$('#element'+index).css('background-color', colors[i]);
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
	function elementConfiguration(elementElectronConfiguration){
		
	  if (elementElectronConfiguration) {
	    var elecConfigElement = elementElectronConfiguration,
	    		length = elecConfigElement.length-1,
	    		newConf = elecConfigElement.split(''),
	    		newConfPos = 0;

	    for (var k=0; k < length; k++) {
	      
	      if ( sOrPConfiguration(elecConfigElement[k], elecConfigElement[k+1]) ) {
	        newConf[newConfPos+1] = '<sup>'+elecConfigElement[k+1]+'</sup>';

	      } else if ( dOrFConfigurationBiggerThan9Electrons(elecConfigElement, k) ) {
	        newConf[newConfPos+1] = '<sup>'+ elecConfigElement[k+1];
	        newConf[newConfPos+2] = elecConfigElement[k+2] +'</sup>';

	      } else if ( dOrFConfigurationMoreLittleThan10Electrons(elecConfigElement, k) ){
	      	newConf[newConfPos+1] = '<sup>'+elecConfigElement[k+1]+'</sup>';

	      }else {
	        '';
	      } 
	      newConfPos += 1;
	    }
	    return newConf.join('');	  		
	  }	else {
	  	return '';
	  }
	}

	function sOrPConfiguration(elecConfigElement1, elecConfigElement2){
		return (elecConfigElement1 == 's' || elecConfigElement1 == 'p') && parseInt(elecConfigElement2) < 10;
	}

	function dOrFConfigurationBiggerThan9Electrons(elecConfigElement, k) {
		return ((elecConfigElement[k] == 'd' && elecConfigElement[k+2] == '0' )||(elecConfigElement[k] == 'f' && parseInt(elecConfigElement[k+2]) < 5)) && parseInt(elecConfigElement[k+1]) < 10;
	}

	function dOrFConfigurationMoreLittleThan10Electrons(elecConfigElement, k) {
	  return (elecConfigElement[k]== 'd'|| elecConfigElement[k] == 'f') && parseInt(elecConfigElement[k+1]) < 10;
	}

	// function for unknown elements
	function unknownElements(i) {
		//console.log(elements[i].short_name,'Unknown');
		$('#element'+i).css('background-color', '#D8D8D8').css('opacity', '0.6');
	}


	//wiki window
	var maximizar = true;

	$('.border-element').on("dblclick", function(){ 
		var elementName = $(this).children().children().children().children('.atomic-name').text();
		$('#wiki-info').attr('src', 'https://en.wikipedia.org/wiki/'+elementName);
		

		if (maximizar) {
			$('#wiki').css('display', 'inline'); 
		} else {
			maxMinimize();
		}
	});

	$('#maxmin').on("click", maxMinimize);

	function maxMinimize() { 
		$('#wiki').removeAttr('style').css('display', 'inline'); 
		if (maximizar){
			$('#wiki').animate({
				height: "35px",
				bottom: "0px",
				right: '1px',
				width: '200px'
			}, 'slow');
			maximizar = false;
		} else {
			maximizar = true;
		}
		$('#maxmin').children().toggleClass('fa-minus').toggleClass('fa-desktop');
	}

	$('.fa-times').on("click", function(){ 
		$('#maxmin').children().removeClass('fa-desktop').addClass('fa-minus');
		$('#wiki').removeAttr('style').hide();
		$('#wiki-info').attr('src', '');
		maximizar = true;
	});
	
});



