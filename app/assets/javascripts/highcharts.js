$(function () {
  var scores,
      url = window.location.href,
      $userID = $('#user-name').data('id');

  if (url==("http://localhost:3000/users/"+$userID)) {
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/users/"+$userID,
      success: function(response){scores=response; loop();},
      error: function(response){alert("Success: Scores error")},
      dataType: "json"
    });


    function loop() {
        console.log($userID, scores);
          $('#container').highcharts({
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Score evolution'
            },
            xAxis: {
              type: 'datetime',
              dateTimeLabelFormats: { // don't display the dummy year
                  month: '%e. %b',
                  year: '%b'
              },
              title: {
                  text: 'Date'
              }
            },
            yAxis: {
              title: {
                  text: 'Puntuation'
              },
              min: 0
            },
            series: [{
                name: 'Easy',
                data: scores.filter(function(x){ 
                  if(x.levelgame=="easy"){
                    return x.puntuation;
                  }
                })
            }, {
                name: 'Medium',
                data: scores.filter(function(x){ 
                  if(x.levelgame=="medium"){
                    return x.puntuation;
                  }
                })
            }, {
                name: 'Hard',
                data: scores.filter(function(x){ 
                  if(x.levelgame=="hard"){
                    return x.puntuation;
                  }
                })
            }, {
                name: 'Expert',
                data: scores.filter(function(x){ 
                  if(x.levelgame=="expert"){
                    return x.puntuation;
                  }
                })
              }]
            });
        }

      
    }
});