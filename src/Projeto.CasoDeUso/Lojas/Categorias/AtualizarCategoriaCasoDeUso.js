/*
* Imports Dependencies
*/
const Handler = require('./../../../shared/services/handler.service');
const Especificacao = require('./../../../Projeto.IoC/InjecoesDependencia/EspecificacaoInjecaoDependencia');

exports.executar = async (req, res, next) => {
    try {

        let categoria = await Especificacao.lojas.categorias.obterPorSlug.executar(req.params.slug);

        await Especificacao.lojas.categorias.atualizar.executar(req.body, categoria);

        const mensagem = Handler.success('Categoria cadastrada com sucesso', '');
        return res.status(mensagem.status).send(mensagem);
    } catch (error) {
        const mensagem = Handler.errorStatus(error)
        return res.status(mensagem.status).send(mensagem);
    }
}