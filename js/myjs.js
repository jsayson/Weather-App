$(document).ready(function(){
var Geo = {};
  $("#showWeather").on("click",function(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(getPos);
    $("#showWeather").hide();
  }
  else{
    $("#location").html("Cant find current location");
  }
  });
  function getPos(position){
  Geo.lat = position.coords.latitude;
  Geo.lng = position.coords.longitude;
  var latlng = new google.maps.LatLng(Geo.lat, Geo.lng);
  var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        $("#location").html("<h2>"+results[0].formatted_address+"</h2>");
                    }
                }
            });
  var key = "c0beb603f5447530";
  var weather = "http://api.wunderground.com/api/"+ key +"/forecast/geolookup/conditions/q/" + Geo.lat + "," + Geo.lng + ".json";
  $.ajax({
  url : weather,
  dataType : "jsonp",
  success : function(data) {
  console.log(data);
  var temp = data['current_observation']['temp_f'];
  var desc = data['current_observation']['weather'];
  var wind = data['current_observation']['wind_string'];
  var img = data['current_observation']['icon_url'];
  if(temp>=89){
    document.body.style.backgroundImage = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxSlctX0Hc21R5Vz0YHrzcWKAanwjwXPKBEaEJmRtlWaDalmRH')";
  }
  else{
    document.body.style.backgroundImage = "url('https://wallpapercave.com/wp/p3e27aV.jpg')";
  }
  $("#weather").html("<h3>"+desc+"</h3>");
  $("#temperature").html("<h3>"+temp+"F</h3>");
  $("#wind").html("<h3>"+wind+"</h3>");
  $("#img").attr("src", img);
  function convert(){
    con = document.getElementById("temperature");
    if(con.className==="f"){
      var convert = (temp-32)*.5556;
      $("#temperature").html("<h3>"+convert+"C</h3>");
      con.className="c";
    }
    else{
      $("#temperature").html("<h3>"+temp+"F</h3>");
      con.className="f";
    }
  }
  }
});
  }
});