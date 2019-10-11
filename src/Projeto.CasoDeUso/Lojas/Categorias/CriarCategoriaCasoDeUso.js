/*
* Imports Dependencies
*/
const Handler = require('./../../../shared/services/handler.service');
const Especificacao = require('./../../../Projeto.IoC/InjecoesDependencia/EspecificacaoInjecaoDependencia');
const Utils = require('./../../../shared/services/Utils.service');

exports.executar = async (req, res, next) => {
    try {

        const usuarioAtual = await Utils.lojaAtual(req.header('x-access-token'));

        const categoria = await Especificacao.lojas.categorias.criar.executar(req.body, usuarioAtual.loja);
        
        const mensagem = Handler.success('Categoria cadastrada com sucesso', categoria);
        return res.status(mensagem.status).send(mensagem);
    } catch (error) {
        const mensagem = Handler.errorStatus(error)
        return res.status(mensagem.status).send(mensagem);
    }
}