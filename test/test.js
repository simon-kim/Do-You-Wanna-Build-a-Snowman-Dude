var chai = require("chai");
var chaihttp = require("chai-http");
var request = require("superagent");
var expect = chai.expect;

chai.use(chaihttp);

var key = process.env.WUNDERAPI || "0adbd50f7a0e4896";
var wunderURL = "http://api.wunderground.com/api/" + key +
    "/geolookup/conditions/q/36.1215,115.1739" + ".json";

describe("Find latitude and longitude", function() {
   it("return coordinates location", function(done) {
     request
      .get(wunderURL)
      .end(function(err, res) {
      expect(res.body.location).to.eql("Las Vegas");
    });
    done();
  });
});
