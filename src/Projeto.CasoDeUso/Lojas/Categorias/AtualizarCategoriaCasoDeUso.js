/*
* Imports Dependencies
*/
const Handler = require('./../../../shared/services/handler.service');
const Especificacao = require('./../../../Projeto.IoC/InjecoesDependencia/EspecificacaoInjecaoDependencia');

exports.executar = async (req, res, next) => {
    try {

        let categoria = await Especificacao.lojas.categorias.obterPorSlug.executar(req.params.slug);

        if(categoria.slug === 'sem-categoria') {
            throw new Handler.HandlerError(403, 'Está categoria não pode ser atualizada');
        }

        await Especificacao.lojas.categorias.atualizar.executar(req.body, categoria);

        const mensagem = Handler.success('Categoria atualizada com sucesso', '');
        return res.status(mensagem.status).send(mensagem);
    } catch (error) {
        const mensagem = Handler.errorStatus(error)
        return res.status(mensagem.status).send(mensagem);
    }
}