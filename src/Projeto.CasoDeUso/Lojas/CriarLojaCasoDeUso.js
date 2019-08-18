/*
* Imports Dependencies
*/
const Handler = require('./../../shared/services/handler.service');
const Especificacao = require('./../../Projeto.IoC/InjecoesDependencia/EspecificacaoInjecaoDependencia');

exports.executar = async (req, res, next) => {
    try {
        await Especificacao.lojas.criar.executar(req.body);

        const mensagem = Handler.success('Loja cadastrada com sucesso');
        return res.status(mensagem.status).send(mensagem);
    } catch (error) {
        const mensagem = Handler.errorStatus(error)
        return res.status(mensagem.status).send(mensagem);
    }
}