var _ = require('lodash');

const nodemailer = require('nodemailer');

var config = {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: '',
        pass: ''
    }
};

var transporter = nodemailer.createTransport(config);

var defaultMail = {
    from: '',
    text: 'Helo, Ezekiel'
}

const send = (to, subject, html) => {
    mail = _.merge({html}, function(error, info){
        if (error) return console.log(error);
        console.log('mail sent successfully', info.response);
    })
}

module.exports = {
    send
}
