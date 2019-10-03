/*
* Imports Dependencies
*/
const Handler = require('./../../shared/services/handler.service');
const Especificacao = require('./../../Projeto.IoC/InjecoesDependencia/EspecificacaoInjecaoDependencia');
const Utils = require('./../../shared/services/Utils.service');

exports.executar = async (req, res, next) => {
    try {

        const lojaAtual = await Utils.lojaAtual(req.header('x-access-token'));
        
        if(lojaAtual.slug !== req.params.slug) {
            throw new Handler.HandlerError(403, 'Você não possui autorização atualizar essa loja');
        }

        const loja = await Especificacao.lojas.obter.executar({ slug: req.params.slug })

        await Especificacao.lojas.atualizar.executar(loja[0]._id, req.body);

        const mensagem = Handler.success('Loja atualizada com sucesso');
        return res.status(mensagem.status).send(mensagem);
    } catch (error) {
        const mensagem = Handler.errorStatus(error)
        return res.status(mensagem.status).send(mensagem);
    }
}