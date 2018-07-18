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

//Products
app.get("/pqi380", function(req, res) {
  res.render("pqi380");
});

app.get("/sdg200", function(req, res) {
  res.render("sdg200");
});

app.get("/nwjm", function(req, res) {
  res.render("nwjm");
});

app.get("/swm", function(req, res) {
  res.render("swm");
});

app.get("/pts3000", function(req, res) {
  res.render("pts3000");
});

app.get("/pqi301", function(req, res) {
  res.render("pqi301");
});

//Product Manuals
app.get("/productManuals", function(req, res) {
  res.render("productManuals");
});

//Training
app.get("/training", function(req, res) {
  res.render("training");
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

//Product Repair/ Calibration
app.get("/repairRequest", function(req, res) {
  res.render("repairRequest");
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

//Privacy
app.get("/privacy", function(req, res) {
  res.render("privacy");
});

//Start Server
app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server has started!");
});