const path = require('path');
const express = require('express');
const helmet = require('helmet');
const badbots = require('express-badbots');
const dotenv = require('dotenv').config();
const validator = require('validator');
const expressSanitizer = require('express-sanitizer');
const nodemailer = require('nodemailer');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const request = require('request');
const port = process.env.PORT || 3000;
const app = express();

//Use Helmet
app.use(helmet());

//Use Express Badbots
app.use(badbots({ isApi: false }));

//Use EJS
app.set('view engine', 'ejs');

//Use connect-flash
app.use(cookieParser());
app.use(
  session({
    secret: 'secret123',
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());

//Set Static Folders
app.use(express.static(path.join(__dirname, '/public')));

//Use BodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressSanitizer());

//------301 Redirects--------//

const redirects = [
  { from: '/products/index.php', to: '/products' },
  { from: '/products/pqi380.php', to: '/products/pqi380' },
  { from: '/products/sdg200.php', to: '/products/sdg200' },
  { from: '/products/nwjm.php', to: '/products/nwjm' },
  { from: '/products/swm.php', to: '/products/swm' },
  { from: '/products/pts.php', to: '/products/pts3000' },
  { from: '/products/pqi301.php', to: '/products/pqi301' },
  { from: '/products/corporate%20news.php', to: '/products/corporateNews' },
  { from: '/products/newsletter.php', to: '/products/newsletter' },
  { from: '/products/tradeshows.php', to: '/products/tradeshows' },
  { from: '/products/training.php', to: '/products/training' },
  { from: '/products/state%20dot%20specs.php', to: '/products' },
  { from: '/products/key%20links.php', to: '/products' },
  {
    from: '/products/contact%20united%20states.php',
    to: '/products/distributorsUnitedStates',
  },
  {
    from: '/products/contact%20international.php',
    to: '/products/distributorsInternational',
  },
  { from: '/products/product%20info.php', to: '/products/salesRequest' },
  {
    from: '/products/product%20warranty.php',
    to: '/products/productRegistration',
  },
  { from: '/products/product%20repair.php', to: '/products/repairRequest' },
  { from: '/products/employment%20transtech.php', to: '/products' },
  { from: '/europe/index.php', to: '/europe' },
  { from: '/europe/pqi380.php', to: '/europe/pqi380' },
  { from: '/europe/sdg200.php', to: '/europe/sdg200' },
  { from: '/payment.php', to: 'http://payment.transtechsys.com' },
  { from: '/about.php', to: '/products#about' },
  { from: '/privacy.php', to: '/products/privacy' },
  {
    from: '/sdg/mtl%20Generator%20Ver%20949.xls',
    to: '/pdf/mtlGeneratorVer949.xls',
  },
  { from: '/sdg/SDG%20mtl%20File%20Tool.xls', to: '/pdf/SDGmtlFileTool.xls' },
];

redirects.forEach(({ from, to, type = 301, method = 'get' }) => {
  app[method](from, (req, res) => {
    res.redirect(type, to);
  });
});

//Redirect www to non-www
app.get('/*', function (req, res, next) {
  if (req.headers.host.match(/^www/) !== null)
    res.redirect(
      301,
      'http://' + req.headers.host.replace(/^www\./, '') + req.url
    );
  else next();
});

//Use date for footer copyright - added comment to update to 2022
app.locals.date = new Date().getFullYear();

//MGR Domain Redirect
app.get('/products/customerPortal', function (req, res) {
  const path =
    req.query.path ||
    'customer?portal=297fff75bdc1ab0d'; /* set this to 'customer?portal=297fff75bdc1ab0d' if req.query.path does not exists */

  res.render('products/customerPortal', {
    title: 'TransTech Systems Customer Portal',
    metaTitle: 'TransTech Systems Customer Portal',
    path: path,
  });
});

// just to explain they are 2 different URL
// Portal: https://www.mygadgetrepairs.com/customer?portal=297fff75bdc1ab0d - This one needs portal identifier and below doesn't
// Customer Setup: https://www.mygadgetrepairs.com/customer-setup/9607a918-5056-0fff-ff996fa9ad344b29/

//Redirect /payment to payment site - old
// app.get('/payment', function (req, res) {
//   res.redirect('https://securepayment.link/transtechsys');
// });

//Redirect /payment to payment site
app.get('/payment', function (req, res) {
  res.redirect('https://api.ipospays.com/v1/sl/1mPt0_170925134140');
});

//TTS - Ames Digital Landing Page - Asphalt Contractor
app.get('/products/digitalAC', function (req, res) {
  res.render('products/digitalAC', {
    title: 'TransTech Systems / Ames Engineering Digital Landing Page',
    metaTitle:
      'Leaders in Non-Nuclear asphalt and soil density gauge technology. Manufacturer of the Non-Nuclear PQI Asphalt Density Gauge, Revolutionizing the transportation industry providing advanced technological solutions.',
  });
});

//TTS - Ames Digital Landing Page - Asphalt Pro
app.get('/products/digitalAP', function (req, res) {
  res.render('products/digitalAP', {
    title: 'TransTech Systems / Ames Engineering Digital Landing Page',
    metaTitle:
      'Leaders in Non-Nuclear asphalt and soil density gauge technology. Manufacturer of the Non-Nuclear PQI Asphalt Density Gauge, Revolutionizing the transportation industry providing advanced technological solutions.',
  });
});

//TTS - Ames Digital Landing Page - NAPA
app.get('/products/digitalNAPA', function (req, res) {
  res.render('products/digitalNAPA', {
    title: 'TransTech Systems / Ames Engineering Digital Landing Page',
    metaTitle:
      'Leaders in Non-Nuclear asphalt and soil density gauge technology. Manufacturer of the Non-Nuclear PQI Asphalt Density Gauge, Revolutionizing the transportation industry providing advanced technological solutions.',
  });
});

//TTS - Ames Digital Landing Page - TXAPA
app.get('/products/digitalTXAPA', function (req, res) {
  res.render('products/digitalTXAPA', {
    title: 'TransTech Systems / Ames Engineering Digital Landing Page',
    metaTitle:
      'Leaders in Non-Nuclear asphalt and soil density gauge technology. Manufacturer of the Non-Nuclear PQI Asphalt Density Gauge, Revolutionizing the transportation industry providing advanced technological solutions.',
  });
});

//TTS - Ames Digital Landing Page - WOA 2025
app.get('/products/digitalWOA2025', function (req, res) {
  res.render('products/digitalWOA2025', {
    title: 'TransTech Systems / Ames Engineering Digital Landing Page',
    metaTitle:
      'Leaders in Non-Nuclear asphalt and soil density gauge technology. Manufacturer of the Non-Nuclear PQI Asphalt Density Gauge, Revolutionizing the transportation industry providing advanced technological solutions.',
  });
});

//NewHomepage
// app.get('/homepage', function (req, res) {
//   res.render('homePage/index', {
//     title: 'TransTech Systems',
//     metaTitle:
//       'Leaders in Non-Nuclear asphalt and soil density gauge technology. Manufacturer of the Non-Nuclear PQI Asphalt Density Gauge, Revolutionizing the transportation industry providing advanced technological solutions.',
//   });
// });

//Homepage
app.get('/', function (req, res) {
  res.render('homePage/index', {
    title: 'TransTech Systems',
    metaTitle:
      'Leaders in Non-Nuclear asphalt and soil density gauge technology. Manufacturer of the Non-Nuclear PQI Asphalt Density Gauge, Revolutionizing the transportation industry providing advanced technological solutions.',
  });
});

//Products Homepage
app.get('/products', function (req, res) {
  res.render('products/index', {
    flash: { success: req.flash('success') },
    title: 'TransTech Systems',
    metaTitle:
      'Leaders in Non-Nuclear asphalt and soil density gauge technology. Manufacturer of the Non-Nuclear PQI Asphalt Density Gauge, Revolutionizing the transportation industry providing advanced technological solutions.',
  });
});

//Products
app.get('/products/pqi380Plus', function (req, res) {
  res.render('products/pqi380Plus', {
    title: 'PQI 380+ Non-Nuclear Asphalt Density Gauge',
    metaTitle:
      'TransTech Systems next generation Non-Nuclear asphalt density gauge, the PQI 380+.',
    ogTitle: 'PQI 380+ Non-Nuclear Asphalt Density Gauge',
    ogUrl: 'https://transtechsys.com/products/pqi380Plus',
    ogImage: 'https://transtechsys.com/img/og/ogPQI380Plus.jpg',
  });
});

app.get('/products/pqi380', function (req, res) {
  res.render('products/pqi380', {
    title: 'PQI 380 Non-Nuclear Asphalt Density Gauge',
    metaTitle:
      'TransTech Systems next generation Non-Nuclear asphalt density gauge, the PQI 380.',
  });
});

app.get('/products/sdg200', function (req, res) {
  res.render('products/sdg200', {
    title: 'SDG 200 Non-Nuclear Soil Density Gauge',
    metaTitle:
      'TransTech Systems next generation Non-Nuclear soil density gauge, the SDG 200.',
  });
});

app.get('/products/nwjm', function (req, res) {
  res.render('products/nwjm', {
    title: 'NWJM - Notched Wedge Joint Maker',
    metaTitle:
      'TransTech Systems longitudinal joint screed attachment, the NWJM shapes the longitudinal joint as the hot mix asphalt is spread.',
  });
});

app.get('/products/swm', function (req, res) {
  res.render('products/swm', {
    title: 'SWM - Shoulder Wedge Maker',
    metaTitle:
      'TransTech Systems shoulder wedge screed attachment, the SWM provides a 30 degree beveled shoulder edge that gradually transitions wayward vehicles off shoulderless road surfaces and back on with relative ease.',
  });
});

app.get('/products/pts3000', function (req, res) {
  res.render('products/pts3000', {
    title: 'PTS3000 - Pavement Temperature Sentry',
    metaTitle:
      'TransTech Systems roller mounted asphalt temperature sentry. The PTS 3000 was designed and built to provide accurate HMA mat temperatures on the run.',
  });
});

app.get('/products/pqi301', function (req, res) {
  res.render('products/pqi301', {
    title: 'PQI 301 - Non-Nuclear Asphalt Density Gauge (Discontinued)',
    metaTitle:
      'TransTech Systems legacy Non-Nuclear asphalt density gauge, the PQI 301. The gauge that started it all!',
  });
});

app.get('/products/legacyProducts', function (req, res) {
  res.render('products/legacyProducts', {
    title: 'TransTech Systems Legacy Products',
    metaTitle:
      'Retired or discontinued products manufactured by TransTech Systems',
  });
});

app.get('/products/usedGauges', function (req, res) {
  res.render('products/usedGauges', {
    title: 'TransTech Systems Used Gauges',
    metaTitle: 'Lightly used gauges for sale',
  });
});

//Product Manuals
app.get('/products/productManuals', function (req, res) {
  res.render('products/productManuals', {
    title: 'TransTech Systems Product Manuals',
    metaTitle:
      'TransTech Systems downloadable pdf products user manuals and quick start guides.',
  });
});

//Resources
app.get('/products/resources', function (req, res) {
  res.render('products/resources', {
    title: 'TransTech Systems Product Resources',
    metaTitle:
      'TransTech Systems downloadable pdf products user manuals and quick start guides.',
    robots: 'noindex',
  });
});

//Training
app.get('/products/training', function (req, res) {
  res.render('products/training', {
    title: 'TransTech Systems Training',
    metaTitle:
      'Join us at our facility in New York for training on our PQI 380, SDG 200 or any of our other products free of charge.',
  });
});

//Contact Corporate
app.get('/products/contactCorporate', function (req, res) {
  res.render('products/contactCorporate', {
    flash: { success: req.flash('success') },
    title: 'TransTech Systems Corporate Contact',
    metaTitle:
      'Our headquarters are located in Latham, NY. Contact us at 1-800-724-6306 or email us at sales@transtechsys.com.',
  });
});

//Distributors United States
app.get('/products/distributorsUnitedStates', function (req, res) {
  res.render('products/distributorsUnitedStates', {
    title: 'TransTech Systems United States Distributors',
    metaTitle:
      'Would you like to purchase one of our products in the United States or just have questions? Contact one of our many distributors stateside.',
  });
});

//Distributors International
app.get('/products/distributorsInternational', function (req, res) {
  res.render('products/distributorsInternational', {
    title: 'TransTech Systems International Distributors',
    metaTitle:
      'Would you like to purchase one of our products Internationally or just have questions? Contact one of our many distributors worldwide.',
  });
});

//Product Sales Request
app.get('/products/salesRequest', function (req, res) {
  res.render('products/salesRequest', {
    flash: { success: req.flash('success') },
    title: 'TransTech Systems Product Sales Request',
    metaTitle:
      'Are you interested in purchasing one of our products or just have questions? Contact us today!',
  });
});

//Product Warranty Registration
app.get('/products/productRegistration', function (req, res) {
  res.render('products/productRegistration', {
    flash: { success: req.flash('success') },
    title: 'TransTech Systems Product Registration',
    metaTitle: 'Submit a TransTech Systems product warranty registration.',
  });
});

//Product Repair/ Calibration
app.get('/products/repairRequest', function (req, res) {
  res.render('products/repairRequest', {
    flash: { success: req.flash('success') },
    title: 'TransTech Systems Product Repair/Calibration RMA Request',
    metaTitle:
      'Submit a TransTech Systems product repair/calibration RMA request.',
  });
});

//Request Integration
app.get('/products/requestIntegration', function (req, res) {
  res.render('products/requestIntegration', {
    flash: { success: req.flash('success') },
    title: 'TransTech Systems Request integration',
    metaTitle:
      'Are you interested in integration with our TransTech Connect density cloud? Contact us today!',
  });
});

//PQI 300/301 Trade Up - Not used as of March 2025
/*app.get('/products/tradeUp', function (req, res) {
  res.render('products/tradeUp', {
    flash: { success: req.flash('success') },
    title: 'TransTech Systems PQI 300/301 Trade-Up Program',
    metaTitle:
      'Your legacy PQI 300/301 could earn you dollars towards a new PQI 380 Non-Nuclear Asphalt Density Gauge',
  });
});
*/

//Corporate News
app.get('/products/corporateNews', function (req, res) {
  res.render('products/corporateNews', {
    title: 'TransTech Systems Corporate News',
    metaTitle: 'TransTech Systems news, stories and highlights.',
  });
});

//Tradeshows
app.get('/products/tradeshows', function (req, res) {
  res.render('products/tradeshows', {
    title: 'TransTech Systems Tradeshows',
    metaTitle:
      'We are very active promoting our Non-Nuclear technology during tradeshow season. Check the dates, see our products at a location near you!',
  });
});

//Community
app.get('/products/community', function (req, res) {
  res.render('products/community', {
    title: 'TransTech Systems In the Community',
    metaTitle:
      'We believe having strong ties and supporting our community is extremely important. Look at what we have been up to :)',
  });
});

//Newsletter
app.get('/products/newsletter', function (req, res) {
  res.render('products/newsletter', {
    title: 'TransTech Systems Newsletter',
    metaTitle:
      'Do you want to find out the latest news on our products and industry? Check out the TransTech Systems newsletter.',
  });
});

//Privacy
app.get('/products/privacy', function (req, res) {
  res.render('products/privacy', {
    title: 'TransTech Systems Privacy Policy',
    metaTitle: 'TransTech Systems privacy policy and international compliance.',
  });
});

//------POST Routes--------//

//Homepage Newsletter Signup Form
/*app.post('/products', function (req, res) {
  let { name, company, state, country, email, currentCustomer, reach } =
    req.body;

  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
      host: 'smtp.office365.com', // Office 365 server
      port: 587, // secure SMTP
      secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        ciphers: 'SSLv3',
      },
    });

    let body = `<h2><u>TransTech Systems Newsletter Signup</u></h2>`;
    body += `<p><strong>From:</strong> ${name}<br>`;
    body += `<strong>Company:</strong> ${company}<br>`;
    body += `<strong>State:</strong> ${state}<br>`;
    body += `<strong>Country:</strong> ${country}<br>`;
    body += `<strong>Email:</strong> ${email}<br>`;
    body += `<strong>Current Customer:</strong> ${currentCustomer}<br>`;
    body += `<strong>How did you hear about us:</strong> ${reach}<br>`;

    // setup email data with unicode symbols
    let mailOptions = {
      from: 'webforms@transtechsys.com', // sender address
      to: 'sales@transtechsys.com', // list of receivers
      replyTo: email,
      subject: 'TransTech Systems Newsletter Signup Form', // Subject line
      text: body, // plain text body
      html: body, // html body
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
  res.redirect('/products');
});
*/

//Contact Corporate Contact Us Form
/* app.post("/products/contactCorporate", function (req, res) {
  let { name, email, message, businessAddress } = req.body;

  if (businessAddress.length !== 0) {
    req.flash('success', 'Sorry Bot!');
    res.redirect("/products/contactCorporate");
  } else {
    nodemailer.createTestAccount((err, account) => {
      var transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', 
        port: 587,     
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        },
        tls: {
          ciphers: 'SSLv3'
        }
      });

      let body = `<h2><u>Corporate Contact Inquiry</u></h2>`;
      body += `<p><strong>From:</strong> ${validator.escape(name)}<br>`;
      body += `<strong>Email:</strong> ${email}</p>`;
      body += `<p><strong>Message:</strong> ${validator.escape(message)}</p>`;

      let mailOptions = {
        from: 'webforms@transtechsys.com', 
        to: 'sales@transtechsys.com', 
        replyTo: email,
        subject: "TransTech Systems Contact Form", 
        text: message, 
        html: body 
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });
    });
    req.flash('success', 'Message has been sent. Thank You!');
    res.redirect("/products/contactCorporate");
  }
}); */

//Product Sales Request Form
app.post('/products/salesRequest', function (req, res) {
  let {
    name,
    company,
    state,
    country,
    phone,
    email,
    reach,
    reachInfo,
    moreInfo,
    message,
    businessAddress,
  } = req.body;

  if (businessAddress.length !== 0) {
    return;
    // req.flash('success', 'Sorry Bot!');
    // res.redirect('/products/salesRequest');
  } else if (
    name.includes('DGSVNL') ||
    company.includes('DGSVNL') ||
    phone.includes('DGSVNL') ||
    email.includes('DGSVNL') ||
    reachInfo.includes('DGSVNL') ||
    message.includes('DGSVNL')
  ) {
    return;
  } else {
    nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      var transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', // Office 365 server
        port: 587, // secure SMTP
        secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
        tls: {
          ciphers: 'SSLv3',
        },
      });

      let body = `<h2><u>Sales Request</u></h2>`;
      body += `<p><strong>From:</strong> ${name}<br>`;
      body += `<strong>Company:</strong> ${company}<br>`;
      body += `<strong>State:</strong> ${state}<br>`;
      body += `<strong>Country:</strong> ${country}<br>`;
      body += `<strong>Phone:</strong> ${phone}<br>`;
      body += `<strong>Email:</strong> ${email}<br>`;
      body += `<strong>How did you hear about us:</strong> ${reach}<br>`;
      body += `<strong>Reach Info:</strong> ${
        reachInfo || 'User Did Not Specify'
      }<br>`;
      body += `<strong>Please send more info:</strong> ${moreInfo}</p>`;
      body += `<p><strong>Message:</strong><br> ${message}</p>`;

      // setup email data with unicode symbols
      let mailOptions = {
        from: 'webforms@transtechsys.com', // sender address
        to: 'sales@transtechsys.com,tapkarian@transtechsys.com', // list of receivers
        replyTo: email,
        subject: 'TransTech Systems Sales Request Form', // Subject line
        text: message, // plain text body
        html: body, // html body
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
    res.redirect('/products/salesRequest');
  }
});

//Repair Request Form
app.post('/products/repairRequest', function (req, res) {
  let {
    name,
    company,
    address,
    city,
    state,
    zip,
    country,
    residential,
    phone,
    email,
    repairProduct,
    repairSerial,
    repairQty,
    estimate,
    serviceMessage,
  } = req.body;

  //Sanitize incoming data
  name = req.sanitize(name).replace(/<\/?[^>]+(>|$)/g, '');
  company = req.sanitize(company).replace(/<\/?[^>]+(>|$)/g, '');
  address = req.sanitize(address).replace(/<\/?[^>]+(>|$)/g, '');
  city = req.sanitize(city).replace(/<\/?[^>]+(>|$)/g, '');
  zip = req.sanitize(zip).replace(/<\/?[^>]+(>|$)/g, '');
  phone = req.sanitize(phone).replace(/<\/?[^>]+(>|$)/g, '');
  email = req.sanitize(email).replace(/<\/?[^>]+(>|$)/g, '');
  repairSerial = req.sanitize(repairSerial).replace(/<\/?[^>]+(>|$)/g, '');
  repairQty = req.sanitize(repairQty).replace(/<\/?[^>]+(>|$)/g, '');
  serviceMessage = req.sanitize(serviceMessage).replace(/<\/?[^>]+(>|$)/g, '');

  //Google captcha code
  if (
    req.body['g-recaptcha-response'] === undefined ||
    req.body['g-recaptcha-response'] === '' ||
    req.body['g-recaptcha-response'] === null
  ) {
    req.flash('success', 'Please select google captcha');
    return res.redirect('/products/repairRequest');
  }

  const secretKey = '6LdOJrUUAAAAAEcDXXzymgvHEY2XDMamj3pGXra-';
  const verificationURL =
    'https://www.google.com/recaptcha/api/siteverify?secret=' +
    secretKey +
    '&response=' +
    req.body['g-recaptcha-response'] +
    '&remoteip=' +
    req.connection.remoteAddress;

  //Send verification to google
  request(verificationURL, function (error, response, data) {
    data = JSON.parse(data);

    if (data.success !== undefined && !data.success) {
      req.flash('success', 'Failed captcha verification');
      return res.redirect('/products/repairRequest');
    }

    //If google passes - send form
    nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      var transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', // Office 365 server
        port: 587, // secure SMTP
        secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
        tls: {
          ciphers: 'SSLv3',
        },
      });

      let body = `<h2><u>Repair Request</u></h2>`;
      body += `<p><strong>From:</strong> ${name}<br>`;
      body += `<strong>Company:</strong> ${company}<br>`;
      body += `<strong>Address:</strong> ${address}<br>`;
      body += `<strong>City:</strong> ${city}<br>`;
      body += `<strong>State:</strong> ${state}<br>`;
      body += `<strong>Zipcode:</strong> ${zip}<br>`;
      body += `<strong>Country:</strong> ${country}<br>`;
      body += `<strong>Residential Address:</strong> ${
        residential ? 'Yes' : 'No'
      }<br>`;
      body += `<strong>Phone:</strong> ${phone}<br>`;
      body += `<strong>Email:</strong> ${email}<br>`;
      body += `<strong>Product for Repair:</strong> ${repairProduct}<br>`;
      body += `<strong>Serial Number(s):</strong> ${repairSerial}<br>`;
      body += `<strong>Total Qty of Units for Service:</strong> ${repairQty}<br>`;
      body += `<strong>Estimate Required:</strong> ${estimate}</p>`;
      body += `<p><strong>Description of Repair:</strong><br> ${serviceMessage}</p>`;

      // setup email data with unicode symbols
      let mailOptions = {
        from: 'webforms@transtechsys.com', // sender address
        to: 'cdavis@transtechsys.com,calibration@transtechsys.com,service@transtechsys.com', // list of receivers
        replyTo: email,
        subject: 'TransTech Systems Repair Request Form', // Subject line
        text: body, // plain text body
        html: body, // html body
      };

      let userBody = `<h2><u>TransTech Systems Calibration/Repair Request Received</u></h2>`;
      userBody += `<p>Thank you, ${name} for your calibration/repair submission for gauge serial number(s) ${repairSerial}<br>`;
      userBody += `Our service team will reply with your ticket(s) shortly.</p>`;
      userBody += `<p><b>This is not a monitored mailbox. Please do not reply.</b></p>`;

      // Send mail to user letting them know we received their request
      let mailOptions2 = {
        from: 'webforms@transtechsys.com', // sender address
        to: email, // list of receivers
        subject: 'TransTech Systems Calibration/Repair Request Received', // Subject line
        text: userBody, // plain text body
        html: userBody, // html body
      };

      if (company !== 'google') {
        //Trying to stop spam coming in with google as company name
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

        transporter.sendMail(mailOptions2, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
      }
    });
    req.flash('success', 'Repair request has been sent. Thank You!');
    res.redirect('/products/repairRequest');
  });
});

//Product Registration Form
app.post('/products/productRegistration', function (req, res) {
  let {
    name,
    company,
    state,
    country,
    phone,
    email,
    registerProduct,
    date,
    serial,
    businessAddress,
  } = req.body;

  if (businessAddress.length !== 0) {
    req.flash('success', 'Sorry Bot!');
    res.redirect('/products/productRegistration');
  } else {
    nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      var transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', // Office 365 server
        port: 587, // secure SMTP
        secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
        tls: {
          ciphers: 'SSLv3',
        },
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
        to: 'cborski@transtechsys.com', // list of receivers
        replyTo: email,
        subject: 'TransTech Systems Product Registration Form', // Subject line
        text: body, // plain text body
        html: body, // html body
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
    res.redirect('/products/productRegistration');
  }
});

//Request Integration Form
app.post('/products/requestIntegration', function (req, res) {
  let {
    name,
    company,
    state,
    country,
    phone,
    email,
    reach,
    message,
    businessAddress,
  } = req.body;

  if (businessAddress.length !== 0) {
    req.flash('success', 'Sorry Bot!');
    res.redirect('/products/requestIntegration');
  } else {
    nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      var transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', // Office 365 server
        port: 587, // secure SMTP
        secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
        tls: {
          ciphers: 'SSLv3',
        },
      });

      let body = `<h2><u>Request TransTech Connect Integration</u></h2>`;
      body += `<p><strong>From:</strong> ${name}<br>`;
      body += `<strong>Company:</strong> ${company}<br>`;
      body += `<strong>State:</strong> ${state}<br>`;
      body += `<strong>Country:</strong> ${country}<br>`;
      body += `<strong>Phone:</strong> ${phone}<br>`;
      body += `<strong>Email:</strong> ${email}<br>`;
      body += `<strong>How did you hear about us:</strong> ${reach}<br>`;
      body += `<p><strong>Message:</strong><br> ${message}</p>`;

      // setup email data with unicode symbols
      let mailOptions = {
        from: 'webforms@transtechsys.com', // sender address
        to: 'sales@transtechsys.com', // list of receivers
        replyTo: email,
        subject: 'Request TransTech Connect Integration Form', // Subject line
        text: message, // plain text body
        html: body, // html body
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
    req.flash('success', 'Integration request has been sent. Thank You!');
    res.redirect('/products/requestIntegration');
  }
});

//Trade Up Form - Not used as of March 2025
/*app.post('/products/tradeUp', function (req, res) {
  let {
    name,
    company,
    state,
    country,
    phone,
    email,
    tradeProduct,
    tradeSerial,
    tradeMessage,
    businessAddress,
  } = req.body;

  if (businessAddress.length !== 0) {
    req.flash('success', 'Sorry Bot!');
    res.redirect('/products/tradeUp');
  } else {
    nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      var transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', // Office 365 server
        port: 587, // secure SMTP
        secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
        tls: {
          ciphers: 'SSLv3',
        },
      });

      let body = `<h2><u>PQI 300/301 Trade Up Request</u></h2>`;
      body += `<p><strong>From:</strong> ${name}<br>`;
      body += `<strong>Company:</strong> ${company}<br>`;
      body += `<strong>State:</strong> ${state}<br>`;
      body += `<strong>Country:</strong> ${country}<br>`;
      body += `<strong>Phone:</strong> ${phone}<br>`;
      body += `<strong>Email:</strong> ${email}<br>`;
      body += `<strong>Product for Trade:</strong> ${tradeProduct}<br>`;
      body += `<strong>Serial Number:</strong> ${tradeSerial}`;
      body += `<p><strong>Additional Comments:</strong><br> ${tradeMessage}</p>`;

      // setup email data with unicode symbols
      let mailOptions = {
        from: 'webforms@transtechsys.com', // sender address
        to: 'tapkarian@transtechsys.com', // list of receivers
        replyTo: email,
        subject: 'TransTech Systems Trade Up Request Form', // Subject line
        text: body, // plain text body
        html: body, // html body
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
    req.flash('success', 'Trade Up request has been sent. Thank You!');
    res.redirect('/products/tradeUp');
  }
});
*/

//PQI 380 Product Page Manuals Download Form
app.post('/products/pqi380', function (req, res) {
  let {
    manualName,
    name,
    company,
    country,
    email,
    currentCustomer,
    reach,
    businessAddress,
  } = req.body;

  if (businessAddress.length !== 0) {
    req.flash('success', 'Sorry Bot!');
    res.redirect('/products/pqi380');
  } else {
    nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      var transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', // Office 365 server
        port: 587, // secure SMTP
        secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
        tls: {
          ciphers: 'SSLv3',
        },
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
        subject: 'TransTech Systems Product Manual Download', // Subject line
        text: body, // plain text body
        html: body, // html body
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
  }
});

//SDG 200 Product Page Manuals Download Form
app.post('/products/sdg200', function (req, res) {
  let {
    manualName,
    name,
    company,
    country,
    email,
    currentCustomer,
    reach,
    businessAddress,
  } = req.body;

  if (businessAddress.length !== 0) {
    req.flash('success', 'Sorry Bot!');
    res.redirect('/products/sdg200');
  } else {
    nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      var transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', // Office 365 server
        port: 587, // secure SMTP
        secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
        tls: {
          ciphers: 'SSLv3',
        },
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
        subject: 'TransTech Systems Product Manual Download', // Subject line
        text: body, // plain text body
        html: body, // html body
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
  }
});

//NWJM Product Page Manuals Download Form
app.post('/products/nwjm', function (req, res) {
  let {
    manualName,
    name,
    company,
    country,
    email,
    currentCustomer,
    reach,
    businessAddress,
  } = req.body;

  if (businessAddress.length !== 0) {
    req.flash('success', 'Sorry Bot!');
    res.redirect('/products/nwjm');
  } else {
    nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      var transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', // Office 365 server
        port: 587, // secure SMTP
        secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
        tls: {
          ciphers: 'SSLv3',
        },
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
        subject: 'TransTech Systems Product Manual Download', // Subject line
        text: body, // plain text body
        html: body, // html body
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
  }
});

//SWM Product Page Manuals Download Form
app.post('/products/swm', function (req, res) {
  let {
    manualName,
    name,
    company,
    country,
    email,
    currentCustomer,
    reach,
    businessAddress,
  } = req.body;

  if (businessAddress.length !== 0) {
    req.flash('success', 'Sorry Bot!');
    res.redirect('/products/swm');
  } else {
    nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      var transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', // Office 365 server
        port: 587, // secure SMTP
        secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
        tls: {
          ciphers: 'SSLv3',
        },
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
        subject: 'TransTech Systems Product Manual Download', // Subject line
        text: body, // plain text body
        html: body, // html body
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
  }
});

//PTS 3000 Product Page Manuals Download Form
app.post('/products/pts3000', function (req, res) {
  let {
    manualName,
    name,
    company,
    country,
    email,
    currentCustomer,
    reach,
    businessAddress,
  } = req.body;

  if (businessAddress.length !== 0) {
    req.flash('success', 'Sorry Bot!');
    res.redirect('/products/pts3000');
  } else {
    nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      var transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', // Office 365 server
        port: 587, // secure SMTP
        secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
        tls: {
          ciphers: 'SSLv3',
        },
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
        subject: 'TransTech Systems Product Manual Download', // Subject line
        text: body, // plain text body
        html: body, // html body
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
  }
});

//PQI 301 Product Page Manuals Download Form
app.post('/products/pqi301', function (req, res) {
  let {
    manualName,
    name,
    company,
    country,
    email,
    currentCustomer,
    reach,
    businessAddress,
  } = req.body;

  if (businessAddress.length !== 0) {
    req.flash('success', 'Sorry Bot!');
    res.redirect('/products/pqi301');
  } else {
    nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      var transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', // Office 365 server
        port: 587, // secure SMTP
        secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
        tls: {
          ciphers: 'SSLv3',
        },
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
        subject: 'TransTech Systems Product Manual Download', // Subject line
        text: body, // plain text body
        html: body, // html body
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
  }
});

//Product Manuals Page Manuals Download Form
app.post('/products/productManuals', function (req, res) {
  let {
    manualName,
    name,
    company,
    country,
    email,
    currentCustomer,
    reach,
    businessAddress,
  } = req.body;

  if (businessAddress.length !== 0) {
    req.flash('success', 'Sorry Bot!');
    res.redirect('/products/productManuals');
  } else {
    nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      var transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', // Office 365 server
        port: 587, // secure SMTP
        secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
        tls: {
          ciphers: 'SSLv3',
        },
      });

      let body = `<h2><u>${manualName} Download - Manuals Page</u></h2>`;
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
        subject: 'TransTech Systems Product Manual Download', // Subject line
        text: body, // plain text body
        html: body, // html body
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
  }
});

//Europe Homepage
app.get('/europe', (req, res) => {
  res.redirect('https://www.mit-dresden.de');
});

//Europe PQI380
app.get('/europe/pqi380', (req, res) => {
  res.redirect('https://www.mit-dresden.de');
});

//Europe SDG200
app.get('/europe/sdg200', (req, res) => {
  res.redirect('https://www.mit-dresden.de');
});

//404 Page Not Found
app.get('*', function (req, res) {
  res.status(404).render('products/NotFound404', {
    title: 'TransTech Systems',
    metaTitle: 'Oops! Looks like that page is gone!',
  });
});

//Start Server
app.listen(port, process.env.IP, function () {
  console.log(`Server has started!`);
});
