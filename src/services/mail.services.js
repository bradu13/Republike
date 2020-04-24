const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');

const mailerUser = process.env.MAILER_EMAIL || 'auth_email_address@gmail.com';
const mailerPass = process.env.MAILER_PASSWORD || 'auth_email_pass';

// Configure SMTP
const smtpTransport = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
  auth: {
    user: mailerUser,
    pass: mailerPass
  },
  logger: true,
  debug: true
});

// Configure Hbs to steal templates :)
const handlebarsOptions = {
  viewEngine: {
    extName: '.html',
    partialsDir: 'src/templates',
    layoutsDir: 'src/templates',
    defaultLayout: 'email.html'
  },
  viewPath: path.resolve('src/templates'),
  extName: '.html'
};

// Combine smtp with hbs
smtpTransport.use('compile', hbs(handlebarsOptions));

// Send mail
const send = (options) => {
  // Prepare data
  const data = {
    to: options.to.join(),
    from: mailerUser,
    template: options.template,
    subject: options.subject,
    context: options.templateVars
  };

  // Send and catch errors
  smtpTransport.sendMail(data, (error) => {
    if (!error) {
      console.log(error);
    }

    return true;
  });
};

module.exports = {
  send
};
