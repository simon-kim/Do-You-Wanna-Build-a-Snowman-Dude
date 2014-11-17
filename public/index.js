function showLocation(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  $.ajax({
    url: "/",
    type: "POST",
    data: {lat:latitude, lon: longitude},
    success: function(data) {
      if(data.msg === "No. Go away, dude.") {
        $("#answer").html("<p id='no'>" + data.msg + "<img src='/images/SadOlaf.jpeg' align='center'/>" + "</p>");
      } else {
        $("#answer").html("<p id='yes'>" + data.msg + "<img src='/images/HappyOlaf.jpeg' align='center'/>" + "</p>");
      }
    }
  });
}

(document).ready(function() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation, function(err) {
      if(err) {
        $("#answer")
        .html("<p>Allow Access to Your Location to Find Out!</p>");
      }
    });
  } else {
    $("#answer").html("<p>Can\'t Find Your Location!</p>");
  }
}());
