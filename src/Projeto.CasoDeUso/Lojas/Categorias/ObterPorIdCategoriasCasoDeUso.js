/*
* Imports Dependencies
*/
const Handler = require('../../../shared/services/handler.service');
const Especificacao = require('../../../Projeto.IoC/InjecoesDependencia/EspecificacaoInjecaoDependencia');

exports.executar = async (req, res, next) => {
    try {
        const categoria = await Especificacao.lojas.categorias.obterPorId.executar(req.params.id);

        const mensagem = Handler.success('Categoria encontrada', categoria);
        return res.status(mensagem.status).send(mensagem);
    } catch (error) {
        return res.status(error.status).send(error);
    }
}