$(document).ready(function() {
  var temp;
  var unit = 'F';
  var icons = new Skycons({
    "color": "white"
  });

  //Get user location
  function getLoc() {
    return $.ajax({
      url: "http://ipinfo.io/json",
      dataType: 'jsonp',
    });
  }
  //Get current weather
  function getWeather(city) {
    return $.ajax({
      url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=7f661310ce154a4268d3b3168f2a6d89",
      dataType: 'jsonp',
    });
  }

  getLoc().success(function(data) {
    if (data.city) {
      $("#loc").text(data.city + ", " + data.country);
    } 
    else {
      $("#loc").text("Error, not supported.");
      document.getElementById("error").style.display = "none";
    }
    getWeather(data.city).success(function(results) {
      temp = Math.round(results.main.temp);
      var weather = results.weather[0].main;
      $("#temp").prepend(temp);
      $("#weather").text(weather);

      switch (weather) {
        case 'Clear':
          icons.set("icon", Skycons.CLEAR_DAY);
          break;
        case 'Clouds':
          icons.set("icon", Skycons.CLOUDY);
          break;
        case 'Wind':
          icons.set("icon", Skycons.WIND);
          break;
        case 'Rain':
          icons.set("icon", Skycons.RAIN);
          break;
        case 'Snow':
          icons.set("icon", Skycons.SNOW);
          break;
          case 'Mist':
          icons.set("icon", Skycons.FOG);
          break;
      }
      icons.play();
    });
  });
  $("#button").text(unit);

  //Change temp unit
  function tempChange(val) {
    if (val === 'F') {
      temp = Math.round((temp - 32) * 5 / 9);
      val = 'C';
    } else {
      temp = Math.round(temp * 9 / 5 + 32);
      val = 'F';
    }
    return val;
  }
  $("#button").click(function() {
    unit = tempChange(unit);
    $("#temp").text(temp);
    $("#button").text(unit);
  });
  //End of document
});
