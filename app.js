var express = require("express");
var app = express();

//Use EJS
app.set("view engine", "ejs");

//Set Static Folders
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

//Routes
app.get("/", function(req, res) {
  res.render("index");
});

//Start Server
app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server has started!");
});