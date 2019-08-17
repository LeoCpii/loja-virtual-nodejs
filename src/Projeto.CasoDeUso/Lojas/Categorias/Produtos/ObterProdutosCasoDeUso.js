/*
* Imports Dependencies
*/
const Handler = require('../../../../shared/services/handler.service');
const Especificacao = require('../../../../Projeto.IoC/InjecoesDependencia/EspecificacaoInjecaoDependencia');

exports.executar = async (req, res, next) => {
    try {
        const produtos = await Especificacao.lojas.categorias.produtos.obter.executar();
                
        const mensagem = Handler.success('Produtos obtidos com sucesso', produtos);
        return res.status(mensagem.status).send(mensagem);
    } catch (error) {
        return res.status(error.status).send(error);
    }
}