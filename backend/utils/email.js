var nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'Your@gmail.com',
            pass: 'Your Password'
        },
    });

    var mailOptions = {
        from: 'Your@gmail.com',
        to: to,
        subject: subject,
        text: text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.log('Error sending email:', error);
    }
};

module.exports = sendEmail;
