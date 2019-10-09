/*
* Imports Dependencies
*/
const Handler = require('./../../shared/services/handler.service');
const Especificacao = require('./../../Projeto.IoC/InjecoesDependencia/EspecificacaoInjecaoDependencia');
const Mail = require('./../../shared/services/SendMail.service');
exports.executar = async (req, res, next) => {
    try {
        await Especificacao.lojas.criar.executar(req.body);

        const objMail = {
            to: req.body.representanteLegal.informacaoPessoal.email,
            subject: 'Novo produto',
            template: 'registerStore',
            content: {
                token: 'abcdef' 
            },
        };

        await Mail.sendMail(objMail);

        const mensagem = Handler.success('Loja cadastrada com sucesso');
        return res.status(mensagem.status).send(mensagem);
    } catch (error) {
        const mensagem = Handler.errorStatus(error)
        return res.status(mensagem.status).send(mensagem);
    }
}