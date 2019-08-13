/*
* Imports Dependencies
*/
const Handler = require('../../../shared/services/handler.service');
const Especificacao = require('../../../Projeto.IoC/InjecoesDependencia/EspecificacaoInjecaoDependencia');

exports.executar = async (req, res, next) => {
    try {
        const categoria = await Especificacao.lojas.categorias.obterPorId.executar(req.params.id);
        
        if (!Handler.isSuccess(categoria)) {
           throw categoria;
        };
        
        const mensagem = Handler.success('Categoria encontrada', categoria);
        return res.status(mensagem.status).send(mensagem);
    } catch (error) {
        const mensagem = Handler.errorStatus(error);
        return res.status(mensagem.status).send(mensagem);
    }
}