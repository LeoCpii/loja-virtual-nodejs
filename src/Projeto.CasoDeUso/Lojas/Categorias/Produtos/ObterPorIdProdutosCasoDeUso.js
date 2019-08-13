/*
* Imports Dependencies
*/
const Handler = require('../../../../shared/services/handler.service');
const Especificacao = require('../../../../Projeto.IoC/InjecoesDependencia/EspecificacaoInjecaoDependencia');

exports.executar = async (req, res, next) => {
    try {
        const produto = await Especificacao.lojas.categorias.produtos.obterPorId.executar(req.params.id);
        
        if (!Handler.isSuccess(produto)) {
           throw produto;
        };
        
        const mensagem = Handler.success('Produto obtido com sucesso', produto);
        return res.status(mensagem.status).send(mensagem);
    } catch (error) {
        const mensagem = Handler.errorStatus(error);
        return res.status(mensagem.status).send(mensagem);
    }
}