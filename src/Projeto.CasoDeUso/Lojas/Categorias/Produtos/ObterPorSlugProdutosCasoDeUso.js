/*
* Imports Dependencies
*/
const Handler = require('../../../../shared/services/handler.service');
const Especificacao = require('../../../../Projeto.IoC/InjecoesDependencia/EspecificacaoInjecaoDependencia');

exports.executar = async (req, res, next) => {
    try {
        console.log(req.query)
        const produto = await Especificacao.lojas.categorias.produtos.obterPorSlug.executar(req.params.slug);
        
        const mensagem = Handler.success('Produto obtido com sucesso', produto);
        return res.status(mensagem.status).send(mensagem);
    } catch (error) {
        const mensagem = Handler.errorStatus(error)
        return res.status(mensagem.status).send(mensagem);
    }
}