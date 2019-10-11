/*
* Imports Dependencies
*/
const Handler = require('./../../shared/services/handler.service');
const Especificacao = require('./../../Projeto.IoC/InjecoesDependencia/EspecificacaoInjecaoDependencia');
const Utils = require('./../../shared/services/Utils.service');

exports.executar = async (req, res, next) => {
    try {

        const usuarioAtual = await Utils.lojaAtual(req.header('x-access-token'));

        const loja = await Especificacao.lojas.obter.executar({ slug: usuarioAtual.slug });

        await Especificacao.lojas.atualizar.executar(loja[0]._id, req.body);

        const mensagem = Handler.success('Loja atualizada com sucesso');
        return res.status(mensagem.status).send(mensagem);
    } catch (error) {
        const mensagem = Handler.errorStatus(error)
        return res.status(mensagem.status).send(mensagem);
    }
}