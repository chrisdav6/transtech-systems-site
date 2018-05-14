var express = require("express");
var app = express();

//Use EJS
app.set("view engine", "ejs");

//Set Static Folders
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

//------Routes--------//

//Homepage
app.get("/", function(req, res) {
  res.render("index");
});

//Contact Corporate
app.get("/contactCorporate", function(req, res) {
  res.render("contactCorporate");
});

//Distributors United States
app.get("/distributorsUnitedStates", function(req, res) {
  res.render("distributorsUnitedStates");
});

//Distributors International
app.get("/distributorsInternational", function(req, res) {
  res.render("distributorsInternational");
});

//Product Sales Request
app.get("/salesRequest", function(req, res) {
  res.render("salesRequest");
});

//Product Warranty Registration
app.get("/productRegistration", function(req, res) {
  res.render("productRegistration");
});

//Corporate News
app.get("/corporateNews", function(req, res) {
  res.render("corporateNews");
});

//Tradeshows
app.get("/tradeshows", function(req, res) {
  res.render("tradeshows");
});

//Community
app.get("/community", function(req, res) {
  res.render("community");
});

//Newsletter
app.get("/newsletter", function(req, res) {
  res.render("newsletter");
});

//Start Server
app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server has started!");
});