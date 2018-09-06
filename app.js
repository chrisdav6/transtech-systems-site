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
  res.render("index", {flash: {success: req.flash("success")}});
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
  res.render("salesRequest", {flash: {success: req.flash("success")}});
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

//Homepage Newsletter Signup Form
app.post("/", function(req, res) {
  let { email } = req.body;
  
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

    let body = `<h2><u>TransTech Systems Newsletter Signup</u></h2>`;
    body += `<p><strong>Please sign me up for the TransTech Systems Newsletter, my email address is:</strong> ${email}</p>`;

    // setup email data with unicode symbols
    let mailOptions = {
      from: 'webforms@transtechsys.com', // sender address
      to: 'cdavis@transtechsys.com', // list of receivers
      replyTo: email,
      subject: "TransTech Systems Newsletter Signup Form", // Subject line
      text: body, // plain text body
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
  req.flash('success', 'Request to join newsletter has been sent. Thank You!');
  res.redirect("/");
});

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

    let body = `<h2><u>Corporate Contact Inquiry</u></h2>`;
    body += `<p><strong>From:</strong> ${name}<br>`;
    body += `<strong>Email:</strong> ${email}</p>`;
    body += `<p><strong>Message:</strong> ${message}</p>`;

    // setup email data with unicode symbols
    let mailOptions = {
      from: 'webforms@transtechsys.com', // sender address
      to: 'cdavis@transtechsys.com', // list of receivers
      replyTo: email,
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

//Product Sales Request Form
app.post("/salesRequest", function(req, res) {
  let { name, company, state, country, phone, email, reach, moreInfo, message } = req.body;
  
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

    let body = `<h2><u>Sales Request</u></h2>`;
    body += `<p><strong>From:</strong> ${name}<br>`;
    body += `<strong>Company:</strong> ${company}<br>`;
    body += `<strong>State:</strong> ${state}<br>`;
    body += `<strong>Country:</strong> ${country}<br>`;
    body += `<strong>Phone:</strong> ${phone}<br>`;
    body += `<strong>Email:</strong> ${email}<br>`;
    body += `<strong>How did you hear about us:</strong> ${reach}<br>`;
    body += `<strong>Please send more info:</strong> ${moreInfo}<br>`;
    body += `<p><strong>Message:</strong> ${message}</p>`;

    // setup email data with unicode symbols
    let mailOptions = {
      from: 'webforms@transtechsys.com', // sender address
      to: 'cdavis@transtechsys.com', // list of receivers
      replyTo: email,
      subject: "TransTech Systems Sales Request Form", // Subject line
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
  req.flash('success', 'Sales request has been sent. Thank You!');
  res.redirect("/salesRequest");
});

//PQI 380 Product Page Manuals Download Form
app.post("/pqi380", function(req, res) {
  let { manualName, name, company, country, email, currentCustomer, reach } = req.body;
  
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

    let body = `<h2><u>${manualName} Download</u></h2>`;
    body += `<p><strong>From:</strong> ${name}<br>`;
    body += `<strong>Company:</strong> ${company}<br>`;
    body += `<strong>Country:</strong> ${country}<br>`;
    body += `<strong>Email:</strong> ${email}<br>`;
    body += `<strong>Current Customer:</strong> ${currentCustomer}<br>`;
    body += `<strong>How did you hear about us:</strong> ${reach}<br>`;

    // setup email data with unicode symbols
    let mailOptions = {
      from: 'webforms@transtechsys.com', // sender address
      to: 'cdavis@transtechsys.com', // list of receivers
      replyTo: email,
      subject: "TransTech Systems Product Manual Download", // Subject line
      text: body, // plain text body
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
});

//SDG 200 Product Page Manuals Download Form
app.post("/sdg200", function(req, res) {
  let { manualName, name, company, country, email, currentCustomer, reach } = req.body;
  
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

    let body = `<h2><u>${manualName} Download</u></h2>`;
    body += `<p><strong>From:</strong> ${name}<br>`;
    body += `<strong>Company:</strong> ${company}<br>`;
    body += `<strong>Country:</strong> ${country}<br>`;
    body += `<strong>Email:</strong> ${email}<br>`;
    body += `<strong>Current Customer:</strong> ${currentCustomer}<br>`;
    body += `<strong>How did you hear about us:</strong> ${reach}<br>`;

    // setup email data with unicode symbols
    let mailOptions = {
      from: 'webforms@transtechsys.com', // sender address
      to: 'cdavis@transtechsys.com', // list of receivers
      replyTo: email,
      subject: "TransTech Systems Product Manual Download", // Subject line
      text: body, // plain text body
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
});

//NWJM Product Page Manuals Download Form
app.post("/nwjm", function(req, res) {
  let { manualName, name, company, country, email, currentCustomer, reach } = req.body;
  
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

    let body = `<h2><u>${manualName} Download</u></h2>`;
    body += `<p><strong>From:</strong> ${name}<br>`;
    body += `<strong>Company:</strong> ${company}<br>`;
    body += `<strong>Country:</strong> ${country}<br>`;
    body += `<strong>Email:</strong> ${email}<br>`;
    body += `<strong>Current Customer:</strong> ${currentCustomer}<br>`;
    body += `<strong>How did you hear about us:</strong> ${reach}<br>`;

    // setup email data with unicode symbols
    let mailOptions = {
      from: 'webforms@transtechsys.com', // sender address
      to: 'cdavis@transtechsys.com', // list of receivers
      replyTo: email,
      subject: "TransTech Systems Product Manual Download", // Subject line
      text: body, // plain text body
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
});

//Start Server
app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server has started!");
});