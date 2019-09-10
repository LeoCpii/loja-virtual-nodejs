/*
* Imports Dependencies
*/
const Handler = require('../../shared/services/handler.service');
const Mail = require('./../../shared/services/SendMail.service');

exports.executar = async (req, res, next) => {
    try {
        const objMail = {
            to: 'leogoncalves.contato@gmail.com',
            subject: 'Novo produto',
            template: 'newProduct',
            content: { teste: 'TESTANDO EMAIL NODE.JS' },
        };

        await Mail.sendMail(objMail);
        const mensagem = Handler.success('Aplicação saudável');
        return res.status(mensagem.status).send(mensagem);
    } catch (error) {
        const mensagem = Handler.errorStatus(error);
        return res.status(mensagem.status).send(mensagem);
    }
}
