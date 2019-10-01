/*
* Imports Dependencies
*/
const Handler = require('./../../../shared/services/handler.service');
const Especificacao = require('./../../../Projeto.IoC/InjecoesDependencia/EspecificacaoInjecaoDependencia');

exports.executar = async (req, res, next) => {
    try {

        if (req.params.slug === 'sem-categoria') {
            throw new Handler.HandlerError(403, 'Está categoria não pode ser excluída');
        }

        const categoria = await Especificacao.lojas.categorias.excluir.executar(req.params.slug);

        const mensagem = Handler.success('Categoria excluída com sucesso', categoria);
        return res.status(200).send(mensagem);
    } catch (error) {
        const mensagem = Handler.errorStatus(error)
        return res.status(mensagem.status).send(mensagem);
    }
}