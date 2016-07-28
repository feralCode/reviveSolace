var logentries = require('node-logentries');
var log = logentries.logger({
    token: '88702761-c44c-497c-b1b7-cdad9f6ce757'
});
var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
        user: 'village.defense.4appsol@gmail.com',
        pass: '5chlockAnti5'
    }
});

var mail = function(toEmail, subject, body) {

    var mailOptions =
            {
                from: 'Village Defense <village.defense.4appsol@gmail.com>', // sender address
                to: toEmail, // list of receivers
                subject: subject,
                html: body
            };

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            log.info('Mailer error' + JSON.stringify(error));
            console.log('Mailer error' + JSON.stringify(error));
        } else {
            log.info('Message sent: ' + response.message);
            console.log('Message sent: ' + response.message);
        }
        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });

};

exports.sendMail = function(email, firstname, OTP) {

    var body = ['<p>Dear <b>' + firstname + '</b></p><br/>',
        OTP,
        ' is your One-Time Password (OTP) to log in to your Village Defense App.<br/>',
        'It is valid for next 10 minutes <br/>'].join('');

    mail(email, 'OTP for Village Defense App', body);

};

exports.sendReferredMail = function(user, friends) {

    for (var i = 0; i < friends.length; i++) {

        var currentfriend = friends[i];
        var userName = user.firstname + ' ' + user.lastname;
        var subject = user.neighborhood + ': ' + userName + ' invited ' + currentfriend['name'];
        var body = ['<p>Hello Village Defense</p>',
            '<p>' + userName + ' (' + user.email + ') invited ' + currentfriend['name'] + ' (' + currentfriend['number'] + ') to ' + user.neighborhood + '’s network.</p>',
            'Regards,<br/>4AppSolutions'
        ];
        mail('referrals@villagedefense.com', subject, body.join(''));
    }

};
