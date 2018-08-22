var express = require("express");
let bodyParser = require("body-parser");
let nodemailer = require('nodemailer');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require("connect-flash");
var app = express();

//Use EJS
app.set("view engine", "ejs");

//Use connect-flash
app.use(cookieParser());
app.use(session({
  secret: 'secret123',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());

//Require DOTENV environment variables
require('dotenv').config();

//Set Static Folders
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

//Use BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//------GET Routes--------//

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
  res.render("contactCorporate", {flash: {success: req.flash("success")}});
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


//------POST Routes--------//

//Contact Corporate Contact Us Form
app.post("/contactCorporate", function(req, res) {
  let { name, email, message } = req.body;
  
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
      host: 'smtp.office365.com', // Office 365 server
      port: 587,     // secure SMTP
      secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      },
      tls: {
        ciphers: 'SSLv3'
      }
    });

    let body = `<p>From: ${name} </p>`;
    body += `<p>Username: ${email} </p>`;
    body += `<p>Message: ${message} </p>`;

    // setup email data with unicode symbols
    let mailOptions = {
      from: 'cdavis@transtechsys.com', // sender address
      to: 'cdavis@transtechsys.com', // list of receivers
      subject: "TransTech Systems Contact Form", // Subject line
      text: message, // plain text body
      html: body // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  });
  req.flash('success', 'Message has been sent. Thank You!');
  res.redirect("/contactCorporate");
});

//Start Server
app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server has started!");
});