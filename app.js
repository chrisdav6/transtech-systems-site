const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require("connect-flash");
const port = 3000 || process.env.PORT;
const app = express();

//Use Helmet
app.use(helmet());

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
  res.render("index", {
    flash: {success: req.flash("success")},
    title: "TransTech Systems",
    metaTitle: "Leaders in Non-Nuclear asphalt and soil density gauge technology. Manufacturer of the Non-Nuclear PQI Asphalt Density Gauge, Revolutionizing the transportation industry providing advanced technological solutions."
  });
});

//Products
app.get("/pqi380", function(req, res) {
  res.render("pqi380", {
    title: "PQI 380 Non-Nuclear Asphalt Density Gauge",
    metaTitle: "TransTech Systems next generation Non-Nuclear asphalt density gauge, the PQI 380."
  });
});

app.get("/sdg200", function(req, res) {
  res.render("sdg200", {
    title: "SDG 200 Non-Nuclear Soil Density Gauge",
    metaTitle: "TransTech Systems next generation Non-Nuclear soil density gauge, the SDG 200."
  });
});

app.get("/nwjm", function(req, res) {
  res.render("nwjm", {
    title: "NWJM - Notched Wedge Joint Maker",
    metaTitle: "TransTech Systems longitudinal joint screed attachment, the NWJM shapes the longitudinal joint as the hot mix asphalt is spread."
  });
});

app.get("/swm", function(req, res) {
  res.render("swm", {
    title: "SWM - Shoulder Wedge Maker",
    metaTitle: "TransTech Systems shoulder wedge screed attachment, the SWM provides a 30 degree beveled shoulder edge that gradually transitions wayward vehicles off shoulderless road surfaces and back on with relative ease."
  });
});

app.get("/pts3000", function(req, res) {
  res.render("pts3000", {
    title: "PTS3000 - Pavement Temperature Sentry",
    metaTitle: "TransTech Systems roller mounted asphalt temperature sentry. The PTS 3000 was designed and built to provide accurate HMA mat temperatures on the run."
  });
});

app.get("/pqi301", function(req, res) {
  res.render("pqi301", {
    title: "PQI 301 - Non-Nuclear Asphalt Density Gauge (Discontinued)",
    metaTitle: "TransTech Systems legacy Non-Nuclear asphalt density gauge, the PQI 301. The gauge that started it all!"
  });
});

//Product Manuals
app.get("/productManuals", function(req, res) {
  res.render("productManuals", {
    title: "TransTech Systems Product Manuals",
    metaTitle: "TransTech Systems downloadable pdf products user manuals and quick start guides."
  });
});

//Training
app.get("/training", function(req, res) {
  res.render("training", {
    title: "TransTech Systems Training",
    metaTitle: "Join us at our facility in New York for training on our PQI 380, SDG 200 or any of our other products free of charge."
  });
});

//Contact Corporate
app.get("/contactCorporate", function(req, res) {
  res.render("contactCorporate", {
    flash: {success: req.flash("success")},
    title: "TransTech Systems Corporate Contact",
    metaTitle: "Our headquarters are located in Latham, NY. Contact us at 1-800-724-6306 or email us at sales@transtechsys.com."
  });
});

//Distributors United States
app.get("/distributorsUnitedStates", function(req, res) {
  res.render("distributorsUnitedStates", {
    title: "TransTech Systems United States Distributors",
    metaTitle: "Would you like to purchase one of our products in the United States or just have questions? Contact one of our many distributors stateside."
  });
});

//Distributors International
app.get("/distributorsInternational", function(req, res) {
  res.render("distributorsInternational", {
    title: "TransTech Systems International Distributors",
    metaTitle: "Would you like to purchase one of our products Internationally or just have questions? Contact one of our many distributors worldwide."
  });
});

//Product Sales Request
app.get("/salesRequest", function(req, res) {
  res.render("salesRequest", {
    flash: {success: req.flash("success")},
    title: "TransTech Systems Product Sales Request",
    metaTitle: "Are you interested in purchasing one of our products or just have questions? Contact us today!"
  });
});

//Product Warranty Registration
app.get("/productRegistration", function(req, res) {
  res.render("productRegistration", {
    flash: {success: req.flash("success")},
    title: "TransTech Systems Product Registration",
    metaTitle: "Submit a TransTech Systems product warranty registration."
  });
});

//Product Repair/ Calibration
app.get("/repairRequest", function(req, res) {
  res.render("repairRequest", {
    flash: {success: req.flash("success")},
    title: "TransTech Systems Product Repair/Calibration RMA Request",
    metaTitle: "Submit a TransTech Systems product repair/calibration RMA request."
  });
});

//Corporate News
app.get("/corporateNews", function(req, res) {
  res.render("corporateNews", {
    title: "TransTech Systems Corporate News",
    metaTitle: "TransTech Systems news, stories and highlights."
  });
});

//Tradeshows
app.get("/tradeshows", function(req, res) {
  res.render("tradeshows", {
    title: "TransTech Systems Tradeshows",
    metaTitle: "We are very active promoting our Non-Nuclear technology during tradeshow season. Check the dates, see our products at a location near you!"
  });
});

//Community
app.get("/community", function(req, res) {
  res.render("community", {
    title: "TransTech Systems In the Community",
    metaTitle: "We believe having strong ties and supporting our community is extremely important. Look at what we have been up to :)"
  });
});

//Newsletter
app.get("/newsletter", function(req, res) {
  res.render("newsletter", {
    title: "TransTech Systems Newsletter",
    metaTitle: "Do you want to find out the latest news on our products and industry? Check out the TransTech Systems newsletter."
  });
});

//Privacy
app.get("/privacy", function(req, res) {
  res.render("privacy", {
    title: "TransTech Systems Privacy Policy",
    metaTitle: "TransTech Systems privacy policy and international compliance."
  });
});


//------POST Routes--------//

//Homepage Newsletter Signup Form
app.post("/", function(req, res) {
  let { email } = req.body;
  
  if(email == undefined || email.length == 0) {
    req.flash('success', 'Email field must be entered');
    res.redirect("/");
  } else {
    console.log(`email: ${email}`);
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
  }
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
    body += `<strong>Please send more info:</strong> ${moreInfo}</p>`;
    body += `<p><strong>Message:</strong><br> ${message}</p>`;

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

//Repair Request Form
app.post("/repairRequest", function(req, res) {
  let { name, company, state, country, phone, email, estimate, serviceMessage } = req.body;
  
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

    let body = `<h2><u>Repair Request</u></h2>`;
    body += `<p><strong>From:</strong> ${name}<br>`;
    body += `<strong>Company:</strong> ${company}<br>`;
    body += `<strong>State:</strong> ${state}<br>`;
    body += `<strong>Country:</strong> ${country}<br>`;
    body += `<strong>Phone:</strong> ${phone}<br>`;
    body += `<strong>Email:</strong> ${email}<br>`;
    body += `<strong>Estimate Required:</strong> ${estimate}</p>`;
    body += `<p><strong>Description of Repair:</strong><br> ${serviceMessage}</p>`;

    // setup email data with unicode symbols
    let mailOptions = {
      from: 'webforms@transtechsys.com', // sender address
      to: 'cdavis@transtechsys.com', // list of receivers
      replyTo: email,
      subject: "TransTech Systems Repair Request Form", // Subject line
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
  req.flash('success', 'Repair request has been sent. Thank You!');
  res.redirect("/repairRequest");
});

//Product Registration Form
app.post("/productRegistration", function(req, res) {
  let { name, company, state, country, phone, email, registerProduct, date, serial } = req.body;
  
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

    let body = `<h2><u>Product Registration</u></h2>`;
    body += `<p><strong>From:</strong> ${name}<br>`;
    body += `<strong>Company:</strong> ${company}<br>`;
    body += `<strong>State:</strong> ${state}<br>`;
    body += `<strong>Country:</strong> ${country}<br>`;
    body += `<strong>Phone:</strong> ${phone}<br>`;
    body += `<strong>Email:</strong> ${email}<br>`;
    body += `<strong>TransTech Product:</strong> ${registerProduct}<br>`;
    body += `<strong>Date:</strong> ${date}<br>`;
    body += `<strong>Serial Number:</strong> ${serial}</p>`;

    // setup email data with unicode symbols
    let mailOptions = {
      from: 'webforms@transtechsys.com', // sender address
      to: 'cdavis@transtechsys.com', // list of receivers
      replyTo: email,
      subject: "TransTech Systems Repair Request Form", // Subject line
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
  req.flash('success', 'Product registration has been sent. Thank You!');
  res.redirect("/productRegistration");
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

//SWM Product Page Manuals Download Form
app.post("/swm", function(req, res) {
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

//PTS 3000 Product Page Manuals Download Form
app.post("/pts3000", function(req, res) {
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

//PQI 301 Product Page Manuals Download Form
app.post("/pqi301", function(req, res) {
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

//Product Manuals Page Manuals Download Form
app.post("/productManuals", function(req, res) {
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
app.listen(port, process.env.IP, function() {
  console.log("Server has started!");
});