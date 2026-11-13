const nodemailer = require('nodemailer');

const mailTransporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    minVersion: 'TLSv1.2',
  },
});

module.exports = mailTransporter;
