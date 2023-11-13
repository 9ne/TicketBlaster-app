const nodeMailer = require('nodemailer');
const auth = require('./authHandler');

const sendEmail  = async (options) => {
  const transport = nodeMailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  transport.verify((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('successfuly sent email');
    }
  });

  const mailOptions = {
    from: 'Ticket Blaster <ticketblaster@tickets.com>',
    to: options.email,
    subject: options.subject,
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title></title>
      <style>
        html {
          font-family: 'Lato', sans-serif;
          font-size: 14px;
        }
        a {
          text-decoration: none;
          display: inline-block;
          padding: 0.8rem 0 0 5rem;
          width: 12rem;
          height: 2rem;
          color: #fff;
          background-color: #FF48AB;
          border-radius: 30px;
          margin-left: 4.5rem;
        }
      </style>
    </head>
    <body>
      <div class="html">
        <h2 class="">Click on this link to reset your password.</h2>
        <a href=${options.message}>Reset password</a>
      </div>
    </body>
    </html>`
  };

  await transport.sendMail(mailOptions);
};

module.exports = sendEmail;