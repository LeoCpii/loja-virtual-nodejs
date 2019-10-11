/*
* Imports Dependencies
*/
const Handler = require('../../../../shared/services/handler.service');
const Especificacao = require('../../../../Projeto.IoC/InjecoesDependencia/EspecificacaoInjecaoDependencia');
const Utils = require('./../../../../shared/services/Utils.service');

exports.executar = async (req, res, next) => {
    try {
        const usuarioAtual = await Utils.lojaAtual(req.header('x-access-token'));
        const query = req.query || { slug: usuarioAtual.loja };
        const produtos = await Especificacao.lojas.categorias.produtos.obter.executar(query);
                
        const mensagem = Handler.success('Produtos obtidos com sucesso', produtos);
        return res.status(mensagem.status).send(mensagem);
    } catch (error) {
        const mensagem = Handler.errorStatus(error)
        return res.status(mensagem.status).send(mensagem);
    }
}