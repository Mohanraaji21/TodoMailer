var nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'griffinsbrian21@gmail.com',
            pass: 'zhcu itrc dwuk vfhd', 
        },
    });

    var mailOptions = {
        from: 'griffinsbrian21@gmail.com',
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
