/*
* Imports Dependencies
*/
const Handler = require('./../../../shared/services/handler.service');
const Especificacao = require('./../../../Projeto.IoC/InjecoesDependencia/EspecificacaoInjecaoDependencia');

exports.executar = async (req, res, next) => {
    try {
        const categoria = await Especificacao.lojas.categorias.excluir.executar(req.params.id);
        
        const mensagem = Handler.success('Categoria excluída com sucesso', categoria);
        return res.status(mensagem.status).send(mensagem);
    } catch (error) {
        const mensagem = Handler.errorStatus(error)
        return res.status(mensagem.status).send(mensagem);
    }
}