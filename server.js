var express = require("express");
var request = require("superagent");
var bodyParser = require("body-parser");
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Geolocates the user using latitude and longitude and then using weather undeground's API,
//determines if it is currently snowing, in all forms (light, heavy, etc.), and then tells
//the user either yes, I want to build a snowman or no, I don't want to and you should go away.
app.post("/", function(req, res) {
  var latitude = req.body.lat;
  var longitude = req.body.lon;
  var key = (process.env.WUNDERAPI || "0adbd50f7a0e4896";
  //API url
  var wunderURL = "http://api.wunderground.com/api/" + key +
      "/geolookup/conditions/q/" + latitude + "," + longitude + ".json";

  request
    .get(wunderURL)
    .end(function(err, wunderData) {
      var answer;
      //JSON is parsed here into readable text
      var parsedData = JSON.parse(wunderData.text);

      var weather = parsedData.current_observation.weather;
      
      //determines if it is snowing based on user's lat and long
      if(weather !== "Snow" || "Light Snow" || "Heavy Snow" || "Snow Showers" ||
        "Light Snow Showers" || "Heavy Snow Showers") {
        answer = "No. Go away, dude.";
        } else {
        answer = "Okay!";
      }
      res.json({msg: answer});
    });
});

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), function() {
  console.log("Server is running on port: %d", app.get("port"));
});
