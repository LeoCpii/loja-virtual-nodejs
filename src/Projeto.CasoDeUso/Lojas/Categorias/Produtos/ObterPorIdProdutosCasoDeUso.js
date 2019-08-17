/*
* Imports Dependencies
*/
const Handler = require('../../../../shared/services/handler.service');
const Especificacao = require('../../../../Projeto.IoC/InjecoesDependencia/EspecificacaoInjecaoDependencia');

exports.executar = async (req, res, next) => {
    try {
        const produto = await Especificacao.lojas.categorias.produtos.obterPorId.executar(req.params.id);
        
        const mensagem = Handler.success('Produto obtido com sucesso', produto);
        return res.status(mensagem.status).send(mensagem);
    } catch (error) {
        return res.status(error.status).send(error);
    }
}