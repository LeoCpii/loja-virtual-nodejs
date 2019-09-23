
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const Handler = require('./handler.service');

const TEMPLATE = {
    newProduct: 'newProduct.ejs'
};

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASSWORD
    },
    tls: { rejectUnauthorized: false }
});

exports.sendMail = async (mail) => {
    const html = await getTemplate(mail.template, mail.content);

    const mailOptions = {
        from: process.env.MAIL,
        to: mail.to,
        subject: mail.subject,
        // text: 'Bem fácil, não? ;)',
        html: html
    };

    send(mailOptions);
}

send = (mailOptions) => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return error;
        } else {
            transport.close();
            return info.response;
        }
    });
}

getTemplate = async (key, content) => {
    if (!TEMPLATE[key]) {
        throw new Handler.HandlerError(400, 'Template inválido');
    }

    return new Promise((resolve, reject) => {
        ejs.renderFile(`${process.env.TEMPLATE_PATH}${TEMPLATE[key]}`, content, (err, html) => {
            resolve(html)
        })
    });
}
