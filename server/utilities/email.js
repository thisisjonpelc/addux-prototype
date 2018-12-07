const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
    {
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    }
);

transporter.verify(function (error, success) {
    if (error) {
        console.log('Server is not ready to take our email messages:', error);
    } else {
        console.log('Server is ready to take our email messages!');
    }
});

module.exports = transporter;