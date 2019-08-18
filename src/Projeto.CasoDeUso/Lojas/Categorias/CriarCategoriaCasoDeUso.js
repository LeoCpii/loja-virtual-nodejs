/*
* Imports Dependencies
*/
const Handler = require('./../../../shared/services/handler.service');
const Especificacao = require('./../../../Projeto.IoC/InjecoesDependencia/EspecificacaoInjecaoDependencia');

exports.executar = async (req, res, next) => {
    try {
        const categoria = await Especificacao.lojas.categorias.criar.executar(req.body);
        
        const mensagem = Handler.success('Categoria cadastrada com sucesso', categoria);
        return res.status(mensagem.status).send(mensagem);
    } catch (error) {
        const mensagem = Handler.errorStatus(error)
        return res.status(mensagem.status).send(mensagem);
    }
}