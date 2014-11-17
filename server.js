var express = require("express");
var request = require("superagent");
var bodyParser = require("body-parser");
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", function(req, res) {
  var latitude = req.body.lat;
  var longitude = req.body.lon;
  var key = "0adbd50f7a0e4896";
  var wunderURL = "http://api.wunderground.com/api/" + key +
      "/geolookup/conditions/q/" + latitude + "," + longitude + ".json";

  request
    .get(wunderURL)
    .end(function(err, wunderData) {
      var answer;
      var parsedData = JSON.parse(wunderData.text);

      var weather = parsedData.current_observation.weather;

      if(weather !== "Snow" || "Light Snow" || "Heavy Snow" || "Snow Showers" || "Light Snow Showers" || "Heavy Snow Showers")
      {
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
