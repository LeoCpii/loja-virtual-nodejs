/*
* Imports Dependencies
*/
const Handler = require('../../shared/services/handler.service');

exports.executar = async (req, res, next) => {
    try {
        
        const mensagem = Handler.success('Aplicação saudável');
        return res.status(mensagem.status).send(mensagem);
    } catch (error) {
        const mensagem = Handler.errorStatus(error);
        return res.status(mensagem.status).send(mensagem);
    }
}