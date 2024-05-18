const nodemailer = require('nodemailer');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function sendEmail(receiverEmail, emailText) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'amassed971@gmail.com', 
      pass: 'ofhx ahvz enra ydpf' // Replace with your actual password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: 'amassed971@gmail.com',
    to: receiverEmail, // Use the receiver's email passed as a parameter
    subject: 'Sending Email using Node.js',
    text: emailText // Use the email text passed as a parameter
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = sendEmail;
